import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Input validation helpers
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const sanitizeString = (str: string | undefined, maxLength: number): string => {
  if (!str) return "";
  return str.trim().slice(0, maxLength);
};

const sanitizePhone = (phone: string | undefined): string => {
  if (!phone) return "";
  // Remove non-digit characters except + for international
  return phone.replace(/[^\d+\-() ]/g, "").slice(0, 20);
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing required environment variables");
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { firstName, lastName, email, phone, goal, notes, source } = body;

    // Validate required fields
    if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "First name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize all inputs
    const sanitizedData = {
      first_name: sanitizeString(firstName, 100),
      last_name: sanitizeString(lastName, 100),
      email: sanitizeString(email, 255).toLowerCase(),
      phone: sanitizePhone(phone),
      goal: sanitizeString(goal, 500),
      notes: sanitizeString(notes, 2000),
      source: sanitizeString(source, 50) || "website",
    };

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Insert lead into database
    const { data, error: insertError } = await supabase
      .from("contact_leads")
      .insert(sanitizedData)
      .select("id")
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save contact information" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

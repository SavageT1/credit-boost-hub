import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiting (per instance)
// In production, consider using Redis or a distributed rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 submissions per hour per IP

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
};

// Clean up old rate limit entries periodically
const cleanupRateLimits = () => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
};

// Input validation helpers
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const sanitizeString = (str: string | undefined, maxLength: number): string => {
  if (!str) return "";
  // Remove potentially dangerous characters and normalize whitespace
  return str.trim().replace(/[<>]/g, "").slice(0, maxLength);
};

const sanitizePhone = (phone: string | undefined): string => {
  if (!phone) return "";
  // Strict phone sanitization - only digits, plus, parentheses, dashes, spaces
  return phone.replace(/[^\d+\-() ]/g, "").slice(0, 20);
};

// Honeypot field check - if filled, it's likely a bot
const isHoneypotTriggered = (honeypot: string | undefined): boolean => {
  return honeypot !== undefined && honeypot !== null && honeypot !== "";
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": "3600"
          } 
        }
      );
    }

    // Periodic cleanup of rate limit map
    if (Math.random() < 0.1) {
      cleanupRateLimits();
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      // Log error server-side only, generic message to client
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
        JSON.stringify({ error: "Invalid request format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { firstName, lastName, email, phone, goal, notes, source, _honey } = body;

    // Honeypot check - silent rejection to avoid tipping off bots
    if (isHoneypotTriggered(_honey)) {
      // Pretend success but don't actually save
      return new Response(
        JSON.stringify({ success: true, id: "processed" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate required fields with strict type checking
    if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0 || firstName.length > 100) {
      return new Response(
        JSON.stringify({ error: "Valid first name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate optional fields types
    if (lastName !== undefined && typeof lastName !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid field format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (phone !== undefined && typeof phone !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid field format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize all inputs - defense in depth
    const sanitizedData = {
      first_name: sanitizeString(firstName, 100),
      last_name: sanitizeString(lastName, 100),
      email: sanitizeString(email, 255).toLowerCase(),
      phone: sanitizePhone(phone),
      goal: sanitizeString(goal, 500),
      notes: sanitizeString(notes, 2000),
      source: sanitizeString(source, 50) || "website",
    };

    // Additional email format validation after sanitization
    if (!isValidEmail(sanitizedData.email)) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role (bypasses RLS)
    // SECURITY: This client has elevated privileges - only use for validated, sanitized data
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Insert lead into database - only selected columns, no arbitrary data
    const { data, error: insertError } = await supabase
      .from("contact_leads")
      .insert(sanitizedData)
      .select("id")
      .single();

    if (insertError) {
      // Log full error server-side for debugging
      console.error("Database operation failed:", insertError.code);
      return new Response(
        JSON.stringify({ error: "Unable to process your request" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return minimal success response - don't expose internal IDs
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Generic error - no internal details exposed
    console.error("Request processing error");
    return new Response(
      JSON.stringify({ error: "Unable to process your request" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

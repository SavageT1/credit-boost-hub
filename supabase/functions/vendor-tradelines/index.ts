import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type VendorTradeline = {
  Id: number;
  Price: number;
  SpotsAvailable: number;
  Lender: string;
  Cycles: number;
  Limit: number;
  DateOpened: string;
  StatementDate: string;
  PostingDate: string;
  CardholderAddressID: number;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const allowedEmails = (Deno.env.get("PORTAL_ALLOWED_EMAILS") || "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);

    const authHeader = req.headers.get("Authorization") || "";
    const supabase = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const email = userData?.user?.email?.toLowerCase() || "";

    if (userError || !userData?.user || (allowedEmails.length > 0 && !allowedEmails.includes(email))) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userKey = Deno.env.get("VENDOR_API_USER_KEY");
    const passKey = Deno.env.get("VENDOR_API_PASS_KEY");
    const apiVersion = Deno.env.get("VENDOR_API_VERSION") ?? "3";
    const referrer = Deno.env.get("VENDOR_API_REFERRER") ?? "https://a1tradelines.com";
    const endpoint = Deno.env.get("VENDOR_TRADELINE_ENDPOINT") ?? "https://www.tradelinemaster.com/api/Tradeline";
    const markupPct = Number(Deno.env.get("TRADELINE_MARKUP_PCT") ?? "50");

    if (!userKey || !passKey) {
      return new Response(JSON.stringify({ error: "Server not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const basic = btoa(`${userKey}:${passKey}`);

    const upstream = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Basic ${basic}`,
        "APIVersion": apiVersion,
        "Referrer": referrer,
      },
    });

    if (!upstream.ok) {
      return new Response(JSON.stringify({ error: "Vendor API unavailable" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = (await upstream.json()) as VendorTradeline[];
    const multiplier = 1 + markupPct / 100;

    const tradelines = data.map((t) => ({
      id: t.Id,
      lender: t.Lender,
      spotsAvailable: t.SpotsAvailable,
      cycles: t.Cycles,
      limit: t.Limit,
      dateOpened: t.DateOpened,
      statementDate: t.StatementDate,
      postingDate: t.PostingDate,
      vendorPrice: t.Price,
      clientPrice: Number((t.Price * multiplier).toFixed(2)),
    }));

    return new Response(JSON.stringify({ tradelines, markupPct }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (_err) {
    return new Response(JSON.stringify({ error: "Unable to load tradelines" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-portal-key",
};

type OrderRequestBody = {
  tradelineId: number;
  client: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    ssn: string;
    genderId: number;
    maritalStatusId: number;
    citizenshipStatusId: number;
    physicalAddress: string;
    city: string;
    stateCode: string;
    zipCode: string;
    creditReportAgencyURL?: string;
    creditReportAgencyUsername?: string;
    creditReportAgencyPassword?: string;
  };
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const digitsOnly = (v: string) => v.replace(/\D/g, "");

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const portalSecret = Deno.env.get("PORTAL_SHARED_SECRET");
    const portalKey = req.headers.get("x-portal-key");

    if (!portalSecret || portalKey !== portalSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userKey = Deno.env.get("VENDOR_API_USER_KEY");
    const passKey = Deno.env.get("VENDOR_API_PASS_KEY");
    const apiVersion = Deno.env.get("VENDOR_API_VERSION") ?? "3";
    const referrer = Deno.env.get("VENDOR_API_REFERRER") ?? "https://a1tradelines.com";
    const endpoint = Deno.env.get("VENDOR_ORDER_ENDPOINT") ?? "https://www.tradelinemaster.com/api/Tradeline/OrderRequest";

    if (!userKey || !passKey) {
      return new Response(JSON.stringify({ error: "Server not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as OrderRequestBody;
    if (!body?.tradelineId || !body?.client) {
      return new Response(JSON.stringify({ error: "tradelineId and client are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const c = body.client;
    const ssn = digitsOnly(c.ssn);
    const phone = c.phone?.trim();

    if (!c.firstName?.trim() || !c.lastName?.trim()) {
      return new Response(JSON.stringify({ error: "First and last name are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!emailRegex.test(c.email || "")) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (ssn.length !== 9) {
      return new Response(JSON.stringify({ error: "SSN must be 9 digits" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!phone || phone.length < 10) {
      return new Response(JSON.stringify({ error: "Valid phone is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = {
      TradelineID: Number(body.tradelineId),
      Client: {
        FirstName: c.firstName.trim(),
        LastName: c.lastName.trim(),
        Email: c.email.trim(),
        Phone: phone,
        DOB: c.dob,
        SSN: ssn,
        GenderId: Number(c.genderId),
        MaritalStatusId: Number(c.maritalStatusId),
        CitizenshipStatusId: Number(c.citizenshipStatusId),
        PhysicalAddress: c.physicalAddress?.trim(),
        City: c.city?.trim(),
        StateCode: c.stateCode?.trim().toUpperCase(),
        ZipCode: c.zipCode?.trim(),
        CreditReportAgencyURL: c.creditReportAgencyURL?.trim() || "",
        CreditReportAgencyUsername: c.creditReportAgencyUsername?.trim() || "",
        CreditReportAgencyPassword: c.creditReportAgencyPassword?.trim() || "",
      },
    };

    const basic = btoa(`${userKey}:${passKey}`);

    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Basic ${basic}`,
        "APIVersion": apiVersion,
        "Referrer": referrer,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await upstream.text();
    let json: unknown = null;
    try {
      json = JSON.parse(responseText);
    } catch {
      json = { raw: responseText };
    }

    if (!upstream.ok) {
      return new Response(JSON.stringify({ error: "Vendor order request failed", details: json }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (_err) {
    return new Response(JSON.stringify({ error: "Unable to submit order request" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

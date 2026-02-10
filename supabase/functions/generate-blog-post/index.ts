import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};


const sanitizeText = (value: string, maxLen = 500) =>
  value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLen);

const sanitizeSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90);

const sanitizeHtml = (html: string) => {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<(object|embed|link|meta|base)[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s(href|src)\s*=\s*("|')\s*javascript:[^"']*("|')/gi, " $1=$2#$3")
    .trim();
};

const BLOG_TOPICS = [
  "Understanding credit utilization and how it affects your score",
  "The difference between authorized user tradelines and primary accounts",
  "How payment history impacts your credit profile",
  "What lenders look for when reviewing credit applications",
  "Building credit from scratch: A beginner's guide",
  "Credit myths debunked: What actually matters",
  "How long negative items stay on your credit report",
  "The role of credit age in your overall score",
  "Understanding the different credit scoring models",
  "Tips for maintaining good credit habits",
  "How to read and understand your credit report",
  "The impact of hard vs soft credit inquiries",
  "Credit building strategies for different life stages",
  "Understanding secured vs unsecured credit",
  "How credit mix affects your credit profile",
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify secret token for authorization
    const BLOG_GENERATION_SECRET = Deno.env.get("BLOG_GENERATION_SECRET");
    const providedToken = req.headers.get("X-Secret-Token");

    if (!BLOG_GENERATION_SECRET || providedToken !== BLOG_GENERATION_SECRET) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing required environment variables");
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get existing blog post titles to avoid duplicates
    const { data: existingPosts } = await supabase
      .from("blog_posts")
      .select("title");

    const existingTitles = existingPosts?.map(p => p.title.toLowerCase()) || [];
    
    // Filter out topics that might already have posts
    const availableTopics = BLOG_TOPICS.filter(topic => 
      !existingTitles.some(title => title.includes(topic.toLowerCase().slice(0, 20)))
    );

    // Pick a random topic
    const topic = availableTopics.length > 0 
      ? availableTopics[Math.floor(Math.random() * availableTopics.length)]
      : BLOG_TOPICS[Math.floor(Math.random() * BLOG_TOPICS.length)];

    // Generate blog content using AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a professional credit education content writer for A1 Tradelines. 
Write informative, helpful blog posts about credit building and tradelines.

CRITICAL RULES:
- NEVER make guarantees about score increases
- NEVER use hype language or fear tactics
- Use phrases like "may help strengthen", "results vary", "depending on your situation"
- Be educational and informative
- Cite general principles, not specific promises
- Include a disclaimer that results vary and are not guaranteed

Format your response as JSON with these fields:
- title: SEO-friendly title (under 60 characters)
- slug: URL-friendly version of title (lowercase, hyphens)
- excerpt: Brief summary (under 160 characters)
- content: Full blog post in HTML format (use <h2>, <p>, <ul>, <li> tags)
- meta_description: SEO meta description (under 160 characters)`
          },
          {
            role: "user",
            content: `Write a comprehensive, educational blog post about: ${topic}`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_blog_post",
              description: "Create a blog post with structured content",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "SEO-friendly blog title" },
                  slug: { type: "string", description: "URL-friendly slug" },
                  excerpt: { type: "string", description: "Brief post summary" },
                  content: { type: "string", description: "Full HTML content" },
                  meta_description: { type: "string", description: "SEO meta description" }
                },
                required: ["title", "slug", "excerpt", "content", "meta_description"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "create_blog_post" } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI API error:", errorText);
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall?.function?.arguments) {
      throw new Error("No valid response from AI");
    }

    const blogData = JSON.parse(toolCall.function.arguments);

    const safeTitle = sanitizeText(blogData.title || "", 120);
    const safeSlug = sanitizeSlug(blogData.slug || safeTitle);
    const safeExcerpt = sanitizeText(blogData.excerpt || "", 220);
    const safeMetaDescription = sanitizeText(blogData.meta_description || safeExcerpt, 180);
    const safeContent = sanitizeHtml(String(blogData.content || ""));

    if (!safeTitle || !safeSlug || !safeExcerpt || !safeContent) {
      throw new Error("Generated blog content failed validation");
    }

    // Insert the blog post
    const { data: newPost, error: insertError } = await supabase
      .from("blog_posts")
      .insert({
        title: safeTitle,
        slug: safeSlug,
        excerpt: safeExcerpt,
        content: safeContent,
        meta_description: safeMetaDescription,
        published: true,
        published_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw insertError;
    }

    return new Response(JSON.stringify({ success: true, post: newPost }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log detailed error server-side only
    console.error("Error generating blog post:", error);
    
    // Return generic error to client - never expose internal details
    return new Response(
      JSON.stringify({ error: "Failed to generate blog post. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
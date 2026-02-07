-- Fix blog_posts table: Add restrictive policies to prevent unauthorized INSERT, UPDATE, DELETE
-- Since there's no admin authentication system, we deny all write operations from clients
-- Blog content is managed via edge functions with service role

-- Add policy to deny all INSERT operations on blog_posts
CREATE POLICY "No direct client insert on blog_posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (false);

-- Add policy to deny all UPDATE operations on blog_posts  
CREATE POLICY "No direct client update on blog_posts"
ON public.blog_posts
FOR UPDATE
USING (false);

-- Add policy to deny all DELETE operations on blog_posts
CREATE POLICY "No direct client delete on blog_posts"
ON public.blog_posts
FOR DELETE
USING (false);
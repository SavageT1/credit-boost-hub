-- Create contact_leads table
CREATE TABLE public.contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  goal TEXT,
  notes TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

-- Deny all direct client access (only service role can access)
CREATE POLICY "No direct client access"
ON public.contact_leads
FOR ALL
USING (false)
WITH CHECK (false);

-- Add comment for documentation
COMMENT ON TABLE public.contact_leads IS 'Contact form submissions - access restricted to service role only';
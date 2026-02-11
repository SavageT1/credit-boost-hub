-- Harden contact_leads access to prevent any accidental client exposure

-- Ensure RLS cannot be bypassed by table owner context
ALTER TABLE public.contact_leads FORCE ROW LEVEL SECURITY;

-- Remove any broad table grants that may exist from defaults or prior tooling
REVOKE ALL ON TABLE public.contact_leads FROM PUBLIC;
REVOKE ALL ON TABLE public.contact_leads FROM anon;
REVOKE ALL ON TABLE public.contact_leads FROM authenticated;

-- Keep service-role/backend access path explicit
GRANT INSERT ON TABLE public.contact_leads TO service_role;
GRANT SELECT ON TABLE public.contact_leads TO service_role;

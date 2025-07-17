-- Create inquiries table to store contact form submissions
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row-Level Security for this table
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone (even unauthenticated) can insert inquiries (public contact form)
CREATE POLICY "Anyone can submit inquiries"
  ON public.inquiries
  FOR INSERT
  WITH CHECK (true);

-- Policy: Only authenticated users (e.g., admin dashboard) can view inquiries
CREATE POLICY "Authenticated users can view inquiries"
  ON public.inquiries
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Function: Automatically update `updated_at` on each update
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update `updated_at` column on every update
CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add temporary INSERT policy for bulk import
CREATE POLICY "Allow public insert for bulk import"
ON public.stocks
FOR INSERT
WITH CHECK (true);
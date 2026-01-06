-- Remove temporary INSERT policy for bulk import
DROP POLICY "Allow public insert for bulk import" ON public.stocks;
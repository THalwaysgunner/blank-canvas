-- Create stocks table for symbol lookup
CREATE TABLE public.stocks (
  id SERIAL PRIMARY KEY,
  symbol TEXT NOT NULL UNIQUE,
  company_name TEXT NOT NULL
);

-- Enable RLS but allow public read access for search
ALTER TABLE public.stocks ENABLE ROW LEVEL SECURITY;

-- Everyone can read stocks (public lookup table)
CREATE POLICY "Anyone can read stocks"
ON public.stocks
FOR SELECT
USING (true);

-- Create index for fast symbol search
CREATE INDEX idx_stocks_symbol ON public.stocks(symbol);
CREATE INDEX idx_stocks_company_name ON public.stocks USING gin(to_tsvector('english', company_name));
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { csvData } = await req.json();
    
    if (!csvData) {
      return new Response(
        JSON.stringify({ error: 'No CSV data provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse CSV
    const lines = csvData.split('\n').filter((line: string) => line.trim());
    const stocks: { symbol: string; company_name: string }[] = [];
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Handle CSV with quoted fields
      const match = line.match(/^"?([^",]+)"?,\s*"?([^"]+)"?$/);
      if (match) {
        const symbol = match[1].trim();
        const companyName = match[2].trim();
        if (symbol && companyName) {
          stocks.push({ symbol, company_name: companyName });
        }
      }
    }

    console.log(`Parsed ${stocks.length} stocks from CSV`);

    // Insert in batches of 500
    const batchSize = 500;
    let inserted = 0;
    let errors = 0;

    for (let i = 0; i < stocks.length; i += batchSize) {
      const batch = stocks.slice(i, i + batchSize);
      
      const { error } = await supabase
        .from('stocks')
        .upsert(batch, { onConflict: 'symbol', ignoreDuplicates: true });
      
      if (error) {
        console.error(`Batch error at ${i}:`, error.message);
        errors++;
      } else {
        inserted += batch.length;
      }
    }

    console.log(`Import complete: ${inserted} stocks processed, ${errors} batch errors`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        parsed: stocks.length,
        inserted,
        errors
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Import error:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

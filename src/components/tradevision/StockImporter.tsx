import React, { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Icons } from './Icons';

const StockImporter: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState<string>('');
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (file: File) => {
    setIsImporting(true);
    setProgress('Reading file...');
    setResult(null);

    try {
      const text = await file.text();
      setProgress('Sending to server...');

      const { data, error } = await supabase.functions.invoke('import-stocks', {
        body: { csvData: text }
      });

      if (error) throw error;

      setResult({
        success: true,
        message: `Successfully imported ${data.parsed} stocks (${data.inserted} processed, ${data.errors} errors)`
      });
      onComplete?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setResult({ success: false, message });
    } finally {
      setIsImporting(false);
      setProgress('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImport(file);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-[#1e222d] rounded-xl border border-[#e0e3eb] dark:border-[#2a2e39]">
      <h3 className="text-lg font-bold text-[#131722] dark:text-[#e0e3eb] mb-4">Import Stocks CSV</h3>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        className="flex items-center gap-2 bg-[#2962ff] text-white font-medium px-4 py-2 rounded-lg hover:bg-[#1e53e5] transition-colors disabled:opacity-50"
      >
        {isImporting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {progress}
          </>
        ) : (
          <>
            <Icons.Plus className="w-4 h-4" />
            Select CSV File
          </>
        )}
      </button>

      {result && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${
          result.success 
            ? 'bg-[#00bfa5]/10 text-[#00bfa5] border border-[#00bfa5]/30' 
            : 'bg-[#f23645]/10 text-[#f23645] border border-[#f23645]/30'
        }`}>
          {result.message}
        </div>
      )}
    </div>
  );
};

export default StockImporter;

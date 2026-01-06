import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Icons } from './Icons';

interface Stock {
  id: number;
  symbol: string;
  company_name: string;
}

interface StockSearchProps {
  onSelect?: (stock: Stock) => void;
  placeholder?: string;
  className?: string;
}

const StockSearch: React.FC<StockSearchProps> = ({ 
  onSelect, 
  placeholder = "Search markets, news, or symbols...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Stock[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchStocks = async () => {
      if (query.length < 1) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('stocks')
          .select('id, symbol, company_name')
          .or(`symbol.ilike.%${query}%,company_name.ilike.%${query}%`)
          .limit(10);

        if (error) throw error;
        setResults(data || []);
        setIsOpen(true);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchStocks, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelect = (stock: Stock) => {
    setQuery(stock.symbol);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSelect?.(stock);
  };

  return (
    <div className={`relative ${className}`}>
      <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#787b86]" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedIndex(-1);
        }}
        onFocus={() => query.length >= 1 && results.length > 0 && setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-[#f0f3fa] dark:bg-[#1e222d] border border-transparent focus:bg-white dark:focus:bg-[#2a2e39] focus:border-[#2962ff] rounded-md pl-10 pr-4 py-1.5 text-sm transition-all outline-none text-[#131722] dark:text-[#d1d4dc] placeholder-[#787b86]"
      />
      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-[#2962ff] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto"
        >
          {results.map((stock, index) => (
            <div
              key={stock.id}
              onClick={() => handleSelect(stock)}
              className={`px-4 py-3 cursor-pointer flex items-center gap-3 border-b border-[#e0e3eb] dark:border-[#2a2e39] last:border-0 transition-colors
                ${index === selectedIndex 
                  ? 'bg-[#2962ff]/10 dark:bg-[#2962ff]/20' 
                  : 'hover:bg-[#f0f3fa] dark:hover:bg-[#2a2e39]'}`}
            >
              <div className="w-8 h-8 bg-[#2962ff] rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0">
                {stock.symbol.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-[#131722] dark:text-[#d1d4dc]">
                  {stock.symbol}
                </div>
                <div className="text-xs text-[#787b86] truncate">
                  {stock.company_name}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && query.length >= 1 && results.length === 0 && !loading && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1e222d] border border-[#e0e3eb] dark:border-[#2a2e39] rounded-lg shadow-lg z-50 p-4 text-center text-sm text-[#787b86]"
        >
          No stocks found for "{query}"
        </div>
      )}
    </div>
  );
};

export default StockSearch;

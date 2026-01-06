import React from 'react';
import StockImporter from './StockImporter';
import { Icons } from './Icons';

const SettingsView: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f8f9fd] dark:bg-[#131722] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#131722] dark:text-[#e0e3eb] mb-6">Settings</h1>

        <div className="space-y-6">
          {/* Stock Import Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Icons.FileText className="w-5 h-5 text-[#2962ff]" />
              <h2 className="text-lg font-semibold text-[#131722] dark:text-[#d1d4dc]">Data Management</h2>
            </div>
            <StockImporter onComplete={() => {
              // Could refresh stock count or show notification
            }} />
          </section>

          {/* More settings sections can be added here */}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;

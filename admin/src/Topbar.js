import React from 'react';
import brandLogo from './assets/WhatsApp_Image_2026-06-18_at_5.37.30_PM-removebg-preview.png';

export default function Topbar({ activeTab }) {
  return (
    <header className="bg-white border-b border-neutral-200/60 px-8 py-5 flex items-center justify-between shrink-0">
      {/* Header Title */}
      <div>
        <h1 className="font-headline-lg text-2xl text-[#281A05] tracking-tight font-bold capitalize flex items-center gap-2">
          {activeTab === 'dashboard' && 'Overview'}
        </h1>
      </div>

      {/* Profile & notifications */}
      <div className="flex items-center space-x-6">
        {/* Profile badge */}
        <div className="flex items-center space-x-2 border border-neutral-200/80 px-3 py-1.5 rounded-md hover:bg-neutral-50 cursor-pointer transition-all bg-transparent select-none">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-transparent">
            <img src={brandLogo} alt="Admin User Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xs font-semibold text-neutral-700">Admin User</span>
        </div>

      </div>
    </header>
  );
}
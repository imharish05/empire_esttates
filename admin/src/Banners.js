import React from 'react';

export default function Banners({ banners, onNewBanner, onEditBanner, onDeleteBanner, onToggleActive }) {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-5">
        <span className="material-symbols-outlined text-[16px]">home</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="font-semibold text-neutral-800">Banners</span>
      </div>

      {/* Add Banner Button Bar */}
      <div className="flex justify-start px-1 mb-2">
        <button
          onClick={onNewBanner}
          className="flex items-center space-x-1.5 bg-[#d4af37] hover:bg-[#b8960b] text-white px-5 py-2 rounded text-sm font-semibold transition-all shadow-sm select-none"
        >
          <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
          <span>Add Banner</span>
        </button>
      </div>

      {/* Banner Table */}
      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-700">
              <th className="py-3 px-5 font-bold text-neutral-800 text-sm">Banner</th>
              <th className="py-3 px-5 font-bold text-neutral-800 text-sm">Placement</th>
              <th className="py-3 px-5 font-bold text-neutral-800 text-sm">CTA</th>
              <th className="py-3 px-5 font-bold text-neutral-800 text-sm">Status</th>
              <th className="py-3 px-5 font-bold text-neutral-800 text-sm text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {banners.filter(b => b && (b.title || b.image)).map((banner, index) => (
              <tr key={banner.id || index} className="hover:bg-neutral-50/50 transition-colors align-middle">

                {/* Banner thumbnail + title */}
                <td className="py-4 px-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-10 rounded overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                      {banner.image ? (
                        <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px] text-neutral-300">image</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-neutral-900 text-sm">{banner.title}</p>
                      {banner.subtitle && (
                        <p className="text-[10px] text-neutral-400 mt-0.5 max-w-xs truncate">{banner.subtitle}</p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Placement */}
                <td className="py-4 px-5 text-neutral-500 font-semibold">
                  {banner.placement || 'General'}
                </td>

                {/* CTA text */}
                <td className="py-4 px-5 text-neutral-500">
                  {banner.ctaText ? (
                    <span className="inline-flex items-center space-x-1 bg-neutral-50 border border-neutral-200 px-2 py-0.5 rounded text-[10px] font-semibold text-neutral-600">
                      <span className="material-symbols-outlined text-[11px]">link</span>
                      <span>{banner.ctaText}</span>
                    </span>
                  ) : (
                    <span className="text-neutral-300">—</span>
                  )}
                </td>

                {/* Status toggle */}
                <td className="py-4 px-5">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onToggleActive(banner.id)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                        banner.active ? 'bg-[#d4af37]' : 'bg-neutral-300'
                      }`}
                      title={banner.active ? 'Hide Banner' : 'Publish Banner'}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                          banner.active ? 'translate-x-4' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className={`text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-sm border select-none ${
                      banner.active
                        ? 'bg-[#fdfbf7] text-[#d4af37] border-[#d4af37]/20'
                        : 'bg-neutral-50 text-neutral-500 border-neutral-200'
                    }`}>
                      {banner.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="py-4 px-5">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => onEditBanner(banner)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-[#d4af37] hover:bg-[#b8960b] text-white transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button
                      onClick={() => onDeleteBanner(banner.id)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </td>

              </tr>
            ))}

            {banners.length === 0 && (
              <tr>
                <td colSpan="5" className="py-12 text-center text-neutral-400">
                  No banners found. Click "Add Banner" to create one.
                </td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </div>
  );
}

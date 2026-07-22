import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ── Website origin (NOT admin origin) ──
// Set REACT_APP_SITE_URL in .env for production (e.g. https://empireesttates.com)
const SITE_DOMAIN = process.env.REACT_APP_SITE_URL || 'http://localhost:3000';

// Page options — clean paths matching Markup.js routes (no /react prefix)
const PAGE_OPTIONS = [
  { label: 'Home',              path: '/' },
  { label: 'About Us',          path: '/about-us' },
  { label: 'All Projects',      path: '/projects' },
  { label: 'Ongoing Projects',  path: '/ongoing-projects' },
  { label: 'Layouts',           path: '/layouts' },
  { label: 'Elevation',         path: '/elevation' },
  { label: 'Blogs',             path: '/blogs' },
  { label: 'Services Details',  path: '/services-details' },
  { label: 'Contact Us',        path: '/contact-us' },
];

const EMPTY_FORM = {
  page: '',
  pageUrl: '',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
};

export default function MetaTags() {
  const [metaList, setMetaList]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem]   = useState(null);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState('');
  const [serviceCategories, setServiceCategories] = useState([]);

  useEffect(() => { 
    fetchMeta(); 
    fetchServiceCategories();
  }, []);

  const fetchServiceCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/services`);
      if (res.ok) {
        const data = await res.json();
        const serviceItems = data.map(srv => ({
          label: `Service: ${srv.title || srv.service || srv.category || 'Unnamed'}`,
          url: `/services-details/${srv.slug || (srv.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
        }));
        setServiceCategories(serviceItems.map(s => ({ label: s.label, url: `${SITE_DOMAIN}${s.url}` })));
      }
    } catch (err) {
      console.error('Error fetching service categories:', err);
    }
  };

  const allPageOptions = [
    ...PAGE_OPTIONS.map(p => ({ label: p.label, url: `${SITE_DOMAIN}${p.path}` })),
    ...serviceCategories
  ];

  const fetchMeta = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/meta`);
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      setMetaList(data);
    } catch {
      const cached = localStorage.getItem('ee_meta_list_v1');
      if (cached) setMetaList(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (metaList.length > 0) {
      try {
        localStorage.setItem('ee_meta_list_v1', JSON.stringify(metaList));
      } catch (e) {
        console.warn("Failed to save ee_meta_list_v1 to localStorage:", e);
      }
    }
  }, [metaList]);

  const openAdd = () => {
    setEditItem(null);
    setForm(EMPTY_FORM);
    setError('');
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      page: item.page,
      pageUrl: item.pageUrl,
      metaTitle: item.metaTitle,
      metaDescription: item.metaDescription,
      metaKeywords: item.metaKeywords || '',
    });
    setError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
    setForm(EMPTY_FORM);
    setError('');
  };

  const handlePageSelect = (e) => {
    const label = e.target.value;
    const found = allPageOptions.find(p => p.label === label);
    setForm(prev => ({
      ...prev,
      page: label,
      pageUrl: found ? found.url : '',
    }));
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.page || !form.metaTitle || !form.metaDescription || !form.metaKeywords) {
      setError('Page, Meta Title, Meta Description and Meta Keywords are required.');
      return;
    }

    if (!editItem) {
      const isDuplicate = metaList.some(m => m.page === form.page);
      if (isDuplicate) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'This page already has a meta tag. Please select another page.',
          confirmButtonColor: '#8b5cf6'
        });
        return;
      }
    }
    setSaving(true);
    setError('');
    try {
      if (editItem) {
        const res = await fetch(`${API_URL}/meta/${editItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        setMetaList(prev => prev.map(m => m.id === editItem.id ? updated : m));
        Swal.fire({ icon: 'success', title: 'Updated!', text: 'Meta tag updated successfully.', timer: 1500, showConfirmButton: false });
      } else {
        const res = await fetch(`${API_URL}/meta`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        setMetaList(prev => [...prev, created]);
        Swal.fire({ icon: 'success', title: 'Added!', text: 'Meta tag created successfully.', timer: 1500, showConfirmButton: false });
      }
      closeModal();
    } catch {
      if (editItem) {
        setMetaList(prev => prev.map(m => m.id === editItem.id ? { ...m, ...form } : m));
      } else {
        setMetaList(prev => [...prev, { id: Date.now(), ...form }]);
      }
      closeModal();
      Swal.fire({ icon: 'success', title: 'Saved Locally', text: 'Meta tag saved locally.', timer: 1500, showConfirmButton: false });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Meta Tag?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      confirmButtonText: 'Yes, Delete',
    });
    if (!result.isConfirmed) return;
    try {
      await fetch(`${API_URL}/meta/${id}`, { method: 'DELETE' });
    } catch {}
    setMetaList(prev => prev.filter(m => m.id !== id));
    Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Meta tag deleted successfully.', timer: 1500, showConfirmButton: false });
  };

  return (
    <div className="space-y-4">

      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-5">
        <span className="material-symbols-outlined text-[16px]">home</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="font-semibold text-neutral-800">Meta Tags</span>
      </div>

      <div className="mb-5">
        <button
          onClick={openAdd}
          className="flex items-center space-x-1.5 bg-[#d4af37] hover:bg-[#b8960b] text-white px-5 py-2 rounded text-sm font-semibold transition-colors shadow-sm select-none"
        >
          <span className="material-symbols-outlined text-[18px]">label</span>
          <span>Add Meta Tag</span>
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-700">
                <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-16">S.No</th>
                <th className="py-3 px-4 font-bold text-neutral-800 text-sm">Page URL</th>
                <th className="py-3 px-4 font-bold text-neutral-800 text-sm">Meta Title</th>
                <th className="py-3 px-4 font-bold text-neutral-800 text-sm">Description</th>
                <th className="py-3 px-4 font-bold text-neutral-800 text-sm text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-neutral-400">Loading...</td>
                </tr>
              ) : metaList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-neutral-400">
                    No meta tags found. Click "Add Meta Tag" to create one.
                  </td>
                </tr>
              ) : (
                metaList.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-4 px-4 text-neutral-600">{idx + 1}</td>
                    <td className="py-4 px-4 text-neutral-700 max-w-xs">
                      {(() => {
                        const fullUrl = item.pageUrl?.startsWith('http')
                          ? item.pageUrl
                          : `${SITE_DOMAIN}${item.pageUrl}`;
                        return (
                          <a
                            href={fullUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate block text-blue-600 hover:underline text-xs"
                            title={fullUrl}
                          >{fullUrl}</a>
                        );
                      })()}
                    </td>
                    <td className="py-4 px-4 text-neutral-800 max-w-sm">
                      <span className="truncate block" title={item.metaTitle}>{item.metaTitle}</span>
                    </td>
                    <td className="py-4 px-4 text-neutral-600 max-w-xs">
                      <span className="truncate block" title={item.metaDescription}>{item.metaDescription}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => openEdit(item)} className="w-8 h-8 flex items-center justify-center rounded bg-[#d4af37] hover:bg-[#b8960b] text-white transition-colors" title="Edit">
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="w-8 h-8 flex items-center justify-center rounded bg-red-500 hover:bg-red-600 text-white transition-colors" title="Delete">
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6 space-y-5">
            <div className="text-center pt-2">
              <h2 className="text-xl font-bold text-neutral-800">
                {editItem ? 'Edit Meta Tag' : 'Add New Meta Tag'}
              </h2>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded px-3 py-2">{error}</div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                  Page <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.page}
                  onChange={handlePageSelect}
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                >
                  <option value="">-- Select Page --</option>
                  {allPageOptions.map(p => (
                    <option key={p.label} value={p.label}>{p.label}</option>
                  ))}
                </select>
                {form.pageUrl && (
                  <p className="text-[11px] text-neutral-400 mt-1">{form.pageUrl}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                  Meta Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.metaTitle}
                  onChange={e => handleChange('metaTitle', e.target.value)}
                  placeholder="Enter meta title..."
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                  Meta Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.metaDescription}
                  onChange={e => handleChange('metaDescription', e.target.value)}
                  placeholder="Enter meta description..."
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#d4af37] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                  Meta Keywords <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.metaKeywords}
                  onChange={e => handleChange('metaKeywords', e.target.value)}
                  placeholder="keyword1, keyword2, keyword3..."
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm text-neutral-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                />
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-4 border-t border-neutral-100">
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-5 py-2 bg-[#d4af37] hover:bg-[#b8960b] text-white rounded text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : editItem ? 'Update Meta Tag' : 'Add Meta Tag'}
              </button>
              <button
                onClick={closeModal}
                className="px-5 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
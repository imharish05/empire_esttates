import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function ProjectCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendOk, setBackendOk] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchCategories(); }, []);

  // Load from localStorage
  const loadFromLocal = () => {
    try {
      const saved = localStorage.getItem('ee_project_categories');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  };

  const saveToLocal = (list) => {
    try {
      localStorage.setItem('ee_project_categories', JSON.stringify(list));
    } catch (e) {
      console.warn("Failed to save ee_project_categories to localStorage:", e);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/project-categories`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setCategories(data);
      saveToLocal(data);
      setBackendOk(true);
    } catch (err) {
      console.warn('Backend unavailable, using localStorage:', err.message);
      setBackendOk(false);
      const local = loadFromLocal();
      setCategories(local);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditItem(null);
    setName('');
    setError('');
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setName(item.name);
    setError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditItem(null);
    setName('');
    setError('');
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }

    // Check duplicate in local list
    const duplicate = categories.find(c =>
      c.name.toLowerCase() === name.trim().toLowerCase() &&
      (!editItem || c.id !== editItem.id)
    );
    if (duplicate) {
      setError('This category already exists.');
      return;
    }

    setSaving(true);
    setError('');

    if (backendOk) {
      // Try backend first
      try {
        if (editItem) {
          const res = await fetch(`${API_URL}/project-categories/${editItem.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name.trim() }),
          });
          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || `Server error ${res.status}`);
          }
          const updated = await res.json();
          const newList = categories.map(c => c.id === editItem.id ? updated : c);
          setCategories(newList);
          saveToLocal(newList);
        } else {
          const res = await fetch(`${API_URL}/project-categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name.trim() }),
          });
          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || `Server error ${res.status}`);
          }
          const created = await res.json();
          const newList = [...categories, created];
          setCategories(newList);
          saveToLocal(newList);
        }
        closeModal();
        Swal.fire({ icon: 'success', title: 'Saved!', timer: 1200, showConfirmButton: false });
      } catch (err) {
        // Backend failed — fallback to local
        console.warn('Backend save failed, saving locally:', err.message);
        localSave();
      }
    } else {
      // No backend — save locally
      localSave();
    }

    setSaving(false);

    function localSave() {
      if (editItem) {
        const newList = categories.map(c =>
          c.id === editItem.id ? { ...c, name: name.trim() } : c
        );
        setCategories(newList);
        saveToLocal(newList);
      } else {
        const newItem = { id: Date.now(), name: name.trim() };
        const newList = [...categories, newItem];
        setCategories(newList);
        saveToLocal(newList);
      }
      closeModal();
      Swal.fire({ icon: 'success', title: 'Saved (Local)!', timer: 1200, showConfirmButton: false });
    }
  };

  const handleDelete = async (id, catName) => {
    const result = await Swal.fire({
      title: `Delete "${catName}"?`,
      text: 'This category will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      confirmButtonText: 'Yes, Delete',
    });

    if (!result.isConfirmed) return;

    try {
      if (backendOk) {
        await fetch(`${API_URL}/project-categories/${id}`, { method: 'DELETE' });
      }
    } catch (err) {
      console.warn('Backend delete failed:', err.message);
    }

    const newList = categories.filter(c => c.id !== id);
    setCategories(newList);
    saveToLocal(newList);
    Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1000, showConfirmButton: false });
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-5">
        <span className="material-symbols-outlined text-[16px]">home</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="font-semibold text-neutral-800">Project Categories</span>
      </div>

      {/* Backend status warning */}
      {!backendOk && (
        <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded px-4 py-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">warning</span>
          Backend offline — running in local mode. Add <code className="bg-amber-100 px-1 rounded">ProjectCategoryRoutes</code> to your server.js and restart.
        </div>
      )}

      {/* Add Button */}
      <div className="mb-5">
        <button
          onClick={openAdd}
          className="flex items-center space-x-1.5 bg-[#d4af37] hover:bg-[#b8960b] text-white px-5 py-2 rounded text-sm font-semibold transition-colors shadow-sm select-none"
        >
          <span className="material-symbols-outlined text-[18px]">add_box</span>
          <span>Add Category</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-700">
              <th className="py-3 px-4 font-bold w-16">S.No.</th>
              <th className="py-3 px-4 font-bold text-center">Category Name</th>
              <th className="py-3 px-4 font-bold w-32">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {loading ? (
              <tr><td colSpan="3" className="py-12 text-center text-neutral-400">Loading...</td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan="3" className="py-12 text-center text-neutral-400">No categories yet. Click "Add Category" to create one.</td></tr>
            ) : categories.map((cat, idx) => (
              <tr key={cat.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-3 px-4 text-neutral-500">{idx + 1}</td>
                <td className="py-3 px-4 font-medium text-neutral-800 text-center">{cat.name}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(cat)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-[#d4af37] hover:bg-[#b8960b] text-white transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 space-y-5">
            {/* Header */}
            <div className="text-center pt-2">
              <h2 className="text-xl font-bold text-neutral-800">
                {editItem ? 'Edit Category' : 'Add New Category'}
              </h2>
            </div>

            {/* Body */}
            <div className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded px-3 py-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setError(''); }}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSave(); } }}
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm text-neutral-900 bg-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                  placeholder="e.g. Living Room"
                  autoFocus
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center space-x-3 pt-4 border-t border-neutral-100">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-[#d4af37] hover:bg-[#b8960b] text-white rounded text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : editItem ? 'Update Category' : 'Add Category'}
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
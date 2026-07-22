import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const EMPTY_FORM = {
  category: '',
  image: '',
  imagePreview: '',
};

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function ProjectsPage({ filter = 'all' }) {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/project-categories`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCategories(data);
    } catch {
      setCategories([
        { id: 1, name: 'Living Room' },
        { id: 2, name: 'Bedroom' },
        { id: 3, name: 'Kitchen' },
        { id: 4, name: 'Bathroom' },
        { id: 5, name: 'Office' },
      ]);
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/projects`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setProjects(data);
    } catch {
      const cached = localStorage.getItem('ee_projects_v3');
      if (cached) setProjects(JSON.parse(cached));
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({
      category: filter === 'ongoing' ? 'Ongoing Project' : '',
      image: '',
      imagePreview: '',
    });
    setError('');
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      category: item.category || '',
      image: item.image || '',
      imagePreview: item.image || '',
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((prev) => ({ ...prev, image: ev.target.result, imagePreview: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) { setError('Category is required.'); return; }
    if (!form.imagePreview) { setError('Project image is required.'); return; }

    setSaving(true);
    setError('');

    // Name/slug are derived automatically since the form only collects
    // Category + Image (per the simplified Add Project modal).
    const baseName = editItem?.name || form.category;
    const payload = {
      name: baseName,
      category: form.category,
      slug: editItem?.slug || `${slugify(form.category)}-${Date.now()}`,
      image: form.imagePreview,
    };

    try {
      if (editItem) {
        const res = await fetch(`${API_URL}/projects/${editItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === editItem.id ? updated : p)));
      } else {
        const res = await fetch(`${API_URL}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        setProjects((prev) => [created, ...prev]);
      }
      closeModal();
      Swal.fire({ icon: 'success', title: 'Saved', text: 'Project saved successfully.', timer: 1500, showConfirmButton: false });
    } catch {
      const localItem = { id: editItem ? editItem.id : Date.now(), ...payload };
      if (editItem) {
        setProjects((prev) => prev.map((p) => (p.id === editItem.id ? localItem : p)));
      } else {
        setProjects((prev) => [localItem, ...prev]);
      }
      closeModal();
      Swal.fire({ icon: 'success', title: 'Saved (Local)', text: 'Project saved locally.', timer: 1500, showConfirmButton: false });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Project?',
      text: 'This project will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      confirmButtonText: 'Yes, Delete',
    });
    if (result.isConfirmed) {
      try {
        await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
      } catch {}
      setProjects((prev) => prev.filter((p) => p.id !== id));
      Swal.fire({ icon: 'success', title: 'Deleted', text: 'Project has been deleted.', timer: 1500, showConfirmButton: false });
    }
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-5">
        <span className="material-symbols-outlined text-[16px]">home</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="font-semibold text-neutral-800">Projects</span>
      </div>

      {/* Add Button */}
      <div className="mb-5">
        <button
          onClick={openAdd}
          className="flex items-center space-x-1.5 bg-[#d4af37] hover:bg-[#b8960b] text-white px-5 py-2 rounded text-sm font-semibold transition-colors shadow-sm select-none"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Add Project</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-700">
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-16">S.No.</th>
              {filter !== 'ongoing' && <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-48">Category</th>}
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-40">Image</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-28">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {loading ? (
              <tr><td colSpan="4" className="py-12 text-center text-neutral-400">Loading...</td></tr>
            ) : (() => {
              const displayProjects = projects.filter(p => {
                const isOngoing = (p.category || '').toLowerCase() === 'ongoing project';
                if (filter === 'ongoing') return isOngoing;
                return !isOngoing; // filter === 'all'
              });
              
              if (displayProjects.length === 0) {
                return <tr><td colSpan="4" className="py-12 text-center text-neutral-400">No {filter === 'ongoing' ? 'ongoing ' : ''}projects found.</td></tr>;
              }
              
              return displayProjects.map((proj, idx) => (
                <tr key={proj.id} className="hover:bg-neutral-50 transition-colors align-middle">
                <td className="py-4 px-4 text-neutral-600 align-middle">{idx + 1}</td>
                {filter !== 'ongoing' && (
                  <td className="py-4 px-4 align-middle">
                    <div className="font-medium text-neutral-800">{proj.category || '—'}</div>
                  </td>
                )}
                <td className="py-4 px-4 align-middle">
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.category}
                      className="w-28 h-20 object-cover rounded border border-neutral-200"
                    />
                  ) : (
                    <div className="w-28 h-20 bg-neutral-100 rounded border border-neutral-200 flex items-center justify-center text-neutral-400 text-xs">
                      No Image
                    </div>
                  )}
                </td>

                <td className="py-4 px-4 align-middle">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(proj)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-[#d4af37] hover:bg-[#b8960b] text-white transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </td>
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>

      {/* Modal — Category + Image only, matching the reference screenshot */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 p-6 space-y-5">
            <div className="text-center pt-2">
              <h2 className="text-xl font-bold text-neutral-800">
                {editItem ? 'Edit Project' : 'Add New Project'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded px-3 py-2">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {filter !== 'ongoing' && (
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Category <span className="text-red-500">*</span></label>
                      <select
                        value={form.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full border border-neutral-300 rounded px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#d4af37] bg-white"
                      >
                        <option value="" className="text-neutral-900 bg-white">-- Select Category --</option>
                        <option value="Ongoing Project" className="text-neutral-900 bg-white font-semibold text-[#c8902a]">Ongoing Project</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.name} className="text-neutral-900 bg-white">{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className={filter === 'ongoing' ? 'col-span-2' : ''}>
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Image <span className="text-red-500">*</span></label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full border border-neutral-300 rounded px-3 py-2 text-sm bg-white file:mr-3 file:border-0 file:bg-neutral-100 file:px-3 file:py-1 file:rounded file:text-sm"
                    />
                  </div>
                </div>

                {form.imagePreview && (
                  <div className="mt-4">
                    <img src={form.imagePreview} alt="preview" className="w-full h-40 object-cover rounded border border-neutral-200" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center space-x-3 pt-4 border-t border-neutral-100">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-[#d4af37] hover:bg-[#b8960b] text-white rounded text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editItem ? 'Update Project' : 'Add Project'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
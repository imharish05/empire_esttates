import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function LayoutsPage() {
  const [layouts, setLayouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editLayout, setEditLayout] = useState(null); // null = add mode, object = edit mode
  const [formData, setFormData] = useState({ title: '', area: '', image: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLayouts();
  }, []);

  const fetchLayouts = async () => {
    try {
      const res = await fetch(`${API_URL}/layouts`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setLayouts(data);
    } catch (err) {
      console.error('Error fetching layouts', err);
    }
  };

  const openAddModal = () => {
    setEditLayout(null);
    setFormData({ title: '', area: '', image: null });
    setShowModal(true);
  };

  const openEditModal = (layout) => {
    setEditLayout(layout);
    setFormData({ title: layout.title, area: layout.area, image: layout.image });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditLayout(null);
    setFormData({ title: '', area: '', image: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData(prev => ({ ...prev, [field]: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isEdit = !!editLayout;
    const url = isEdit ? `${API_URL}/layouts/${editLayout.id}` : `${API_URL}/layouts`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save');
      }
      closeModal();
      fetchLayouts();
      Swal.fire({
        icon: 'success',
        title: isEdit ? 'Updated' : 'Saved',
        text: isEdit ? 'Layout updated successfully.' : 'Layout saved successfully.',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error('Error saving layout', err);
      Swal.fire({ icon: 'error', title: 'Error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Layout?',
      text: 'This layout will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      confirmButtonText: 'Yes, Delete',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/layouts/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
        fetchLayouts();
        Swal.fire({ icon: 'success', title: 'Deleted', text: 'Layout has been deleted.', timer: 1500, showConfirmButton: false });
      } catch (err) {
        console.error('Error deleting layout', err);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete layout' });
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-5">
        <span className="material-symbols-outlined text-[16px]">home</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="font-semibold text-neutral-800">Layouts</span>
      </div>

      {/* Add Button */}
      <div className="mb-5">
        <button
          onClick={openAddModal}
          className="flex items-center space-x-1.5 bg-[#d4af37] hover:bg-[#b8960b] text-white px-5 py-2 rounded text-sm font-semibold transition-colors shadow-sm select-none"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Add Layout</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-700">
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-16">S.No.</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm">Image</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-1/3">Title</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-36">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {layouts.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-neutral-400">
                  No layouts found. Add one to get started.
                </td>
              </tr>
            ) : (
              layouts.map((layout, idx) => (
                <tr key={layout.id} className="hover:bg-neutral-50 transition-colors align-middle">
                  <td className="py-4 px-4 text-neutral-600 align-middle">{idx + 1}</td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center gap-2">
                      {layout.image ? (
                        <img
                          src={layout.image}
                          alt={layout.title}
                          className="w-28 h-20 object-cover rounded border border-neutral-200"
                        />
                      ) : (
                        <div className="w-28 h-20 bg-neutral-100 rounded border border-neutral-200 flex items-center justify-center text-neutral-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="font-medium text-neutral-800">{layout.title}</div>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center gap-2">
                      {/* Edit Button */}
                      <button
                        onClick={() => openEditModal(layout)}
                        className="w-8 h-8 flex items-center justify-center rounded bg-[#d4af37] hover:bg-[#b8960b] text-white transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(layout.id)}
                        className="w-8 h-8 flex items-center justify-center rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
                        title="Delete"
                      >
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

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 p-6 space-y-5">
            <div className="text-center pt-2">
              <h2 className="text-xl font-bold text-neutral-800">
                {editLayout ? 'Edit Layout' : 'Add New Layout'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Title <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full border border-neutral-300 rounded px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#d4af37] bg-white"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                      Layout Image {editLayout ? '(leave blank to keep current)' : <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'image')}
                      className="w-full border border-neutral-300 rounded px-3 py-2 text-sm bg-white file:mr-3 file:border-0 file:bg-neutral-100 file:px-3 file:py-1 file:rounded file:text-sm"
                      required={!editLayout}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  {formData.image && (
                    <div className="mt-4 flex-1">
                      <p className="text-xs text-neutral-500 mb-1">Image Preview:</p>
                      <img src={formData.image} alt="preview" className="w-full h-40 object-cover rounded border border-neutral-200" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 pt-4 border-t border-neutral-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#d4af37] hover:bg-[#b8960b] text-white rounded text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editLayout ? 'Update Layout' : 'Add Layout'}
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

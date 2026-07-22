import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function ElevationsPage() {
  const [elevations, setElevations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editElevation, setEditElevation] = useState(null);
  const [formData, setFormData] = useState({ title: '', location: '', clientName: '', description: '', image: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchElevations(); }, []);

  const fetchElevations = async () => {
    try {
      const res = await fetch(`${API_URL}/elevations`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setElevations(data);
    } catch (err) { console.error('Error fetching elevations', err); }
  };

  const openAddModal = () => {
    setEditElevation(null);
    setFormData({ title: '', location: '', clientName: '', description: '', image: null });
    setShowModal(true);
  };

  const openEditModal = (el) => {
    setEditElevation(el);
    setFormData({ title: el.title, location: el.location, clientName: el.clientName || '', description: el.description, image: el.image });
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setFormData(prev => ({ ...prev, image: ev.target.result })); };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const isEdit = !!editElevation;
    const url = isEdit ? `${API_URL}/elevations/${editElevation.id}` : `${API_URL}/elevations`;
    const method = isEdit ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!res.ok) throw new Error('Failed to save');
      closeModal();
      fetchElevations();
      Swal.fire({ icon: 'success', title: isEdit ? 'Updated' : 'Saved', text: 'Elevation saved successfully.', timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message });
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({ title: 'Delete Elevation?', text: 'This will be permanently deleted.', icon: 'warning', showCancelButton: true, confirmButtonColor: '#e74c3c', confirmButtonText: 'Yes, Delete' });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/elevations/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
        fetchElevations();
        Swal.fire({ icon: 'success', title: 'Deleted', timer: 1500, showConfirmButton: false });
      } catch (err) { Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete' }); }
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-5">
        <button onClick={openAddModal} className="flex items-center space-x-1.5 bg-[#d4af37] hover:bg-[#b8960b] text-white px-5 py-2 rounded text-sm font-semibold">
          <span>Add Elevation</span>
        </button>
      </div>
      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="bg-neutral-50 text-neutral-600 border-b border-neutral-200 text-sm">
            <th className="p-4 font-semibold w-16">S.No.</th>
            <th className="p-4 font-semibold">Image</th>
            <th className="p-4 font-semibold">Title</th>
            <th className="p-4 font-semibold">Location</th>
            <th className="p-4 font-semibold">Client Name</th>
            <th className="p-4 font-semibold text-center w-32">Action</th>
          </tr></thead>
          <tbody className="divide-y divide-neutral-100 text-sm text-neutral-700">
            {elevations.map((el, i) => (
              <tr key={el.id} className="hover:bg-neutral-50/50">
                <td className="p-4">{i + 1}</td>
                <td className="p-4">{el.image ? <img src={el.image} alt="elevation" className="w-16 h-12 object-cover rounded" /> : 'No Image'}</td>
                <td className="p-4">{el.title}</td>
                <td className="p-4">{el.location}</td>
                <td className="p-4">{el.clientName || '-'}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => openEditModal(el)} className="p-1.5 bg-[#d4af37] hover:bg-[#b8960b] text-white rounded"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                    <button onClick={() => handleDelete(el.id)} className="p-1.5 bg-[#ff4d4d] hover:bg-[#ff3333] text-white rounded"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 p-6 space-y-5">
            <div className="text-center pt-2">
              <h2 className="text-xl font-bold text-neutral-800">
                {editElevation ? 'Edit Elevation' : 'Add New Elevation'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
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
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Location <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#d4af37] bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Client Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#d4af37] bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#d4af37] bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                  Elevation Image {editElevation ? '(leave blank to keep current)' : <span className="text-red-500">*</span>}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-neutral-300 rounded px-3 py-2 text-sm bg-white file:mr-3 file:border-0 file:bg-neutral-100 file:px-3 file:py-1 file:rounded file:text-sm"
                  required={!editElevation}
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#d4af37] hover:bg-[#b8960b] rounded transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editElevation ? 'Update Elevation' : 'Add Elevation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function TestimonialModal({ testimonial, onClose, onSave }) {
  const [form, setForm] = useState({
    author: testimonial?.author || '',
    designation: testimonial?.designation || 'Valued Client',
    content: testimonial?.content || '',
    title: testimonial?.title || '',
    tags: testimonial?.tags || '',
    order: testimonial?.order !== undefined ? testimonial.order : 0,
    active: testimonial?.active !== undefined ? testimonial.active : true,
    rating: testimonial?.rating !== undefined ? testimonial.rating : 5,
    avatar: testimonial?.avatar || '',
    date: testimonial?.date || '',
  });

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.author.trim()) {
      setError('Client Name is required');
      return;
    }
    if (!form.content.trim()) {
      setError('Testimonial Content is required');
      return;
    }

    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 p-6 space-y-4 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="text-center pt-2 border-b pb-3">
          <h2 className="text-xl font-bold text-neutral-800">
            {testimonial ? 'Edit Client Testimonial' : 'Add New Client Testimonial'}
          </h2>
          <p className="text-xs text-gray-500">Manage client quotes and testimonials shown on the website.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded px-3 py-2">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Author Name */}
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                Client Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                placeholder="e.g. Priya Dharshini"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
              />
            </div>

            {/* Designation / Role */}
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                Designation / Role
              </label>
              <input
                type="text"
                value={form.designation}
                onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
                placeholder="e.g. Villa Plot Owner, Homeowner"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
              />
            </div>
          </div>

          {/* Title / Headline */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
              Review Headline / Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g. 100% transparent documentation and excellent location choices."
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
            />
          </div>

          {/* Testimonial Content */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
              Testimonial Content <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="4"
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              placeholder="Enter full testimonial text..."
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tags */}
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                Tags / Badges (Comma-separated)
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                placeholder="e.g. CLEAR TITLE, LEGAL VERIFICATION"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
              />
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value, 10) || 0 }))}
                placeholder="0"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
              />
            </div>
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="active-check"
              checked={form.active}
              onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
              className="w-4 h-4 text-[#0284c7] rounded border-gray-300 focus:ring-[#0284c7]"
            />
            <label htmlFor="active-check" className="text-sm font-medium text-gray-700 cursor-pointer">
              Active / Published on Website
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-[#0284c7] hover:bg-[#0369a1] rounded-lg shadow-sm"
            >
              Save Testimonial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/testimonials`);
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      } else {
        console.error('Failed to fetch testimonials');
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async (formData) => {
    try {
      const isEdit = !!editingTestimonial;
      const url = isEdit
        ? `${API_URL}/testimonials/${editingTestimonial.id}`
        : `${API_URL}/testimonials`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: isEdit ? 'Testimonial Updated' : 'Testimonial Created',
          text: `Successfully ${isEdit ? 'updated' : 'added'} client testimonial!`,
          timer: 2000,
          showConfirmButton: false,
        });
        setShowModal(false);
        setEditingTestimonial(null);
        fetchTestimonials();
      } else {
        const err = await res.json();
        Swal.fire('Error', err.message || 'Failed to save testimonial', 'error');
      }
    } catch (err) {
      console.error('Error saving testimonial:', err);
      Swal.fire('Error', 'Server error occurred', 'error');
    }
  };

  const handleToggleActive = async (item) => {
    try {
      const res = await fetch(`${API_URL}/testimonials/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !item.active }),
      });
      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === item.id ? { ...t, active: !t.active } : t))
        );
      }
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Delete Testimonial?',
      text: `Are you sure you want to delete the testimonial from "${item.author}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/testimonials/${item.id}`, {
            method: 'DELETE',
          });
          if (res.ok) {
            Swal.fire('Deleted!', 'Testimonial has been deleted.', 'success');
            fetchTestimonials();
          } else {
            Swal.fire('Error', 'Failed to delete testimonial', 'error');
          }
        } catch (err) {
          console.error('Error deleting testimonial:', err);
          Swal.fire('Error', 'Server error occurred', 'error');
        }
      }
    });
  };

  const filtered = testimonials.filter((t) => {
    const matchesSearch =
      t.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.title && t.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.tags && t.tags.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterStatus === 'active') return matchesSearch && t.active;
    if (filterStatus === 'inactive') return matchesSearch && !t.active;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0284c7]">rate_review</span>
            Client Testimonials
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage client reviews and quotes displayed on the website.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingTestimonial(null);
            setShowModal(true);
          }}
          className="flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Testimonial
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search client, content, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
          >
            <option value="all">All Statuses ({testimonials.length})</option>
            <option value="active">Active Only ({testimonials.filter((t) => t.active).length})</option>
            <option value="inactive">Inactive Only ({testimonials.filter((t) => !t.active).length})</option>
          </select>
        </div>
      </div>

      {/* Testimonials List Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined animate-spin text-2xl text-[#0284c7]">sync</span>
            Loading testimonials...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <span className="material-symbols-outlined text-4xl text-gray-300 mb-2 block">format_quote</span>
            No client testimonials found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b">
                <tr>
                  <th className="py-3.5 px-4 text-center">Order</th>
                  <th className="py-3.5 px-4">Client Name & Role</th>
                  <th className="py-3.5 px-4">Testimonial Content</th>
                  <th className="py-3.5 px-4">Tags</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    {/* Order */}
                    <td className="py-4 px-4 text-center font-bold text-gray-500">
                      #{item.order}
                    </td>

                    {/* Client */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-900">{item.author}</div>
                      <div className="text-xs text-gray-500">{item.designation || 'Client'}</div>
                    </td>

                    {/* Testimonial Content & Title */}
                    <td className="py-4 px-4 max-w-sm">
                      {item.title && (
                        <div className="font-semibold text-gray-800 text-xs mb-1 line-clamp-1">
                          "{item.title}"
                        </div>
                      )}
                      <div className="text-xs text-gray-600 line-clamp-2">
                        {item.content}
                      </div>
                    </td>

                    {/* Tags */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags
                          ? item.tags.split(',').map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded border border-blue-200"
                              >
                                {tag.trim()}
                              </span>
                            ))
                          : <span className="text-gray-400 text-xs">-</span>}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(item)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                          item.active
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.active ? 'bg-emerald-500' : 'bg-gray-400'
                          }`}
                        />
                        {item.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditingTestimonial(item);
                            setShowModal(true);
                          }}
                          className="p-1.5 text-gray-500 hover:text-[#0284c7] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Testimonial"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Testimonial"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <TestimonialModal
          testimonial={editingTestimonial}
          onClose={() => {
            setShowModal(false);
            setEditingTestimonial(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

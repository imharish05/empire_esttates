import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const DEFAULT_CATEGORIES = [
  'General',
  'Plots & Layouts',
  'Legal & Approvals',
  'Financing & Loans',
  'Infrastructure',
  'Services'
];

function FaqModal({ faq, onClose, onSave }) {
  const [form, setForm] = useState({
    question: faq?.question || '',
    answer: faq?.answer || '',
    category: faq?.category || 'General',
    order: faq?.order !== undefined ? faq.order : 0,
    active: faq?.active !== undefined ? faq.active : true,
  });
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCat, setIsCustomCat] = useState(
    faq?.category && !DEFAULT_CATEGORIES.includes(faq.category)
  );
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.question.trim()) {
      setError('Question is required');
      return;
    }
    if (!form.answer.trim()) {
      setError('Answer is required');
      return;
    }

    const categoryToSave = isCustomCat
      ? (customCategory.trim() || 'General')
      : form.category;

    onSave({
      ...form,
      category: categoryToSave,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl mx-4 p-6 space-y-5 overflow-y-auto max-h-[90vh]">
        <div className="text-center pt-2">
          <h2 className="text-xl font-bold text-neutral-800">
            {faq ? 'Edit FAQ' : 'Add New FAQ'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {!isCustomCat ? (
                <select
                  value={form.category}
                  onChange={(e) => {
                    if (e.target.value === '__custom__') {
                      setIsCustomCat(true);
                    } else {
                      setForm((f) => ({ ...f, category: e.target.value }));
                    }
                  }}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left bg-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                >
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="__custom__">+ Add Custom Category...</option>
                </select>
              ) : (
                <div className="flex w-full gap-2">
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category name"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomCat(false)}
                    className="px-3 py-2 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 whitespace-nowrap"
                  >
                    Select Existing
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
              Question <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="3"
              value={form.question}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              placeholder="e.g., Are all plot layouts CMDA & RERA approved?"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
              Answer <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="5"
              value={form.answer}
              onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
              placeholder="Provide a detailed and clear response..."
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((f) => ({ ...f, order: e.target.value }))}
                placeholder="0"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              />
              <span className="text-[11px] text-gray-400">Lower numbers appear first</span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                Status
              </label>
              <label className="inline-flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                  className="w-4 h-4 text-[#d4af37] rounded focus:ring-[#d4af37]"
                />
                <span className="text-sm text-neutral-700 font-medium">Active (Visible on website)</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#d4af37] hover:bg-[#b8960b] text-white rounded text-sm font-semibold transition-colors shadow-sm"
            >
              {faq ? 'Update FAQ' : 'Save FAQ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/faqs`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setFaqs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (faqData) => {
    try {
      if (editingFaq) {
        // Update
        const res = await fetch(`${API_URL}/faqs/${editingFaq.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(faqData),
        });
        if (!res.ok) throw new Error('Failed to update FAQ');
        const updated = await res.json();
        setFaqs((prev) => prev.map((item) => (item.id === editingFaq.id ? updated : item)));
        Swal.fire({ icon: 'success', title: 'Updated!', text: 'FAQ has been updated.', timer: 1500, showConfirmButton: false });
      } else {
        // Create
        const res = await fetch(`${API_URL}/faqs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(faqData),
        });
        if (!res.ok) throw new Error('Failed to create FAQ');
        const created = await res.json();
        setFaqs((prev) => [created, ...prev]);
        Swal.fire({ icon: 'success', title: 'Added!', text: 'New FAQ added successfully.', timer: 1500, showConfirmButton: false });
      }
      setShowModal(false);
      setEditingFaq(null);
    } catch (error) {
      Swal.fire('Error', error.message || 'Action failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete FAQ?',
      text: 'This question and answer will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/faqs/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete');
        setFaqs((prev) => prev.filter((item) => item.id !== id));
        Swal.fire({ icon: 'success', title: 'Deleted', text: 'FAQ has been deleted.', timer: 1500, showConfirmButton: false });
      } catch (error) {
        Swal.fire('Error', 'Could not delete FAQ.', 'error');
      }
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const newActive = !currentStatus;
      setFaqs((prev) =>
        prev.map((f) => (f.id === id ? { ...f, active: newActive } : f))
      );
      await fetch(`${API_URL}/faqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: newActive }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const categoriesList = ['All', ...Array.from(new Set(faqs.map((f) => f.category).filter(Boolean)))];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || faq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <span className="material-symbols-outlined text-[16px]">home</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="font-semibold text-neutral-800">Frequently Asked Questions (FAQs)</span>
        </div>

        <button
          onClick={() => {
            setEditingFaq(null);
            setShowModal(true);
          }}
          className="inline-flex items-center justify-center gap-2 bg-[#d4af37] hover:bg-[#b8960b] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or answers..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase text-neutral-500 whitespace-nowrap">
            Category:
          </span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
          >
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-700">
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-12">#</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-1/3">Question</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-1/3">Answer</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-32">Category</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-20 text-center">Status</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-24 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-neutral-400">
                  Loading FAQs...
                </td>
              </tr>
            ) : filteredFaqs.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-neutral-400">
                  No FAQs found. Click "Add New FAQ" to create one.
                </td>
              </tr>
            ) : (
              filteredFaqs.map((faq, idx) => (
                <tr key={faq.id} className="hover:bg-neutral-50 transition-colors align-top">
                  <td className="py-4 px-4 text-neutral-500 text-xs font-semibold">{idx + 1}</td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-neutral-800 text-sm leading-snug">
                      {faq.question}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-neutral-600 text-xs leading-relaxed line-clamp-3">
                      {faq.answer}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {faq.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleToggleActive(faq.id, faq.active)}
                      className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                        faq.active
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {faq.active ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingFaq(faq);
                          setShowModal(true);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors border border-amber-200"
                        title="Edit FAQ"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="w-8 h-8 flex items-center justify-center rounded bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-200"
                        title="Delete FAQ"
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

      {showModal && (
        <FaqModal
          faq={editingFaq}
          onClose={() => {
            setShowModal(false);
            setEditingFaq(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

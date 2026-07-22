import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE}`;

const EMPTY_FORM = {
  images: [],
  description: '',
  servicesIncluded: '',
};

const getImagesArray = (imagesVal) => {
  if (!imagesVal) return [];
  if (Array.isArray(imagesVal)) return imagesVal;
  if (typeof imagesVal === 'string') {
    try {
      const parsed = JSON.parse(imagesVal);
      if (Array.isArray(parsed)) return parsed;
      return [parsed];
    } catch (e) {
      if (imagesVal.trim().startsWith('data:image/')) {
        return [imagesVal];
      }
      if (imagesVal.trim().startsWith('[')) {
        return [];
      }
      return [imagesVal];
    }
  }
  return [];
};

const getServicesIncludedString = (val) => {
  if (!val) return '';
  let list = [];
  if (Array.isArray(val)) {
    list = val;
  } else if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        list = Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        try {
          const unescaped = trimmed.replace(/\\"/g, '"');
          const parsed = JSON.parse(unescaped);
          if (Array.isArray(parsed)) {
            list = parsed;
          }
        } catch (err) {
          list = trimmed.slice(1, -1).split(',').map(s => s.trim());
        }
      }
    } else {
      list = val.split(',').map(s => s.trim());
    }
  }

  // Clean each item to remove any leftover JSON quotes, brackets or escape characters
  list = list
    .map(item => {
      if (!item) return '';
      let cleaned = String(item).trim();
      let prev;
      do {
        prev = cleaned;
        cleaned = cleaned.replace(/^\\*"/, '').replace(/\\*"$/, '');
        cleaned = cleaned.replace(/^\\*'/, '').replace(/\\*'$/, '');
        cleaned = cleaned.replace(/^\["?|"?\]$/g, '');
        cleaned = cleaned.trim();
      } while (cleaned !== prev);
      
      cleaned = cleaned.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\/g, '');
      return cleaned;
    })
    .filter(Boolean);

  return list.join(', ');
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch all services on mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditingService(null);
    setForm(EMPTY_FORM);
    setImagePreviews([]);
    setShowModal(true);
  };

  const openEdit = (srv) => {
    const srvImages = getImagesArray(srv.images);
    setEditingService(srv);
    setForm({
      category: srv.category || '',
      title: srv.title || srv.service || '',
      images: srvImages,
      description: srv.description || '',
      servicesIncluded: getServicesIncludedString(srv.servicesIncluded),
    });
    setImagePreviews(srvImages);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    setForm(EMPTY_FORM);
    setImagePreviews([]);
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleImageFiles = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`"${file.name}" exceeds 5 MB limit.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreviews(prev => [...prev, ev.target.result]);
        setForm(prev => ({ ...prev, images: [...prev.images, ev.target.result] }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeImage = (idx) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = async () => {
    if (!form.category.trim()) {
      Swal.fire('Error', 'Category is required.', 'error');
      return;
    }
    if (!form.title.trim()) {
      Swal.fire('Error', 'Title is required.', 'error');
      return;
    }
    if (!form.images || form.images.length === 0) {
      Swal.fire('Error', 'At least one image is required.', 'error');
      return;
    }
    if (!form.description.trim()) {
      Swal.fire('Error', 'Description is required.', 'error');
      return;
    }

    const payload = {
      ...form,
      service: form.title,
      estate: form.category,
      servicesIncluded: form.servicesIncluded ? form.servicesIncluded.split(',').map(s => s.trim()).filter(Boolean) : [],
    };

    try {
      let response;
      if (editingService) {
        // Update existing service
        response = await fetch(`${API_URL}/services/${editingService.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to update service');
        const updated = await response.json();
        setServices(prev => prev.map(s => s.id === updated.id ? updated : s));
        Swal.fire({ icon: 'success', title: 'Updated!', text: 'Service updated successfully.', timer: 1500, showConfirmButton: false });
      } else {
        // Create new service
        response = await fetch(`${API_URL}/services`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to create service');
        const created = await response.json();
        setServices(prev => [...prev, created]);
        Swal.fire({ icon: 'success', title: 'Added!', text: 'Service created successfully.', timer: 1500, showConfirmButton: false });
      }
      closeModal();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message, confirmButtonColor: '#735c00' });
      console.error('Error saving service:', err);
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        doDelete(id);
      }
    });
  };

  const doDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/services/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete service');
      setServices(prev => prev.filter(s => s.id !== id));
      Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The service has been deleted.', timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: `Failed to delete: ${err.message}`, confirmButtonColor: '#735c00' });
      console.error('Error deleting service:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading services...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p>Error loading services: {error}</p>
        <button 
          onClick={fetchServices}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-5">
        <span className="material-symbols-outlined text-[16px]">home</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="font-semibold text-neutral-800">Services</span>
      </div>

      <div>
        <button
          onClick={openAdd}
          className="flex items-center space-x-1.5 bg-[#d4af37] hover:bg-[#b8960b] text-white px-5 py-2 rounded text-sm font-semibold transition-colors shadow-sm select-none"
        >
          <span className="material-symbols-outlined text-[18px]">home_repair_service</span>
          <span>Add Service</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-700">
              <th className="py-3 px-5 font-bold text-neutral-800 text-sm">S.No</th>
              <th className="py-3 px-5 font-bold text-neutral-800 text-sm">Category</th>
              <th className="py-3 px-5 font-bold text-neutral-800 text-sm">Title</th>
              <th className="py-3 px-5 font-bold text-neutral-800 text-sm">Description</th>
              <th className="py-3 px-5 font-bold text-neutral-800 text-sm text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.length === 0 && (
              <tr>
                <td colSpan="5" className="py-12 text-center text-gray-400 text-sm">
                  No services added yet.
                </td>
              </tr>
            )}
            {services.map((srv, idx) => (
              <tr key={srv.id} className="hover:bg-gray-50 transition-colors align-middle">
                <td className="py-4 px-5 text-gray-600">{idx + 1}</td>
                <td className="py-4 px-5 font-medium text-gray-800">{srv.category || '—'}</td>
                <td className="py-4 px-5 text-gray-700">{srv.title || srv.service || '—'}</td>
                <td className="py-4 px-5 text-gray-500 max-w-xs">
                  <span className="line-clamp-2">
                    {srv.description
                      ? srv.description.replace(/<[^>]+>/g, '').slice(0, 100) + (srv.description.length > 100 ? '...' : '')
                      : '—'}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => openEdit(srv)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-[#d4af37] hover:bg-[#b8960b] text-white transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button
                      onClick={() => confirmDelete(srv.id)}
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

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            <div className="text-center pt-6">
              <h2 className="text-xl font-bold text-neutral-800">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
            </div>

            <div className="px-6 py-5 space-y-5">

              {/* Category + Title */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={e => handleChange('category', e.target.value)}
                    placeholder="e.g. Modular Kitchen"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => handleChange('title', e.target.value)}
                    placeholder="e.g. Designing Homes That Reflect You"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                  Image <span className="text-red-500">*</span>{' '}
                  <span className="text-red-400 font-normal normal-case">Multiple images allowed (each under 5MB)</span>
                </label>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center cursor-pointer">
                    <span className="border border-gray-300 rounded-l px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors">
                      Choose File
                    </span>
                    <span className="border border-l-0 border-gray-300 rounded-r px-3 py-2 text-sm text-gray-400 bg-white min-w-[140px]">
                      {imagePreviews.length === 0 ? 'No file chosen' : `${imagePreviews.length} file(s)`}
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageFiles}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-8 h-8 flex items-center justify-center rounded bg-[#d4af37] hover:bg-[#b8960b] text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
                {imagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="relative w-20 h-20 rounded overflow-hidden border border-gray-200">
                        <img src={src} alt={`preview-${i}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeImage(i)}
                          className="absolute top-0.5 right-0.5 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs"
                        >
                          <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-t-md bg-gray-50 px-3 py-2 flex items-center space-x-1 flex-wrap gap-y-1">
                  {[
                    { label: 'B', style: 'font-bold', title: 'Bold' },
                    { label: 'U', style: 'underline', title: 'Underline' },
                    { label: 'I', style: 'italic', title: 'Italic' },
                    { label: '≡', style: '', title: 'List' },
                    { label: '1.', style: '', title: 'Numbered List' },
                    { label: '⇤', style: '', title: 'Align Left' },
                    { label: '⊞', style: '', title: 'Table' },
                    { label: '🔗', style: '', title: 'Link' },
                    { label: '⛶', style: '', title: 'Fullscreen' },
                    { label: '<>', style: 'font-mono text-xs', title: 'Code' },
                  ].map(({ label, style, title }) => (
                    <button
                      key={title}
                      type="button"
                      className={`px-2 py-0.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors ${style}`}
                      title={title}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <textarea
                  value={form.description}
                  onChange={e => handleChange('description', e.target.value)}
                  rows={7}
                  placeholder="Enter service description..."
                  className="w-full border border-t-0 border-gray-300 rounded-b-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 resize-none"
                />
              </div>

              {/* Services Included */}
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">
                  Services Included <span className="text-gray-400 font-normal normal-case">(comma separated)</span>
                </label>
                <textarea
                  value={form.servicesIncluded}
                  onChange={e => handleChange('servicesIncluded', e.target.value)}
                  rows={3}
                  placeholder="e.g. Luxury Villa Sales, Premium Villa Construction..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40 resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3 px-6 py-5 border-t border-neutral-100">
              <button
                onClick={handleSubmit}
                className="px-5 py-2 text-sm font-semibold text-white bg-[#d4af37] hover:bg-[#b8960b] rounded-md transition-colors shadow-sm"
              >
                {editingService ? 'Save Changes' : 'Add Service'}
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
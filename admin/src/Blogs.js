import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Simple Rich Text Toolbar
function RichEditor({ value, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, []);

  const exec = (cmd, val = null) => {
    editorRef.current.focus();
    document.execCommand(cmd, false, val);
    onChange(editorRef.current.innerHTML);
  };

  const FONTS = ['sans-serif', 'serif', 'monospace', 'Arial', 'Georgia'];

  return (
    <div style={{ border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', padding: '6px 8px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <ToolBtn onClick={() => exec('bold')} title="Bold"><b>B</b></ToolBtn>
        <ToolBtn onClick={() => exec('italic')} title="Italic"><i>I</i></ToolBtn>
        <ToolBtn onClick={() => exec('underline')} title="Underline"><u>U</u></ToolBtn>
        <ToolBtn onClick={() => exec('strikeThrough')} title="Strike"><s>S</s></ToolBtn>
        <select onChange={e => exec('fontName', e.target.value)} style={{ fontSize: '12px', border: '1px solid #d1d5db', borderRadius: '4px', padding: '2px 4px', cursor: 'pointer' }}>
          {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <ToolBtn onClick={() => exec('insertUnorderedList')} title="Bullet List">☰</ToolBtn>
        <ToolBtn onClick={() => exec('insertOrderedList')} title="Numbered List">①</ToolBtn>
        <ToolBtn onClick={() => exec('justifyLeft')} title="Left">⬛</ToolBtn>
        <ToolBtn onClick={() => exec('justifyCenter')} title="Center">▪</ToolBtn>
        <ToolBtn onClick={() => exec('justifyRight')} title="Right">▪▪</ToolBtn>
        <ToolBtn onClick={() => { const url = prompt('URL:'); if (url) exec('createLink', url); }} title="Link">🔗</ToolBtn>
        <ToolBtn onClick={() => exec('removeFormat')} title="Clear">&lt;/&gt;</ToolBtn>
      </div>
      {/* Editor area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(editorRef.current.innerHTML)}
        style={{ minHeight: '160px', padding: '12px', fontSize: '14px', outline: 'none', color: '#000000' }}
        data-placeholder="Enter description here..."
      />
    </div>
  );
}

function ToolBtn({ onClick, title, children }) {
  return (
    <button type="button" onClick={onClick} title={title}
      style={{ padding: '3px 8px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '4px', background: '#fff', cursor: 'pointer', minWidth: '28px' }}>
      {children}
    </button>
  );
}

// Modal Component
function BlogModal({ blog, onClose, onSave }) {
  const [form, setForm] = useState({
    heading: blog?.heading || '',
    image: blog?.image || '',
    description: blog?.description || '',
    metaTitle: blog?.metaTitle || '',
    metaDescription: blog?.metaDescription || '',
    metaKeyword: blog?.metaKeyword || '',
  });
  const [preview, setPreview] = useState(blog?.image || null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target.result);
      setForm(f => ({ ...f, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!form.heading.trim()) { Swal.fire('Error', 'Heading is required', 'error'); return; }
    if (!form.image) { Swal.fire('Error', 'Image is required', 'error'); return; }
    if (!form.description.trim() || form.description === '<p></p>' || form.description === '<p><br></p>') { Swal.fire('Error', 'Description content is required', 'error'); return; }
    if (!form.metaTitle.trim()) { Swal.fire('Error', 'Meta Title is required', 'error'); return; }
    if (!form.metaDescription.trim()) { Swal.fire('Error', 'Meta Description is required', 'error'); return; }
    if (!form.metaKeyword.trim()) { Swal.fire('Error', 'Meta Keyword is required', 'error'); return; }
    onSave({ ...blog, ...form, id: blog?.id || Date.now() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5">
        {/* Header */}
        <div className="text-center pt-2">
          <h2 className="text-xl font-bold text-neutral-800">
            {blog?.id ? 'Edit Blog' : 'Add New Blog'}
          </h2>
        </div>

        {/* Body */}
        <div className="space-y-4">
          {/* Heading */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Heading <span className="text-red-500">*</span></label>
            <input value={form.heading} onChange={e => setForm(f => ({ ...f, heading: e.target.value }))}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left text-black focus:outline-none focus:ring-1 focus:ring-[#d4af37]" placeholder="Enter blog heading" />
          </div>

          {/* Image */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Image <span className="text-red-500">*</span></label>
            <input type="file" accept="image/*" onChange={handleImage} className="block text-sm text-neutral-600 bg-white" />
            {preview && <img src={preview} alt="preview" className="mt-2 h-20 rounded object-cover border border-neutral-200" />}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Description <span className="text-red-500">*</span></label>
            <RichEditor value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} />
          </div>

          {/* Meta Title */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Meta Title <span className="text-red-500">*</span></label>
            <input value={form.metaTitle} onChange={e => setForm(f => ({ ...f, metaTitle: e.target.value }))}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left text-black focus:outline-none focus:ring-1 focus:ring-[#d4af37]" placeholder="Meta title" />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Meta Description <span className="text-red-500">*</span></label>
            <input value={form.metaDescription} onChange={e => setForm(f => ({ ...f, metaDescription: e.target.value }))}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left text-black focus:outline-none focus:ring-1 focus:ring-[#d4af37]" placeholder="Meta description" />
          </div>

          {/* Meta Keyword */}
          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Meta Keyword <span className="text-red-500">*</span></label>
            <input value={form.metaKeyword} onChange={e => setForm(f => ({ ...f, metaKeyword: e.target.value }))}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left text-black focus:outline-none focus:ring-1 focus:ring-[#d4af37]" placeholder="Meta keyword" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center space-x-3 pt-4 border-t border-neutral-100">
          <button onClick={handleSubmit} className="px-5 py-2 bg-[#d4af37] hover:bg-[#b8960b] text-white rounded text-sm font-semibold transition-colors shadow-sm">
            {blog?.id ? 'Update Blog' : 'Add Blog'}
          </button>
          <button onClick={onClose} className="px-5 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' };
const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', color: '#374151', boxSizing: 'border-box', outline: 'none' };

// Main Blogs Component
export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editBlog, setEditBlog] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/blogs`)
      .then(r => r.ok ? r.json() : [])
      .then(d => { setBlogs(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => {
        const saved = localStorage.getItem('ee_blogs_v1');
        try { setBlogs(saved ? JSON.parse(saved) : []); } catch { setBlogs([]); }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ee_blogs_v1', JSON.stringify(blogs));
    } catch (e) {
      console.warn("Failed to save ee_blogs_v1 to localStorage:", e);
    }
  }, [blogs]);

  const handleSave = (blog) => {
    if (blog.id && blogs.find(b => b.id === blog.id)) {
      // Edit
      fetch(`${API_URL}/blogs/${blog.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blog) })
        .catch(() => {});
      setBlogs(prev => prev.map(b => b.id === blog.id ? blog : b));
      Swal.fire({ icon: 'success', title: 'Updated!', timer: 1200, showConfirmButton: false });
    } else {
      // Add
      fetch(`${API_URL}/blogs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blog) })
        .then(r => r.ok ? r.json() : blog)
        .then(d => setBlogs(prev => [d, ...prev]))
        .catch(() => setBlogs(prev => [blog, ...prev]));
      Swal.fire({ icon: 'success', title: 'Added!', timer: 1200, showConfirmButton: false });
    }
    setShowModal(false);
    setEditBlog(null);
  };

  const handleDelete = (id) => {
    Swal.fire({ title: 'Delete blog?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#e53e3e', confirmButtonText: 'Delete' })
      .then(r => {
        if (r.isConfirmed) {
          fetch(`${API_URL}/blogs/${id}`, { method: 'DELETE' }).catch(() => {});
          setBlogs(prev => prev.filter(b => b.id !== id));
          Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1000, showConfirmButton: false });
        }
      });
  };

  const stripHtml = (html) => html?.replace(/<[^>]*>/g, '') || '';
  const truncate = (str, n) => str?.length > n ? str.slice(0, n) + '...' : str;

  return (
    <div style={{ padding: '0' }}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-5">
        <span className="material-symbols-outlined text-[16px]">home</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="font-semibold text-neutral-800">Blogs</span>
      </div>

      {/* Add Button */}
      <div className="mb-5">
        <button
          onClick={() => { setEditBlog(null); setShowModal(true); }}
          className="flex items-center space-x-1.5 bg-[#d4af37] hover:bg-[#b8960b] text-white px-5 py-2 rounded text-sm font-semibold transition-colors shadow-sm select-none"
        >
          <span className="material-symbols-outlined text-[18px]">post_add</span>
          <span>Add Blog</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-700">
              {['S.No', 'Heading', 'Description', 'Image', 'Meta Title', 'Meta Description', 'Meta Keyword', 'Action'].map(h => (
                <th key={h} className="py-3 px-5 font-bold text-neutral-800 text-sm">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {loading && (
              <tr><td colSpan="8" className="py-12 text-center text-neutral-400">Loading...</td></tr>
            )}
            {!loading && blogs.length === 0 && (
              <tr><td colSpan="8" className="py-12 text-center text-neutral-400">No blogs yet. Click "Add Blog" to create one.</td></tr>
            )}
            {blogs.map((blog, i) => (
              <tr key={blog.id} className="hover:bg-neutral-50/50 transition-colors align-top">
                <td className="py-4 px-5 text-neutral-500 font-medium">{i + 1}</td>
                <td className="py-4 px-5 text-neutral-800 font-semibold max-w-[160px]">{blog.heading}</td>
                <td className="py-4 px-5 text-neutral-500 max-w-[200px]">{truncate(stripHtml(blog.description), 60)}</td>
                <td className="py-4 px-5">
                  {blog.image
                    ? <img src={blog.image} alt="blog" className="w-16 h-10 object-cover rounded border border-neutral-200" />
                    : <span className="text-neutral-300 text-xs">No image</span>}
                </td>
                <td className="py-4 px-5 text-neutral-600 max-w-[120px]">{truncate(blog.metaTitle, 20)}</td>
                <td className="py-4 px-5 text-neutral-600 max-w-[140px]">{truncate(blog.metaDescription, 20)}</td>
                <td className="py-4 px-5 text-neutral-600 max-w-[120px]">{truncate(blog.metaKeyword, 20)}</td>
                <td className="py-4 px-5">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => { setEditBlog(blog); setShowModal(true); }}
                      className="w-8 h-8 flex items-center justify-center rounded bg-[#d4af37] hover:bg-[#b8960b] text-white transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button onClick={() => handleDelete(blog.id)}
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
        <BlogModal
          blog={editBlog}
          onClose={() => { setShowModal(false); setEditBlog(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
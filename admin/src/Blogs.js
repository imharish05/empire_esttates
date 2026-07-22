import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Summernote-style Rich Text Editor with Selection Preservation
function RichEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const savedRangeRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      if (editorRef.current && editorRef.current.contains(sel.anchorNode)) {
        savedRangeRef.current = sel.getRangeAt(0).cloneRange();
      }
    }
  };

  const restoreSelection = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    if (savedRangeRef.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    }
  };

  const exec = (cmd, val = null) => {
    restoreSelection();
    document.execCommand(cmd, false, val);
    saveSelection();
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const FONTS = [
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Times New Roman', value: 'Times New Roman, serif' },
    { label: 'Courier New', value: 'Courier New, monospace' },
    { label: 'Verdana', value: 'Verdana, sans-serif' },
    { label: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
    { label: 'Impact', value: 'Impact, sans-serif' },
    { label: 'Roboto', value: 'Roboto, sans-serif' },
    { label: 'Poppins', value: 'Poppins, sans-serif' },
    { label: 'sans-serif', value: 'sans-serif' },
    { label: 'serif', value: 'serif' },
    { label: 'monospace', value: 'monospace' },
  ];

  const FONT_SIZES = [
    { label: 'Small (12px)', val: '1' },
    { label: 'Normal (14px)', val: '3' },
    { label: 'Medium (18px)', val: '4' },
    { label: 'Large (24px)', val: '5' },
    { label: 'Huge (32px)', val: '6' },
  ];

  const HEADINGS = [
    { label: 'Paragraph', val: 'P' },
    { label: 'Heading 1 (H1)', val: 'H1' },
    { label: 'Heading 2 (H2)', val: 'H2' },
    { label: 'Heading 3 (H3)', val: 'H3' },
    { label: 'Quote', val: 'BLOCKQUOTE' },
  ];

  return (
    <div className="border border-neutral-300 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Summernote-style Toolbar */}
      <div
        className="flex flex-wrap items-center gap-1.5 p-2 bg-neutral-50 border-b border-neutral-200 text-xs select-none"
        onMouseDown={saveSelection}
      >
        {/* Style Dropdown (Heading) */}
        <select
          onFocus={saveSelection}
          onChange={e => exec('formatBlock', e.target.value)}
          className="h-8 rounded border border-neutral-300 px-2 bg-white text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#d4af37] cursor-pointer font-medium"
          title="Paragraph Format"
        >
          {HEADINGS.map(h => (
            <option key={h.val} value={h.val}>{h.label}</option>
          ))}
        </select>

        {/* Font Family Dropdown */}
        <select
          onFocus={saveSelection}
          onChange={e => exec('fontName', e.target.value)}
          className="h-8 rounded border border-neutral-300 px-2 bg-white text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#d4af37] cursor-pointer font-medium"
          title="Font Family"
        >
          <option value="">Font Family</option>
          {FONTS.map(f => (
            <option key={f.label} value={f.value} style={{ fontFamily: f.value }}>{f.label}</option>
          ))}
        </select>

        {/* Font Size Dropdown */}
        <select
          onFocus={saveSelection}
          onChange={e => exec('fontSize', e.target.value)}
          className="h-8 rounded border border-neutral-300 px-2 bg-white text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#d4af37] cursor-pointer font-medium"
          title="Font Size"
        >
          <option value="">Font Size</option>
          {FONT_SIZES.map(s => (
            <option key={s.val} value={s.val}>{s.label}</option>
          ))}
        </select>

        <div className="h-5 w-[1px] bg-neutral-300 mx-0.5" />

        {/* Bold, Italic, Underline, Strikethrough */}
        <ToolBtn onClick={() => exec('bold')} title="Bold (Ctrl+B)">
          <span className="material-symbols-outlined text-[18px]">format_bold</span>
        </ToolBtn>
        <ToolBtn onClick={() => exec('italic')} title="Italic (Ctrl+I)">
          <span className="material-symbols-outlined text-[18px]">format_italic</span>
        </ToolBtn>
        <ToolBtn onClick={() => exec('underline')} title="Underline (Ctrl+U)">
          <span className="material-symbols-outlined text-[18px]">format_underlined</span>
        </ToolBtn>
        <ToolBtn onClick={() => exec('strikethrough')} title="Strikethrough">
          <span className="material-symbols-outlined text-[18px]">strikethrough_s</span>
        </ToolBtn>

        <div className="h-5 w-[1px] bg-neutral-300 mx-0.5" />

        {/* Text Color Picker */}
        <div className="relative flex items-center h-8 px-1.5 rounded border border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer" title="Text Color">
          <span className="material-symbols-outlined text-[18px] text-neutral-700">format_color_text</span>
          <input
            type="color"
            onFocus={saveSelection}
            onChange={e => exec('foreColor', e.target.value)}
            className="w-5 h-5 ml-1 p-0 border-0 bg-transparent cursor-pointer"
          />
        </div>

        {/* Background Highlight Color Picker */}
        <div className="relative flex items-center h-8 px-1.5 rounded border border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer" title="Highlight Color">
          <span className="material-symbols-outlined text-[18px] text-neutral-700">format_color_fill</span>
          <input
            type="color"
            onFocus={saveSelection}
            onChange={e => exec('hiliteColor', e.target.value)}
            className="w-5 h-5 ml-1 p-0 border-0 bg-transparent cursor-pointer"
          />
        </div>

        <div className="h-5 w-[1px] bg-neutral-300 mx-0.5" />

        {/* Alignment */}
        <ToolBtn onClick={() => exec('justifyLeft')} title="Align Left">
          <span className="material-symbols-outlined text-[18px]">format_align_left</span>
        </ToolBtn>
        <ToolBtn onClick={() => exec('justifyCenter')} title="Align Center">
          <span className="material-symbols-outlined text-[18px]">format_align_center</span>
        </ToolBtn>
        <ToolBtn onClick={() => exec('justifyRight')} title="Align Right">
          <span className="material-symbols-outlined text-[18px]">format_align_right</span>
        </ToolBtn>
        <ToolBtn onClick={() => exec('justifyFull')} title="Justify">
          <span className="material-symbols-outlined text-[18px]">format_align_justify</span>
        </ToolBtn>

        <div className="h-5 w-[1px] bg-neutral-300 mx-0.5" />

        {/* Lists & Indent */}
        <ToolBtn onClick={() => exec('insertUnorderedList')} title="Bullet List">
          <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
        </ToolBtn>
        <ToolBtn onClick={() => exec('insertOrderedList')} title="Numbered List">
          <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
        </ToolBtn>
        <ToolBtn onClick={() => exec('indent')} title="Increase Indent">
          <span className="material-symbols-outlined text-[18px]">format_indent_increase</span>
        </ToolBtn>
        <ToolBtn onClick={() => exec('outdent')} title="Decrease Indent">
          <span className="material-symbols-outlined text-[18px]">format_indent_decrease</span>
        </ToolBtn>

        <div className="h-5 w-[1px] bg-neutral-300 mx-0.5" />

        {/* Link & Clear Format & Undo/Redo */}
        <ToolBtn onClick={() => { saveSelection(); const url = prompt('Enter Link URL:'); if (url) exec('createLink', url); }} title="Insert Link">
          <span className="material-symbols-outlined text-[18px]">link</span>
        </ToolBtn>
        <ToolBtn onClick={() => exec('removeFormat')} title="Clear Formatting">
          <span className="material-symbols-outlined text-[18px]">format_clear</span>
        </ToolBtn>
        <ToolBtn onClick={() => exec('undo')} title="Undo">
          <span className="material-symbols-outlined text-[18px]">undo</span>
        </ToolBtn>
        <ToolBtn onClick={() => exec('redo')} title="Redo">
          <span className="material-symbols-outlined text-[18px]">redo</span>
        </ToolBtn>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        onInput={() => onChange(editorRef.current.innerHTML)}
        onBlur={saveSelection}
        className="p-4 min-h-[200px] max-h-[380px] overflow-y-auto text-sm text-neutral-900 focus:outline-none leading-relaxed"
      />
    </div>
  );
}

function ToolBtn({ onClick, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="h-8 px-2 flex items-center justify-center rounded border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 transition-colors focus:outline-none"
    >
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
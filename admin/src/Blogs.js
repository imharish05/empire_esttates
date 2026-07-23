import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function ToolBtn({ onClick, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      onClick={onClick}
      title={title}
      className="h-8 px-2 flex items-center justify-center rounded border border-neutral-300 bg-white hover:bg-neutral-100 text-neutral-700 transition-colors focus:outline-none"
    >
      {children}
    </button>
  );
}

const stripHtml = (html) => {
  if (!html) return '';
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const text = doc.body.textContent || doc.body.innerText || '';
    return text.replace(/\u00a0/g, ' ').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();
  } catch (e) {
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();
  }
};

const removeQuotes = (html) => {
  if (typeof html !== 'string' || !html) return '';
  let str = html.replace(/<\/?blockquote\b[^>]*>/gi, '');
  return str.replace(/(^|>)([^<]*)(<|$)/g, (match, open, text, close) => {
    const cleanText = text.replace(/["'“”‘’`]/g, '');
    return `${open}${cleanText}${close}`;
  });
};

const cleanJunkMetadata = (str) => {
  if (typeof str !== 'string' || !str) return '';
  return str
    .replace(/\*\]:[^>]*data-turn=[^>]*>/gi, '')
    .replace(/data-turn-id\b[^>]*>/gi, '')
    .replace(/R6Vx5W_[^\s<>]*/gi, '')
    .replace(/scroll-mb-calc[^\s<>]*/gi, '')
    .replace(/scroll-mt-calc[^\s<>]*/gi, '')
    .replace(/style=["'][^"']*(display\s*:\s*flex|columns\s*:|grid-template|float\s*:)[^"']*["']/gi, '');
};

const cleanLiLeadingMarkers = (html) => {
  if (typeof html !== 'string' || !html) return '';
  let str = html
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#160;/g, ' ')
    .replace(/&#8203;/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/\u200b/g, '');

  for (let i = 0; i < 8; i++) {
    const prev = str;
    str = str.replace(/(<li\b[^>]*>(?:\s*<[^>]+>)*)\s*([•\-\*\.]|&bull;|\u2022|\b\d+[\.\)]|\b\d+\b)\s*/gi, '$1');
    if (str === prev) break;
  }

  return str
    .replace(/<b>\s*<\/b>/gi, '')
    .replace(/<strong>\s*<\/strong>/gi, '')
    .replace(/<span>\s*<\/span>/gi, '')
    .replace(/<p>\s*<\/p>/gi, '');
};

const fixOrderedListSequentialNumbering = (html) => {
  if (typeof html !== 'string' || !html) return '';
  let str = html;

  // Strip value="..." attributes from <li> elements so list counters are not overridden
  str = str.replace(/(<li\b[^>]*)\s+value=["']?\d+["']?/gi, '$1');

  // Merge adjacent lists (ol/ul) to preserve sequential numbering
  str = str
    .replace(/<\/ol>\s*<ol\b[^>]*>/gi, '')
    .replace(/<\/ul>\s*<ul\b[^>]*>/gi, '');

  // Calculate running count across multiple <ol> elements in the article
  let runningCount = 1;
  return str.replace(/<ol\b([^>]*)>([\s\S]*?)<\/ol>/gi, (match, attrs, content) => {
    const cleanContent = content.replace(/(<li\b[^>]*)\s+value=["']?\d+["']?/gi, '$1');
    const liMatches = cleanContent.match(/<li\b/gi);
    const count = liMatches ? liMatches.length : 0;
    let startAttr = '';
    if (runningCount > 1) {
      startAttr = ` start="${runningCount}"`;
    }
    runningCount += count;
    const cleanAttrs = (attrs || '').replace(/\s*start=["']?\d+["']?/gi, '');
    return `<ol${cleanAttrs}${startAttr}>${cleanContent}</ol>`;
  });
};

const normalizeRichTextHtml = (html) => {
  if (!html) return '';
  const sizeMap = {
    '1': '12px',
    '2': '13px',
    '3': '14px',
    '4': '18px',
    '5': '24px',
    '6': '32px',
    '7': '48px',
  };

  let str = removeQuotes(html);
  str = cleanJunkMetadata(str);

  // Strip all repeated duplicate bullets, numbers, and dots from inside <li> tags
  str = cleanLiLeadingMarkers(str);

  // Fix continuous sequential numbering across multiple <ol> elements
  str = fixOrderedListSequentialNumbering(str);

  // Convert legacy <font> tags to <span style="...">
  str = str.replace(/<font\b([^>]*)>([\s\S]*?)<\/font>/gi, (match, attrs, content) => {
    let styles = [];
    const sizeMatch = attrs.match(/size=["']?(\d+)["']?/i);
    if (sizeMatch && sizeMap[sizeMatch[1]]) {
      styles.push(`font-size: ${sizeMap[sizeMatch[1]]}`);
    }
    const colorMatch = attrs.match(/color=["']?([^"'\s>]+)["']?/i);
    if (colorMatch) {
      styles.push(`color: ${colorMatch[1]}`);
    }
    const faceMatch = attrs.match(/face=["']?([^"'\s>]+)["']?/i);
    if (faceMatch) {
      styles.push(`font-family: ${faceMatch[1]}`);
    }
    const styleAttrMatch = attrs.match(/style=["']([^"']+)["']/i);
    if (styleAttrMatch) {
      styles.push(styleAttrMatch[1]);
    }
    if (styles.length > 0) {
      return `<span style="${styles.join('; ')}">${content}</span>`;
    }
    return content;
  });

  return str;
};

const sanitizeDescription = (html) => {
  if (!html) return '';
  const normalized = normalizeRichTextHtml(html);
  return normalized
    .replace(/[\^%\$~\\\|\{\}\[`]/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/&#8203;/g, '')
    .replace(/\u200b/g, '');
};

const sanitizeText = (str) => {
  if (!str) return '';
  return str
    .replace(/[\^%\$#\*~\\\|\{\}\[`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const truncate = (str, n) => str?.length > n ? str.slice(0, n) + '...' : str;

// Summernote-style Rich Text Editor with Selection Preservation
function RichEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const savedRangeRef = useRef(null);
  const isEditingRef = useRef(false);

  useEffect(() => {
    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && editorRef.current && editorRef.current.contains(sel.anchorNode)) {
        savedRangeRef.current = sel.getRangeAt(0).cloneRange();
      }
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  useEffect(() => {
    if (isEditingRef.current) {
      return;
    }
    if (editorRef.current) {
      const normalized = normalizeRichTextHtml(value || '');
      if (editorRef.current.innerHTML !== normalized) {
        editorRef.current.innerHTML = normalized;
      }
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

  const ensureEditorFocus = () => {
    const sel = window.getSelection();
    // If selection is already active inside editor, do not alter range
    if (sel && sel.rangeCount > 0 && editorRef.current && editorRef.current.contains(sel.anchorNode)) {
      return;
    }
    // Restore saved range only if focus was lost outside editor
    if (savedRangeRef.current && editorRef.current) {
      try {
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
      } catch (e) {}
    }
  };

  const emitChange = (html) => {
    const normalized = normalizeRichTextHtml(html);
    onChange(normalized);
  };

  const exec = (cmd, val = null) => {
    ensureEditorFocus();
    try {
      document.execCommand('styleWithCSS', false, false);
    } catch (e) {}
    document.execCommand(cmd, false, val);
    if (editorRef.current) {
      emitChange(normalizeRichTextHtml(editorRef.current.innerHTML));
    }
  };

  const HEADINGS = [
    { label: 'Paragraph', val: 'P' },
    { label: 'Heading 1 (H1)', val: 'H1' },
    { label: 'Heading 2 (H2)', val: 'H2' },
    { label: 'Heading 3 (H3)', val: 'H3' },
  ];

  const applyFormatBlock = (tag) => {
    if (!tag) return;
    ensureEditorFocus();
    const formattedTag = (tag.startsWith('<') && tag.endsWith('>')) ? tag : `<${tag}>`;
    try {
      document.execCommand('formatBlock', false, formattedTag);
    } catch (e) {
      try {
        document.execCommand('formatBlock', false, tag);
      } catch (err) {}
    }
    if (editorRef.current) {
      emitChange(normalizeRichTextHtml(editorRef.current.innerHTML));
    }
  };

  const notifySpecialCharBlocked = () => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'warning',
      title: 'Special characters are not allowed',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleKeyDown = (e) => {
    isEditingRef.current = true;
    const forbiddenChars = ['^', '%', '$', '~', '\\', '|', '{', '}', '[', ']', '`', '"', "'", '“', '”', '‘', '’'];
    if (forbiddenChars.includes(e.key)) {
      e.preventDefault();
      notifySpecialCharBlocked();
    }
  };

  const handleKeyUp = () => {
    isEditingRef.current = false;
    saveSelection();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData ? e.clipboardData.getData('text/plain') : '';
    const cleanText = text.replace(/[\^%\$~\\\|\{\}\[`"'“”‘’]/g, '');
    if (text !== cleanText) {
      notifySpecialCharBlocked();
    }
    document.execCommand('insertText', false, cleanText);
    if (editorRef.current) {
      emitChange(normalizeRichTextHtml(editorRef.current.innerHTML));
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const rawHtml = editorRef.current.innerHTML;
      const cleanedHtml = normalizeRichTextHtml(rawHtml.replace(/[\^%\$~\\\|\{\}\[`"'“”‘’]/g, ''));
      emitChange(cleanedHtml);
    }
  };

  return (
    <div className="border border-neutral-300 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Clean & Focused Toolbar */}
      <div
        className="flex flex-wrap items-center gap-2 p-2 bg-neutral-50 border-b border-neutral-200 text-xs select-none"
        onMouseDown={saveSelection}
      >
        {/* Paragraph & Heading Dropdown (Heading 1, Heading 2, Heading 3, Paragraph) */}
        <select
          onFocus={saveSelection}
          onChange={e => applyFormatBlock(e.target.value)}
          className="h-8 rounded border border-neutral-300 px-2 bg-white text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-[#d4af37] cursor-pointer font-medium"
          title="Paragraph / Heading Format"
        >
          {HEADINGS.map(h => (
            <option key={h.val} value={h.val}>{h.label}</option>
          ))}
        </select>

        <div className="h-5 w-[1px] bg-neutral-300 mx-0.5" />

        {/* Bold Button */}
        <ToolBtn onClick={() => exec('bold')} title="Bold (Ctrl+B)">
          <span className="material-symbols-outlined text-[20px] font-bold">format_bold</span>
        </ToolBtn>

        <div className="h-5 w-[1px] bg-neutral-300 mx-0.5" />

        {/* Bullet List Button */}
        <ToolBtn onClick={() => exec('insertUnorderedList')} title="Bullet List">
          <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
        </ToolBtn>

        {/* Numbered List Button */}
        <ToolBtn onClick={() => exec('insertOrderedList')} title="Numbered List">
          <span className="material-symbols-outlined text-[20px]">format_list_numbered</span>
        </ToolBtn>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => { isEditingRef.current = true; }}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onInput={handleInput}
        onBlur={() => { isEditingRef.current = false; saveSelection(); }}
        className="p-4 min-h-[200px] max-h-[380px] overflow-y-auto text-sm text-neutral-900 focus:outline-none leading-relaxed rich-editor-content"
      />
    </div>
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
    if (!form.metaTitle.trim()) { Swal.fire('Error', 'Meta Title is required', 'error'); return; }
    if (!form.metaDescription.trim()) { Swal.fire('Error', 'Meta Description is required', 'error'); return; }
    if (!form.metaKeyword.trim()) { Swal.fire('Error', 'Meta Keyword is required', 'error'); return; }

    const cleanDesc = sanitizeDescription(form.description);
    const descPlainText = stripHtml(cleanDesc);

    if (!descPlainText || cleanDesc === '<p></p>' || cleanDesc === '<p><br></p>') {
      Swal.fire('Invalid Description', 'Please enter valid description content without special characters.', 'error');
      return;
    }

    onSave({
      ...blog,
      heading: form.heading.trim(),
      image: form.image,
      description: cleanDesc,
      metaTitle: form.metaTitle.trim(),
      metaDescription: form.metaDescription.trim(),
      metaKeyword: form.metaKeyword.trim(),
      id: blog?.id || Date.now()
    });
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
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase text-neutral-600">Description <span className="text-red-500">*</span></label>
              <span className="text-[11px] text-amber-600 font-medium">(Special characters ^, %, $, #, *, ~ are not allowed)</span>
            </div>
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

  const cleanBlogItem = (b) => ({
    ...b,
    description: sanitizeDescription(b.description),
  });

  useEffect(() => {
    fetch(`${API_URL}/blogs`)
      .then(r => r.ok ? r.json() : [])
      .then(d => {
        const cleaned = (Array.isArray(d) ? d : []).map(cleanBlogItem);
        setBlogs(cleaned);
        setLoading(false);
      })
      .catch(() => {
        const saved = localStorage.getItem('ee_blogs_v1');
        try {
          const parsed = saved ? JSON.parse(saved) : [];
          setBlogs(parsed.map(cleanBlogItem));
        } catch { setBlogs([]); }
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
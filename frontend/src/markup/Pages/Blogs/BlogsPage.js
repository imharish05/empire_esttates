import React, { useState, useEffect, Fragment } from 'react';
import Header from '../../Layout/Header';
import Footer2 from '../../Layout/Footer2';
import PageTitle from '../../Layout/PageTitle';
import { applyMetaTags } from '../../../utils/meta';
import { useParams, useHistory } from 'react-router-dom';

const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000/api'
  : process.env.REACT_APP_API_URL || 'https://empireesttatesapi.freshmindz.in/api';






/* ─────────────── BLOG LIST VIEW ─────────────── */
function BlogListView({ blogs, loading, onSelect }) {
  return (
    <section style={{ padding: '70px 0', background: '#fff' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <p style={{
            color: '#c8902a', fontSize: '13px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px'
          }}>
            OUR BLOG
          </p>
          <h2 style={{ fontSize: '38px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
            Latest News
          </h2>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{
              width: '44px', height: '44px', border: '4px solid #f0f0f0',
              borderTop: '4px solid #c8902a', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite', margin: '0 auto 16px'
            }} />
            <p style={{ color: '#888' }}>Loading blogs...</p>
          </div>
        ) : (
          <div className="row">
            {blogs.map((blog, idx) => {
              const imgSrc = blog.image || blog.imageUrl || blog.thumbnail || null;

              return (
                <div key={blog.id || idx} className="col-md-6 col-lg-4" style={{ marginBottom: '30px' }}>
                  <div style={{
                    background: '#fff',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    {/* Blog Image */}
                    <div style={{ height: '220px', overflow: 'hidden', background: '#e8e8e8' }}>
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={blog.title || blog.heading}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          background: 'linear-gradient(135deg, #2c2c2c 0%, #444 100%)'
                        }}>
                          <i className="fa fa-newspaper" style={{ fontSize: '52px', color: '#c8902a', opacity: 0.6 }} />
                        </div>
                      )}
                    </div>

                    {/* Blog Content */}
                    <div style={{ padding: '22px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Title */}
                      <h4 style={{
                        fontSize: '18px', fontWeight: 700, color: '#1a1a1a',
                        lineHeight: '1.45', marginBottom: '20px', flex: 1,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden'
                      }}>
                        {blog.title || blog.heading}
                      </h4>

                      {/* Read More Button */}
                      <button
                        onClick={() => onSelect(blog)}
                        style={{
                          display: 'inline-block',
                          background: '#c8902a',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '3px',
                          padding: '10px 22px',
                          fontWeight: 700,
                          fontSize: '14px',
                          cursor: 'pointer',
                          letterSpacing: '0.5px',
                          alignSelf: 'flex-start',
                          transition: 'background 0.2s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#a87220'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#c8902a'; }}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

const decodeHtml = (str) => {
  if (typeof str !== 'string' || !str) return '';
  let decoded = str;
  try {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    decoded = txt.value;
  } catch (e) {
    decoded = str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  }
  return decoded;
};

const removeQuotes = (html) => {
  if (typeof html !== 'string' || !html) return '';
  let str = html.replace(/<\/?blockquote\b[^>]*>/gi, '');
  return str.replace(/(^|>)([^<]*)(<|$)/g, (match, open, text, close) => {
    const cleanText = text.replace(/["'“”‘’`]/g, '');
    return `${open}${cleanText}${close}`;
  });
};

const ensureParagraphWrapper = (html) => {
  if (!html || typeof html !== 'string') return '';
  const trimmed = html.trim();
  if (!trimmed) return '';
  if (/^<(p|div|h[1-6]|ul|ol)\b/i.test(trimmed)) {
    return trimmed;
  }
  return `<p>${trimmed}</p>`;
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
    str = str.replace(/(<li\b[^>]*>(?:\s*<[^>]+>)*)\s*([•\-\*\.]|&bull;|\u2022|\d+[\.\)]|\b\d+\b)\s*/gi, '$1');
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

  // Merge adjacent lists (ol/ul) to preserve sequential numbering
  str = str
    .replace(/<\/ol>\s*<ol\b[^>]*>/gi, '')
    .replace(/<\/ul>\s*<ul\b[^>]*>/gi, '');

  // Calculate running count across multiple <ol> elements in the article
  let runningCount = 1;
  return str.replace(/<ol\b([^>]*)>([\s\S]*?)<\/ol>/gi, (match, attrs, content) => {
    const liMatches = content.match(/<li\b/gi);
    const count = liMatches ? liMatches.length : 0;
    let startAttr = '';
    if (runningCount > 1) {
      startAttr = ` start="${runningCount}"`;
    }
    runningCount += count;
    const cleanAttrs = (attrs || '').replace(/\s*start=["']?\d+["']?/gi, '');
    return `<ol${cleanAttrs}${startAttr}>${content}</ol>`;
  });
};

const normalizeRichTextHtml = (html) => {
  if (typeof html !== 'string') return html;
  const decoded = decodeHtml(html);
  const noJunk = cleanJunkMetadata(decoded);
  const noQuotes = removeQuotes(noJunk);
  const sizeMap = {
    '1': '12px',
    '2': '13px',
    '3': '14px',
    '4': '18px',
    '5': '24px',
    '6': '32px',
    '7': '48px',
  };
  let merged = cleanLiLeadingMarkers(noQuotes);
  merged = fixOrderedListSequentialNumbering(merged);

  const normalized = merged.replace(/<font\b([^>]*)>([\s\S]*?)<\/font>/gi, (match, attrs, content) => {
    let styles = [];
    const sizeMatch = attrs.match(/size=["']?(\d+)["']?/i);
    if (sizeMatch && sizeMap[sizeMatch[1]]) styles.push(`font-size: ${sizeMap[sizeMatch[1]]}`);
    const colorMatch = attrs.match(/color=["']?([^"'\s>]+)["']?/i);
    if (colorMatch) styles.push(`color: ${colorMatch[1]}`);
    const faceMatch = attrs.match(/face=["']?([^"'\s>]+)["']?/i);
    if (faceMatch) styles.push(`font-family: ${faceMatch[1]}`);
    const styleAttrMatch = attrs.match(/style=["']([^"']+)["']/i);
    if (styleAttrMatch) styles.push(styleAttrMatch[1]);
    if (styles.length > 0) return `<span style="${styles.join('; ')}">${content}</span>`;
    return content;
  });
  return ensureParagraphWrapper(normalized);
};

/* ─────────────── BLOG DETAIL VIEW ─────────────── */
function BlogDetailView({ blog, allBlogs, onBack }) {
  const imgSrc = blog.image || blog.imageUrl || blog.thumbnail || null;
  const rawContent = normalizeRichTextHtml(blog.content || blog.body || blog.description || '');
  const hasHtmlTags = rawContent.includes('<') && rawContent.includes('>');

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  return (
    <>
      <style>{`
        .blog-content-render {
          font-size: 16px;
          line-height: 1.9;
          color: #2a2a2a;
          text-align: justify;
        }
        .blog-content-render p {
          margin-bottom: 18px;
          font-size: 16px;
          line-height: 1.9;
          color: #2a2a2a;
          text-align: justify;
        }
        .blog-content-render h1 {
          font-size: 28px !important;
          font-weight: 700 !important;
          color: #1a1a1a !important;
          margin: 28px 0 14px;
        }
        .blog-content-render h2 {
          font-size: 22px !important;
          font-weight: 700 !important;
          color: #1a1a1a !important;
          margin: 24px 0 12px;
        }
        .blog-content-render h3 {
          font-size: 18px !important;
          font-weight: 700 !important;
          color: #1a1a1a !important;
          margin: 20px 0 10px;
        }
        .blog-content-render img {
          max-width: 100%;
          border-radius: 6px;
          margin: 20px 0;
        }
        .blog-content-render ul {
          list-style-type: disc !important;
          list-style: disc !important;
          padding-left: 28px !important;
          margin-bottom: 18px !important;
        }
        .blog-content-render ol {
          list-style-type: decimal !important;
          list-style: decimal !important;
          padding-left: 28px !important;
          margin-bottom: 18px !important;
        }
        .blog-content-render li {
          display: list-item !important;
          margin-bottom: 8px !important;
          font-size: 16px;
          line-height: 1.8;
          color: #2a2a2a;
          text-align: justify;
        }
        .blog-content-render a {
          color: #c8902a;
          text-decoration: underline;
        }
        .blog-content-render blockquote {
          border-left: 4px solid #c8902a;
          padding: 12px 18px;
          background: #fff8ee;
          border-radius: 0 6px 6px 0;
          margin: 22px 0;
          font-style: italic;
          color: #555;
          text-align: justify;
        }
        .blog-content-render strong, .blog-content-render b {
          font-weight: 700 !important;
          color: #1a1a1a !important;
        }
        .blog-content-render em, .blog-content-render i {
          font-style: italic !important;
        }
        .blog-content-render u {
          text-decoration: underline !important;
        }
      `}</style>

      <div style={{ background: '#fff', paddingBottom: '60px' }}>

        {/* Content Area — Bootstrap container matches Studio1 width */}
        <div className="container" style={{ paddingTop: '36px' }}>

          {/* Contained Image with rounded corners */}
          {imgSrc && (
            <div style={{
              width: '100%', borderRadius: '10px', overflow: 'hidden',
              marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.10)'
            }}>
              <img
                src={imgSrc}
                alt={blog.title || blog.heading}
                style={{ width: '100%', display: 'block', maxHeight: '460px', objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 700,
            color: '#1a1a1a', lineHeight: 1.35, marginBottom: '24px'
          }}>
            {blog.title || blog.heading}
          </h1>

          {/* Article Content */}
          {rawContent ? (
            <div
              className="blog-content-render"
              style={{ textAlign: 'justify' }}
              dangerouslySetInnerHTML={{ __html: rawContent }}
            />
          ) : (
            <p style={{ color: '#888', fontStyle: 'italic' }}>No content available for this post.</p>
          )}

          {/* Back Button */}
          <div style={{ marginTop: '48px', borderTop: '1px solid #eee', paddingTop: '28px' }}>
            <button
              onClick={onBack}
              style={{
                display: 'inline-block',
                background: '#c8902a',
                color: '#fff',
                border: 'none',
                borderRadius: '3px',
                padding: '11px 26px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                letterSpacing: '0.5px',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#a87220'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#c8902a'; }}
            >
              ← Back to All Blogs
            </button>
          </div>

        </div>
      </div>
    </>
  );
}


/* ─────────────── MAIN PAGE ─────────────── */

export default function BlogsPage() {
  const { slug } = useParams();
  const history = useHistory();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const getStoredBlogs = () => {
    try {
      const saved = localStorage.getItem('ee_blogs_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const mergeBlogs = (remoteList, storedList) => {
    const combined = new Map();
    (remoteList || []).forEach(blog => {
      if (blog && blog.id != null) combined.set(String(blog.id), blog);
      else if (blog && blog.slug) combined.set(`slug:${blog.slug}`, blog);
    });
    (storedList || []).forEach(blog => {
      if (blog && blog.id != null) {
        const existing = combined.get(String(blog.id));
        combined.set(String(blog.id), existing ? { ...existing, ...blog } : blog);
      } else if (blog && blog.slug) {
        const existing = combined.get(`slug:${blog.slug}`);
        combined.set(`slug:${blog.slug}`, existing ? { ...existing, ...blog } : blog);
      }
    });
    return Array.from(combined.values());
  };

  const selectMatched = (list) => {
    if (slug) {
      const matched = list.find(b => String(b.slug) === String(slug) || String(b.id) === String(slug));
      setSelectedBlog(matched || null);
    } else {
      setSelectedBlog(null);
    }
  };

  const loadBlogs = async () => {
    const storedBlogs = getStoredBlogs();
    try {
      const res = await fetch(`${API_URL}/blogs`);
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      const remoteList = Array.isArray(data) ? data : [];
      const list = mergeBlogs(remoteList, storedBlogs);
      setBlogs(list);
      if (slug) {
        const matched = list.find(b => String(b.slug) === String(slug) || String(b.id) === String(slug));
        if (matched) setSelectedBlog(matched);
      }
    } catch (error) {
      const list = mergeBlogs([], storedBlogs);
      setBlogs(list);
      if (slug) {
        const matched = list.find(b => String(b.slug) === String(slug) || String(b.id) === String(slug));
        if (matched) setSelectedBlog(matched);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadBlogBySlug = async (blogSlug) => {
    if (!blogSlug) {
      setSelectedBlog(null);
      return;
    }

    const storedBlogs = getStoredBlogs();
    const storedMatched = storedBlogs.find(
      b => String(b.slug) === String(blogSlug) || String(b.id) === String(blogSlug)
    );

    try {
      const res = await fetch(`${API_URL}/blogs/slug/${blogSlug}`);
      if (res.ok) {
        const remoteData = await res.json();
        if (remoteData) {
          const finalBlog = (storedMatched && storedMatched.description) ? { ...remoteData, ...storedMatched } : remoteData;
          setSelectedBlog(finalBlog);
          return;
        }
      }
    } catch (error) {
      // Fallback
    }

    if (storedMatched) {
      setSelectedBlog(storedMatched);
    } else {
      const list = mergeBlogs([], storedBlogs);
      const matched = list.find(b => String(b.slug) === String(blogSlug) || String(b.id) === String(blogSlug));
      setSelectedBlog(matched || null);
    }
  };

  useEffect(() => {
    applyMetaTags("Blogs | Empire Estates", "Read the latest news and blogs from Empire Estates.");
    loadBlogs();

    const onStorageEvent = (event) => {
      if (!event || event.key === 'ee_blogs_v1' || event.key === null) {
        loadBlogs();
      }
    };

    const onFocus = () => {
      loadBlogs();
    };

    window.addEventListener('storage', onStorageEvent);
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('storage', onStorageEvent);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    loadBlogBySlug(slug);
  }, [slug]);

  const handleSelect = (blog) => {
    history.push(`/blogs/${blog.slug || blog.id}`);
  };

  const handleBack = () => {
    history.push('/blogs');
  };

  return (
    <Fragment>
      <Header isTransparent={false} />
      <PageTitle motherMenu="Blogs" activeMenu={selectedBlog ? (selectedBlog.title || selectedBlog.heading) : 'Blogs'} placement="Blogs Page Banner" />

      {selectedBlog ? (
        <BlogDetailView blog={selectedBlog} allBlogs={blogs} onBack={handleBack} />
      ) : (
        <BlogListView blogs={blogs} loading={loading} onSelect={handleSelect} />
      )}

      <Footer2 />
    </Fragment>
  );
}

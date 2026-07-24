import React, { useState, useEffect, Fragment } from 'react';
import Header from '../../Layout/Header';
import Footer2 from '../../Layout/Footer2';
import PageTitle from '../../Layout/PageTitle';
import { applyMetaTags } from '../../../utils/meta';
import { useParams, useHistory } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';






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

/* ─────────────── BLOG DETAIL VIEW ─────────────── */
function BlogDetailView({ blog, allBlogs, onBack }) {
  const imgSrc = blog.image || blog.imageUrl || blog.thumbnail || null;
  const rawContent = blog.content || blog.body || blog.description || '';

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  return (
    <>
      <style>{`
        .blog-content-render p { margin-bottom: 18px; font-size: 16px; line-height: 1.9; color: #3a3a3a; text-align: justify; }
        .blog-content-render h2 { font-size: 22px; color: #1a1a1a; font-weight: 700; margin: 30px 0 12px; }
        .blog-content-render h3 { font-size: 18px; color: #1a1a1a; font-weight: 700; margin: 24px 0 10px; }
        .blog-content-render img { max-width: 100%; border-radius: 6px; margin: 20px 0; }
        .blog-content-render ul, .blog-content-render ol { padding-left: 24px; margin-bottom: 18px; }
        .blog-content-render li { margin-bottom: 10px; font-size: 15px; line-height: 1.8; color: #3a3a3a; text-align: justify; }
        .blog-content-render a { color: #c8902a; text-decoration: underline; }
        .blog-content-render blockquote { border-left: 4px solid #c8902a; padding: 12px 18px; background: #fff8ee; border-radius: 0 6px 6px 0; margin: 22px 0; font-style: italic; color: #555; text-align: justify; }
        .blog-content-render strong { color: #1a1a1a; font-weight: 700; }
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
            rawContent.includes('<') ? (
              <div
                className="blog-content-render"
                dangerouslySetInnerHTML={{ __html: rawContent }}
              />
            ) : (
              <div>
                {rawContent.split('\n').map((para, i) =>
                  para.trim()
                    ? <p key={i} style={{ fontSize: '16px', lineHeight: '1.9', color: '#3a3a3a', marginBottom: '20px', textAlign: 'justify' }}>{para}</p>
                    : null
                )}
              </div>
            )
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

  useEffect(() => {
    applyMetaTags("Blogs | Empire Estates", "Read the latest news and blogs from Empire Estates.");
    
    const selectMatched = (list) => {
      if (slug) {
        const matched = list.find(b => b.slug === slug || String(b.id) === String(slug));
        if (matched) {
          setSelectedBlog(matched);
        } else {
          setSelectedBlog(null);
        }
      } else {
        setSelectedBlog(null);
      }
    };

    if (blogs.length > 0) {
      selectMatched(blogs);
    } else {
      fetch(`${API_URL}/blogs`)
        .then(res => { if (!res.ok) throw new Error(); return res.json(); })
        .then(data => {
          const list = data && Array.isArray(data) ? data : [];
          setBlogs(list);
          selectMatched(list);
        })
        .catch(() => setBlogs([]))
        .finally(() => setLoading(false));
    }
  }, [slug, blogs.length]);

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

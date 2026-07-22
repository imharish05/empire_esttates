import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Services from './Services';
import MetaTags from './MetaTags';
import ProjectsPage from './ProjectsPage';
import Banners from './Banners';
import Blogs from './Blogs';
import ProjectCategoriesPage from './ProjectCategoriesPage';
import LayoutsPage from './LayoutsPage';
import ElevationsPage from './ElevationsPage';
import ContactsPage from './ContactsPage';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Custom React Banner Modal (replaces SweetAlert popup)
function BannerModal({ banner, onClose, onSave, PAGE_OPTIONS }) {
  const [form, setForm] = useState({
    title: banner?.title || '',
    subtitle: banner?.subtitle || '',
    placement: banner?.placement || PAGE_OPTIONS[0]?.placement || '',
    ctaText: banner?.ctaText || '',
    ctaLink: banner?.ctaLink || PAGE_OPTIONS[0]?.link || '',
    image: banner?.image || '',
  });
  const [preview, setPreview] = useState(banner?.image || null);
  const [error, setError] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!form.image) {
      setError('Image is required');
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6 space-y-5 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="text-center pt-2">
          <h2 className="text-xl font-bold text-neutral-800">
            {banner ? 'Edit Banner' : 'Add New Banner'}
          </h2>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Banner title"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Subtitle</label>
            <input
              type="text"
              value={form.subtitle}
              onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
              placeholder="Subtitle"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Placement (Target Page)</label>
            <select
              value={form.placement}
              onChange={e => setForm(f => ({ ...f, placement: e.target.value }))}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left bg-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            >
              {PAGE_OPTIONS.map(opt => (
                <option key={opt.placement} value={opt.placement}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">CTA Text</label>
              <input
                type="text"
                value={form.ctaText}
                onChange={e => setForm(f => ({ ...f, ctaText: e.target.value }))}
                placeholder="e.g. View Projects"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">CTA Redirect Link</label>
              <select
                value={form.ctaLink}
                onChange={e => setForm(f => ({ ...f, ctaLink: e.target.value }))}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left bg-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              >
                {PAGE_OPTIONS.map(opt => (
                  <option key={opt.link} value={opt.link}>{opt.label} ({opt.link})</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Image <span className="text-red-500">*</span></label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-left bg-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-2 h-20 w-32 object-cover rounded border border-neutral-200"
              />
            )}
          </div>

          <div className="flex items-center justify-center space-x-3 pt-4 border-t border-neutral-100">
            <button
              type="submit"
              className="px-5 py-2 bg-[#d4af37] hover:bg-[#b8960b] text-white rounded text-sm font-semibold transition-colors shadow-sm"
            >
              {banner ? 'Update Banner' : 'Add Banner'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Dashboard({ email, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  // ── Projects ──
  const [projects, setProjects] = useState(() => {
    const s = localStorage.getItem('ee_projects_v3');
    try { return s ? JSON.parse(s) : []; } catch { return []; }
  });
  useEffect(() => {
    fetch(`${API_URL}/projects`).then(r => r.ok && r.json()).then(d => d && setProjects(d)).catch(() => {});
  }, []);
  useEffect(() => {
    if (projects.length > 0) {
      try {
        localStorage.setItem('ee_projects_v3', JSON.stringify(projects));
      } catch (e) {
        console.warn('Failed to save ee_projects_v3 to localStorage:', e);
      }
    }
  }, [projects]);

  // ── Services ──
  const [services, setServices] = useState(() => {
    const s = localStorage.getItem('ee_services_v2');
    try {
      return s ? JSON.parse(s) : [
        { id: 1, category: 'Modular Kitchen',   title: 'Designing Homes That Reflect You',        description: 'Your home should be a true reflection of your lifestyle, personality, and comfort.' },
        { id: 2, category: 'Full Home Interior', title: 'Complete Home Interior Solutions',         description: 'Transform your house into a home that truly resonates with your personality.' },
        { id: 3, category: 'False Ceilings',     title: 'Modern False Ceilings for Every Room',    description: 'Add a touch of elegance and sophistication to your home with our expertly designed false ceilings.' },
        { id: 4, category: 'Painting',           title: 'Bring Your Walls to Life',                description: 'Give your home a fresh new look with our professional painting services.' },
        { id: 5, category: 'Grill works',        title: 'Premium Grill Designs for Modern Homes',  description: 'Enhance your home\'s security and style with our expert grill work services.' },
      ];
    } catch { return []; }
  });
  useEffect(() => {
    try {
      localStorage.setItem('ee_services_v2', JSON.stringify(services));
    } catch (e) {
      console.warn('Failed to save ee_services_v2 to localStorage:', e);
    }
  }, [services]);

  // ── Banners ──
  const [banners, setBanners] = useState(() => {
    const s = localStorage.getItem('ee_banners_v2');
    try { return s ? JSON.parse(s) : []; } catch { return []; }
  });
  useEffect(() => {
    fetch(`${API_URL}/banners`).then(r => r.ok && r.json()).then(d => d && setBanners(d)).catch(() => {});
  }, []);
  useEffect(() => {
    if (banners.length > 0) {
      try {
        localStorage.setItem('ee_banners_v2', JSON.stringify(banners));
      } catch (e) {
        console.warn('Failed to save ee_banners_v2 to localStorage:', e);
      }
    }
  }, [banners]);

  const [showBannerModal, setShowBannerModal] = useState(false);
  const [editBannerItem, setEditBannerItem] = useState(null);

  // ── Categories ──
  const [categories, setCategories] = useState(() => {
    const s = localStorage.getItem('ee_project_categories');
    try { return s ? JSON.parse(s) : []; } catch { return []; }
  });
  useEffect(() => {
    fetch(`${API_URL}/project-categories`).then(r => r.ok && r.json()).then(d => d && setCategories(d)).catch(() => {});
  }, []);
  useEffect(() => {
    if (categories.length > 0) {
      try {
        localStorage.setItem('ee_project_categories', JSON.stringify(categories));
      } catch (e) {
        console.warn('Failed to save ee_project_categories to localStorage:', e);
      }
    }
  }, [categories]);

  // ── Service handlers ──
  const handleNewService    = (srv) => setServices(prev => [{ ...srv, id: Date.now() }, ...prev]);
  const handleEditService   = (srv) => setServices(prev => prev.map(s => s.id === srv.id ? srv : s));
  const handleDeleteService = (id)  => setServices(prev => prev.filter(s => s.id !== id));

  // ── Banner handlers ──
  const PAGE_OPTIONS = [
    { label: 'Home Page Slider', link: '/', placement: 'Home Page Slider' },
    { label: 'All Projects Page Banner', link: '/projects', placement: 'Projects Page Banner' },
    { label: 'About Us Banner', link: '/about-us', placement: 'About Us Banner' },
    { label: 'Services Details Banner', link: '/services-details', placement: 'Services Details Banner' },
    { label: 'Contact Us Banner', link: '/contact-us', placement: 'Contact Us Banner' },
    { label: 'Blogs Page Banner', link: '/blogs', placement: 'Blogs Page Banner' },
    { label: 'Layouts Page Banner', link: '/layouts', placement: 'Layouts Page Banner' },
    { label: 'Elevations Page Banner', link: '/elevation', placement: 'Elevations Page Banner' },
  ];

  const handleNewBanner = () => {
    setEditBannerItem(null);
    setShowBannerModal(true);
  };

  const handleEditBanner = (b) => {
    setEditBannerItem(b);
    setShowBannerModal(true);
  };

  const handleSaveBanner = (bannerData) => {
    if (editBannerItem) {
      // Editing
      const b = editBannerItem;
      const updatedData = { ...b, ...bannerData };
      fetch(`${API_URL}/banners/${b.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      })
        .then(r => r.json())
        .then(d => {
          setBanners(prev => prev.map(x => x.id === b.id ? d : x));
          Swal.fire({ icon: 'success', title: 'Updated!', text: 'Banner updated successfully.', timer: 1500, showConfirmButton: false });
        })
        .catch(() => {
          setBanners(prev => prev.map(x => x.id === b.id ? updatedData : x));
          Swal.fire({ icon: 'info', title: 'Updated Locally', text: 'Banner updated in local storage.', timer: 1500, showConfirmButton: false });
        });
    } else {
      // Adding new
      fetch(`${API_URL}/banners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerData)
      })
        .then(r => r.json())
        .then(d => {
          setBanners(prev => [d, ...prev]);
          Swal.fire({ icon: 'success', title: 'Added!', text: 'Banner created successfully.', timer: 1500, showConfirmButton: false });
        })
        .catch(() => {
          setBanners(prev => [{ id: Date.now(), ...bannerData, active: true }, ...prev]);
          Swal.fire({ icon: 'info', title: 'Saved Locally', text: 'Banner saved to local storage.', timer: 1500, showConfirmButton: false });
        });
    }
    setShowBannerModal(false);
    setEditBannerItem(null);
  };

  const handleDeleteBanner = (id) => {
    Swal.fire({
      title: 'Delete Banner?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it'
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/banners/${id}`, { method: 'DELETE' })
          .then(() => {
            setBanners(prev => prev.filter(b => b.id !== id));
            Swal.fire('Deleted!', 'Banner has been deleted.', 'success');
          })
          .catch(() => {
            setBanners(prev => prev.filter(b => b.id !== id));
            Swal.fire('Deleted Locally', 'Banner removed from local state.', 'info');
          });
      }
    });
  };

  const handleToggleBannerActive = (id) => {
    const target = banners.find(b => b.id === id);
    if (!target) return;
    const newActiveState = !target.active;
    const updated = { ...target, active: newActiveState };

    setBanners(prev => prev.map(b => b.id === id ? updated : b));

    fetch(`${API_URL}/banners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: newActiveState })
    }).catch(() => {});
  };

  // ── Overview stats ──
  const totalProjects  = projects.length;
  const totalServices  = services.length;
  const totalBanners   = banners.length;
  const totalCategories = categories.length;

  const STAT_CARDS = [
    { 
      label: 'TOTAL PROJECTS', 
      value: totalProjects, 
      icon: 'business', 
      tagText: 'Active', 
      tagBg: '#fff7ed', 
      tagColor: '#ea580c', 
      tab: 'galleryprojects' 
    },
    { 
      label: 'TOTAL SERVICES', 
      value: totalServices, 
      icon: 'construction', 
      tagText: 'Operational', 
      tagBg: '#f0fdf4', 
      tagColor: '#16a34a', 
      tab: 'services' 
    },
    { 
      label: 'TOTAL BANNERS', 
      value: totalBanners, 
      icon: 'image', 
      tagText: 'Active', 
      tagBg: '#eff6ff', 
      tagColor: '#3b82f6', 
      tab: 'banners' 
    },
    { 
      label: 'PROJECT CATEGORIES', 
      value: totalCategories, 
      icon: 'category', 
      tagText: 'Organized', 
      tagBg: '#fdf4ff', 
      tagColor: '#c026d3', 
      tab: 'projectcategories' 
    },
  ];

  const QUICK_LINKS = [
    { label: 'Add Service',          icon: 'settings',       tab: 'services' },
    { label: 'Manage Projects',      icon: 'photo_library',  tab: 'galleryprojects' },
    { label: 'Meta Tags / SEO',      icon: 'manage_search',  tab: 'metatags' },
    { label: 'Manage Banners',       icon: 'image',          tab: 'banners' },
  ];

  const RECENT_SERVICES = services.slice(0, 5);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa', fontFamily: 'sans-serif' }}>

      {/* SIDEBAR */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={onLogout} />

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

        {/* TOPBAR */}
        <Topbar activeTab={activeTab} />

        {/* CONTENT */}
        <main style={{ flex: 1, padding: '28px 32px' }}>

          {/* ═══════════════════════════════════════════════════
              DASHBOARD OVERVIEW
          ════════════════════════════════════════════════════ */}
          {activeTab === 'dashboard' && (
            <div style={{ maxWidth: '1100px' }}>

              {/* ── Stat Cards ── */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '28px' }}>
                {STAT_CARDS.map(card => (
                  <button
                    key={card.tab}
                    onClick={() => setActiveTab(card.tab)}
                    style={{
                      background: '#fff', border: '1px solid #e8e8e8', borderRadius: '12px',
                      padding: '28px 24px', textAlign: 'left', cursor: 'pointer',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)', transition: 'box-shadow 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span className="material-symbols-outlined" style={{ color: '#4b5563', fontSize: '20px' }}>{card.icon}</span>
                      </div>
                      <span style={{ fontSize: '9px', fontWeight: '800', color: card.tagColor, background: card.tagBg, padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: "'Manrope', sans-serif" }}>{card.tagText}</span>
                    </div>
                    <p style={{ fontSize: '11px', color: '#888', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0, fontFamily: "'Manrope', sans-serif" }}>{card.label}</p>
                    <p style={{ fontSize: '38px', fontWeight: '800', color: '#111', margin: '4px 0 0', fontFamily: "'Libre Caslon Text', serif" }}>{card.value}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ═══ OTHER PAGES ═══ */}

          {activeTab === 'services' && (
            <Services
              services={services}
              onNewService={handleNewService}
              onEditService={handleEditService}
              onDeleteService={handleDeleteService}
              onUpdateService={handleEditService}
            />
          )}

          {activeTab === 'projectcategories' && <ProjectCategoriesPage />}

          {activeTab === 'galleryprojects' && <ProjectsPage filter="all" />}
          {activeTab === 'ongoingprojects' && <ProjectsPage filter="ongoing" />}

          {activeTab === 'metatags' && <MetaTags />}

          {activeTab === 'banners' && (
            <>
              <Banners
                banners={banners}
                onNewBanner={handleNewBanner}
                onEditBanner={handleEditBanner}
                onDeleteBanner={handleDeleteBanner}
                onToggleActive={handleToggleBannerActive}
              />
              {showBannerModal && (
                <BannerModal
                  banner={editBannerItem}
                  onClose={() => { setShowBannerModal(false); setEditBannerItem(null); }}
                  onSave={handleSaveBanner}
                  PAGE_OPTIONS={PAGE_OPTIONS}
                />
              )}
            </>
          )}

          {activeTab === 'home' && (
            <div style={{ background: '#fff', borderRadius: '12px', padding: '32px', border: '1px solid #e8e8e8' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px' }}>Home</h2>
              <p style={{ color: '#888', fontSize: '14px' }}>Manage your home page content here.</p>
            </div>
          )}

          {activeTab === 'blogs' && <Blogs />}

          {activeTab === 'contact' && (
            <div style={{ background: '#fff', borderRadius: '12px', padding: '32px', border: '1px solid #e8e8e8' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px' }}>Contact Details</h2>
              <p style={{ color: '#888', fontSize: '14px' }}>Manage your contact information here.</p>
            </div>
          )}
          
          {activeTab === 'layouts' && <LayoutsPage />}
          {activeTab === 'elevations' && <ElevationsPage />}
          {activeTab === 'contacts' && <ContactsPage />}

        </main>

        {/* FOOTER */}
        <footer style={{ background: '#fff', borderTop: '1px solid #e8e8e8', padding: '14px 32px', textAlign: 'center', color: '#aaa', fontSize: '12px' }}>
          © 2026 Empire Estates | Admin Panel
        </footer>
      </div>
    </div>
  );
}
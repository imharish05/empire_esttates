import React from 'react';
import brandLogo from './assets/WhatsApp_Image_2026-06-18_at_5.37.30_PM-removebg-preview.png';

const NAV_ITEMS = [
  { key: 'dashboard',           icon: 'dashboard',        label: 'Dashboard' },
  { key: 'banners',             icon: 'image',            label: 'Banners' },
  { key: 'services',            icon: 'settings',         label: 'Services' },
  { key: 'projectcategories',   icon: 'category',         label: 'Project Categories' },
  { key: 'galleryprojects',     icon: 'photo_library',    label: 'Projects', 
    subItems: [
      { key: 'galleryprojects', label: 'All Projects' },
      { key: 'ongoingprojects', label: 'Ongoing Projects' },
    ]
  },
  { key: 'layouts',             icon: 'map',              label: 'Layouts' },
  { key: 'elevations',          icon: 'home_work',        label: 'Elevations' },
  { key: 'blogs',               icon: 'format_quote',     label: 'Blogs' },
  { key: 'metatags',            icon: 'manage_search',    label: 'Meta Tag' },
  { key: 'contacts',            icon: 'contact_mail',     label: 'Contact Inquiries' },
  
];

export default function Sidebar({ activeTab, onTabChange, onLogout }) {
  const [projectsOpen, setProjectsOpen] = React.useState(activeTab === 'galleryprojects' || activeTab === 'ongoingprojects');

  return (
    <aside
      style={{ width: '240px', minHeight: '100vh', background: '#2c323f', flexShrink: 0 }}
      className="flex flex-col justify-between z-30 shadow-2xl"
    >
      {/* Top */}
      <div>
        {/* Logo */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={brandLogo} alt="Empire Estates" style={{ height: '52px', width: 'auto' }} />
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 0' }}>
          {NAV_ITEMS.map((item) => {
            const isProjects = item.key === 'galleryprojects';
            const isActive = isProjects 
              ? (activeTab === 'galleryprojects' || activeTab === 'ongoingprojects')
              : activeTab === item.key;

            return (
              <div key={item.key}>
                <button
                  onClick={() => {
                    if (isProjects) {
                      setProjectsOpen(!projectsOpen);
                    } else {
                      onTabChange(item.key);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    textAlign: 'left',
                    padding: '11px 20px',
                    marginBottom: '2px',
                    border: 'none',
                    borderLeft: isActive ? '4px solid #d4af37' : '4px solid transparent',
                    cursor: 'pointer',
                    background: isActive ? 'rgba(200, 144, 42, 0.06)' : 'transparent',
                    color: isActive ? '#d4af37' : '#b0b8c4',
                    fontWeight: isActive ? '600' : '400',
                    fontSize: '14px',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#fff'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#b0b8c4'; } }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: isActive ? '#d4af37' : 'inherit' }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {isProjects && (
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', transition: 'transform 0.2s', transform: projectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      expand_more
                    </span>
                  )}
                </button>
                {isProjects && projectsOpen && (
                  <div style={{ background: 'rgba(0,0,0,0.1)', padding: '4px 0' }}>
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.key}
                        onClick={() => onTabChange(sub.key)}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 20px 10px 52px',
                          border: 'none',
                          cursor: 'pointer',
                          background: 'transparent',
                          color: activeTab === sub.key ? '#fff' : '#8a94a6',
                          fontWeight: activeTab === sub.key ? '500' : '400',
                          fontSize: '13px',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { if (activeTab !== sub.key) e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { if (activeTab !== sub.key) e.currentTarget.style.color = '#8a94a6'; }}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom logout */}
      <div style={{ padding: '12px 10px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button
          onClick={onLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            width: '100%', textAlign: 'left',
            padding: '11px 14px', borderRadius: '8px',
            border: 'none', cursor: 'pointer',
            background: 'transparent', color: '#f87171',
            fontSize: '14px', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
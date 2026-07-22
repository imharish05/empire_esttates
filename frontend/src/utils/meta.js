const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function applyMetaTags(fallbackTitle = "Empire Estates", fallbackDesc = "") {
  let metaTitle = fallbackTitle;
  let metaDescription = fallbackDesc;
  let metaKeywords = '';

  try {
    const res = await fetch(`${API_BASE}/meta`);
    if (res.ok) {
      const list = await res.json();

      // Normalize current pathname: strip '/react' prefix and trailing slash
      const currentPath = window.location.pathname
        .toLowerCase()
        .replace(/^\/react/, '')
        .replace(/\/$/, '') || '/';

      const match = list.find(m => {
        let storedPath = m.pageUrl || '';
        if (storedPath.startsWith('http')) {
          try {
            storedPath = new URL(storedPath).pathname;
          } catch (e) {}
        }
        const stored = storedPath
          .toLowerCase()
          .replace(/^\/react/, '')
          .replace(/\/$/, '') || '/';
        return stored === currentPath;
      });

      if (match) {
        metaTitle = match.metaTitle || fallbackTitle;
        metaDescription = match.metaDescription || fallbackDesc;
        metaKeywords = match.metaKeywords || '';
      }
    }
  } catch (err) {
    console.warn('Could not load meta tags, using defaults:', err.message);
  }

  document.title = metaTitle;

  let metaDescTag = document.querySelector('meta[name="description"]');
  if (!metaDescTag) {
    metaDescTag = document.createElement('meta');
    metaDescTag.setAttribute('name', 'description');
    document.head.appendChild(metaDescTag);
  }
  metaDescTag.setAttribute('content', metaDescription);

  if (metaKeywords) {
    let metaKeywordsTag = document.querySelector('meta[name="keywords"]');
    if (!metaKeywordsTag) {
      metaKeywordsTag = document.createElement('meta');
      metaKeywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywordsTag);
    }
    metaKeywordsTag.setAttribute('content', metaKeywords);
  } else {
    let metaKeywordsTag = document.querySelector('meta[name="keywords"]');
    if (metaKeywordsTag) {
      metaKeywordsTag.remove();
    }
  }
}

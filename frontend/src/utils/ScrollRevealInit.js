/**
 * ScrollRevealInit — A lightweight utility component that bootstraps the
 * IntersectionObserver for reveal-* animations across all pages.
 *
 * Automatically observes `.reveal-up`, `.reveal-left`, `.reveal-right`,
 * `.reveal-scale`, `.reveal-fade`, `.reveal-img`, `.reveal-badge`,
 * `.reveal-line`, `.reveal-wipe` elements and triggers their entrance
 * animation when scrolled into view.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const REVEAL_SELECTORS = [
  '.reveal-up', '.reveal-left', '.reveal-right',
  '.reveal-scale', '.reveal-fade', '.reveal-img',
  '.reveal-badge', '.reveal-line', '.reveal-wipe',
].join(',');

export default function ScrollRevealInit() {
  const location = useLocation();

  useEffect(() => {
    let observer;
    let mutationObserver;

    const observe = () => {
      const targets = document.querySelectorAll(`${REVEAL_SELECTORS}:not(.is-visible)`);
      targets.forEach(el => observer.observe(el));
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08,
    });

    // Initial check
    observe();

    // Re-check shortly after mount in case images/data load
    const t1 = setTimeout(observe, 300);
    const t2 = setTimeout(observe, 800);

    // Watch for dynamically inserted DOM nodes
    mutationObserver = new MutationObserver(observe);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, [location.pathname, location.search]);

  return null;
}

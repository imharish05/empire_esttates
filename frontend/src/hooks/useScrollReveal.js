/**
 * useScrollReveal — attaches an IntersectionObserver to all elements
 * that have a `reveal-*` class and adds `is-visible` when they enter
 * the viewport, triggering the CSS animation.
 *
 * Usage: call once in your top-level component (App or Index1).
 */
import { useEffect } from 'react';

export default function useScrollReveal(options = {}) {
  useEffect(() => {
    const defaults = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12,
      ...options,
    };

    const selectors = [
      '.reveal-up',
      '.reveal-left',
      '.reveal-right',
      '.reveal-scale',
      '.reveal-fade',
      '.reveal-img',
      '.reveal-badge',
      '.reveal-line',
      '.reveal-wipe',
    ].join(',');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, defaults);

    const targets = document.querySelectorAll(selectors);
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

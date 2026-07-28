import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { footerConfig } from "../Layout/footerConfig";
import { FaWhatsapp } from "../../icons";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [showScroll, setShowScroll] = useState(false);

  // Scroll to top of window when path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Monitor scroll level to toggle scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const whatsappUrl = (footerConfig && footerConfig.socials && footerConfig.socials.whatsapp)
    ? footerConfig.socials.whatsapp
    : "https://wa.me/918825471748";

  return (
    <div className="floating-action-buttons">
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp style={{ fontSize: "26px" }} />
      </a>

      {/* Scroll-To-Top Floating Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="floating-btn scroll-top-btn"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </div>
  );
}
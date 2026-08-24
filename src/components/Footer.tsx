import React, { useRef } from 'react';
import {
  Mail,
  Instagram,
  Youtube,
  ArrowUp,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectPackage?: (packageId?: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { content } = useContent();
  const lastTapRef = useRef<number>(0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Double tap & double click handler for mobile and desktop
  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 450;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY && now - lastTapRef.current > 50) {
      if (onOpenAdmin) {
        onOpenAdmin();
      }
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;
  };

  const handleDoubleClick = () => {
    if (onOpenAdmin) {
      onOpenAdmin();
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200/90 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <BrandLogo size="md" showTagline={true} theme="light" />
            
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              We engineer fast, secure and modern websites, web hosting, and digital solutions that help businesses grow online with confidence.
            </p>

            <div className="pt-2 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                Official Channels
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={content.brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-slate-700 hover:text-pink-600 hover:border-pink-300 transition-colors text-xs font-semibold shadow-sm"
                  aria-label="SirinBuilds Instagram"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>Instagram</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-50 text-pink-700 font-mono font-bold">Visit</span>
                </a>

                <a
                  href={content.brand.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-slate-700 hover:text-red-600 hover:border-red-300 transition-colors text-xs font-semibold shadow-sm"
                  aria-label="SirinBuilds YouTube"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-600" />
                  <span>YouTube</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-50 text-red-700 font-mono font-bold">Visit</span>
                </a>

                <a
                  href={`mailto:${content.brand.email}`}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 flex items-center gap-2 text-slate-700 hover:text-teal-700 hover:border-teal-300 transition-colors text-xs font-semibold shadow-sm"
                  aria-label="SirinBuilds Email"
                >
                  <Mail className="w-3.5 h-3.5 text-teal-600" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Company */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, 'about')}
                  className="hover:text-teal-700 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => handleLinkClick(e, 'portfolio')}
                  className="hover:text-teal-700 transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, 'contact')}
                  className="hover:text-teal-700 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => handleLinkClick(e, 'why-us')}
                  className="hover:text-teal-700 transition-colors"
                >
                  Why SirinBuilds
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="hover:text-teal-700 transition-colors"
                >
                  Website Development
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="hover:text-teal-700 transition-colors"
                >
                  Hosting & Domains
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="hover:text-teal-700 transition-colors"
                >
                  Branding & Design
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="hover:text-teal-700 transition-colors"
                >
                  SEO & Marketing
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  className="hover:text-teal-700 transition-colors"
                >
                  Maintenance & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Connect */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold">
              Resources & Connect
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => handleLinkClick(e, 'pricing')}
                  className="hover:text-teal-700 transition-colors"
                >
                  Pricing Packages
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleLinkClick(e, 'process')}
                  className="hover:text-teal-700 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  className="hover:text-teal-700 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={`mailto:${content.brand.email}`}
                  className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-800 font-mono text-xs font-semibold"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{content.brand.email}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 flex items-center flex-wrap gap-1">
            <span>© {content.brand.year}</span>
            {/* Last Sirinbuilds button with double-tap & double-click support */}
            <button
              type="button"
              id="footer-last-sirinbuilds-btn"
              onClick={handleTap}
              onDoubleClick={handleDoubleClick}
              onTouchEnd={handleTap}
              title="Double tap or double click to open Admin Panel"
              className="font-bold text-slate-900 hover:text-teal-700 transition-colors cursor-pointer px-1 py-0.5 rounded hover:bg-slate-200/60 active:scale-95 inline-flex items-center gap-1 focus:outline-none select-none"
            >
              <span>{content.brand.name}</span>
            </button>
            <span>. All rights reserved. {content.brand.tagline}.</span>
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm font-medium"
              aria-label="Back to top of page"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

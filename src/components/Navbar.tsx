import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenQuoteModal: (packageId?: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.home', 'Home'), href: '#home', id: 'home' },
    { label: t('nav.services', 'Services'), href: '#services', id: 'services' },
    { label: t('nav.whyUs', 'Why Us'), href: '#why-us', id: 'why-us' },
    { label: t('nav.pricing', 'Pricing'), href: '#pricing', id: 'pricing' },
    { label: t('nav.portfolio', 'Portfolio'), href: '#portfolio', id: 'portfolio' },
    { label: t('nav.process', 'Process'), href: '#process', id: 'process' },
    { label: t('nav.about', 'About'), href: '#about', id: 'about' },
    { label: t('nav.contact', 'Contact'), href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1 shrink-0"
            aria-label="SirinBuilds Home"
          >
            <BrandLogo size="md" showTagline={false} theme="light" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/90 p-1.5 rounded-full border border-slate-200 shadow-sm backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Universal Language Toggle */}
            <LanguageToggle variant="navbar" />

            <button
              onClick={() => onOpenQuoteModal()}
              id="nav-get-started-btn"
              className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-md shadow-teal-950/5 hover:shadow-teal-600/20 transition-shadow"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-500 rounded-xl transition-all duration-300 group-hover:opacity-100 opacity-90" />
              <span className="relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold transition-all duration-200 group-hover:bg-opacity-90">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{t('btn.getStarted', 'Get Started')}</span>
                <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <LanguageToggle variant="navbar" />

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Tablet Hamburger (hidden on mobile and xl) */}
          <div className="hidden sm:flex xl:hidden items-center gap-2">
            <button
              id="tablet-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-950 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 border-b border-slate-200 shadow-xl backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1 py-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 border border-teal-200 font-bold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-4 mt-2 border-t border-slate-200 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>{t('btn.getQuote', 'Get Free Quote')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

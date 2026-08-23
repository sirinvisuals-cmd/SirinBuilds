import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Sparkles,
  Smartphone,
  Server,
  Code2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  CloudUpload,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BRAND } from '../data/content';
import heroBannerImg from '../assets/images/sirinbuilds_banner_1787494701568.jpg';

interface HeroProps {
  onOpenQuoteModal: (packageId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuoteModal }) => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex flex-col justify-center bg-[#F8FAFC]"
    >
      {/* Background Architectural Curves & Dot Matrix Pattern */}
      <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-gradient-to-br from-teal-100/40 via-cyan-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-100/50 via-teal-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Delicate Orbital Line SVG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 200 C300 100, 600 450, 1500 150" stroke="#0D9488" strokeWidth="1.2" strokeDasharray="6 6" opacity="0.35" />
          <path d="M-50 450 C400 350, 750 650, 1550 400" stroke="#0EA5E9" strokeWidth="1" opacity="0.2" />
        </svg>
      </div>

      {/* Dot Matrix Pattern Accent (Bottom-Left) */}
      <div 
        className="absolute bottom-6 left-8 w-48 h-48 opacity-25 pointer-events-none bg-[radial-gradient(#0d9488_2px,transparent_2px)] [background-size:16px_16px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Top pill badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-teal-200/80 text-teal-800 text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
            </span>
            <span>{t('hero.pill', 'Website Development • Web Hosting • Domains • Support')}</span>
          </div>
        </div>

        {/* Hero Central Showcase Card */}
        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl shadow-slate-200/60 mb-12 p-6 sm:p-10 lg:p-14 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Brand Centerpiece Typography */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Celestial Sparkle Accent */}
              <div className="flex items-center gap-2 text-teal-600">
                <span className="text-lg">✦</span>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-slate-500">Premium Digital Agency</span>
              </div>

              {/* Bold Main Headline: SIRIN BUILDS */}
              <div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-wider uppercase leading-none font-['Plus_Jakarta_Sans']">
                  SIRIN<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">BUILDS</span>
                </h1>
                
                {/* Slogan with side divider lines */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="h-[1.5px] w-10 sm:w-16 bg-gradient-to-r from-teal-600 to-cyan-500" />
                  <p className="text-xs sm:text-sm font-bold tracking-[0.28em] text-slate-800 uppercase">
                    {t('hero.tagline', 'BUILDING DIGITAL SUCCESS')}
                  </p>
                  <div className="h-[1.5px] w-10 sm:w-16 bg-gradient-to-r from-cyan-500 to-teal-600" />
                </div>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                {t('hero.desc', 'We build fast, secure and modern websites, high-speed web hosting, domain infrastructure, and dedicated technical solutions that help your business thrive online.')}
              </p>

              {/* 4 Core Pillars matching banner: WEBSITES | HOSTING | DOMAINS | SUPPORT */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-center hover:border-teal-400 hover:bg-teal-50/40 transition-all group shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-teal-100/70 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Websites</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-center hover:border-teal-400 hover:bg-teal-50/40 transition-all group shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-teal-100/70 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                    <Server className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Hosting</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-center hover:border-teal-400 hover:bg-teal-50/40 transition-all group shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-teal-100/70 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Domains</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-center hover:border-teal-400 hover:bg-teal-50/40 transition-all group shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-teal-100/70 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Support</div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenQuoteModal('professional')}
                  id="hero-primary-cta"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 text-white font-bold text-base shadow-lg shadow-teal-700/20 hover:shadow-teal-700/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                >
                  <span>{t('btn.getStarted', 'Get Started')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-cyan-100" />
                </button>

                <button
                  onClick={() => scrollToSection('services')}
                  id="hero-secondary-cta"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white border border-slate-300 hover:border-teal-500 text-slate-800 hover:text-teal-700 font-semibold text-base transition-all hover:bg-teal-50/30 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{t('btn.viewServices', 'View Services')}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

            </div>

            {/* Right Column: Visual Frame matching the theme banner */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-teal-600/60 shadow-2xl bg-slate-900 group p-1">
                
                {/* Curved Organic Framed Showcase */}
                <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#042F2E]">
                  <img
                    src={heroBannerImg}
                    alt="SirinBuilds Digital Architecture & Cloud Hosting Banner"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback to public folder path if direct import is unreachable in custom static subfolder hosting
                      const target = e.currentTarget;
                      if (!target.src.includes('hero-banner.jpg')) {
                        target.src = '/hero-banner.jpg';
                      }
                    }}
                  />
                  
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-70" />

                  {/* Top Glowing Cloud Upload Badge */}
                  <div className="absolute top-4 right-4 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-teal-400/40 shadow-xl flex items-center gap-2.5 text-left">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                      <CloudUpload className="w-4 h-4 text-teal-400 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">Cloud Infrastructure</div>
                      <div className="text-xs font-bold text-white">99.9% High Uptime</div>
                    </div>
                  </div>

                  {/* Bottom Modern Laptop Tagline */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 flex items-center justify-between text-left">
                    <div>
                      <div className="text-xs font-bold text-white">We Build Great Websites</div>
                      <div className="text-[11px] text-teal-300">Fast • Secure • Scalable</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-mono font-bold">
                      SirinBuilds
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Quick Value Guarantees */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-700 text-xs sm:text-sm font-medium">
          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <Smartphone className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="font-semibold text-slate-800">100% Mobile Ready</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="font-semibold text-slate-800">Free SSL & Security</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <Zap className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="font-semibold text-slate-800">Ultra-Fast PageSpeed</span>
          </div>
        </div>

      </div>
    </section>
  );
};

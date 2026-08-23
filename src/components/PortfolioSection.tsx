import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
  CheckCircle2,
  X,
  Smartphone,
  Monitor,
  Tablet,
} from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/content';
import { PortfolioProject } from '../types';

interface PortfolioSectionProps {
  onOpenQuoteModal: (packageId?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenQuoteModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const categories = [
    'All',
    'Business Websites',
    'Landing Pages',
    'Web Applications',
    'Branding',
  ];

  const filteredProjects = activeCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-white relative border-t border-slate-200/90">
      {/* Background glow accents */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>Interactive Demos & Case Studies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our Work
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Explore our curated showcase of responsive business websites, web portals, and modern brand experiences.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                id={`filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`portfolio-card-${project.id}`}
              className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-teal-400 hover:-translate-y-1 hover:shadow-xl group shadow-sm text-left"
            >
              {/* Project Image Frame */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="%230F172A"><rect width="800" height="450" fill="%230B132B"/><circle cx="400" cy="160" r="30" fill="%2314B8A6" opacity="0.2"/><text x="400" y="230" fill="%2338BDF8" font-size="24" font-weight="bold" text-anchor="middle" font-family="system-ui,sans-serif">${encodeURIComponent(project.title)}</text><text x="400" y="265" fill="%2394A3B8" font-size="15" text-anchor="middle" font-family="system-ui,sans-serif">${encodeURIComponent(project.category)}</text></svg>`;
                    e.currentTarget.src = fallbackSvg;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/95 backdrop-blur-md text-teal-800 border border-slate-200 font-mono shadow-sm">
                    {project.category}
                  </span>
                </div>

                {/* Metric pill */}
                {project.metrics && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-[11px] font-bold text-teal-300 border border-teal-500/30 font-mono">
                    {project.metrics.label}: {project.metrics.value}
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {project.shortDesc}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-teal-600 text-slate-800 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-left"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                {selectedProject.category}
              </span>
              {selectedProject.metrics && (
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 font-mono">
                  {selectedProject.metrics.label}: {selectedProject.metrics.value}
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              {selectedProject.title}
            </h3>

            {/* Device Viewport Preview Simulator */}
            <div className="mb-6 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-inner">
              {/* Simulator Toolbar */}
              <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-xs font-mono text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                    {selectedProject.liveUrlMock}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setDevicePreview('desktop')}
                    className={`p-1 rounded ${devicePreview === 'desktop' ? 'bg-teal-500/30 text-teal-300' : 'text-slate-500'}`}
                    title="Desktop Preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDevicePreview('tablet')}
                    className={`p-1 rounded ${devicePreview === 'tablet' ? 'bg-teal-500/30 text-teal-300' : 'text-slate-500'}`}
                    title="Tablet Preview"
                  >
                    <Tablet className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDevicePreview('mobile')}
                    className={`p-1 rounded ${devicePreview === 'mobile' ? 'bg-teal-500/30 text-teal-300' : 'text-slate-500'}`}
                    title="Mobile Preview"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dynamic Viewport Container */}
              <div className="p-4 flex justify-center bg-slate-950 min-h-[260px] items-center">
                <div
                  className={`transition-all duration-300 overflow-hidden rounded-lg border border-slate-800 shadow-xl ${
                    devicePreview === 'desktop'
                      ? 'w-full aspect-video'
                      : devicePreview === 'tablet'
                      ? 'w-[75%] aspect-[4/3]'
                      : 'w-[280px] aspect-[9/16]'
                  }`}
                >
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="%230F172A"><rect width="800" height="450" fill="%230B132B"/><circle cx="400" cy="160" r="30" fill="%2314B8A6" opacity="0.2"/><text x="400" y="230" fill="%2338BDF8" font-size="24" font-weight="bold" text-anchor="middle" font-family="system-ui,sans-serif">${encodeURIComponent(selectedProject.title)}</text><text x="400" y="265" fill="%2394A3B8" font-size="15" text-anchor="middle" font-family="system-ui,sans-serif">${encodeURIComponent(selectedProject.category)}</text></svg>`;
                      e.currentTarget.src = fallbackSvg;
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Description & Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
                  Project Overview
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedProject.fullDesc}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
                    Key Highlights
                  </h4>
                  <div className="space-y-1.5">
                    {selectedProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
                    Scope of Deliverables
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.deliverables.map((del, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md text-xs bg-teal-50 text-teal-800 border border-teal-200 font-medium"
                      >
                        ✓ {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-600 border border-slate-200">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedProject(null);
                  onOpenQuoteModal('professional');
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span>Build Similar Website</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

import React from 'react';
import {
  Sparkles,
  Shield,
  Zap,
  CheckCircle2,
  HeartHandshake,
  Layers,
  Code2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const pillars = [
    {
      title: 'Quality',
      desc: 'Clean, semantic code, modular components, and pixel-precise design executed with zero shortcuts.',
      icon: Code2,
      color: 'text-teal-600',
    },
    {
      title: 'Performance',
      desc: 'Ultra-fast loading times, optimized assets, and top-tier Core Web Vitals to maximize search ranking and retention.',
      icon: Zap,
      color: 'text-amber-600',
    },
    {
      title: 'Security',
      desc: 'HTTPS encryption, robust DNS routing, automated cloud backups, and proactive threat mitigation built-in.',
      icon: Lock,
      color: 'text-teal-600',
    },
    {
      title: 'Modern Design',
      desc: 'Sophisticated aesthetics, refined typography, and intuitive UX tailored for international audiences.',
      icon: Layers,
      color: 'text-cyan-600',
    },
    {
      title: 'Customer Satisfaction',
      desc: 'Transparent pricing, structured revision phases, and direct developer communication at every stage.',
      icon: HeartHandshake,
      color: 'text-rose-600',
    },
    {
      title: 'Long-Term Support',
      desc: 'Ongoing maintenance, security patches, and scalable architecture designed to grow as your business expands.',
      icon: Shield,
      color: 'text-emerald-600',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative border-t border-slate-200/90">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Our Foundation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            About SirinBuilds
          </h2>

          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal">
            SirinBuilds helps individuals, startups and businesses establish a strong digital presence through modern websites, hosting and digital solutions.
          </p>
        </div>

        {/* Company Narrative & Technical Standard Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 text-left">
          
          <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-5 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">
              Engineering Digital Excellence Without Compromise
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              We believe a website is the cornerstone of any modern brand. Rather than relying on slow, bloated website builders or generic cookie-cutter templates, SirinBuilds develops clean, high-performance web systems tailored to your exact business objectives.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              From individual professionals launching personal portfolios to established organizations scaling their digital reach, we provide the technical craftsmanship, cloud infrastructure, and dedicated post-launch care required for real online success.
            </p>

            <div className="pt-4 border-t border-slate-200 flex items-center gap-4">
              <BrandLogo size="sm" theme="light" />
              <div className="text-xs text-slate-500 font-medium">
                Official Digital Partner for Modern Businesses
              </div>
            </div>
          </div>

          {/* Technical Standards Card */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-white border-2 border-teal-500/40 shadow-xl shadow-teal-900/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">
                Our Technology Standard
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-bold">
                100% Production Grade
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Zero Bloat & Peak Speed</div>
                  <div className="text-[11px] text-slate-600">Modern component architecture with swift asset delivery.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Full Responsive Fluidity</div>
                  <div className="text-[11px] text-slate-600">Precision layout testing across all device viewports.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Secure Cloud Hosting</div>
                  <div className="text-[11px] text-slate-600">SSL certificates, daily backups, and reliable global CDN.</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 6 Value Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-teal-400 hover:bg-white transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-sm">
                  <Icon className={`w-6 h-6 ${p.color}`} />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {p.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left space-y-1">
            <h4 className="text-xl font-bold">Ready to take your business online?</h4>
            <p className="text-xs sm:text-sm text-teal-100">Get a personalized project proposal and timeline tailored to your goals.</p>
          </div>
          <button
            onClick={onContactClick}
            className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 hover:bg-teal-50 font-bold text-xs transition-all shadow-md flex items-center gap-2 shrink-0"
          >
            <span>Start Consultation</span>
            <ArrowRight className="w-4 h-4 text-teal-700" />
          </button>
        </div>

      </div>
    </section>
  );
};

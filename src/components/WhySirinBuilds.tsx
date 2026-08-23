import React from 'react';
import { Zap, Award, Check } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/content';
import { IconHelper } from './IconHelper';

export const WhySirinBuilds: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-white relative border-t border-slate-200/90 overflow-hidden">
      {/* Glow elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-teal-100/30 via-cyan-100/20 to-teal-50/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Award className="w-3.5 h-3.5 text-teal-600" />
            <span>Built on Trust & Performance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Why Choose SirinBuilds?
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            We combine modern engineering, transparent pricing, and unwavering reliability to deliver digital platforms that actually perform.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-left">
          {WHY_CHOOSE_US.map((item) => {
            return (
              <div
                key={item.id}
                id={`why-card-${item.id}`}
                className="relative rounded-3xl bg-slate-50 border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-teal-400 hover:bg-white hover:-translate-y-1.5 transition-all duration-300 group shadow-sm hover:shadow-xl"
              >
                {/* Top Badge & Metric */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-teal-700 group-hover:bg-teal-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm">
                      <IconHelper name={item.iconName} className="w-6 h-6" />
                    </div>

                    <span className="font-mono text-xl font-extrabold text-teal-700">
                      {item.metric}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom verified check */}
                <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Check className="w-4 h-4 text-teal-600" />
                  <span>{item.metricLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality commitment strip */}
        <div className="mt-12 p-6 rounded-3xl bg-teal-50/50 border border-teal-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-700 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Direct Developer Access & Zero Red Tape</div>
              <div className="text-xs text-slate-600">Collaborate directly with senior developers who build your application.</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-teal-800 font-semibold shrink-0">
            <span>• Clean TypeScript</span>
            <span>• High Performance</span>
            <span>• Scalable Cloud Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../data/content';
import { IconHelper } from './IconHelper';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 lg:py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Clear Production Roadmap</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A structured, transparent 6-step journey from initial concept to your live, high-performance website.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
            {PROCESS_STEPS.map((stepItem) => {
              return (
                <div
                  key={stepItem.step}
                  id={`process-step-${stepItem.step}`}
                  className="relative w-full rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-teal-400 hover:-translate-y-1 group shadow-sm hover:shadow-xl"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shrink-0 shadow-sm">
                        <IconHelper name={stepItem.iconName} className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {stepItem.timeframe}
                        </span>
                        <span className="font-mono text-xl font-black text-slate-300 group-hover:text-teal-600 transition-colors">
                          0{stepItem.step}
                        </span>
                      </div>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                      Step {stepItem.step} — {stepItem.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {stepItem.shortDesc}
                    </p>
                  </div>

                  {/* Deliverables checklist */}
                  <div className="pt-4 border-t border-slate-100 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      Milestone Deliverables:
                    </div>
                    {stepItem.deliverables.map((del, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Zap, ShieldCheck, Smartphone, Headphones } from 'lucide-react';
import { VALUE_POINTS } from '../data/content';

export const TrustBar: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-cyan-600" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-blue-600" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section className="relative py-8 bg-white border-y border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {VALUE_POINTS.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-400 hover:bg-teal-50/30 transition-all duration-300 group shadow-sm"
            >
              <div className="p-3 rounded-xl bg-white border border-slate-200 group-hover:scale-105 group-hover:border-teal-300 transition-all shrink-0 shadow-sm">
                {getIcon(point.icon)}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                    {point.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {point.desc}
                </p>
                <div className="mt-2 inline-block text-[11px] font-bold text-teal-700 font-mono">
                  ✓ {point.badge}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

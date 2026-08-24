import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { ServiceItem } from '../types';
import { IconHelper } from './IconHelper';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { content } = useContent();
  const servicesList = content.services || [];

  const categoriesSet = new Set<string>();
  servicesList.forEach((s) => {
    if (s.category) categoriesSet.add(s.category);
  });
  const categories: string[] = ['All', ...Array.from(categoriesSet)];

  const filteredServices = selectedCategory === 'All'
    ? servicesList
    : servicesList.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="services" className="py-24 bg-[#F8FAFC] relative">
      {/* Background soft glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Comprehensive Digital Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our Solutions
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Everything you need to build and grow your digital presence.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 hover:border-slate-300 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => {
            const isECommerce = service.id === 'ecommerce';
            const isWebDev = service.id === 'web-dev';

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`relative rounded-3xl bg-white border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${
                  isWebDev || isECommerce
                    ? 'border-teal-400 shadow-md shadow-teal-900/5 ring-1 ring-teal-200/50'
                    : 'border-slate-200 shadow-sm hover:border-teal-300'
                }`}
              >
                {/* Top service header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all shadow-sm">
                        <IconHelper name={service.iconName} className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {service.number}
                      </span>
                    </div>

                    {service.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Included features list */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100 mb-6 text-left">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      Key Inclusions:
                    </div>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA & Info */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  {service.deliveryTime && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{service.deliveryTime}</span>
                    </div>
                  )}

                  <button
                    onClick={() => onSelectService(service.title)}
                    className={`ml-auto px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 group/btn ${
                      isECommerce || isWebDev
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-sm hover:shadow-md'
                        : 'bg-slate-100 hover:bg-teal-50 text-slate-800 hover:text-teal-700 border border-slate-200'
                    }`}
                  >
                    <span>Request Details</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  ArrowRight,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { PRICING_PACKAGES } from '../data/content';
import { PricingPackage } from '../types';

interface PricingSectionProps {
  onSelectPackage: (pkgId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const formatPrice = (pkg: PricingPackage) => {
    if (pkg.isCustom) return 'Custom Pricing';
    if (currency === 'USD') {
      const usdValue = Math.round(pkg.priceINR / 83);
      return `$${usdValue.toLocaleString()}`;
    }
    return `₹${pkg.priceINR.toLocaleString('en-IN')}`;
  };

  return (
    <section id="pricing" className="py-24 bg-[#F8FAFC] relative">
      {/* Ambient background */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Transparent Investment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Packages & Pricing
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Choose the solution that fits your business.
          </p>

          {/* Currency Switcher */}
          <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-white border border-slate-200 text-xs font-semibold shadow-sm">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-4 py-1.5 rounded-xl transition-all ${
                currency === 'INR'
                  ? 'bg-teal-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              INR (₹) India
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-1.5 rounded-xl transition-all ${
                currency === 'USD'
                  ? 'bg-teal-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              USD ($) Global
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (5 Packages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch justify-center">
          {PRICING_PACKAGES.map((pkg) => {
            const isPopular = pkg.isPopular;
            const isEnterprise = pkg.isCustom;

            return (
              <div
                key={pkg.id}
                id={`pricing-card-${pkg.id}`}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-white border-2 border-teal-500 shadow-xl shadow-teal-900/10 lg:-translate-y-2'
                    : 'bg-white border border-slate-200 shadow-sm hover:border-teal-300 hover:shadow-md'
                }`}
              >
                {/* Popular Ribbon */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <Flame className="w-3.5 h-3.5 fill-white text-white" />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                <div className="text-left">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-wide font-mono">
                      {pkg.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 mb-6 min-h-[32px]">
                    {pkg.targetAudience}
                  </p>

                  {/* Price Tag */}
                  <div className="pb-6 mb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">
                        {formatPrice(pkg)}
                      </span>
                      {!isEnterprise && (
                        <span className="text-xs font-medium text-slate-500">
                          {pkg.priceNote}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      Included In This Plan:
                    </div>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <div className={`mt-0.5 rounded-full p-0.5 ${isPopular ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-700'} shrink-0`}>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onSelectPackage(pkg.id)}
                    className={`w-full py-3.5 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md hover:shadow-lg hover:scale-[1.02]'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>Select {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
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

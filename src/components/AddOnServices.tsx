import React from 'react';
import {
  Sparkles,
  Check,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { IconHelper } from './IconHelper';

interface AddOnServicesProps {
  selectedAddOns: string[];
  onToggleAddOn: (id: string) => void;
  onOpenQuoteModal: (packageId?: string) => void;
}

export const AddOnServices: React.FC<AddOnServicesProps> = ({
  selectedAddOns,
  onToggleAddOn,
  onOpenQuoteModal,
}) => {
  const { content } = useContent();
  const addOns = content.addOnServices || [];

  const selectedCount = selectedAddOns.length;
  const totalAddOnCost = selectedAddOns.reduce((sum, id) => {
    const item = addOns.find((a) => a.id === id);
    return sum + (item ? item.priceINR : 0);
  }, 0);

  return (
    <section className="py-16 bg-white border-y border-slate-200/90 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-2 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Modular Upgrades</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Add-On Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Customize your package with high-impact complementary services. Click to select.
            </p>
          </div>

          {/* Interactive Dynamic Total Pill */}
          {selectedCount > 0 && (
            <div className="p-3 px-4 rounded-2xl bg-teal-50/70 border border-teal-300 flex items-center justify-between gap-4 animate-in fade-in duration-200 shadow-sm">
              <div className="text-left">
                <div className="text-[11px] text-slate-500 font-mono">
                  {selectedCount} Add-on{selectedCount > 1 ? 's' : ''} Selected
                </div>
                <div className="text-base font-bold text-teal-900 font-mono">
                  + ₹{totalAddOnCost.toLocaleString('en-IN')}
                </div>
              </div>
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1 transition-transform hover:scale-105 shadow-sm"
              >
                <span>Apply To Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Clickable Add-On Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addOns.map((item) => {
            const isSelected = selectedAddOns.includes(item.id);

            return (
              <div
                key={item.id}
                id={`addon-card-${item.id}`}
                onClick={() => onToggleAddOn(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggleAddOn(item.id);
                  }
                }}
                className={`relative p-5 rounded-2xl border text-left cursor-pointer transition-all duration-200 select-none flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-teal-50/60 border-teal-500 shadow-md ring-1 ring-teal-400'
                    : 'bg-slate-50 border-slate-200 hover:border-teal-300 hover:bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-teal-600 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-teal-700 group-hover:border-teal-300'
                      }`}
                    >
                      <IconHelper name={item.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">
                        {item.name}
                      </h4>
                      <div className="text-xs font-mono font-bold text-teal-700">
                        {item.price} {item.period ? <span className="text-slate-500 font-normal">{item.period}</span> : ''}
                      </div>
                    </div>
                  </div>

                  {/* Selection Checkbox */}
                  <div
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-teal-600 border-teal-600 text-white'
                        : 'border-slate-300 bg-white group-hover:border-teal-400'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

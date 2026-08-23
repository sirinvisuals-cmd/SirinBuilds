import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Check,
  Plus,
  ArrowRight,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { PRICING_PACKAGES, ADD_ON_SERVICES, BRAND } from '../data/content';

interface ProjectQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackageId?: string;
  selectedAddOns: string[];
  onToggleAddOn: (id: string) => void;
}

export const ProjectQuoteModal: React.FC<ProjectQuoteModalProps> = ({
  isOpen,
  onClose,
  defaultPackageId = 'professional',
  selectedAddOns,
  onToggleAddOn,
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(defaultPackageId);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync default package
  React.useEffect(() => {
    if (defaultPackageId) {
      setSelectedPkgId(defaultPackageId);
    }
  }, [defaultPackageId]);

  if (!isOpen) return null;

  const currentPkg = PRICING_PACKAGES.find((p) => p.id === selectedPkgId) || PRICING_PACKAGES[2];
  
  const baseCost = currentPkg.priceINR;
  const addOnsCost = selectedAddOns.reduce((acc, id) => {
    const item = ADD_ON_SERVICES.find((a) => a.id === id);
    return acc + (item ? item.priceINR : 0);
  }, 0);

  const totalEstimate = baseCost + addOnsCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getMailtoLink = () => {
    const addOnNames = selectedAddOns
      .map((id) => ADD_ON_SERVICES.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const subject = encodeURIComponent(`Project Configuration: ${currentPkg.name} Plan from ${name || 'Client'}`);
    const body = encodeURIComponent(
      `Hello SirinBuilds,\n\n` +
      `I would like to configure a project with the following details:\n\n` +
      `Package: ${currentPkg.name} (Base: ₹${baseCost.toLocaleString('en-IN')})\n` +
      `Selected Add-ons: ${addOnNames || 'None'} (+₹${addOnsCost.toLocaleString('en-IN')})\n` +
      `Total Estimated Investment: ₹${totalEstimate.toLocaleString('en-IN')}\n\n` +
      `Contact Info:\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || 'N/A'}\n\n` +
      `Additional Notes / Requirements:\n${notes || 'Standard package inclusions'}\n`
    );
    return `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center mx-auto text-teal-700">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900">
                Configuration Ready!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your estimated package for <strong className="text-teal-700">{currentPkg.name}</strong> (₹{totalEstimate.toLocaleString('en-IN')}) has been generated.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getMailtoLink()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Launch Direct Email</span>
              </a>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold transition-colors border border-slate-200"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-mono font-bold mb-2 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Custom Project Configurator</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Configure Your SirinBuilds Solution
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Select your base tier and modular add-ons to see instant pricing and submit your requirements.
              </p>
            </div>

            {/* Package Selector Pills */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 font-bold mb-2">
                1. Select Base Plan
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRICING_PACKAGES.map((pkg) => {
                  const isSelected = selectedPkgId === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-teal-50 border-teal-500 text-slate-900 shadow-sm ring-1 ring-teal-400'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                        <span>{pkg.name}</span>
                        {isSelected && <Check className="w-3 h-3 text-teal-600" />}
                      </div>
                      <div className="text-[11px] font-mono text-teal-700 font-semibold mt-0.5">
                        {pkg.isCustom ? 'Custom' : `₹${pkg.priceINR.toLocaleString('en-IN')}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add-on Services Checkboxes */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-600 font-bold mb-2">
                2. Choose Modular Add-Ons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADD_ON_SERVICES.map((item) => {
                  const isSelected = selectedAddOns.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => onToggleAddOn(item.id)}
                      className={`p-2.5 px-3 rounded-2xl border flex items-center justify-between cursor-pointer text-xs transition-all ${
                        isSelected
                          ? 'bg-teal-50 border-teal-500 text-slate-900 ring-1 ring-teal-400'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{item.name}</div>
                        <div className="text-[10px] text-teal-700 font-mono font-bold">
                          +{item.price} {item.period || ''}
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                          isSelected ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-slate-400" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Estimate Bar */}
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-center justify-between shadow-sm">
              <div>
                <div className="text-xs text-slate-500 font-mono uppercase tracking-wider font-semibold">
                  Estimated Total Investment:
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {currentPkg.isCustom
                    ? 'Custom Scope'
                    : `₹${totalEstimate.toLocaleString('en-IN')}`}
                </div>
              </div>
              <div className="text-[11px] text-teal-800 font-mono font-bold">
                ✓ No Hidden Costs
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-mono uppercase text-slate-600 font-bold">
                3. Your Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-teal-500 placeholder-slate-400"
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-teal-500 placeholder-slate-400"
                />
              </div>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone / WhatsApp (Optional)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-teal-500 placeholder-slate-400"
              />

              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special features, reference links, or target launch deadline..."
                className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-teal-500 placeholder-slate-400"
              />
            </div>

            {/* Modal Submit CTA */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Submit Project Specification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Globe,
  Layout,
  DollarSign,
  Sparkles,
  Briefcase,
  Layers,
  HelpCircle,
  Info,
  Sliders,
  Check,
  Eye,
  AlertCircle,
  Copy,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import {
  ServiceItem,
  PricingPackage,
  AddOnService,
  PortfolioProject,
  ProcessStep,
  WhyChoosePoint,
  FAQItem,
} from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType =
  | 'brand'
  | 'hero'
  | 'services'
  | 'pricing'
  | 'addons'
  | 'portfolio'
  | 'process'
  | 'whyus'
  | 'about'
  | 'faqs'
  | 'cta'
  | 'json';

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const {
    content,
    updateBrand,
    updateHero,
    updateServices,
    updatePricingPackages,
    updateAddOnServices,
    updatePortfolioProjects,
    updateProcessSteps,
    updateWhyChoosePoints,
    updateAbout,
    updateFaqs,
    updateCtaBanner,
    resetToDefaults,
    exportJson,
    importJson,
  } = useContent();

  const [activeTab, setActiveTab] = useState<TabType>('brand');
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState<string>('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3500);
  };

  const handleExport = () => {
    const jsonStr = exportJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sirinbuilds-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Configuration exported successfully!');
  };

  const handleImport = () => {
    if (!jsonInput.trim()) {
      setJsonError('Please paste valid JSON content.');
      return;
    }
    const res = importJson(jsonInput);
    if (res.success) {
      setJsonError(null);
      setJsonInput('');
      showNotification('Configuration imported and applied!');
    } else {
      setJsonError(res.error || 'Failed to import JSON.');
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(exportJson());
    showNotification('JSON copied to clipboard!');
  };

  const handleReset = () => {
    resetToDefaults();
    setShowResetConfirm(false);
    showNotification('Reset to factory default content!');
  };

  // Helper for Array / List fields
  const handleArrayItemChange = (
    list: string[],
    index: number,
    newValue: string,
    onUpdate: (newList: string[]) => void
  ) => {
    const next = [...list];
    next[index] = newValue;
    onUpdate(next);
  };

  const handleAddArrayItem = (list: string[], onUpdate: (newList: string[]) => void) => {
    onUpdate([...list, 'New Item']);
  };

  const handleRemoveArrayItem = (
    list: string[],
    index: number,
    onUpdate: (newList: string[]) => void
  ) => {
    onUpdate(list.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Toast */}
      {saveToast && (
        <div className="fixed top-6 right-6 z-[60] flex items-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-sm font-semibold animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-teal-200" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Reset Content to Defaults?</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              This will overwrite all custom modifications and restore original SirinBuilds copy and pricing. This cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Admin Dialog */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold tracking-tight">SirinBuilds Content Admin</h2>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30">
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Edit website texts, pricing, services, projects, and contact info in real-time.
              </p>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
              title="Download backup JSON"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('json');
                setJsonInput(exportJson());
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
              title="View or edit raw JSON"
            >
              <Copy className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">JSON</span>
            </button>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 text-xs font-medium flex items-center gap-1.5 border border-slate-700 hover:border-red-800/60 transition-colors"
              title="Reset all content to original defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              type="button"
              onClick={() => {
                showNotification('All edits are live & saved automatically!');
                onClose();
              }}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white text-xs font-semibold shadow-md flex items-center gap-1.5 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Done</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close admin panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Layout: Sidebar Tabs + Scrollable Editor */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50">
          
          {/* Navigation Sidebar */}
          <div className="w-full md:w-56 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-2 sm:p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
            <TabButton
              id="admin-tab-brand"
              label="Brand & Contacts"
              icon={<Globe className="w-4 h-4" />}
              isActive={activeTab === 'brand'}
              onClick={() => setActiveTab('brand')}
            />
            <TabButton
              id="admin-tab-hero"
              label="Hero Section"
              icon={<Layout className="w-4 h-4" />}
              isActive={activeTab === 'hero'}
              onClick={() => setActiveTab('hero')}
            />
            <TabButton
              id="admin-tab-services"
              label="Services (8)"
              icon={<Sparkles className="w-4 h-4" />}
              isActive={activeTab === 'services'}
              onClick={() => setActiveTab('services')}
            />
            <TabButton
              id="admin-tab-pricing"
              label="Pricing Plans"
              icon={<DollarSign className="w-4 h-4" />}
              isActive={activeTab === 'pricing'}
              onClick={() => setActiveTab('pricing')}
            />
            <TabButton
              id="admin-tab-addons"
              label="Add-On Services"
              icon={<Plus className="w-4 h-4" />}
              isActive={activeTab === 'addons'}
              onClick={() => setActiveTab('addons')}
            />
            <TabButton
              id="admin-tab-portfolio"
              label="Portfolio Projects"
              icon={<Briefcase className="w-4 h-4" />}
              isActive={activeTab === 'portfolio'}
              onClick={() => setActiveTab('portfolio')}
            />
            <TabButton
              id="admin-tab-process"
              label="Workflow Process"
              icon={<Layers className="w-4 h-4" />}
              isActive={activeTab === 'process'}
              onClick={() => setActiveTab('process')}
            />
            <TabButton
              id="admin-tab-whyus"
              label="Why Choose Points"
              icon={<Check className="w-4 h-4" />}
              isActive={activeTab === 'whyus'}
              onClick={() => setActiveTab('whyus')}
            />
            <TabButton
              id="admin-tab-about"
              label="About & Guarantees"
              icon={<Info className="w-4 h-4" />}
              isActive={activeTab === 'about'}
              onClick={() => setActiveTab('about')}
            />
            <TabButton
              id="admin-tab-faqs"
              label="FAQs & Answers"
              icon={<HelpCircle className="w-4 h-4" />}
              isActive={activeTab === 'faqs'}
              onClick={() => setActiveTab('faqs')}
            />
            <TabButton
              id="admin-tab-cta"
              label="Bottom CTA Banner"
              icon={<Sparkles className="w-4 h-4" />}
              isActive={activeTab === 'cta'}
              onClick={() => setActiveTab('cta')}
            />
            <TabButton
              id="admin-tab-json"
              label="Backup & Raw JSON"
              icon={<Copy className="w-4 h-4" />}
              isActive={activeTab === 'json'}
              onClick={() => {
                setActiveTab('json');
                setJsonInput(exportJson());
              }}
            />
          </div>

          {/* Editor Workspace */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-slate-50/60">
            
            {/* 1. BRAND & CONTACTS */}
            {activeTab === 'brand' && (
              <div className="max-w-4xl space-y-6">
                <SectionTitle
                  title="Brand Identity & Contact Information"
                  description="Customize your brand name, tagline, email, phone number, and official social media URLs."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Brand Name"
                    value={content.brand.name}
                    onChange={(v) => updateBrand({ name: v })}
                    placeholder="SirinBuilds"
                  />
                  <InputField
                    label="Tagline"
                    value={content.brand.tagline}
                    onChange={(v) => updateBrand({ tagline: v })}
                    placeholder="Building Digital Success"
                  />
                  <InputField
                    label="Business Type / Headline Tag"
                    value={content.brand.businessType}
                    onChange={(v) => updateBrand({ businessType: v })}
                    placeholder="Website Development, Web Hosting & Digital Solutions"
                  />
                  <InputField
                    label="Contact Email"
                    value={content.brand.email}
                    onChange={(v) => updateBrand({ email: v })}
                    placeholder="sirinbuilds@gmail.com"
                  />
                  <InputField
                    label="Contact Phone / WhatsApp"
                    value={content.brand.phone}
                    onChange={(v) => updateBrand({ phone: v })}
                    placeholder="+91 98765 43210"
                  />
                  <InputField
                    label="Copyright Year"
                    value={content.brand.year}
                    onChange={(v) => updateBrand({ year: v })}
                    placeholder="2026"
                  />
                  <InputField
                    label="Instagram Handle"
                    value={content.brand.instagram}
                    onChange={(v) => updateBrand({ instagram: v })}
                    placeholder="@sirinbuilds"
                  />
                  <InputField
                    label="Instagram URL"
                    value={content.brand.instagramUrl}
                    onChange={(v) => updateBrand({ instagramUrl: v })}
                    placeholder="https://instagram.com/sirinbuilds"
                  />
                  <InputField
                    label="YouTube Handle"
                    value={content.brand.youtube}
                    onChange={(v) => updateBrand({ youtube: v })}
                    placeholder="@sirinbuilds"
                  />
                  <InputField
                    label="YouTube Channel URL"
                    value={content.brand.youtubeUrl}
                    onChange={(v) => updateBrand({ youtubeUrl: v })}
                    placeholder="https://youtube.com/@sirinbuilds"
                  />
                </div>
              </div>
            )}

            {/* 2. HERO SECTION */}
            {activeTab === 'hero' && (
              <div className="max-w-4xl space-y-6">
                <SectionTitle
                  title="Hero Section & Key Statistics"
                  description="Adjust top headline typography, value propositions, call-to-action buttons, and trust metrics."
                />

                <InputField
                  label="Hero Badge Label"
                  value={content.hero.badge}
                  onChange={(v) => updateHero({ badge: v })}
                  placeholder="High-Performance Web Engineering & Hosting"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Headline Part 1"
                    value={content.hero.titleLine1}
                    onChange={(v) => updateHero({ titleLine1: v })}
                    placeholder="Building Digital Success for Modern"
                  />
                  <InputField
                    label="Headline Highlight Text (Teal Gradient)"
                    value={content.hero.titleHighlight}
                    onChange={(v) => updateHero({ titleHighlight: v })}
                    placeholder="Businesses & Creators"
                  />
                </div>

                <TextareaField
                  label="Hero Subtitle / Description"
                  value={content.hero.description}
                  onChange={(v) => updateHero({ description: v })}
                  rows={3}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Primary CTA Button Text"
                    value={content.hero.primaryCta}
                    onChange={(v) => updateHero({ primaryCta: v })}
                    placeholder="Get Free Estimate"
                  />
                  <InputField
                    label="Secondary CTA Button Text"
                    value={content.hero.secondaryCta}
                    onChange={(v) => updateHero({ secondaryCta: v })}
                    placeholder="Explore Services"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-800 font-bold mb-3">
                    Hero Trust Metric Counters (3 items)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {content.hero.stats.map((stat, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                        <InputField
                          label={`Stat #${idx + 1} Big Value`}
                          value={stat.value}
                          onChange={(v) => {
                            const newStats = [...content.hero.stats];
                            newStats[idx].value = v;
                            updateHero({ stats: newStats });
                          }}
                        />
                        <InputField
                          label="Metric Label"
                          value={stat.label}
                          onChange={(v) => {
                            const newStats = [...content.hero.stats];
                            newStats[idx].label = v;
                            updateHero({ stats: newStats });
                          }}
                        />
                        <InputField
                          label="Helper Sub-label"
                          value={stat.helper}
                          onChange={(v) => {
                            const newStats = [...content.hero.stats];
                            newStats[idx].helper = v;
                            updateHero({ stats: newStats });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. SERVICES */}
            {activeTab === 'services' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <SectionTitle
                    title="Services Catalog"
                    description="Add, edit, or customize all core offerings, included features, delivery timelines, and badges."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newId = `service-${Date.now()}`;
                      const newService: ServiceItem = {
                        id: newId,
                        number: `0${content.services.length + 1}`,
                        title: 'New Service',
                        category: 'Development',
                        shortDesc: 'Description of the new service offering.',
                        features: ['Feature 1', 'Feature 2', 'Feature 3'],
                        ctaText: 'Learn More',
                        badge: 'New',
                        iconName: 'Layout',
                        deliveryTime: '3-7 Days',
                      };
                      updateServices([...content.services, newService]);
                      showNotification('Added new service item!');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {content.services.map((service, index) => (
                    <div
                      key={service.id}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 text-xs font-mono font-bold flex items-center justify-center">
                            {service.number || index + 1}
                          </span>
                          <span className="font-bold text-slate-900 text-sm">{service.title}</span>
                          {service.badge && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-bold">
                              {service.badge}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            updateServices(content.services.filter((s) => s.id !== service.id));
                            showNotification('Deleted service');
                          }}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <InputField
                          label="Title"
                          value={service.title}
                          onChange={(v) => {
                            const copy = [...content.services];
                            copy[index].title = v;
                            updateServices(copy);
                          }}
                        />
                        <InputField
                          label="Category"
                          value={service.category}
                          onChange={(v) => {
                            const copy = [...content.services];
                            copy[index].category = v;
                            updateServices(copy);
                          }}
                        />
                        <InputField
                          label="Delivery Timeframe"
                          value={service.deliveryTime || ''}
                          onChange={(v) => {
                            const copy = [...content.services];
                            copy[index].deliveryTime = v;
                            updateServices(copy);
                          }}
                        />
                      </div>

                      <TextareaField
                        label="Short Description"
                        value={service.shortDesc}
                        onChange={(v) => {
                          const copy = [...content.services];
                          copy[index].shortDesc = v;
                          updateServices(copy);
                        }}
                        rows={2}
                      />

                      {/* Feature Items List */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold text-slate-700">
                            Included Service Bullets ({service.features.length})
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              handleAddArrayItem(service.features, (newF) => {
                                const copy = [...content.services];
                                copy[index].features = newF;
                                updateServices(copy);
                              })
                            }
                            className="text-[11px] text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Add Feature
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) =>
                                  handleArrayItemChange(
                                    service.features,
                                    fIdx,
                                    e.target.value,
                                    (newF) => {
                                      const copy = [...content.services];
                                      copy[index].features = newF;
                                      updateServices(copy);
                                    }
                                  )
                                }
                                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-teal-500"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveArrayItem(service.features, fIdx, (newF) => {
                                    const copy = [...content.services];
                                    copy[index].features = newF;
                                    updateServices(copy);
                                  })
                                }
                                className="text-slate-400 hover:text-red-500 p-1 shrink-0"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. PRICING PACKAGES */}
            {activeTab === 'pricing' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <SectionTitle
                    title="Pricing Packages (INR)"
                    description="Configure package rates, target audiences, included perks, and highlighted tiers."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newPkg: PricingPackage = {
                        id: `pkg-${Date.now()}`,
                        name: 'CUSTOM TIER',
                        priceINR: 14999,
                        priceNote: 'starting from',
                        targetAudience: 'For specialized requirements',
                        features: ['Responsive Design', 'Speed Optimization', '3 Revisions'],
                        buttonText: 'Get Started',
                      };
                      updatePricingPackages([...content.pricingPackages, newPkg]);
                      showNotification('Added new pricing tier!');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Tier</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {content.pricingPackages.map((pkg, index) => (
                    <div
                      key={pkg.id}
                      className={`bg-white p-4 sm:p-5 rounded-2xl border ${
                        pkg.isPopular ? 'border-teal-400 ring-2 ring-teal-500/20' : 'border-slate-200'
                      } shadow-sm space-y-4`}
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm uppercase">{pkg.name}</span>
                          <span className="text-xs font-mono text-teal-700 font-bold">
                            {pkg.isCustom ? 'Custom Quote' : `₹${pkg.priceINR.toLocaleString('en-IN')}`}
                          </span>
                          {pkg.isPopular && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500 text-white font-bold">
                              MOST POPULAR
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1 text-xs text-slate-600 font-medium cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!pkg.isPopular}
                              onChange={(e) => {
                                const copy = [...content.pricingPackages];
                                copy[index].isPopular = e.target.checked;
                                updatePricingPackages(copy);
                              }}
                              className="rounded text-teal-600 focus:ring-teal-500"
                            />
                            <span>Popular</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              updatePricingPackages(content.pricingPackages.filter((p) => p.id !== pkg.id));
                              showNotification('Deleted package');
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 transition-colors ml-2"
                            title="Delete Package"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <InputField
                          label="Package Name"
                          value={pkg.name}
                          onChange={(v) => {
                            const copy = [...content.pricingPackages];
                            copy[index].name = v;
                            updatePricingPackages(copy);
                          }}
                        />
                        <InputField
                          label="Price in INR (₹)"
                          type="number"
                          value={pkg.priceINR.toString()}
                          onChange={(v) => {
                            const copy = [...content.pricingPackages];
                            copy[index].priceINR = Number(v) || 0;
                            updatePricingPackages(copy);
                          }}
                        />
                        <InputField
                          label="Price Note (e.g. starting from)"
                          value={pkg.priceNote}
                          onChange={(v) => {
                            const copy = [...content.pricingPackages];
                            copy[index].priceNote = v;
                            updatePricingPackages(copy);
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InputField
                          label="Target Audience"
                          value={pkg.targetAudience}
                          onChange={(v) => {
                            const copy = [...content.pricingPackages];
                            copy[index].targetAudience = v;
                            updatePricingPackages(copy);
                          }}
                        />
                        <InputField
                          label="Button CTA Text"
                          value={pkg.buttonText}
                          onChange={(v) => {
                            const copy = [...content.pricingPackages];
                            copy[index].buttonText = v;
                            updatePricingPackages(copy);
                          }}
                        />
                      </div>

                      {/* Features List */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold text-slate-700">
                            Package Feature Bullets ({pkg.features.length})
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              handleAddArrayItem(pkg.features, (newF) => {
                                const copy = [...content.pricingPackages];
                                copy[index].features = newF;
                                updatePricingPackages(copy);
                              })
                            }
                            className="text-[11px] text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Add Feature
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {pkg.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) =>
                                  handleArrayItemChange(
                                    pkg.features,
                                    fIdx,
                                    e.target.value,
                                    (newF) => {
                                      const copy = [...content.pricingPackages];
                                      copy[index].features = newF;
                                      updatePricingPackages(copy);
                                    }
                                  )
                                }
                                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-teal-500"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveArrayItem(pkg.features, fIdx, (newF) => {
                                    const copy = [...content.pricingPackages];
                                    copy[index].features = newF;
                                    updatePricingPackages(copy);
                                  })
                                }
                                className="text-slate-400 hover:text-red-500 p-1 shrink-0"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. ADD-ON SERVICES */}
            {activeTab === 'addons' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <SectionTitle
                    title="Add-On Services"
                    description="Manage additional modular services available in the estimate calculator and quote forms."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newAddon: AddOnService = {
                        id: `addon-${Date.now()}`,
                        name: 'New Add-On',
                        price: '₹1,499',
                        priceINR: 1499,
                        period: '/ Project',
                        description: 'Description of the modular add-on service.',
                        iconName: 'Sparkles',
                      };
                      updateAddOnServices([...content.addOnServices, newAddon]);
                      showNotification('Added new add-on service!');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.addOnServices.map((addon, index) => (
                    <div
                      key={addon.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{addon.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            updateAddOnServices(content.addOnServices.filter((a) => a.id !== addon.id));
                            showNotification('Deleted add-on');
                          }}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <InputField
                          label="Name"
                          value={addon.name}
                          onChange={(v) => {
                            const copy = [...content.addOnServices];
                            copy[index].name = v;
                            updateAddOnServices(copy);
                          }}
                        />
                        <InputField
                          label="Display Price"
                          value={addon.price}
                          onChange={(v) => {
                            const copy = [...content.addOnServices];
                            copy[index].price = v;
                            updateAddOnServices(copy);
                          }}
                        />
                        <InputField
                          label="Numeric INR Price"
                          type="number"
                          value={addon.priceINR.toString()}
                          onChange={(v) => {
                            const copy = [...content.addOnServices];
                            copy[index].priceINR = Number(v) || 0;
                            updateAddOnServices(copy);
                          }}
                        />
                        <InputField
                          label="Period (e.g. / Month, Free)"
                          value={addon.period || ''}
                          onChange={(v) => {
                            const copy = [...content.addOnServices];
                            copy[index].period = v;
                            updateAddOnServices(copy);
                          }}
                        />
                      </div>

                      <TextareaField
                        label="Description"
                        value={addon.description}
                        onChange={(v) => {
                          const copy = [...content.addOnServices];
                          copy[index].description = v;
                          updateAddOnServices(copy);
                        }}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. PORTFOLIO PROJECTS */}
            {activeTab === 'portfolio' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <SectionTitle
                    title="Portfolio Case Studies & Showcase"
                    description="Add showcase projects, high-resolution imagery, deliverables, and Lighthouse performance metrics."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newProj: PortfolioProject = {
                        id: `project-${Date.now()}`,
                        title: 'New Client Portal',
                        category: 'Business Websites',
                        shortDesc: 'Fast modern web portal with custom design.',
                        fullDesc: 'Comprehensive description of the client case study and project execution.',
                        tags: ['React', 'TypeScript', 'SEO'],
                        liveUrlMock: 'https://demo.sirinbuilds.com',
                        highlights: ['Sub-second load times', 'Custom UI/UX System'],
                        deliverables: ['Frontend Build', 'Hosting Setup'],
                        metrics: { label: 'Speed Score', value: '99/100' },
                        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
                        gradientTheme: 'from-blue-600 to-cyan-500',
                      };
                      updatePortfolioProjects([...content.portfolioProjects, newProj]);
                      showNotification('Added new portfolio project!');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-5">
                  {content.portfolioProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{project.title}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                            {project.category}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            updatePortfolioProjects(content.portfolioProjects.filter((p) => p.id !== project.id));
                            showNotification('Deleted portfolio project');
                          }}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <InputField
                          label="Project Title"
                          value={project.title}
                          onChange={(v) => {
                            const copy = [...content.portfolioProjects];
                            copy[index].title = v;
                            updatePortfolioProjects(copy);
                          }}
                        />
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                          <select
                            value={project.category}
                            onChange={(e) => {
                              const copy = [...content.portfolioProjects];
                              copy[index].category = e.target.value as any;
                              updatePortfolioProjects(copy);
                            }}
                            className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-teal-500"
                          >
                            <option value="Business Websites">Business Websites</option>
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="Landing Pages">Landing Pages</option>
                            <option value="Web Applications">Web Applications</option>
                            <option value="Branding">Branding</option>
                          </select>
                        </div>
                        <InputField
                          label="Live / Demo URL"
                          value={project.liveUrlMock || ''}
                          onChange={(v) => {
                            const copy = [...content.portfolioProjects];
                            copy[index].liveUrlMock = v;
                            updatePortfolioProjects(copy);
                          }}
                        />
                      </div>

                      <InputField
                        label="Image URL (Unsplash or direct image URL)"
                        value={project.image}
                        onChange={(v) => {
                          const copy = [...content.portfolioProjects];
                          copy[index].image = v;
                          updatePortfolioProjects(copy);
                        }}
                      />

                      <TextareaField
                        label="Short Description"
                        value={project.shortDesc}
                        onChange={(v) => {
                          const copy = [...content.portfolioProjects];
                          copy[index].shortDesc = v;
                          updatePortfolioProjects(copy);
                        }}
                        rows={2}
                      />

                      <TextareaField
                        label="Full Case Study Description"
                        value={project.fullDesc}
                        onChange={(v) => {
                          const copy = [...content.portfolioProjects];
                          copy[index].fullDesc = v;
                          updatePortfolioProjects(copy);
                        }}
                        rows={3}
                      />

                      {/* Deliverables List */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold text-slate-700">
                            Deliverables ({project.deliverables.length})
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              handleAddArrayItem(project.deliverables, (newD) => {
                                const copy = [...content.portfolioProjects];
                                copy[index].deliverables = newD;
                                updatePortfolioProjects(copy);
                              })
                            }
                            className="text-[11px] text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Add Deliverable
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {project.deliverables.map((deliv, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={deliv}
                                onChange={(e) =>
                                  handleArrayItemChange(
                                    project.deliverables,
                                    dIdx,
                                    e.target.value,
                                    (newD) => {
                                      const copy = [...content.portfolioProjects];
                                      copy[index].deliverables = newD;
                                      updatePortfolioProjects(copy);
                                    }
                                  )
                                }
                                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-teal-500"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveArrayItem(project.deliverables, dIdx, (newD) => {
                                    const copy = [...content.portfolioProjects];
                                    copy[index].deliverables = newD;
                                    updatePortfolioProjects(copy);
                                  })
                                }
                                className="text-slate-400 hover:text-red-500 p-1 shrink-0"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. PROCESS STEPS */}
            {activeTab === 'process' && (
              <div className="max-w-4xl space-y-6">
                <SectionTitle
                  title="6-Step Production Process"
                  description="Customize the milestones, timeframes, and descriptions for each stage of client delivery."
                />

                <div className="space-y-4">
                  {content.processSteps.map((step, index) => (
                    <div key={step.step} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
                          {step.step}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{step.title}</span>
                        <span className="text-xs font-mono text-teal-700 ml-auto">{step.timeframe}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InputField
                          label="Step Title"
                          value={step.title}
                          onChange={(v) => {
                            const copy = [...content.processSteps];
                            copy[index].title = v;
                            updateProcessSteps(copy);
                          }}
                        />
                        <InputField
                          label="Timeframe (e.g. Days 1-2)"
                          value={step.timeframe}
                          onChange={(v) => {
                            const copy = [...content.processSteps];
                            copy[index].timeframe = v;
                            updateProcessSteps(copy);
                          }}
                        />
                      </div>

                      <TextareaField
                        label="Description"
                        value={step.shortDesc}
                        onChange={(v) => {
                          const copy = [...content.processSteps];
                          copy[index].shortDesc = v;
                          updateProcessSteps(copy);
                        }}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. WHY US */}
            {activeTab === 'whyus' && (
              <div className="max-w-4xl space-y-6">
                <SectionTitle
                  title="Why Choose SirinBuilds Points"
                  description="Modify the 4 core pillars, satisfaction metrics, uptime statistics, and guarantees."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.whyChoosePoints.map((point, index) => (
                    <div key={point.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <InputField
                        label="Title"
                        value={point.title}
                        onChange={(v) => {
                          const copy = [...content.whyChoosePoints];
                          copy[index].title = v;
                          updateWhyChoosePoints(copy);
                        }}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <InputField
                          label="Big Metric"
                          value={point.metric}
                          onChange={(v) => {
                            const copy = [...content.whyChoosePoints];
                            copy[index].metric = v;
                            updateWhyChoosePoints(copy);
                          }}
                        />
                        <InputField
                          label="Metric Label"
                          value={point.metricLabel}
                          onChange={(v) => {
                            const copy = [...content.whyChoosePoints];
                            copy[index].metricLabel = v;
                            updateWhyChoosePoints(copy);
                          }}
                        />
                      </div>
                      <TextareaField
                        label="Description"
                        value={point.description}
                        onChange={(v) => {
                          const copy = [...content.whyChoosePoints];
                          copy[index].description = v;
                          updateWhyChoosePoints(copy);
                        }}
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. ABOUT */}
            {activeTab === 'about' && (
              <div className="max-w-4xl space-y-6">
                <SectionTitle
                  title="About Section & Guarantees"
                  description="Edit the story, craftsmanship philosophy, and company guarantees."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Badge Label"
                    value={content.about.badge}
                    onChange={(v) => updateAbout({ badge: v })}
                  />
                  <InputField
                    label="Heading"
                    value={content.about.title}
                    onChange={(v) => updateAbout({ title: v })}
                  />
                </div>

                <TextareaField
                  label="Subtitle"
                  value={content.about.subtitle}
                  onChange={(v) => updateAbout({ subtitle: v })}
                  rows={2}
                />

                <TextareaField
                  label="Main Story Paragraph"
                  value={content.about.mainStory}
                  onChange={(v) => updateAbout({ mainStory: v })}
                  rows={3}
                />

                <TextareaField
                  label="Vision & Hosting Story"
                  value={content.about.visionStory}
                  onChange={(v) => updateAbout({ visionStory: v })}
                  rows={3}
                />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-700">
                      Core Guarantee Highlights ({content.about.highlights.length})
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        handleAddArrayItem(content.about.highlights, (newH) =>
                          updateAbout({ highlights: newH })
                        )
                      }
                      className="text-[11px] text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Highlight
                    </button>
                  </div>
                  <div className="space-y-2">
                    {content.about.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleArrayItemChange(
                              content.about.highlights,
                              idx,
                              e.target.value,
                              (newH) => updateAbout({ highlights: newH })
                            )
                          }
                          className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-teal-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveArrayItem(content.about.highlights, idx, (newH) =>
                              updateAbout({ highlights: newH })
                            )
                          }
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 10. FAQS */}
            {activeTab === 'faqs' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <SectionTitle
                    title="Frequently Asked Questions (FAQs)"
                    description="Add questions, detailed answers, and categories to address common client inquiries."
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newFaq: FAQItem = {
                        id: `faq-${Date.now()}`,
                        question: 'New Question?',
                        answer: 'Provide a clear, reassuring answer here.',
                        category: 'General',
                      };
                      updateFaqs([...content.faqs, newFaq]);
                      showNotification('Added new FAQ!');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add FAQ</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {content.faqs.map((faq, index) => (
                    <div key={faq.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">FAQ #{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            updateFaqs(content.faqs.filter((f) => f.id !== faq.id));
                            showNotification('Deleted FAQ');
                          }}
                          className="text-slate-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <InputField
                            label="Question"
                            value={faq.question}
                            onChange={(v) => {
                              const copy = [...content.faqs];
                              copy[index].question = v;
                              updateFaqs(copy);
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                          <select
                            value={faq.category}
                            onChange={(e) => {
                              const copy = [...content.faqs];
                              copy[index].category = e.target.value as any;
                              updateFaqs(copy);
                            }}
                            className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-teal-500"
                          >
                            <option value="General">General</option>
                            <option value="Process">Process</option>
                            <option value="Pricing & Hosting">Pricing & Hosting</option>
                            <option value="Technical">Technical</option>
                          </select>
                        </div>
                      </div>

                      <TextareaField
                        label="Answer"
                        value={faq.answer}
                        onChange={(v) => {
                          const copy = [...content.faqs];
                          copy[index].answer = v;
                          updateFaqs(copy);
                        }}
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. CTA BANNER */}
            {activeTab === 'cta' && (
              <div className="max-w-4xl space-y-6">
                <SectionTitle
                  title="Call to Action Banner"
                  description="Customize the high-conversion banner displayed before the footer."
                />

                <InputField
                  label="Badge Text"
                  value={content.ctaBanner.badge}
                  onChange={(v) => updateCtaBanner({ badge: v })}
                />
                <InputField
                  label="Title"
                  value={content.ctaBanner.title}
                  onChange={(v) => updateCtaBanner({ title: v })}
                />
                <TextareaField
                  label="Subtitle"
                  value={content.ctaBanner.subtitle}
                  onChange={(v) => updateCtaBanner({ subtitle: v })}
                  rows={2}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Primary Button Text"
                    value={content.ctaBanner.primaryBtnText}
                    onChange={(v) => updateCtaBanner({ primaryBtnText: v })}
                  />
                  <InputField
                    label="Secondary Button Text"
                    value={content.ctaBanner.secondaryBtnText}
                    onChange={(v) => updateCtaBanner({ secondaryBtnText: v })}
                  />
                </div>
              </div>
            )}

            {/* 12. BACKUP & RAW JSON */}
            {activeTab === 'json' && (
              <div className="max-w-4xl space-y-6">
                <SectionTitle
                  title="JSON Backup, Restore & Direct Editing"
                  description="Directly inspect, copy, or paste your entire site configuration JSON payload."
                />

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5 text-teal-400" />
                    <span>Copy Current JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExport}
                    className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .json file</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleImport}
                    className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm ml-auto"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Apply / Import Pasted JSON</span>
                  </button>
                </div>

                {jsonError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{jsonError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 mb-1">
                    Raw JSON Editor / Importer:
                  </label>
                  <textarea
                    value={jsonInput || exportJson()}
                    onChange={(e) => {
                      setJsonInput(e.target.value);
                      setJsonError(null);
                    }}
                    rows={16}
                    className="w-full font-mono text-xs p-3 rounded-xl border border-slate-300 bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed selection:bg-teal-500/40"
                    placeholder="Paste JSON configuration payload here..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="bg-slate-100 px-4 sm:px-6 py-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-700">Edits automatically synchronize with local browser storage.</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Tip: Double-tap/click bottom &ldquo;SirinBuilds&rdquo; anytime to reopen.
          </div>
        </div>

      </div>
    </div>
  );
};

/* --- Helper Sub-components for Clean Form Rendering --- */

interface TabButtonProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ id, label, icon, isActive, onClick }) => (
  <button
    id={id}
    type="button"
    onClick={onClick}
    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap text-left ${
      isActive
        ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200/80 shadow-xs'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
    }`}
  >
    <span className={isActive ? 'text-teal-600' : 'text-slate-400'}>{icon}</span>
    <span>{label}</span>
  </button>
);

const SectionTitle: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="border-b border-slate-200 pb-3">
    <h3 className="text-base sm:text-lg font-bold text-slate-900">{title}</h3>
    <p className="text-xs text-slate-500 mt-0.5">{description}</p>
  </div>
);

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
}) => (
  <div>
    <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-xs"
    />
  </div>
);

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  rows = 3,
}) => (
  <div>
    <label className="block text-xs font-semibold text-slate-700 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 shadow-xs leading-relaxed"
    />
  </div>
);

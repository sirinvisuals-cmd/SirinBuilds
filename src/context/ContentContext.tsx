import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppContent,
  AppBrand,
  AppHero,
  AppTrustPoint,
  ServiceItem,
  WhyChoosePoint,
  PricingPackage,
  AddOnService,
  PortfolioProject,
  ProcessStep,
  AppAbout,
  FAQItem,
  AppCtaBanner,
} from '../types';
import {
  BRAND as DEFAULT_BRAND,
  VALUE_POINTS as DEFAULT_TRUST_POINTS,
  SERVICES as DEFAULT_SERVICES,
  WHY_CHOOSE_US as DEFAULT_WHY_CHOOSE,
  PRICING_PACKAGES as DEFAULT_PRICING,
  ADD_ON_SERVICES as DEFAULT_ADD_ONS,
  PORTFOLIO_PROJECTS as DEFAULT_PORTFOLIO,
  PROCESS_STEPS as DEFAULT_PROCESS,
  FAQS as DEFAULT_FAQS,
} from '../data/content';

const DEFAULT_HERO: AppHero = {
  badge: 'High-Performance Web Engineering & Hosting',
  titleLine1: 'Building Digital Success for Modern',
  titleHighlight: 'Businesses & Creators',
  titleLine2: '',
  description:
    'We engineer fast, secure and modern websites, web hosting, and digital solutions that help businesses grow online with confidence.',
  primaryCta: 'Get Free Estimate',
  secondaryCta: 'Explore Services',
  stats: [
    { label: 'Websites Built', value: '50+', helper: 'Delivered On-Time' },
    { label: 'Uptime SLA', value: '99.9%', helper: 'Cloud Server Reliability' },
    { label: 'Average Speed', value: '<1.2s', helper: 'Global CDN Acceleration' },
  ],
};

const DEFAULT_ABOUT: AppAbout = {
  badge: 'Who We Are',
  title: 'Engineering Digital Excellence with Craftsmanship & Speed',
  subtitle:
    'SirinBuilds was founded with a singular purpose: to deliver fast, secure, modern websites and dependable hosting infrastructure that empower businesses to scale.',
  mainStory:
    'We believe in doing things right from day one. In an era where many websites are bogged down by bloated plugins, slow server response times, and confusing technical jargon, SirinBuilds takes a direct, engineering-first approach. Every project is crafted with clean semantics, responsive fluid design, and robust security.',
  visionStory:
    'Whether you need a high-converting corporate website, a seamless booking portal, or reliable cloud hosting with 99.9% uptime SLA, we provide the technical firepower and personalized support to build and protect your digital presence.',
  highlights: [
    'Direct engineering access — speak directly with the creators building your site',
    'Zero bloat — modern lightweight frameworks engineered for sub-second speeds',
    'Transparent pricing with zero hidden maintenance fees or surprise costs',
    'All-inclusive solutions: custom domain, cloud hosting, SSL, and branding',
  ],
  stats: [
    { label: 'Projects Delivered', value: '50+', desc: 'Across diverse industries' },
    { label: 'Client Satisfaction', value: '100%', desc: 'Structured revision milestones' },
    { label: 'Average Turnaround', value: '5-10 Days', desc: 'Fast, on-schedule delivery' },
    { label: 'Security Grade', value: 'A+ SSL', desc: 'DDoS & HTTPS shielded' },
  ],
};

const DEFAULT_CTA_BANNER: AppCtaBanner = {
  badge: 'Ready To Scale?',
  title: 'Ready to Build Your Next High-Performing Website?',
  subtitle:
    'Let’s turn your vision into an ultra-fast, beautifully responsive website that attracts customers and drives real business growth.',
  primaryBtnText: 'Get Free Proposal',
  secondaryBtnText: 'Contact Our Team',
};

const DEFAULT_CONTENT: AppContent = {
  brand: {
    name: DEFAULT_BRAND.name,
    tagline: DEFAULT_BRAND.tagline,
    businessType: DEFAULT_BRAND.businessType,
    email: DEFAULT_BRAND.email,
    phone: '+91 98765 43210',
    instagram: DEFAULT_BRAND.instagram,
    instagramUrl: DEFAULT_BRAND.instagramUrl,
    youtube: DEFAULT_BRAND.youtube,
    youtubeUrl: DEFAULT_BRAND.youtubeUrl,
    year: DEFAULT_BRAND.year,
  },
  hero: DEFAULT_HERO,
  trustPoints: DEFAULT_TRUST_POINTS.map((tp) => ({
    title: tp.title,
    desc: tp.desc,
    icon: tp.icon,
    badge: tp.badge,
  })),
  services: DEFAULT_SERVICES,
  whyChoosePoints: DEFAULT_WHY_CHOOSE,
  pricingPackages: DEFAULT_PRICING,
  addOnServices: DEFAULT_ADD_ONS,
  portfolioProjects: DEFAULT_PORTFOLIO,
  processSteps: DEFAULT_PROCESS,
  about: DEFAULT_ABOUT,
  faqs: DEFAULT_FAQS,
  ctaBanner: DEFAULT_CTA_BANNER,
};

const STORAGE_KEY = 'sirinbuilds_site_content_v1';

interface ContentContextType {
  content: AppContent;
  updateBrand: (brand: Partial<AppBrand>) => void;
  updateHero: (hero: Partial<AppHero>) => void;
  updateTrustPoints: (points: AppTrustPoint[]) => void;
  updateServices: (services: ServiceItem[]) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  addService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;
  updateWhyChoosePoints: (points: WhyChoosePoint[]) => void;
  updatePricingPackages: (packages: PricingPackage[]) => void;
  updatePricingPackage: (id: string, updated: Partial<PricingPackage>) => void;
  addPricingPackage: (pkg: PricingPackage) => void;
  deletePricingPackage: (id: string) => void;
  updateAddOnServices: (addOns: AddOnService[]) => void;
  updateAddOnService: (id: string, updated: Partial<AddOnService>) => void;
  addAddOnService: (addon: AddOnService) => void;
  deleteAddOnService: (id: string) => void;
  updatePortfolioProjects: (projects: PortfolioProject[]) => void;
  updatePortfolioProject: (id: string, updated: Partial<PortfolioProject>) => void;
  addPortfolioProject: (project: PortfolioProject) => void;
  deletePortfolioProject: (id: string) => void;
  updateProcessSteps: (steps: ProcessStep[]) => void;
  updateAbout: (about: Partial<AppAbout>) => void;
  updateFaqs: (faqs: FAQItem[]) => void;
  updateFaq: (id: string, updated: Partial<FAQItem>) => void;
  addFaq: (faq: FAQItem) => void;
  deleteFaq: (id: string) => void;
  updateCtaBanner: (banner: Partial<AppCtaBanner>) => void;
  updateFullContent: (newContent: AppContent) => void;
  resetToDefaults: () => void;
  exportJson: () => string;
  importJson: (jsonStr: string) => { success: boolean; error?: string };
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<AppContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to guarantee all schema fields exist
        return {
          ...DEFAULT_CONTENT,
          ...parsed,
          brand: { ...DEFAULT_CONTENT.brand, ...(parsed.brand || {}) },
          hero: { ...DEFAULT_CONTENT.hero, ...(parsed.hero || {}) },
          about: { ...DEFAULT_CONTENT.about, ...(parsed.about || {}) },
          ctaBanner: { ...DEFAULT_CONTENT.ctaBanner, ...(parsed.ctaBanner || {}) },
          services: parsed.services || DEFAULT_CONTENT.services,
          pricingPackages: parsed.pricingPackages || DEFAULT_CONTENT.pricingPackages,
          addOnServices: parsed.addOnServices || DEFAULT_CONTENT.addOnServices,
          portfolioProjects: parsed.portfolioProjects || DEFAULT_CONTENT.portfolioProjects,
          processSteps: parsed.processSteps || DEFAULT_CONTENT.processSteps,
          whyChoosePoints: parsed.whyChoosePoints || DEFAULT_CONTENT.whyChoosePoints,
          faqs: parsed.faqs || DEFAULT_CONTENT.faqs,
          trustPoints: parsed.trustPoints || DEFAULT_CONTENT.trustPoints,
        };
      }
    } catch (e) {
      console.error('Failed to parse saved content from localStorage:', e);
    }
    return DEFAULT_CONTENT;
  });

  // Save to localStorage whenever content updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to persist content to localStorage:', e);
    }
  }, [content]);

  const updateBrand = (brand: Partial<AppBrand>) => {
    setContent((prev) => ({
      ...prev,
      brand: { ...prev.brand, ...brand },
    }));
  };

  const updateHero = (hero: Partial<AppHero>) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...hero },
    }));
  };

  const updateTrustPoints = (trustPoints: AppTrustPoint[]) => {
    setContent((prev) => ({ ...prev, trustPoints }));
  };

  const updateServices = (services: ServiceItem[]) => {
    setContent((prev) => ({ ...prev, services }));
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const addService = (service: ServiceItem) => {
    setContent((prev) => ({
      ...prev,
      services: [...prev.services, service],
    }));
  };

  const deleteService = (id: string) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  const updateWhyChoosePoints = (whyChoosePoints: WhyChoosePoint[]) => {
    setContent((prev) => ({ ...prev, whyChoosePoints }));
  };

  const updatePricingPackages = (pricingPackages: PricingPackage[]) => {
    setContent((prev) => ({ ...prev, pricingPackages }));
  };

  const updatePricingPackage = (id: string, updated: Partial<PricingPackage>) => {
    setContent((prev) => ({
      ...prev,
      pricingPackages: prev.pricingPackages.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const addPricingPackage = (pkg: PricingPackage) => {
    setContent((prev) => ({
      ...prev,
      pricingPackages: [...prev.pricingPackages, pkg],
    }));
  };

  const deletePricingPackage = (id: string) => {
    setContent((prev) => ({
      ...prev,
      pricingPackages: prev.pricingPackages.filter((p) => p.id !== id),
    }));
  };

  const updateAddOnServices = (addOnServices: AddOnService[]) => {
    setContent((prev) => ({ ...prev, addOnServices }));
  };

  const updateAddOnService = (id: string, updated: Partial<AddOnService>) => {
    setContent((prev) => ({
      ...prev,
      addOnServices: prev.addOnServices.map((a) => (a.id === id ? { ...a, ...updated } : a)),
    }));
  };

  const addAddOnService = (addon: AddOnService) => {
    setContent((prev) => ({
      ...prev,
      addOnServices: [...prev.addOnServices, addon],
    }));
  };

  const deleteAddOnService = (id: string) => {
    setContent((prev) => ({
      ...prev,
      addOnServices: prev.addOnServices.filter((a) => a.id !== id),
    }));
  };

  const updatePortfolioProjects = (portfolioProjects: PortfolioProject[]) => {
    setContent((prev) => ({ ...prev, portfolioProjects }));
  };

  const updatePortfolioProject = (id: string, updated: Partial<PortfolioProject>) => {
    setContent((prev) => ({
      ...prev,
      portfolioProjects: prev.portfolioProjects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const addPortfolioProject = (project: PortfolioProject) => {
    setContent((prev) => ({
      ...prev,
      portfolioProjects: [...prev.portfolioProjects, project],
    }));
  };

  const deletePortfolioProject = (id: string) => {
    setContent((prev) => ({
      ...prev,
      portfolioProjects: prev.portfolioProjects.filter((p) => p.id !== id),
    }));
  };

  const updateProcessSteps = (processSteps: ProcessStep[]) => {
    setContent((prev) => ({ ...prev, processSteps }));
  };

  const updateAbout = (about: Partial<AppAbout>) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, ...about },
    }));
  };

  const updateFaqs = (faqs: FAQItem[]) => {
    setContent((prev) => ({ ...prev, faqs }));
  };

  const updateFaq = (id: string, updated: Partial<FAQItem>) => {
    setContent((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === id ? { ...f, ...updated } : f)),
    }));
  };

  const addFaq = (faq: FAQItem) => {
    setContent((prev) => ({
      ...prev,
      faqs: [...prev.faqs, faq],
    }));
  };

  const deleteFaq = (id: string) => {
    setContent((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id),
    }));
  };

  const updateCtaBanner = (ctaBanner: Partial<AppCtaBanner>) => {
    setContent((prev) => ({
      ...prev,
      ctaBanner: { ...prev.ctaBanner, ...ctaBanner },
    }));
  };

  const updateFullContent = (newContent: AppContent) => {
    setContent(newContent);
  };

  const resetToDefaults = () => {
    setContent(DEFAULT_CONTENT);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportJson = () => {
    return JSON.stringify(content, null, 2);
  };

  const importJson = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Invalid JSON payload.' };
      }
      const validated: AppContent = {
        ...DEFAULT_CONTENT,
        ...parsed,
        brand: { ...DEFAULT_CONTENT.brand, ...(parsed.brand || {}) },
        hero: { ...DEFAULT_CONTENT.hero, ...(parsed.hero || {}) },
        about: { ...DEFAULT_CONTENT.about, ...(parsed.about || {}) },
        ctaBanner: { ...DEFAULT_CONTENT.ctaBanner, ...(parsed.ctaBanner || {}) },
        services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_CONTENT.services,
        pricingPackages: Array.isArray(parsed.pricingPackages)
          ? parsed.pricingPackages
          : DEFAULT_CONTENT.pricingPackages,
        addOnServices: Array.isArray(parsed.addOnServices)
          ? parsed.addOnServices
          : DEFAULT_CONTENT.addOnServices,
        portfolioProjects: Array.isArray(parsed.portfolioProjects)
          ? parsed.portfolioProjects
          : DEFAULT_CONTENT.portfolioProjects,
        processSteps: Array.isArray(parsed.processSteps)
          ? parsed.processSteps
          : DEFAULT_CONTENT.processSteps,
        whyChoosePoints: Array.isArray(parsed.whyChoosePoints)
          ? parsed.whyChoosePoints
          : DEFAULT_CONTENT.whyChoosePoints,
        faqs: Array.isArray(parsed.faqs) ? parsed.faqs : DEFAULT_CONTENT.faqs,
        trustPoints: Array.isArray(parsed.trustPoints)
          ? parsed.trustPoints
          : DEFAULT_CONTENT.trustPoints,
      };
      setContent(validated);
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to parse JSON' };
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateBrand,
        updateHero,
        updateTrustPoints,
        updateServices,
        updateService,
        addService,
        deleteService,
        updateWhyChoosePoints,
        updatePricingPackages,
        updatePricingPackage,
        addPricingPackage,
        deletePricingPackage,
        updateAddOnServices,
        updateAddOnService,
        addAddOnService,
        deleteAddOnService,
        updatePortfolioProjects,
        updatePortfolioProject,
        addPortfolioProject,
        deletePortfolioProject,
        updateProcessSteps,
        updateAbout,
        updateFaqs,
        updateFaq,
        addFaq,
        deleteFaq,
        updateCtaBanner,
        updateFullContent,
        resetToDefaults,
        exportJson,
        importJson,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return ctx;
};

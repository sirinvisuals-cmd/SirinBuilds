export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  features: string[];
  ctaText: string;
  badge?: string;
  iconName: string;
  deliveryTime?: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  priceINR: number;
  isCustom?: boolean;
  priceNote: string;
  targetAudience: string;
  isPopular?: boolean;
  features: string[];
  buttonText: string;
  gradient?: string;
}

export interface AddOnService {
  id: string;
  name: string;
  price: string;
  priceINR: number;
  period?: string;
  description: string;
  iconName: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Business Websites' | 'E-Commerce' | 'Landing Pages' | 'Web Applications' | 'Branding';
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  liveUrlMock?: string;
  highlights: string[];
  deliverables: string[];
  metrics?: { label: string; value: string };
  image: string;
  gradientTheme: string;
}

export interface WhyChoosePoint {
  id: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  shortDesc: string;
  deliverables: string[];
  timeframe: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Process' | 'Pricing & Hosting' | 'Technical';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  selectedAddOns: string[];
  selectedPackage?: string;
}

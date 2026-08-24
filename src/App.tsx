import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ServicesSection } from './components/ServicesSection';
import { WhySirinBuilds } from './components/WhySirinBuilds';
import { PricingSection } from './components/PricingSection';
import { AddOnServices } from './components/AddOnServices';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { ProjectQuoteModal } from './components/ProjectQuoteModal';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('professional');
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Keyboard shortcut listener (Alt + A or Ctrl + Shift + A to open Admin Panel)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && (e.key === 'a' || e.key === 'A')) || (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll spy to update active navigation state
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'why-us', 'pricing', 'portfolio', 'process', 'about', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenQuoteModal = (packageId?: string) => {
    if (packageId) {
      setSelectedPackageId(packageId);
    }
    setIsQuoteModalOpen(true);
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceTitle(serviceTitle);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F8FAFC] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-teal-500/20 selection:text-teal-900">
      {/* Navigation Bar */}
      <Navbar
        onOpenQuoteModal={() => handleOpenQuoteModal()}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Trust & Value Points Bar */}
        <TrustBar />

        {/* Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* Why Choose SirinBuilds */}
        <WhySirinBuilds />

        {/* Pricing Section */}
        <PricingSection onSelectPackage={handleOpenQuoteModal} />

        {/* Add-On Services */}
        <AddOnServices
          selectedAddOns={selectedAddOns}
          onToggleAddOn={handleToggleAddOn}
          onOpenQuoteModal={handleOpenQuoteModal}
        />

        {/* Portfolio & Case Studies */}
        <PortfolioSection onOpenQuoteModal={handleOpenQuoteModal} />

        {/* Process Section */}
        <ProcessSection />

        {/* About Section */}
        <AboutSection onContactClick={() => handleNavigate('contact')} />

        {/* FAQ Section */}
        <FAQSection onContactClick={() => handleNavigate('contact')} />

        {/* Call to Action Banner */}
        <CtaBanner
          onOpenQuoteModal={() => handleOpenQuoteModal()}
          onContactClick={() => handleNavigate('contact')}
        />

        {/* Contact Form & Consultation Section */}
        <ContactSection
          initialService={selectedServiceTitle}
          initialPackage={selectedPackageId}
        />
      </main>

      {/* Footer with double tap & button triggers */}
      <Footer
        onSelectPackage={handleOpenQuoteModal}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Interactive Project Quote / Estimate Modal */}
      <ProjectQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialPackageId={selectedPackageId}
        initialAddOns={selectedAddOns}
      />

      {/* Content Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}


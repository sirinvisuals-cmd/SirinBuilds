import React, { useState } from 'react';
import {
  Mail,
  Instagram,
  Youtube,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Phone,
  Building,
  User,
} from 'lucide-react';
import { BRAND, SERVICES } from '../data/content';
import { ContactFormData } from '../types';
import { Toast } from './Toast';

interface ContactSectionProps {
  initialService?: string;
  initialPackage?: string;
  selectedAddOns?: string[];
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService = '',
  initialPackage = '',
  selectedAddOns = [],
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService || 'Website Development',
    budget: '₹10,000 - ₹25,000',
    message: '',
    selectedAddOns: selectedAddOns,
    selectedPackage: initialPackage,
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string; service: string } | null>(null);

  // Sync if initial props change
  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  React.useEffect(() => {
    if (initialPackage) {
      setFormData((prev) => ({ ...prev, selectedPackage: initialPackage }));
    }
  }, [initialPackage]);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief message about your project';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedData({
        name: formData.name,
        email: formData.email,
        service: formData.service,
      });
      setShowToast(true);
    }, 800);
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(`New Project Enquiry from ${formData.name || 'Client'}`);
    const body = encodeURIComponent(
      `Hi SirinBuilds Team,\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || 'N/A'}\n` +
      `Company: ${formData.company || 'N/A'}\n` +
      `Service Required: ${formData.service}\n` +
      `Estimated Budget: ${formData.budget}\n` +
      (formData.selectedPackage ? `Selected Plan: ${formData.selectedPackage}\n` : '') +
      `\nProject Details:\n${formData.message}\n`
    );
    return `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 bg-white relative border-t border-slate-200/90">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[300px] bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Start Your Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Let's Build Your Digital Presence
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            From idea to online success, SirinBuilds can help make it happen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Official Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Get In Touch Directly
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Whether you have a fully formed specification or are just getting started, our team is ready to discuss your goals and provide an accurate proposal.
              </p>
            </div>

            {/* Official Email Card with Copy button */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-mono">Official Email</div>
                  <div className="text-base font-bold text-slate-900">{BRAND.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
                <button
                  onClick={copyEmailToClipboard}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-slate-200 shadow-sm"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-teal-600" />
                      <span className="text-teal-700 font-bold">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${BRAND.email}`}
                  className="py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Open Mail</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Official Social Media Channels with Visit buttons */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Official Channels
                </div>
                <span className="text-[10px] font-mono text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">Verified Presence</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Instagram Channel Card with Visit Option */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-pink-300 flex flex-col justify-between gap-3 transition-all group shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 group-hover:scale-105 transition-transform shrink-0">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] text-slate-500 font-mono">Instagram</div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-pink-600 transition-colors truncate">
                        {BRAND.instagram}
                      </div>
                    </div>
                  </div>

                  <a
                    href={BRAND.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Visit Channel</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* YouTube Channel Card with Visit Option */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-red-300 flex flex-col justify-between gap-3 transition-all group shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform shrink-0">
                      <Youtube className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] text-slate-500 font-mono">YouTube</div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                        {BRAND.youtube}
                      </div>
                    </div>
                  </div>

                  <a
                    href={BRAND.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Visit Channel</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Fast Turnaround Guarantee */}
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-center gap-3 text-xs text-teal-900 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <span>Prompt reply guarantee: We typically respond within 2-4 business hours.</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xl relative text-left">
              
              {isSubmitted ? (
                <div className="py-12 px-4 text-center space-y-6 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center mx-auto text-teal-700">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Thank You, {formData.name}!
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Your inquiry has been received. Our engineering and design team will review your project requirements and get in touch at <span className="text-teal-700 font-mono font-bold">{formData.email}</span> shortly.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-xs text-left space-y-2 shadow-sm">
                    <div className="text-slate-500 font-mono uppercase text-[10px] font-bold">Inquiry Summary:</div>
                    <div className="text-slate-900 font-semibold">Service: {formData.service}</div>
                    <div className="text-slate-700">Budget: {formData.budget}</div>
                    {formData.selectedPackage && (
                      <div className="text-teal-700 font-medium">Selected Plan: {formData.selectedPackage}</div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <a
                      href={generateMailtoLink()}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Direct Email Copy</span>
                    </a>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          service: 'Website Development',
                          budget: '₹10,000 - ₹25,000',
                          message: '',
                          selectedAddOns: [],
                          selectedPackage: '',
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-bold text-slate-900">
                      Request a Project Consultation
                    </h3>
                    <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 font-bold">
                      Free Estimate
                    </span>
                  </div>

                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Your Name <span className="text-teal-600">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
                            errors.name ? 'border-red-500 focus:border-red-400' : 'border-slate-200 focus:border-teal-500 bg-white'
                          }`}
                        />
                      </div>
                      {errors.name && <p className="text-[11px] text-red-600 font-medium">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Email Address <span className="text-teal-600">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
                            errors.email ? 'border-red-500 focus:border-red-400' : 'border-slate-200 focus:border-teal-500 bg-white'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-[11px] text-red-600 font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Phone / WhatsApp <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Company or Brand Name <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your Brand / Company"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Category & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Primary Service Needed
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:border-teal-500 focus:outline-none transition-colors"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Complete Digital Package">
                          Complete Digital Package (Web + Hosting + Branding)
                        </option>
                        <option value="Custom Project / Other">
                          Custom Project / Other
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Estimated Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 focus:border-teal-500 focus:outline-none transition-colors"
                      >
                        <option value="₹4,999 - ₹9,999">
                          ₹4,999 - ₹9,999 (Starter Plan)
                        </option>
                        <option value="₹10,000 - ₹25,000">
                          ₹10,000 - ₹25,000 (Professional Plan)
                        </option>
                        <option value="₹25,000 - ₹50,000">
                          ₹25,000 - ₹50,000 (Enterprise / E-Commerce)
                        </option>
                        <option value="₹50,000+">
                          ₹50,000+ (Comprehensive Infrastructure)
                        </option>
                        <option value="Undecided / Need Consultation">
                          Undecided / Need Consultation
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Project Description & Requirements <span className="text-teal-600">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about what you want to build (e.g. number of pages, target audience, reference sites, domain/hosting needs)..."
                        className={`w-full p-3.5 rounded-xl bg-white border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.message ? 'border-red-500 focus:border-red-400' : 'border-slate-200 focus:border-teal-500'
                        }`}
                      />
                    </div>
                    {errors.message && <p className="text-[11px] text-red-600 font-medium">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>No obligation • Fast proposal response</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Floating Toast Notification */}
      <Toast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        title="Message Received Successfully!"
        message={`Thank you, ${submittedData?.name || 'there'}! We have safely received your project details and our team will get in touch with you shortly.`}
        senderName={submittedData?.name}
        email={submittedData?.email}
        service={submittedData?.service}
        duration={6000}
        actionLabel="Send direct mail copy"
        onAction={() => {
          window.location.href = generateMailtoLink();
        }}
      />
    </section>
  );
};

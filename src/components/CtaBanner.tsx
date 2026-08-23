import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onOpenQuoteModal: () => void;
  onContactClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenQuoteModal, onContactClick }) => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-r from-teal-800 via-teal-700 to-cyan-800 border border-teal-600/30 shadow-2xl text-white">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-teal-100 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-teal-200" />
              <span>Let's Create Something Extraordinary</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Ready to Build Your Website?
            </h2>

            <p className="text-base sm:text-lg text-teal-100 max-w-xl mx-auto leading-relaxed">
              Let's turn your idea into a professional digital experience.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onOpenQuoteModal}
                id="cta-banner-get-started"
                className="px-8 py-4 rounded-2xl bg-white text-slate-950 font-bold text-base shadow-xl hover:bg-teal-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-teal-700" />
              </button>

              <button
                onClick={onContactClick}
                id="cta-banner-contact-us"
                className="px-8 py-4 rounded-2xl bg-white/10 border border-white/30 hover:bg-white/20 text-white font-semibold text-base transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import { CheckCircle2, X, Sparkles, Mail } from 'lucide-react';

export interface ToastProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  senderName?: string;
  email?: string;
  service?: string;
  duration?: number;
  onAction?: () => void;
  actionLabel?: string;
}

export const Toast: React.FC<ToastProps> = ({
  isVisible,
  onClose,
  title,
  message,
  senderName,
  email,
  service,
  duration = 6000,
  onAction,
  actionLabel,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isVisible) {
      setProgress(100);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (elapsed >= duration) {
        clearInterval(interval);
        onClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      id="submission-toast-notification"
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md w-[calc(100%-2rem)] mx-4 sm:mx-0 bg-white/95 backdrop-blur-md border border-teal-300/90 rounded-2xl shadow-2xl shadow-teal-950/15 overflow-hidden transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in text-left"
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          
          {/* Status Icon */}
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-slate-900 text-sm">
                {title}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-50 text-teal-800 border border-teal-200">
                <Sparkles className="w-2.5 h-2.5 text-teal-600" />
                Received
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              {message}
            </p>

            {(senderName || email || service) && (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 text-[11px] text-slate-700 space-y-1 mb-2">
                {senderName && (
                  <div>
                    <span className="text-slate-400 font-mono">From:</span>{' '}
                    <strong className="text-slate-900">{senderName}</strong>
                  </div>
                )}
                {email && (
                  <div className="truncate">
                    <span className="text-slate-400 font-mono">Email:</span>{' '}
                    <span className="font-mono text-teal-700">{email}</span>
                  </div>
                )}
                {service && (
                  <div>
                    <span className="text-slate-400 font-mono">Service:</span>{' '}
                    <span className="text-slate-800 font-medium">{service}</span>
                  </div>
                )}
              </div>
            )}

            {actionLabel && onAction && (
              <div className="pt-1">
                <button
                  onClick={onAction}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{actionLabel}</span>
                </button>
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Animated Progress Bar */}
      <div className="h-1 w-full bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

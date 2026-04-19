import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useToastStore } from '../store/toastStore';

/* ─── Icons ─────────────────────────────────────────────── */
const Icons = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth={2.5}>
      <circle cx="12" cy="12" r="10" strokeOpacity=".25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.5l3 3 6-6" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth={2.5}>
      <circle cx="12" cy="12" r="10" strokeOpacity=".25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" stroke="currentColor" strokeWidth={2.5}>
      <circle cx="12" cy="12" r="10" strokeOpacity=".25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8h.01M12 12v4" />
    </svg>
  ),
};

/* ─── Theme map ──────────────────────────────────────────── */
const THEME = {
  success: {
    bg: 'bg-[#0d1f1a]',
    border: 'border-emerald-500/40',
    accent: 'text-emerald-400',
    progress: 'bg-emerald-400',
    glow: 'shadow-emerald-500/20',
    iconBg: 'bg-emerald-500/15',
  },
  error: {
    bg: 'bg-[#1f0d0d]',
    border: 'border-rose-500/40',
    accent: 'text-rose-400',
    progress: 'bg-rose-400',
    glow: 'shadow-rose-500/20',
    iconBg: 'bg-rose-500/15',
  },
  warning: {
    bg: 'bg-[#1f1a0d]',
    border: 'border-amber-400/40',
    accent: 'text-amber-400',
    progress: 'bg-amber-400',
    glow: 'shadow-amber-400/20',
    iconBg: 'bg-amber-400/15',
  },
  info: {
    bg: 'bg-[#0d131f]',
    border: 'border-sky-500/40',
    accent: 'text-sky-400',
    progress: 'bg-sky-400',
    glow: 'shadow-sky-500/20',
    iconBg: 'bg-sky-500/15',
  },
};

/* ─── Progress Bar ───────────────────────────────────────── */
const ProgressBar = ({ duration, progressClass }) => {
  const [width, setWidth] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setWidth(remaining);
      if (remaining > 0) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden bg-white/5">
      <div
        className={`h-full rounded-full transition-none ${progressClass}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

/* ─── Single Toast Item ──────────────────────────────────── */
const ToastItem = ({ toast }) => {
  const { removeToast } = useToastStore();
  const t = THEME[toast.type] || THEME.info;

  return (
    <div
      style={{
        animation: toast.visible
          ? 'toastSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
          : 'toastSlideOut 0.35s ease-in forwards',
      }}
      className={`
        relative w-[360px] max-w-[90vw] rounded-xl border backdrop-blur-md
        px-4 py-3 flex items-start gap-3 overflow-hidden
        shadow-xl ${t.glow} ${t.bg} ${t.border}
        text-white/90 text-sm font-medium
      `}
    >
      {/* Icon */}
      <div className={`mt-0.5 p-1.5 rounded-lg ${t.iconBg} ${t.accent}`}>
        {Icons[toast.type] || Icons.info}
      </div>

      {/* Message */}
      <p className="flex-1 leading-snug pt-0.5 text-white/85">{toast.message}</p>

      {/* Close button */}
      <button
        onClick={() => removeToast(toast.id)}
        className="mt-0.5 p-1 rounded-md text-white/40 hover:text-white/90 hover:bg-white/10 transition-all duration-200"
        aria-label="Dismiss"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Progress bar */}
      {toast.duration > 0 && (
        <ProgressBar duration={toast.duration} progressClass={t.progress} />
      )}
    </div>
  );
};

/* ─── Toast Container ────────────────────────────────────── */
const ToastContainer = () => {
  const { toasts } = useToastStore();

  return createPortal(
    <>
      {/* Keyframe styles injected once */}
      <style>{`
        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        @keyframes toastSlideOut {
          from { opacity: 1; transform: translateY(0)     scale(1);    }
          to   { opacity: 0; transform: translateY(-16px) scale(0.95); }
        }
      `}</style>

      <div
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-3 pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} />
          </div>
        ))}
      </div>
    </>,
    document.body
  );
};

export default ToastContainer;
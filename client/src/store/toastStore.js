import { create } from 'zustand';

let idCounter = 0;

export const useToastStore = create((set) => ({
  toasts: [],

  addToast: ({ message, type = 'info', duration = 4000 }) => {
    const id = ++idCounter;

    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration, visible: true }],
    }));

    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        // Start exit animation
        set((state) => ({
          toasts: state.toasts.map((t) =>
            t.id === id ? { ...t, visible: false } : t
          ),
        }));

        // Remove from DOM after animation completes
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
          }));
        }, 400);
      }, duration);
    }
  },

  removeToast: (id) => {
    // Trigger exit animation first
    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, visible: false } : t
      ),
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 400);
  },
}));

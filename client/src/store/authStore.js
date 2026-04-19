import { create } from 'zustand';
import api from '../utils/api';

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  // ─── Signup ───────────────────────────────────────────────
  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      if (data.success) {
        set({ user: data.user, isLoading: false });
        return { success: true };
      } else {
        set({ error: data.message, isLoading: false });
        return { success: false, message: data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // ─── Login ────────────────────────────────────────────────
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.success) {
        set({ user: data.user, isLoading: false });
        return { success: true };
      } else {
        set({ error: data.message, isLoading: false });
        return { success: false, message: data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  // ─── Logout ───────────────────────────────────────────────
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (_) {
      // ignore network errors on logout
    }
    set({ user: null, error: null });
  },

  clearError: () => set({ error: null }),
}));
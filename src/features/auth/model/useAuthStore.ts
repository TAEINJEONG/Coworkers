import { create } from 'zustand';
import axiosInstance from '@/shared/api/axios';
import { AuthResponse } from '../types/auth';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get<{ user: User }>('/api/user', {
        withCredentials: true,
      });
      set({ user: data.user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ user: null, error: err.message || 'User fetch failed' });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post<AuthResponse>(
        '/api/login',
        { email, password },
        { withCredentials: true }
      );
      const { user } = response.data;
      set({ user });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Login failed' });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post('/api/logout', null, { withCredentials: true });
      set({ user: null });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err.message || 'Logout failed' });
    } finally {
      set({ isLoading: false });
    }
  },
}));

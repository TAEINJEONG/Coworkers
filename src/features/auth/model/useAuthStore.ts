import { create } from 'zustand';
import axiosInstance from '@/shared/api/axios';
import { User, AuthState } from '../types/user';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),

  fetchUser: async () => {
    try {
      const { data } = await axiosInstance.get('/user');
      set({ user: data.user });
    } catch {
      set({ user: null });
    }
  },

  login: async (email: string, password: string) => {
    const { data } = await axiosInstance.post('/auth/signIn', {
      email,
      password,
    });
    set({ user: data.user });
  },

  logout: async () => {
    set({ user: null });
  },
}));

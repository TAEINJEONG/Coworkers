import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import i18n from '@/shared/config/i18n';

type Theme = 'light' | 'dark';
type Locale = 'en' | 'ko';

interface SettingsState {
  locale: Locale;
  setLocale: (lang: Locale) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      locale: (i18n.language as Locale) || 'en',
      setLocale: (lang: Locale) => {
        i18n.changeLanguage(lang);
        set({ locale: lang });
      },
      theme:
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        set({ theme: next });
      },
    }),
    {
      name: 'app-settings', // localStorage 키
      storage: createJSONStorage(() => localStorage),
    }
  )
);

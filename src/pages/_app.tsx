// pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import i18n from '@/shared/config/i18n';
import { useSettingsStore } from '@/shared/store/useSettingStore';
import Header from '@/shared/ui/Header';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import ModalRoot from '@/app/providers/modal/ModalRoot';

export default function MyApp({ Component, pageProps }: AppProps) {
  const locale = useSettingsStore((s) => s.locale);
  const theme = useSettingsStore((s) => s.theme);
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <div className="mb-15">
        <Header />
      </div>
      <Component {...pageProps} />
      <ModalRoot />
    </>
  );
}

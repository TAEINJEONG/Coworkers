// pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import i18n from '@/shared/config/i18n';
import { useSettingsStore } from '../shared/store/useSettingStore';
import Header from '@/shared/ui/Header.tsx';

export default function App({ Component, pageProps }: AppProps) {
  // primitive 각각 구독
  const locale = useSettingsStore((s) => s.locale);
  const theme = useSettingsStore((s) => s.theme);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <>
      <div className="mb-15">
        <Header />
      </div>
      <Component {...pageProps} />
    </>
  );
}

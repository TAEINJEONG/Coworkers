// pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import App, { AppContext } from 'next/app';
import { useEffect } from 'react';
import i18n from '@/shared/config/i18n';
import { useSettingsStore } from '@/shared/store/useSettingStore';
import Header from '@/shared/ui/Header.tsx';
import nookies from 'nookies';
import { verify } from 'jsonwebtoken';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import type { User } from '@/features/auth/types/user';

// initialUser를 받아오는 커스텀 AppProps
interface MyAppProps extends AppProps {
  initialUser: User | null;
}

// JWT 페이로드 타입 정의
interface TokenPayload {
  id: number;
  name: string;
  email: string;
  iat?: number;
  exp?: number;
}

export default function MyApp({
  Component,
  pageProps,
  initialUser,
}: MyAppProps) {
  const locale = useSettingsStore((s) => s.locale);
  const theme = useSettingsStore((s) => s.theme);
  const setUser = useAuthStore((s) => s.setUser);
  const fetchUser = useAuthStore((s) => s.fetchUser);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    } else {
      fetchUser();
    }
  }, [initialUser, setUser, fetchUser]);

  return (
    <>
      <div className="mb-15">
        <Header />
      </div>
      <Component {...pageProps} />
    </>
  );
}

// 서버 사이드에서 쿠키를 검증해 initialUser prop으로 내려줍니다
MyApp.getInitialProps = async (appCtx: AppContext) => {
  const appProps = await App.getInitialProps(appCtx);
  const cookies = nookies.get(appCtx.ctx);
  let initialUser: User | null = null;

  try {
    const token = cookies.accessToken;
    if (token) {
      const payload = verify(token, process.env.JWT_SECRET!) as TokenPayload;
      initialUser = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      };
    }
  } catch {
    initialUser = null;
  }

  return { ...appProps, initialUser };
};

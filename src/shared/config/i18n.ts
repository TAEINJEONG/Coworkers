import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: { welcome: 'Welcome', app_title: 'My App' } },
  ko: { translation: { welcome: '환영합니다', app_title: '내 앱' } },
};

i18n.use(initReactI18next).init({
  // 리액트 훅(useTranslation)과 연결
  resources, // 위에서 정의한 번역 리소스
  lng: 'en', // 기본 언어
  fallbackLng: 'ko', // 기본 언어가 없을 경우 사용
  interpolation: { escapeValue: false }, // React가 이미 XSS 방어를 하기 때문에, 중복 이스케이프 방지
});

export default i18n;

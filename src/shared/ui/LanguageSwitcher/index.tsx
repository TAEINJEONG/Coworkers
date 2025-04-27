'use client'; // if you’re using Next.js 13+, else omit
import { useSettingsStore } from '../../store/useSettingStore';

export function LanguageSwitcher() {
  const { locale, setLocale } = useSettingsStore();
  return (
    <div className="flex space-x-2">
      {(['en', 'ko'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          className={locale === lang ? 'font-bold underline' : 'text-gray-500'}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

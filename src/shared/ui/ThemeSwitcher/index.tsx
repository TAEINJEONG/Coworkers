'use client';
import { useSettingsStore } from '../../../shared/store/useSettingStore';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useSettingsStore();
  return (
    <button onClick={toggleTheme} className="px-3 py-1 border rounded">
      {theme === 'dark' ? '🌞 Light' : '🌜 Dark'}
    </button>
  );
}

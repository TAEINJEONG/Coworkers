'use client';

import { LanguageSwitcher } from '@/shared/ui/LanguageSwitcher';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher';
// import { useTranslation } from 'react-i18next';

import logoLarge from '@/shared/assets/images/logo-large.svg';
import Image from 'next/image';

export function Header() {
  // const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background-secondary dark:bg-[#F9FAFB]">
      <Image src={logoLarge} alt="logo" width={158} height={32} />

      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
}

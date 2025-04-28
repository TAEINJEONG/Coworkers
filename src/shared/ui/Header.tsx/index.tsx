'use client';

import { LanguageSwitcher } from '@/shared/ui/LanguageSwitcher';
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher';
import { Transition } from '@headlessui/react';

// import { useTranslation } from 'react-i18next';
import userIcon from '@/shared/assets/images/user-icon.svg';
import hamburgerIcon from '@/shared/assets/images/hamburger-menu-icon.svg';
import logoLarge from '@/shared/assets/images/logo-large.svg';
import logoSmall from '@/shared/assets/images/logo-small.svg';
import downArrowIcon from '@/shared/assets/images/down-arrow-icon.svg';
import Image from 'next/image';
import Link from 'next/link';
import TeamDropDown from './TeamDropDown';
import UserDropDown from './UserDropDown';
import { useEffect, useRef, useState } from 'react';
import MobileTeamMenu from './MobileTeamMenu';

const Header = () => {
  // const { t } = useTranslation();
  const [isTeamDropDownOpen, setIsTeamDropDownOpen] = useState(false);
  const [isUserDropDownOpen, setIsUserDropDownOpen] = useState(false);
  const [isMobileTeamMenuOpen, setIsMobileTeamMenuOpen] = useState(false);
  const teamDropDownRef = useRef<HTMLDivElement>(null);
  const userDropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        teamDropDownRef.current &&
        !teamDropDownRef.current.contains(e.target as Node)
      ) {
        setIsTeamDropDownOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        userDropDownRef.current &&
        !userDropDownRef.current.contains(e.target as Node)
      ) {
        setIsUserDropDownOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background-secondary dark:bg-[#F9FAFB] fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1200px] w-full mx-auto flex justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center">
            <Image
              src={hamburgerIcon}
              alt="logo"
              width={24}
              height={24}
              className="block md:hidden mr-4"
              onClick={() => setIsMobileTeamMenuOpen((o) => !o)}
            />
            <Link href="/">
              <Image
                src={logoLarge}
                alt="logo"
                width={158}
                height={32}
                className="hidden md:block"
              />
              <Image
                src={logoSmall}
                alt="logo"
                width={102}
                height={20}
                className="block md:hidden"
              />
            </Link>
          </div>
          <div ref={teamDropDownRef} className="relative hidden md:block">
            <div
              className="flex items-center gap-2"
              onClick={() => setIsTeamDropDownOpen((o) => !o)}
            >
              <p className="text-text-primary text-md-m">경영관리팀</p>
              <Image
                src={downArrowIcon}
                alt="down-arrow"
                width={16}
                height={16}
              />
            </div>
            <Transition
              as="div"
              show={isTeamDropDownOpen}
              unmount={false}
              enter="transition ease-out duration-50"
              enterFrom="transform opacity-0 -translate-y-1 scale-95"
              enterTo="transform opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-50"
              leaveFrom="transform opacity-100 translate-y-0 scale-100"
              leaveTo="transform opacity-0 -translate-y-1 scale-95"
              className="absolute top-[50px] left-0 w-[180px]"
            >
              <TeamDropDown />
            </Transition>
          </div>
          <Link
            href="/boards"
            className="text-text-primary text-lg-m hidden md:block"
          >
            <p>자유게시판</p>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <div
            ref={userDropDownRef}
            onClick={() => setIsUserDropDownOpen((o) => !o)}
            className="flex items-center gap-2 text-text-primary text-md-m relative"
          >
            <Image
              src={userIcon}
              alt="user"
              width={24}
              height={24}
              className="md:w-4 md:h-4"
            />
            <p className="hidden md:block">사용자</p>
            <Transition
              as="div"
              show={isUserDropDownOpen}
              unmount={false}
              enter="transition ease-out duration-50"
              enterFrom="transform opacity-0 -translate-y-1 scale-95"
              enterTo="transform opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-50"
              leaveFrom="transform opacity-100 translate-y-0 scale-100"
              leaveTo="transform opacity-0 -translate-y-1 scale-95"
              className="absolute top-[50px] right-0 w-[120px]"
            >
              <UserDropDown />
            </Transition>
          </div>
        </div>
      </div>

      <Transition
        as="div"
        show={isMobileTeamMenuOpen}
        unmount={false}
        enter="transition ease-out duration-250"
        enterFrom="transform opacity-0 -translate-x-full"
        enterTo="transform opacity-100 translate-x-0"
        leave="transition ease-in duration-250"
        leaveFrom="transform opacity-100 translate-x-0"
        leaveTo="transform opacity-0 -translate-x-full"
        className="fixed inset-0 z-50"
      >
        <MobileTeamMenu isClose={() => setIsMobileTeamMenuOpen(false)} />
      </Transition>
    </header>
  );
};

export default Header;

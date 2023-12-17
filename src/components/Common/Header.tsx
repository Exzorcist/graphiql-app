import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { Bars3BottomRightIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utils';
import { useLocalizationContext } from '@/provider/LocalizationProvider';
import Logo from '@/assets/logo-graphql.svg';
import SwitchLang from './Header/SwitchLang';

function Header() {
  const { i18nQL, lang } = useLocalizationContext();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [show, isShow] = useState<boolean>(false);
  const menu = useRef<HTMLDivElement | null>(null);

  // TODO: waiting part with login & redux
  const isLogin = false;

  const handleScroll = () => setScrolled(window.scrollY > 0);
  const handleClickOutside = (event: MouseEvent) => {
    if (menu.current && !menu.current.contains(event.target as Node)) {
      isShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        'bg-main py-3 md:py-4 text-white sticky top-0 transition-colors duration-500',
        scrolled && 'bg-purple-600'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-5">
        <NavLink
          to="/"
          className="flex items-center gap-4 text-lg sm:text-xl font-medium tracking-wider transition-colors
                    duration-300 hover:text-orange-200"
        >
          <ReactSVG src={Logo} className="w-6 h-6" />
          GQL sandbox
        </NavLink>

        <div className="relative flex items-center gap-3">
          <span
            className="sm:hidden transition-colors duration-300 hover:text-orange-200 cursor-pointer"
            onClick={() => isShow(!show)}
            ref={menu}
            aria-hidden
          >
            <Bars3BottomRightIcon className="w-8 h-8" />
          </span>
          <SwitchLang />

          <div
            className={cn(
              `absolute top-12 right-0 z-10 grid bg-white text-main text-base duration-300 py-1.5 min-w-[155px]
               w-32 shadow rounded-md text-right overflow-hidden transition-all opacity-0 invisible
               sm:static sm:!opacity-100 sm:!visible sm:bg-transparent sm:flex sm:text-white sm:shadow-none
               sm:gap-4 sm:p-0 sm:min-w-0 sm:w-full sm:!translate-y-0`,
              show && '-translate-y-2 opacity-100 visible'
            )}
          >
            <span className="hidden sm:block">|</span>

            <NavLink
              to="/welcome"
              className="py-2 px-3.5 cursor-pointer transition-colors duration-300 hover:bg-main/10
                         border-b border-neutral-200 sm:border-b-0 sm:p-0 sm:hover:bg-transparent
                         sm:hover:text-orange-200"
            >
              {i18nQL[lang].header.links.about}
            </NavLink>
            <span className="hidden sm:block">|</span>

            {!isLogin ? (
              <NavLink
                to="/login"
                className="py-2 px-3.5 cursor-pointer transition-colors duration-300 hover:bg-main/10 
                           sm:p-0 sm:hover:bg-transparent sm:hover:text-orange-200"
              >
                {i18nQL[lang].header.links.login}
              </NavLink>
            ) : (
              <span
                className="py-2 px-3.5 cursor-pointer transition-colors duration-300 hover:bg-main/10
                           sm:p-0 sm:hover:bg-transparent sm:hover:text-orange-200"
              >
                {i18nQL[lang].header.links.logout}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

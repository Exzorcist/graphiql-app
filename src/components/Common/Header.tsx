import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { cn } from '@/utils';
import { useLocalizationContext } from '@/provider/LocalizationProvider';
import Logo from '@/assets/logo-graphql.svg';
import SwitchLang from './Header/SwitchLang';

function Header() {
  const { i18nQL, lang } = useLocalizationContext();
  const [scrolled, setScrolled] = useState<boolean>(false);

  // TODO: waiting part with login & redux
  const isLogin = false;

  const handleScroll = () => setScrolled(window.scrollY > 0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'bg-main py-4 text-white sticky top-0 transition-colors duration-500',
        scrolled && 'bg-purple-600'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between gap-5 flex-wrap">
        <NavLink
          to="/"
          className="flex items-center gap-4 text-xl font-medium tracking-wider transition-colors
                    duration-300 hover:text-orange-200"
        >
          <ReactSVG src={Logo} className="w-6 h-6" />
          GQL sandbox
        </NavLink>

        <div className="flex gap-3 flex-wrap">
          <SwitchLang />
          <span>|</span>

          <NavLink to="/welcome" className="transition-colors duration-300 hover:text-orange-200">
            {i18nQL[lang].header.links.about}
          </NavLink>
          <span>|</span>

          {!isLogin ? (
            <NavLink to="/login" className="transition-colors duration-300 hover:text-orange-200">
              {i18nQL[lang].header.links.login}
            </NavLink>
          ) : (
            <span className="transition-colors duration-300 hover:text-orange-200">
              {i18nQL[lang].header.links.logout}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

import { memo } from 'react';
import { ReactSVG } from 'react-svg';

import LogoRS from '@/assets/logo-rsschool.svg';
import LogoGithub from '@/assets/logo-github.svg';
import TargetButton from '../Login/Logout/TargetButton';

function Footer() {
  return (
    <footer>
      <div className="bg-main text-white">
        <div className="flex gap-5 py-3 px-5 justify-between items-center max-w-7xl mx-auto md:py-5">
          <div className="flex gap-4 items-center">
            <a
              className="flex items-center gap-2 transition-colors duration-300 hover:text-orange-200"
              href="https://github.com/Exzorcist/graphiql-app/tree/develop"
              target="_blank"
              rel="noreferrer"
              aria-label="GraphQL Logo github"
            >
              <ReactSVG src={LogoGithub} className="w-10 h-10" />
              <span className="hidden sm:block">&#34;Just Do It&#34; team</span>
            </a>
            <span className="text-xl font-thin">|</span>
            <span className="text-lg font-light flex gap-1.5">
              <span className="hidden sm:block">React</span>
              <span className="font-medium">2023</span>
              <span className="hidden sm:block">Q4</span>
            </span>
          </div>
          {/* {TODO: Example button for changing login-logout} */}
          <TargetButton />
          <a
            className="transition-transform duration-300 hover:scale-110"
            href="https://rs.school/react/"
            target="_blank"
            rel="noreferrer"
            aria-label="RSSchool Logo"
          >
            <ReactSVG src={LogoRS} className="w-20 h-10" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);

import LogoRS from '@/assets/logo-rsschool.svg';
import LogoGithub from '@/assets/logo-github.svg';

function Footer() {
  return (
    <footer className="mt-auto pt-9">
      <div className="bg-[#d60590] text-white">
        <div className="flex gap-5 p-5 justify-between items-center max-w-7xl mx-auto">
          <div className="flex gap-4 items-center">
            <a
              className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-80"
              href="https://github.com/Exzorcist/graphiql-app/tree/develop"
              target="_blank"
              rel="noreferrer"
            >
              <img src={LogoGithub} alt="GraphQL Logo github" width={42} height={42} />
              <span className="hidden sm:block">graphiql-app</span>
            </a>
            <span className="text-xl font-thin">|</span>
            <span className="text-lg font-light flex gap-1.5">
              <span className="hidden sm:block">React</span>
              <span className="font-medium">2023</span>
              <span className="hidden sm:block">Q4</span>
            </span>
          </div>

          <a
            className="transition-opacity duration-300 hover:opacity-80"
            href="https://rs.school/react/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={LogoRS} alt="RSSchool Logo" width={80} height={42} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

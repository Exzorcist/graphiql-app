import { ReactSVG } from 'react-svg';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

import IvanImage from '@/assets/team/Ivan.jpg';
import PolinaImage from '@/assets/team/Polina.jpg';
import MaratImage from '@/assets/team/Marat.jpg';
import LogoGithub from '@/assets/logo-github.svg';

function Welcome() {
  const { t } = useLocalizationContext();
  const avatars = [IvanImage, PolinaImage, MaratImage];

  return (
    <section className="max-w-7xl mx-auto px-5 py-10 grid gap-8">
      <h1 className="text-4xl font-medium text-center mt-8 mb-5">{t.page.welcome.title}</h1>
      <div
        className="text-center leading-8 text-neutral-700 italic border-2 border-main rounded-2xl 
                   py-6 px-4 bg-main/10 mb-8"
      >
        {t.page.welcome.description.project}
      </div>
      <h2 className="text-center text-2xl font-medium max-w-xl mx-auto mb-5">
        {t.page.welcome.description.team}
      </h2>

      <div className="grid gap-6">
        {avatars.map((avatar, index) => (
          <div
            className="grid sm:grid-cols-[200px_1fr] gap-5 border-b border-neutral-300 pb-5 last:border-0 last:pb-0"
            key={avatar}
          >
            <img
              className="rounded-xl max-w-sm w-full mx-auto"
              src={avatar}
              alt={`Avatar ${t.page.welcome.teams[index].name}`}
            />

            <div>
              <h2 className="text-3xl font-medium mb-1">{t.page.welcome.teams[index].name}</h2>
              <h3 className="text-neutral-500 italic mb-4 text-lg">
                {`{ ${t.page.welcome.teams[index].position} }`}
              </h3>
              <p className="leading-7 tracking-wide mb-8">{t.page.welcome.teams[index].workOn}</p>

              <a
                className="inline-flex gap-2 items-center transition-colors duration-300 hover:text-main"
                href={t.page.welcome.teams[index].github}
                aria-label="Link to gihub"
              >
                <ReactSVG src={LogoGithub} className="w-8 h-8" />
                {t.page.welcome.teams[index].github.replace('https://github.com/', '')}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div
        className="text-center leading-8 text-neutral-700 italic border-2 border-main rounded-2xl 
                   py-6 px-4 bg-main/10 mb-8 mt-10"
      >
        {t.page.welcome.description.rsschool}
      </div>
    </section>
  );
}

export default Welcome;

import { ReactSVG } from 'react-svg';
import { useLocalizationContext } from '@/provider/LocalizationProvider';

import IvanImage from '@/assets/team/Ivan.jpg';
import PolinaImage from '@/assets/team/Polina.jpg';
import MaratImage from '@/assets/team/Marat.jpg';
import LogoGithub from '@/assets/logo-github.svg';

function Welcome() {
  const { i18nQL, lang } = useLocalizationContext();
  const avatars = [IvanImage, PolinaImage, MaratImage];

  return (
    <section>
      <h1>{i18nQL[lang].page.welcome.title}</h1>
      <div>{i18nQL[lang].page.welcome.description.project}</div>
      <div>{i18nQL[lang].page.welcome.description.rsschool}</div>
      <div>{i18nQL[lang].page.welcome.description.team}</div>

      <div>
        {avatars.map((avatar, index) => (
          <div key={avatar}>
            <img src={avatar} alt={`Avatar ${i18nQL[lang].page.welcome.teams[index].name}`} />

            <div>
              <h2>
                {i18nQL[lang].page.welcome.teams[index].name}
                <a href={i18nQL[lang].page.welcome.teams[index].github} aria-label="Link to gihub">
                  <ReactSVG src={LogoGithub} className="w-10 h-10" />
                </a>
              </h2>
              <h3>{i18nQL[lang].page.welcome.teams[index].position}</h3>
              <p>{i18nQL[lang].page.welcome.teams[index].workOn}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Welcome;

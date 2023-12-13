import { useLocalizationContext } from '@/provider/LocalizationProvider';

function NotFound() {
  const { i18nQL, lang, setLang } = useLocalizationContext();

  return (
    <div className="flex flex-col justify-center px-5 py-20 min-h-[85vh] text-center text-[#d60590]">
      <h1 className="text-9xl tracking-widest mb-5 animate-pulse">404</h1>
      <h2 className="text-4xl animate-pulse">{i18nQL[lang].page.notfound.text}</h2>

      {/* TODO: test button, delete after implementation */}
      <div className="flex gap-3 justify-center mt-20">
        <span
          onClick={() => setLang('eng')}
          aria-hidden
          className="py-2 px-6 cursor-pointer border border-[#d60590]"
        >
          ENG
        </span>
        <span
          onClick={() => setLang('ru')}
          aria-hidden
          className="py-2 px-6 cursor-pointer border border-[#d60590]"
        >
          RU
        </span>
        <span
          onClick={() => setLang('by')}
          aria-hidden
          className="py-2 px-6 cursor-pointer border border-[#d60590]"
        >
          BY
        </span>
      </div>
    </div>
  );
}

export default NotFound;

import { useLocalizationContext } from '@/provider/LocalizationProvider';

function NotFound() {
  const { i18nQL, lang } = useLocalizationContext();

  return (
    <div className="flex flex-col justify-center px-5 py-20 min-h-[84vh] text-center text-main">
      <h1 className="text-9xl tracking-widest mb-5 animate-pulse">404</h1>
      <h2 className="text-4xl animate-pulse">{i18nQL[lang].page.notfound.text}</h2>
    </div>
  );
}

export default NotFound;

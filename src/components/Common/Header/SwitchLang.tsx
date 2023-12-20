import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import { setLocalization } from '@/redux/reducers/LocalizationSlice';
import { cn } from '@/utils/cn';
import { Language } from '@/types/Provider';

function SwitchLang() {
  const languages: string[] = ['English', 'Русский', 'Беларускі'];
  const codes: Language[] = ['eng', 'ru', 'by'];
  const dispatch = useDispatch();
  const { setLang, lang } = useLocalizationContext();
  const [show, isShow] = useState<boolean>(false);
  const langBox = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (langBox.current && !langBox.current.contains(event.target as Node)) {
      isShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={langBox}>
      <div
        className="flex gap-2 items-center cursor-pointer transition-colors duration-300 hover:text-orange-200"
        onClick={() => isShow(!show)}
        aria-hidden
      >
        <span className="hidden sm:block">{lang}</span>
        <GlobeAltIcon className="w-8 h-8 sm:w-6 sm:h-6" />
      </div>

      <div
        className={cn(
          `absolute top-12 right-0 z-10 grid bg-white text-main text-base duration-300 sm:top-10
           w-32 shadow rounded-md text-right overflow-hidden transition-all opacity-0 invisible`,
          show && '-translate-y-2 opacity-100 visible'
        )}
      >
        {codes.map((code, index) => (
          <span
            className={cn(
              `py-2 px-3.5 cursor-pointer transition-colors duration-300 hover:bg-main/10
               border-b border-neutral-200 last:border-b-0`,
              code === lang && 'bg-main/80 text-white pointer-events-none'
            )}
            key={code}
            onClick={() => {
              setLang(code);
              dispatch(setLocalization(code));
              isShow(false);
            }}
            aria-hidden
          >
            {languages[index]}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SwitchLang;

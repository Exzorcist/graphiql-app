import { Palette } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Theme, useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/utils/cn';

function SwitchTheme() {
  const themes: Theme[] = ['dracula', 'light'];
  const [theme, setTheme] = useTheme();
  const [show, isShow] = useState<boolean>(false);
  const themeBox = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (themeBox.current && !themeBox.current.contains(event.target as Node)) {
      isShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={themeBox}>
      <div
        className="flex gap-2 items-center cursor-pointer transition-colors duration-300 hover:text-orange-200"
        onClick={() => isShow(!show)}
        aria-hidden
      >
        <span className="hidden sm:block">{theme}</span>
        <Palette className="w-8 h-8 sm:w-6 sm:h-6" />
      </div>

      <div
        className={cn(
          `absolute top-12 right-0 z-10 grid bg-white text-main text-base duration-300 sm:top-10
           w-32 shadow rounded-md text-right overflow-hidden transition-all opacity-0 invisible`,
          show && '-translate-y-2 opacity-100 visible'
        )}
      >
        {themes.map((t) => (
          <span
            className={cn(
              `py-2 px-3.5 cursor-pointer transition-colors duration-300 hover:bg-main/10
               border-b border-neutral-200 last:border-b-0`,
              t === theme && 'bg-main/80 text-white pointer-events-none'
            )}
            key={t}
            onClick={() => {
              setTheme(t);
              isShow(false);
            }}
            aria-hidden
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SwitchTheme;

import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'dracula' | 'light';

export type ThemeContextType = Readonly<[theme: Theme, setTheme: (theme: Theme) => void]>;

const ThemeContext = createContext<ThemeContextType | null>(null);

const initThemeState = () => {
  const item = localStorage.getItem('theme');

  if (item === 'dracula' || item === 'light') {
    return item;
  }

  return 'dracula';
};

function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(initThemeState);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const value = useMemo(() => [theme, setTheme] as const, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('useContext must be used inside ThemeProvider');
  }

  return value;
}

export default ThemeProvider;

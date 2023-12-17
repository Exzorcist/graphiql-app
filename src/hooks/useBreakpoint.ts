import { useMediaQuery } from 'react-responsive';

const breakpoints = {
  'min-laptop': { minWidth: 1024 },
  'min-mobile-lg': { minWidth: 480 },
} as const;

export function useBreakpoint(breakpointName: keyof typeof breakpoints) {
  return useMediaQuery(breakpoints[breakpointName]);
}

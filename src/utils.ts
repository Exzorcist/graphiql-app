import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const twConfig = resolveConfig(tailwindConfig);

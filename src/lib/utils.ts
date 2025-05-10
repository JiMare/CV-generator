import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidRangeDate = (from: string, to: string) => {
  const [fromYear, fromMonth] = from.split('/');
  const [toYear, toMonth] = to.split('/');

  return fromYear < toYear || (fromYear === toYear && fromMonth <= toMonth);
};

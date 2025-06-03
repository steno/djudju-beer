import { useLanguage } from '../context/LanguageContext';
import type { Translation } from '../translations/types';

type Path<T> = T extends object ? {
  [K in keyof T]: K extends string ? 
    T[K] extends object ? 
      Path<T[K]> extends string ? 
        `${K}.${Path<T[K]>}` : 
        never : 
      K : 
    never;
}[keyof T] : never;

type PathValue<T, P extends string> = P extends keyof T ? 
  T[P] : 
  P extends `${infer K}.${infer Rest}` ? 
    K extends keyof T ? 
      PathValue<T[K], Rest> : 
      never : 
    never;

export const useTranslation = () => {
  const { translations } = useLanguage();

  const t = <P extends Path<Translation>>(path: P): PathValue<Translation, P> => {
    return path.split('.').reduce((obj, key) => obj[key], translations as any);
  };

  return { t };
};
import en from './en.json';
import es from './es.json';

export type Dictionary = typeof en;

export async function getDictionary(lang: 'en' | 'es'): Promise<Dictionary> {
  switch (lang) {
    case 'en':
      return en;
    case 'es':
      return es;
    default:
      return en;
  }
}

import 'server-only'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'es') => {
  console.log('Getting dictionary for locale:', locale)
  console.log('Available locales:', Object.keys(dictionaries))
  
  const dictionary = dictionaries[locale]
  if (!dictionary) {
    throw new Error(`Dictionary for locale "${locale}" not found`)
  }
  return dictionary()
}

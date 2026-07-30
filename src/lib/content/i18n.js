export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
};

const dictionaries = {
  en: {
    home: () => import('./en/home.json'),
  },
  es: {
    home: () => import('./es/home.json'),
  },
};

export async function getDictionary(locale, page) {
  const activeLocale = i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
  const loadDictionary =
    dictionaries[activeLocale]?.[page] ?? dictionaries[i18n.defaultLocale]?.[page];

  if (!loadDictionary) {
    throw new Error(`No dictionary exists for page "${page}".`);
  }

  const dictionary = await loadDictionary();
  return dictionary.default;
}
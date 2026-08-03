export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
};

const dictionaries = {
  en: {
    home: () => import('./en/home.json'),
    footer: () => import('./en/footer.json'),
    testimonial: () => import('./en/testimonial.json'),
    portfolio: () => import('./en/portfolio.json'),
    feedback: () => import('./en/feedback.json'),
  },
  es: {
    home: () => import('./es/home.json'),
    footer: () => import('./es/footer.json'),
    testimonial: () => import('./es/testimonial.json'),
    portfolio: () => import('./es/portfolio.json'),
    feedback: () => import('./es/feedback.json'),
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
// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationUZ from "./locales/uz/translation.json";
import translationRU from "./locales/ru/translation.json";

// Configure i18next
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    uz: { translation: translationUZ },
    ru: { translation: translationRU },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;

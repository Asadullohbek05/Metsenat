import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./languages/en/translation.json";
import translationUZ from "./languages/uz/translation.json";
import translationRU from "./languages/ru/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    uz: { translation: translationUZ },
    ru: { translation: translationRU },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

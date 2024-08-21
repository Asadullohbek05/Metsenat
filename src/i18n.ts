import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./languages/en/translation.json";
import translationUZ from "./languages/uz/translation.json";
import translationRU from "./languages/ru/translation.json";

const savedLanguage = localStorage.getItem("selectedLanguage");
const initialLanguage = savedLanguage ? JSON.parse(savedLanguage).locale : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    uz: { translation: translationUZ },
    ru: { translation: translationRU },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

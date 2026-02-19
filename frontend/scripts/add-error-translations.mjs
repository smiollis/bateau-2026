#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = resolve(__dirname, "../messages");

const newKeys = {
  fr: {
    notFound: {
      title: "Page non trouvée",
      description: "La page que vous recherchez n'existe pas ou a été déplacée.",
      backHome: "Retour à l'accueil",
    },
    error: {
      title: "Une erreur est survenue",
      description: "Nous nous excusons pour la gêne occasionnée. Veuillez réessayer.",
      retry: "Réessayer",
    },
  },
  en: {
    notFound: {
      title: "Page not found",
      description: "The page you are looking for does not exist or has been moved.",
      backHome: "Back to home",
    },
    error: {
      title: "An error occurred",
      description: "We apologize for the inconvenience. Please try again.",
      retry: "Try again",
    },
  },
  es: {
    notFound: {
      title: "Página no encontrada",
      description: "La página que busca no existe o ha sido movida.",
      backHome: "Volver al inicio",
    },
    error: {
      title: "Se produjo un error",
      description: "Nos disculpamos por las molestias. Por favor, inténtelo de nuevo.",
      retry: "Reintentar",
    },
  },
  it: {
    notFound: {
      title: "Pagina non trovata",
      description: "La pagina che stai cercando non esiste o è stata spostata.",
      backHome: "Torna alla home",
    },
    error: {
      title: "Si è verificato un errore",
      description: "Ci scusiamo per l'inconveniente. Riprova.",
      retry: "Riprova",
    },
  },
  de: {
    notFound: {
      title: "Seite nicht gefunden",
      description: "Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.",
      backHome: "Zurück zur Startseite",
    },
    error: {
      title: "Ein Fehler ist aufgetreten",
      description: "Wir entschuldigen uns für die Unannehmlichkeiten. Bitte versuchen Sie es erneut.",
      retry: "Erneut versuchen",
    },
  },
  "pt-BR": {
    notFound: {
      title: "Página não encontrada",
      description: "A página que você procura não existe ou foi movida.",
      backHome: "Voltar ao início",
    },
    error: {
      title: "Ocorreu um erro",
      description: "Pedimos desculpas pelo inconveniente. Por favor, tente novamente.",
      retry: "Tentar novamente",
    },
  },
};

for (const [locale, sections] of Object.entries(newKeys)) {
  const file = resolve(messagesDir, `${locale}.json`);
  const data = JSON.parse(readFileSync(file, "utf-8"));

  for (const [key, value] of Object.entries(sections)) {
    if (!data[key]) {
      data[key] = value;
    }
  }

  writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log(`${locale}.json: notFound + error keys added`);
}

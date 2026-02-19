#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = resolve(__dirname, "../messages");

const newKeys = {
  fr: {
    anniversaireMariage: "Anniversaire mariage",
    nouvelAn: "Nouvel An",
    noel: "Noël",
    feteDesMeres: "Fête des Mères",
    seminaire: "Séminaire",
  },
  en: {
    anniversaireMariage: "Wedding Anniversary",
    nouvelAn: "New Year's Eve",
    noel: "Christmas",
    feteDesMeres: "Mother's Day",
    seminaire: "Seminar",
  },
  es: {
    anniversaireMariage: "Aniversario de boda",
    nouvelAn: "Nochevieja",
    noel: "Navidad",
    feteDesMeres: "Día de la Madre",
    seminaire: "Seminario",
  },
  it: {
    anniversaireMariage: "Anniversario di matrimonio",
    nouvelAn: "Capodanno",
    noel: "Natale",
    feteDesMeres: "Festa della mamma",
    seminaire: "Seminario",
  },
  de: {
    anniversaireMariage: "Hochzeitstag",
    nouvelAn: "Silvester",
    noel: "Weihnachten",
    feteDesMeres: "Muttertag",
    seminaire: "Seminar",
  },
  "pt-BR": {
    anniversaireMariage: "Aniversário de casamento",
    nouvelAn: "Ano Novo",
    noel: "Natal",
    feteDesMeres: "Dia das Mães",
    seminaire: "Seminário",
  },
};

for (const [locale, keys] of Object.entries(newKeys)) {
  const file = resolve(messagesDir, `${locale}.json`);
  const data = JSON.parse(readFileSync(file, "utf-8"));

  if (!data.occasions) {
    console.log(`SKIP ${locale}: no occasions section`);
    continue;
  }

  let added = 0;
  for (const [key, value] of Object.entries(keys)) {
    if (!data.occasions[key]) {
      data.occasions[key] = value;
      added++;
    }
  }

  writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log(`${locale}.json: ${added} keys added`);
}

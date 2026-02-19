#!/usr/bin/env node
/**
 * Add 2-3 internal links to the 31 articles that have none.
 * Links are appended as a contextual paragraph at the end of the content.
 * Applied to all 6 locale JSON files.
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, "../src/data");

// Links per slug or category. Keys that start with "cat:" apply to a category.
const linkMap = {
  // === Pont de Paris (19 articles) ===
  "cat:Pont de Paris": {
    fr: '<p><strong>À lire aussi :</strong> Découvrez ces ponts lors de votre <a href="/fr/croisiere">croisière privée sur la Seine</a>. Consultez notre <a href="/fr/galerie">galerie photo</a> pour un aperçu du parcours, ou <a href="/fr/reservation">réservez votre croisière</a> dès maintenant.</p>',
    en: '<p><strong>Read also:</strong> Discover these bridges during your <a href="/en/croisiere">private cruise on the Seine</a>. Browse our <a href="/en/galerie">photo gallery</a> for a preview, or <a href="/en/reservation">book your cruise</a> now.</p>',
    es: '<p><strong>Lea también:</strong> Descubra estos puentes durante su <a href="/es/croisiere">crucero privado por el Sena</a>. Vea nuestra <a href="/es/galerie">galería de fotos</a> o <a href="/es/reservation">reserve su crucero</a> ahora.</p>',
    it: '<p><strong>Leggi anche:</strong> Scopri questi ponti durante la tua <a href="/it/croisiere">crociera privata sulla Senna</a>. Visita la nostra <a href="/it/galerie">galleria fotografica</a> o <a href="/it/reservation">prenota la tua crociera</a>.</p>',
    de: '<p><strong>Lesen Sie auch:</strong> Entdecken Sie diese Brücken bei Ihrer <a href="/de/croisiere">privaten Kreuzfahrt auf der Seine</a>. Sehen Sie unsere <a href="/de/galerie">Fotogalerie</a> oder <a href="/de/reservation">buchen Sie Ihre Kreuzfahrt</a>.</p>',
    "pt-BR": '<p><strong>Leia também:</strong> Descubra essas pontes durante seu <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>. Veja nossa <a href="/pt-BR/galerie">galeria de fotos</a> ou <a href="/pt-BR/reservation">reserve seu cruzeiro</a>.</p>',
  },

  // === Actualites specifics ===
  "le-senang-participe-a-la-ceremonie-douverture-des-jeux-olympiques-de-paris-2024": {
    fr: '<p><strong>À découvrir :</strong> Revivez cette aventure à bord du Senang lors d\'une <a href="/fr/croisiere">croisière privée sur la Seine</a>. <a href="/fr/reservation">Réservez votre croisière</a> et naviguez au cœur de Paris.</p>',
    en: '<p><strong>Discover:</strong> Relive this adventure aboard the Senang with a <a href="/en/croisiere">private cruise on the Seine</a>. <a href="/en/reservation">Book your cruise</a> and sail through the heart of Paris.</p>',
    es: '<p><strong>Descubra:</strong> Reviva esta aventura a bordo del Senang con un <a href="/es/croisiere">crucero privado por el Sena</a>. <a href="/es/reservation">Reserve su crucero</a>.</p>',
    it: '<p><strong>Scopri:</strong> Rivivi questa avventura a bordo del Senang con una <a href="/it/croisiere">crociera privata sulla Senna</a>. <a href="/it/reservation">Prenota la tua crociera</a>.</p>',
    de: '<p><strong>Entdecken:</strong> Erleben Sie dieses Abenteuer auf dem Senang mit einer <a href="/de/croisiere">privaten Seine-Kreuzfahrt</a>. <a href="/de/reservation">Buchen Sie Ihre Kreuzfahrt</a>.</p>',
    "pt-BR": '<p><strong>Descubra:</strong> Reviva esta aventura a bordo do Senang com um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>. <a href="/pt-BR/reservation">Reserve seu cruzeiro</a>.</p>',
  },

  // Generic Actualites template
  "cat:Actualites Un Bateau a Paris": {
    fr: '<p><strong>Envie d\'embarquer ?</strong> Découvrez nos <a href="/fr/croisiere">croisières privées sur la Seine</a> et <a href="/fr/reservation">réservez votre prochaine expérience</a> à bord du Senang.</p>',
    en: '<p><strong>Ready to board?</strong> Discover our <a href="/en/croisiere">private Seine cruises</a> and <a href="/en/reservation">book your next experience</a> aboard the Senang.</p>',
    es: '<p><strong>¿Listo para embarcar?</strong> Descubra nuestros <a href="/es/croisiere">cruceros privados por el Sena</a> y <a href="/es/reservation">reserve su próxima experiencia</a>.</p>',
    it: '<p><strong>Pronti a imbarcarvi?</strong> Scoprite le nostre <a href="/it/croisiere">crociere private sulla Senna</a> e <a href="/it/reservation">prenotate la vostra prossima esperienza</a>.</p>',
    de: '<p><strong>Bereit einzusteigen?</strong> Entdecken Sie unsere <a href="/de/croisiere">privaten Seine-Kreuzfahrten</a> und <a href="/de/reservation">buchen Sie Ihr nächstes Erlebnis</a>.</p>',
    "pt-BR": '<p><strong>Pronto para embarcar?</strong> Descubra nossos <a href="/pt-BR/croisiere">cruzeiros privados no Sena</a> e <a href="/pt-BR/reservation">reserve sua próxima experiência</a>.</p>',
  },

  // === Decouverte specifics ===
  "croisiere-a-paris-2pers-6pers": {
    fr: '<p><strong>À découvrir :</strong> Consultez nos <a href="/fr/croisiere">formules de croisière</a> pour 2 à 12 personnes. Découvrez les <a href="/fr/croisiere-romantique-seine">croisières romantiques</a> ou organisez une <a href="/fr/soiree-entre-amis-seine">soirée entre amis</a> sur la Seine. <a href="/fr/reservation">Réservez maintenant</a>.</p>',
    en: '<p><strong>Discover:</strong> Check our <a href="/en/croisiere">cruise options</a> for 2 to 12 guests. Explore <a href="/en/croisiere-romantique-seine">romantic cruises</a> or plan a <a href="/en/soiree-entre-amis-seine">friends\' night out</a> on the Seine. <a href="/en/reservation">Book now</a>.</p>',
    es: '<p><strong>Descubra:</strong> Consulte nuestras <a href="/es/croisiere">opciones de crucero</a> para 2 a 12 personas. <a href="/es/reservation">Reserve ahora</a>.</p>',
    it: '<p><strong>Scopri:</strong> Consulta le nostre <a href="/it/croisiere">opzioni di crociera</a> per 2-12 persone. <a href="/it/reservation">Prenota ora</a>.</p>',
    de: '<p><strong>Entdecken:</strong> Sehen Sie unsere <a href="/de/croisiere">Kreuzfahrt-Optionen</a> für 2-12 Personen. <a href="/de/reservation">Jetzt buchen</a>.</p>',
    "pt-BR": '<p><strong>Descubra:</strong> Confira nossas <a href="/pt-BR/croisiere">opções de cruzeiro</a> para 2 a 12 pessoas. <a href="/pt-BR/reservation">Reserve agora</a>.</p>',
  },
  "un-enterrement-de-vie-de-jeune-fille-inoubliable-a-bord-du-senang": {
    fr: '<p><strong>Organisez votre EVJF :</strong> Découvrez notre <a href="/fr/evjf-seine">croisière EVJF sur la Seine</a> et préparez une fête inoubliable. <a href="/fr/reservation">Réservez votre croisière privée</a>.</p>',
    en: '<p><strong>Plan your hen party:</strong> Discover our <a href="/en/evjf-seine">Seine hen party cruise</a> and plan an unforgettable celebration. <a href="/en/reservation">Book your private cruise</a>.</p>',
    es: '<p><strong>Organice su despedida:</strong> Descubra nuestro <a href="/es/evjf-seine">crucero de despedida de soltera</a>. <a href="/es/reservation">Reserve su crucero</a>.</p>',
    it: '<p><strong>Organizza il tuo addio al nubilato:</strong> Scopri la nostra <a href="/it/evjf-seine">crociera EVJF</a>. <a href="/it/reservation">Prenota la tua crociera</a>.</p>',
    de: '<p><strong>Planen Sie Ihren JGA:</strong> Entdecken Sie unsere <a href="/de/evjf-seine">JGA-Kreuzfahrt</a>. <a href="/de/reservation">Buchen Sie Ihre Kreuzfahrt</a>.</p>',
    "pt-BR": '<p><strong>Organize sua despedida:</strong> Descubra nosso <a href="/pt-BR/evjf-seine">cruzeiro de despedida</a>. <a href="/pt-BR/reservation">Reserve seu cruzeiro</a>.</p>',
  },
  "une-croisiere-romantique-au-crepuscule-sur-la-seine-a-bord-du-senang": {
    fr: '<p><strong>Vivez le romantisme :</strong> Offrez-vous une <a href="/fr/croisiere-romantique-seine">croisière romantique sur la Seine</a> ou préparez une <a href="/fr/demande-en-mariage-seine">demande en mariage</a> inoubliable. <a href="/fr/reservation">Réservez votre croisière</a>.</p>',
    en: '<p><strong>Experience romance:</strong> Enjoy a <a href="/en/croisiere-romantique-seine">romantic Seine cruise</a> or plan an unforgettable <a href="/en/demande-en-mariage-seine">marriage proposal</a>. <a href="/en/reservation">Book your cruise</a>.</p>',
    es: '<p><strong>Viva el romanticismo:</strong> Disfrute de un <a href="/es/croisiere-romantique-seine">crucero romántico</a> o prepare una <a href="/es/demande-en-mariage-seine">propuesta de matrimonio</a>. <a href="/es/reservation">Reserve</a>.</p>',
    it: '<p><strong>Vivi il romanticismo:</strong> Goditi una <a href="/it/croisiere-romantique-seine">crociera romantica</a> o prepara una <a href="/it/demande-en-mariage-seine">proposta di matrimonio</a>. <a href="/it/reservation">Prenota</a>.</p>',
    de: '<p><strong>Erleben Sie Romantik:</strong> Genießen Sie eine <a href="/de/croisiere-romantique-seine">romantische Kreuzfahrt</a> oder planen Sie einen <a href="/de/demande-en-mariage-seine">Heiratsantrag</a>. <a href="/de/reservation">Buchen</a>.</p>',
    "pt-BR": '<p><strong>Viva o romance:</strong> Desfrute de um <a href="/pt-BR/croisiere-romantique-seine">cruzeiro romântico</a> ou planeje um <a href="/pt-BR/demande-en-mariage-seine">pedido de casamento</a>. <a href="/pt-BR/reservation">Reserve</a>.</p>',
  },
  "une-reunion-de-famille-inoubliable-a-bord-du-senang-sur-la-seine": {
    fr: '<p><strong>Pour la famille :</strong> Organisez une <a href="/fr/croisiere-famille-seine">croisière en famille sur la Seine</a> ou fêtez un <a href="/fr/anniversaire-seine">anniversaire</a> mémorable. <a href="/fr/reservation">Réservez votre croisière privée</a>.</p>',
    en: '<p><strong>For families:</strong> Plan a <a href="/en/croisiere-famille-seine">family cruise on the Seine</a> or celebrate a memorable <a href="/en/anniversaire-seine">birthday</a>. <a href="/en/reservation">Book your private cruise</a>.</p>',
    es: '<p><strong>En familia:</strong> Organice un <a href="/es/croisiere-famille-seine">crucero familiar por el Sena</a> o celebre un <a href="/es/anniversaire-seine">cumpleaños</a>. <a href="/es/reservation">Reserve</a>.</p>',
    it: '<p><strong>In famiglia:</strong> Organizza una <a href="/it/croisiere-famille-seine">crociera in famiglia</a> o festeggia un <a href="/it/anniversaire-seine">compleanno</a>. <a href="/it/reservation">Prenota</a>.</p>',
    de: '<p><strong>Für Familien:</strong> Planen Sie eine <a href="/de/croisiere-famille-seine">Familienkreuzfahrt</a> oder feiern Sie einen <a href="/de/anniversaire-seine">Geburtstag</a>. <a href="/de/reservation">Buchen</a>.</p>',
    "pt-BR": '<p><strong>Em família:</strong> Organize um <a href="/pt-BR/croisiere-famille-seine">cruzeiro em família</a> ou celebre um <a href="/pt-BR/anniversaire-seine">aniversário</a>. <a href="/pt-BR/reservation">Reserve</a>.</p>',
  },
  "shooting-photo-au-pieds-de-la-tour-eiffel": {
    fr: '<p><strong>À découvrir :</strong> Réservez un <a href="/fr/shooting-photo-seine">shooting photo sur la Seine</a> avec vue sur la Tour Eiffel. Consultez notre <a href="/fr/galerie">galerie</a> et <a href="/fr/reservation">réservez votre croisière</a>.</p>',
    en: '<p><strong>Discover:</strong> Book a <a href="/en/shooting-photo-seine">photo shoot on the Seine</a> with views of the Eiffel Tower. See our <a href="/en/galerie">gallery</a> and <a href="/en/reservation">book your cruise</a>.</p>',
    es: '<p><strong>Descubra:</strong> Reserve una <a href="/es/shooting-photo-seine">sesión de fotos en el Sena</a>. Vea nuestra <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve</a>.</p>',
    it: '<p><strong>Scopri:</strong> Prenota un <a href="/it/shooting-photo-seine">servizio fotografico sulla Senna</a>. Vedi la nostra <a href="/it/galerie">galleria</a> e <a href="/it/reservation">prenota</a>.</p>',
    de: '<p><strong>Entdecken:</strong> Buchen Sie ein <a href="/de/shooting-photo-seine">Fotoshooting auf der Seine</a>. Sehen Sie unsere <a href="/de/galerie">Galerie</a> und <a href="/de/reservation">buchen Sie</a>.</p>',
    "pt-BR": '<p><strong>Descubra:</strong> Reserve um <a href="/pt-BR/shooting-photo-seine">ensaio fotográfico no Sena</a>. Veja nossa <a href="/pt-BR/galerie">galeria</a> e <a href="/pt-BR/reservation">reserve</a>.</p>',
  },

  // === Histoire specifics ===
  "histoire-des-bateaux-mouches-de-paris": {
    fr: '<p><strong>Naviguez sur l\'histoire :</strong> Vivez l\'héritage des bateaux-mouches avec une <a href="/fr/croisiere">croisière privée moderne sur la Seine</a>. <a href="/fr/reservation">Réservez votre croisière</a> à bord du Senang.</p>',
    en: '<p><strong>Sail through history:</strong> Experience the heritage of bateaux-mouches with a <a href="/en/croisiere">modern private Seine cruise</a>. <a href="/en/reservation">Book your cruise</a> aboard the Senang.</p>',
    es: '<p><strong>Navegue por la historia:</strong> Viva la herencia de los bateaux-mouches con un <a href="/es/croisiere">crucero privado moderno</a>. <a href="/es/reservation">Reserve</a>.</p>',
    it: '<p><strong>Navigare nella storia:</strong> Vivi l\'eredità dei bateaux-mouches con una <a href="/it/croisiere">crociera privata moderna</a>. <a href="/it/reservation">Prenota</a>.</p>',
    de: '<p><strong>Durch die Geschichte segeln:</strong> Erleben Sie das Erbe der Bateaux-Mouches mit einer <a href="/de/croisiere">modernen privaten Kreuzfahrt</a>. <a href="/de/reservation">Buchen Sie</a>.</p>',
    "pt-BR": '<p><strong>Navegue pela história:</strong> Viva a herança dos bateaux-mouches com um <a href="/pt-BR/croisiere">cruzeiro privado moderno</a>. <a href="/pt-BR/reservation">Reserve</a>.</p>',
  },
  "le-zouave-de-lalma": {
    fr: '<p><strong>À découvrir :</strong> Passez devant le Zouave lors de votre <a href="/fr/croisiere">croisière privée sur la Seine</a>. Découvrez aussi le <a href="/fr/actualites/pont-de-l-alma">pont de l\'Alma</a> et <a href="/fr/reservation">réservez votre croisière</a>.</p>',
    en: '<p><strong>Discover:</strong> See the Zouave during your <a href="/en/croisiere">private Seine cruise</a>. Also discover the <a href="/en/actualites/pont-de-l-alma">Pont de l\'Alma</a> and <a href="/en/reservation">book your cruise</a>.</p>',
    es: '<p><strong>Descubra:</strong> Vea el Zuavo durante su <a href="/es/croisiere">crucero privado por el Sena</a>. <a href="/es/reservation">Reserve su crucero</a>.</p>',
    it: '<p><strong>Scopri:</strong> Vedi lo Zuavo durante la tua <a href="/it/croisiere">crociera privata</a>. <a href="/it/reservation">Prenota</a>.</p>',
    de: '<p><strong>Entdecken:</strong> Sehen Sie den Zuaven bei Ihrer <a href="/de/croisiere">privaten Kreuzfahrt</a>. <a href="/de/reservation">Buchen Sie</a>.</p>',
    "pt-BR": '<p><strong>Descubra:</strong> Veja o Zuavo durante seu <a href="/pt-BR/croisiere">cruzeiro privado</a>. <a href="/pt-BR/reservation">Reserve</a>.</p>',
  },
};

// Slugs that already have internal links — skip them
const hasLinks = new Set([
  "senang-peniches-parisiennes-art-de-vivre-eau-paris",
  "seine-artere-paris-2000-ans-histoire",
  "histoire-navigation-seine-bateaux-royaux-croisieres-privees",
  "renovation-hivernale-2025-2026-senang",
  "apero-bateau-seine-art-de-vivre-parisien",
  "5-meilleures-occasions-croisiere-privee-paris",
  "concert-seine-billet-doux-musique-live",
  "nouveau-taud-senang-confort-toutes-saisons",
]);

const files = [
  { file: "posts.json", locale: "fr" },
  { file: "posts-en.json", locale: "en" },
  { file: "posts-es.json", locale: "es" },
  { file: "posts-it.json", locale: "it" },
  { file: "posts-de.json", locale: "de" },
  { file: "posts-pt-BR.json", locale: "pt-BR" },
];

let totalUpdated = 0;

for (const { file, locale } of files) {
  const filePath = resolve(dataDir, file);
  const posts = JSON.parse(readFileSync(filePath, "utf-8"));
  let updated = 0;

  for (const post of posts) {
    if (hasLinks.has(post.slug)) continue;
    if (!post.content) continue;

    // Check if content already has internal links (bateau-a-paris.fr or relative /)
    if (post.content.includes('href="/') && !post.content.includes('href="/#')) continue;

    // Find the right link block: slug-specific > category > skip
    let block = linkMap[post.slug]?.[locale];
    if (!block) {
      for (const cat of post.categories || []) {
        if (linkMap[`cat:${cat}`]?.[locale]) {
          block = linkMap[`cat:${cat}`][locale];
          break;
        }
      }
    }
    if (!block) continue;

    post.content = post.content.trimEnd() + "\n" + block;
    updated++;
  }

  writeFileSync(filePath, JSON.stringify(posts, null, 2) + "\n", "utf-8");
  totalUpdated += updated;
  console.log(`${file}: ${updated} articles updated`);
}

console.log(`\nTotal: ${totalUpdated} articles updated across ${files.length} files`);

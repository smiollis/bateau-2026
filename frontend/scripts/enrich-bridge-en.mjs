/**
 * Enrich the 19 "Pont de Paris" articles in posts-en.json with ~250 words
 * of historical content IN ENGLISH (translated from the French enrichments).
 * Adds an H2 section with little-known history and anecdotes + internal links.
 * Run: node scripts/enrich-bridge-en.mjs
 */
import { readFileSync, writeFileSync } from "fs";

const enrichments = {
  "pont-de-la-tournelle": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont de la Tournelle owes its name to an ancient tower from Philip Augustus's fortified wall that once stood at this location on the Left Bank. The current bridge, inaugurated in 1928, was designed by architects Paul Tournon and Louis Madeline. It replaced a 19th-century suspension bridge that had become too fragile for increasing traffic.</p>
<p>The statue of Sainte Genevieve, patron saint of Paris, that stands at the centre of the bridge is the work of sculptor Paul Landowski — the very same artist who created the Christ the Redeemer statue in Rio de Janeiro. The saint is depicted protecting a child, symbolising the city of Paris that she has watched over for centuries. According to legend, Genevieve saved Paris from Attila the Hun's invasion in 451 through the power of her prayers alone.</p>
<p>From the Pont de la Tournelle, the view of Notre-Dame's apse is one of the most photographed in all of Paris. It is an unmissable highlight during a <a href="/en/croisiere">private cruise on the Seine</a>, offering a unique perspective on the Ile Saint-Louis and the medieval architecture at the heart of the city. In the evening, the bridge's golden lighting creates a particularly romantic atmosphere, ideal for a <a href="/en/croisiere">romantic cruise</a>.</p>`,

  "pont-de-larcheveche": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont de l'Archeveche, built in 1828 by engineer Plouard, is the narrowest road bridge in Paris at just 11 metres wide. Its name comes from the former Archbishop's Palace of Paris, which stood on the southern side of the Ile de la Cite until it was destroyed during the riots of 1831.</p>
<p>During the 2000s, the bridge became world-famous for its "love locks," a tradition imported from Italy. Thousands of padlocks were attached by couples from around the globe, before the City of Paris removed them in 2015 for safety reasons — the weight of the locks was threatening the very structure of the bridge. It is estimated that over 700,000 padlocks weighing approximately 45 tonnes had been fastened to the railings of this bridge and the neighbouring Pont des Arts.</p>
<p>The Pont de l'Archeveche offers one of the finest panoramas of Notre-Dame's apse in Paris. From the Senang during a <a href="/en/croisiere">private cruise</a>, you can admire its three elegant stone arches framing the cathedral — a sight that is particularly striking at sunset. Discover this breathtaking view among many others in our <a href="/en/galerie">photo gallery</a>.</p>`,

  "petit-pont-cardinal-lustiger": `
<h2>Little-known history and anecdotes</h2>
<p>The Petit Pont is the oldest crossing point on the Seine in Paris. As far back as Gallo-Roman times, a wooden bridge connected the Left Bank to the Ile de la Cite at this very spot. It has been destroyed and rebuilt at least fourteen times throughout history, victim of floods, fires, and wars. The current bridge dates from 1853.</p>
<p>Renamed "Petit-Pont - Cardinal Lustiger" in 2013, it pays tribute to Jean-Marie Lustiger, Archbishop of Paris from 1981 to 2005 and a prominent figure in interreligious dialogue. A curious fact: during the Middle Ages, a toll was levied on the bridge, and students from the Latin Quarter had to pay to cross it. It is one of the few Parisian bridges that has retained its original modest dimensions — barely 32 metres long and 20 metres wide.</p>
<p>From the Senang, the Petit Pont offers a picturesque setting with its low arches framing the silhouette of Notre-Dame. This passage is part of the itinerary of our <a href="/en/croisiere">two-hour private cruise</a> and is a prized moment for photography enthusiasts. Check out our <a href="/en/reservation">cruise packages</a> to book your experience.</p>`,

  "pont-saint-michel": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont Saint-Michel, built in 1857 under Napoleon III by engineer Paul-Martin Gallocher de Lagalisserie, replaced a medieval bridge from the 14th century. It takes its name from the Chapelle Saint-Michel-du-Palais that once stood on the Ile de la Cite. Napoleon III's imperial "N," carved in stone, still adorns the arches of the bridge — a detail that few passers-by ever notice.</p>
<p>The Pont Saint-Michel is tragically associated with the repression of the Algerian protest of 17 October 1961, during which numerous demonstrators were thrown into the Seine. A commemorative plaque was installed in 2001 in memory of the victims. This is also where some of Paris's oldest bouquinistes (second-hand booksellers) ply their trade, a tradition dating back to the 16th century and inscribed on the UNESCO Intangible Cultural Heritage list since 2024.</p>
<p>During a <a href="/en/croisiere">private cruise aboard the Senang</a>, passing under the Pont Saint-Michel offers a striking view of the Saint-Michel fountain and the boulevard of the same name, gateway to the Latin Quarter. It is a highlight of our <a href="/en/croisiere">two-hour itinerary</a>.</p>`,

  "pont-de-iena": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont d'Iena, inaugurated in 1814, was commissioned by Napoleon I to celebrate his victory over Prussia at the Battle of Jena in 1806. After Napoleon's defeat, the Prussian Field Marshal Blucher sought to destroy the bridge in 1815 out of revenge. Only the intervention of Louis XVIII and the Duke of Wellington saved the structure: the King threatened to stand on the bridge during the demolition. The bridge was simply renamed "Pont de l'Ecole militaire" before regaining its original name in 1830.</p>
<p>The current bridge was widened in 1937 for the World Exhibition, expanding from 14 to 35 metres across. The imperial eagles that once decorated the piers were replaced by allegorical sculptures depicting an Arab horseman, a Gallic horseman, a Roman horseman, and a Greek horseman. These four statues symbolise the great warrior civilisations and are the work of several renowned sculptors.</p>
<p>The Pont d'Iena directly connects the Eiffel Tower to the Palais de Chaillot (Trocadero), offering one of the most iconic panoramas in Paris. During your <a href="/en/croisiere">private cruise aboard the Senang</a>, you will pass beneath its arches with an unparalleled view of the Iron Lady. See these perspectives in our <a href="/en/galerie">photo gallery</a>.</p>`,

  "pont-de-l-alma": `
<h2>Little-known history and anecdotes</h2>
<p>The original Pont de l'Alma, built in 1856, commemorated the Franco-British victory at the Battle of the Alma during the Crimean War (1854). It featured four soldier statues: a Zouave, a grenadier, a light infantryman, and an artilleryman. When the bridge was rebuilt between 1970 and 1974, only the Zouave was preserved and placed on the new pier.</p>
<p>The Zouave of the Alma has become Parisians' unofficial gauge for measuring Seine floods. When the water reaches his feet, river navigation is halted. During the great flood of 1910, the water rose all the way to his shoulders! In January 2018, the most recent major flood saw the water reach his thighs, triggering the evacuation of several riverside neighbourhoods.</p>
<p>Near the bridge stands the Flame of Liberty, a replica of the flame on the Statue of Liberty, which became an impromptu memorial to Princess Diana following the tragic accident in the Alma tunnel in 1997. During a <a href="/en/croisiere">private cruise</a> aboard the Senang, passing beneath the Pont de l'Alma is a key moment, with views of the Zouave and the Eiffel Tower in the background.</p>`,

  "pont-des-invalides": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont des Invalides, built between 1854 and 1856, is the lowest bridge in Paris. Its limited clearance beneath the arches has long posed problems for sightseeing boats and barges during high-water periods. Engineer Paul-Martin Gallocher de Lagalisserie designed the current bridge after the collapse of a suspension bridge built in 1829.</p>
<p>The bridge takes its name from the Hotel des Invalides, whose gilded dome is perfectly visible from the structure. A little-known fact: the military trophies sculpted on the piers were created by sculptor Victor Vilain and depict attributes of the army and navy. During World War II, the bridge was mined by the German army in 1944, but the Parisian Resistance managed to prevent its destruction during the Liberation of Paris.</p>
<p>The Pont des Invalides is part of the itinerary of our <a href="/en/croisiere">two-hour private cruise</a>. From the Senang, you will enjoy an exceptional view of the gilded dome of Les Invalides and the Grand Palais on the opposite bank. Admire this panorama in our <a href="/en/galerie">photo gallery</a>.</p>`,

  "pont-alexandre-iii": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont Alexandre III is unanimously regarded as the most beautiful bridge in Paris. Inaugurated for the 1900 World Exhibition, it is named after Tsar Alexander III of Russia to celebrate the Franco-Russian alliance signed in 1892. The foundation stone was laid by Tsar Nicholas II himself in 1896. A technical feat of the era, the bridge comprises a single 107-metre arch — a record at the time — designed not to obstruct the vista between the Champs-Elysees and Les Invalides.</p>
<p>The bridge is adorned with 32 monumental candelabra, cherubs, nymphs, and four 17-metre pylons crowned with gilded winged horses (the "Renommees," or Fames). These Pegasus figures symbolise Science, the Arts, Commerce, and Industry. A surprising fact: the interior of the bridge houses a lighting system that transforms it into a true jewel at night, with over 600 light points.</p>
<p>Listed as a historic monument since 1975, the Pont Alexandre III is the crowning glory of any <a href="/en/croisiere">cruise on the Seine</a>. From the Senang, passing beneath its single arch offers a dizzying perspective on the gilded sculptures. It is our passengers' favourite moment — discover it in our <a href="/en/galerie">gallery</a>.</p>`,

  "pont-de-la-concorde": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont de la Concorde, completed in 1791, was partly built with stones from the Bastille, demolished two years earlier. Engineer Jean-Rodolphe Perronet thus symbolically allowed Parisians to "trample the former fortress underfoot." The choice of materials was not purely symbolic: the carefully cut Bastille stones represented a considerable saving for a State in the throes of Revolution.</p>
<p>The bridge changed its name several times with successive political regimes: Pont Louis XVI, Pont de la Revolution, Pont de la Concorde, Pont Louis XVI again under the Restoration, before permanently becoming the Pont de la Concorde in 1830. Sculptor Guillaume Coustou had installed twelve colossal statues of great French statesmen and military leaders on the bridge, later moved to Versailles because their weight threatened the structure.</p>
<p>The Pont de la Concorde links the Place de la Concorde to the Palais Bourbon (National Assembly), creating one of the most majestic axes in Paris. From the Senang, this perspective is a highlight of our <a href="/en/croisiere">private cruise</a>. Book your experience via our <a href="/en/reservation">booking page</a>.</p>`,

  "pont-royal": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont Royal, built between 1685 and 1689, is the third oldest bridge in Paris still in use. It was personally financed by Louis XIV after the collapse of a wooden toll bridge. Architect Jules Hardouin-Mansart and engineer Jacques IV Gabriel designed this elegant five-arch stone bridge, which has withstood more than three centuries of floods and traffic.</p>
<p>During the Paris Commune in 1871, insurgents attempted to set the bridge ablaze by pouring petroleum on it, but the flames failed to damage the stone structure. The scorch marks remained visible for decades. A little-known fact: the flood markers carved on the piers constitute a precious hydrological record — the oldest in Paris — with markings dating back to the flood of 1740.</p>
<p>The Pont Royal offers a remarkable view of the Musee d'Orsay on one side and the Tuileries Gardens on the other. During your <a href="/en/croisiere">private cruise aboard the Senang</a>, passing beneath its historic arches is a journey through time to the heart of royal Paris. Discover our <a href="/en/croisiere">full itinerary</a>.</p>`,

  "pont-du-carrousel": `
<h2>Little-known history and anecdotes</h2>
<p>The current Pont du Carrousel, inaugurated in 1939, replaced a metal footbridge built in 1834 that was decorated with allegorical statues of Abundance, Industry, the Seine, and the City of Paris. The bridge takes its name from the adjacent Place du Carrousel near the Louvre, itself named after a famous equestrian carousel organised by Louis XIV in 1662.</p>
<p>The original bridge, designed by engineer Antoine-Remy Polonceau, was a technical feat with its cast-iron arches. During its demolition in 1935, Merovingian-era artefacts were discovered in the foundations, evidence of continuous habitation of the site for over 1,500 years. The current bridge, made of reinforced concrete clad in stone, blends harmoniously into the classical landscape between the Louvre and the Institut de France.</p>
<p>The Pont du Carrousel offers one of the most spectacular views in Paris: the Louvre Pyramid on one side, the dome of the Institut de France on the other. During our <a href="/en/croisiere">two-hour private cruise</a>, this passage is a moment of privileged contemplation. Book your <a href="/en/reservation">cruise</a> to experience it for yourself.</p>`,

  "pont-des-arts": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont des Arts, inaugurated in 1803 under Napoleon I, was the first metal bridge in Paris and the capital's first pedestrian bridge. Its name comes from the Palais des Arts, the name given to the Louvre under the First Empire. The original bridge had nine cast-iron arches; worn down by time and barge collisions, it was rebuilt in 1984 with seven steel arches faithfully reproducing the spirit of the original.</p>
<p>In the 2000s, the Pont des Arts became world-famous for its love locks. At its peak in 2015, over one million padlocks weighing 45 tonnes were threatening the structure. The City of Paris removed them and replaced the railings with glass panels. Some of the padlocks were sold at auction to fund humanitarian programmes. The bridge remains an iconic spot for painters and street musicians, perpetuating the artistic tradition that gave it its name.</p>
<p>The Pont des Arts offers one of the finest panoramas in Paris, linking the Louvre to the Institut de France. During your <a href="/en/croisiere">private cruise aboard the Senang</a>, passing beneath this pedestrian footbridge is a moment of tranquillity in the heart of the capital. Explore our <a href="/en/galerie">gallery</a> for a preview.</p>`,

  "pont-neuf": `
<h2>Little-known history and anecdotes</h2>
<p>Despite its name ("New Bridge"), the Pont Neuf is the oldest bridge still standing in Paris. Its construction, begun in 1578 under Henri III, was not completed until 1607 under Henri IV, who inaugurated it by crossing on horseback. It was the first bridge in Paris built without houses, allowing Parisians to see the Seine from a bridge for the very first time — a true revolution at the time. It was also the first Parisian bridge equipped with pavements for pedestrians.</p>
<p>The Pont Neuf has always been a place of life and spectacle. In the 17th century, charlatans, entertainers, itinerant merchants, and tooth-pullers set up their stalls there daily. The equestrian statue of Henri IV, erected in 1614, was melted down during the Revolution; the one visible today, installed in 1818, is said to contain historical documents and a small statuette of Napoleon hidden inside by a Bonapartist worker. In 1985, the artist Christo wrapped the entire bridge in golden fabric — an artistic event that attracted three million visitors in just two weeks.</p>
<p>The Pont Neuf straddles the tip of the Ile de la Cite and offers an exceptional 360-degree panorama. During your <a href="/en/croisiere">private cruise</a>, passing beneath its 12 arches is a magical moment. Book your <a href="/en/reservation">cruise aboard the Senang</a>.</p>`,

  "pont-au-change": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont au Change takes its name from the money changers and goldsmiths who kept shop there from the 9th century onwards, making this bridge the financial centre of medieval Paris. It was here that currency transactions between the various denominations circulating in the kingdom took place. The current bridge, built in 1860 by engineers Vaudrey and De Lagalisserie, bears a large imperial "N" on its arches — the mark of Napoleon III.</p>
<p>Before the current bridge was built, the site saw many successive bridges, all lined with houses and shops. In 1621, a fire destroyed every dwelling on the bridge in a single night. In the 18th century, a royal decree ordered the demolition of all houses on the bridges of Paris for reasons of hygiene and safety, radically transforming the Parisian urban landscape.</p>
<p>The Pont au Change links Chatelet to the Ile de la Cite and the Conciergerie, a former royal palace turned prison during the Revolution. From the Senang during a <a href="/en/croisiere">private cruise</a>, you will admire the Gothic facade of the Conciergerie framed by the bridge's elegant arches. See our <a href="/en/croisiere">detailed itinerary</a>.</p>`,

  "pont-notre-dame": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont Notre-Dame is one of the oldest crossings on the Seine in Paris. A first wooden bridge existed as early as Gallo-Roman times under the name "Grand Pont." In 1499, the bridge collapsed under the weight of its 60 houses, causing numerous casualties. King Charles VIII ordered its reconstruction in stone — it became the first bridge in Paris to have numbered houses, an invention regarded as the ancestor of our modern addresses.</p>
<p>The houses on the Pont Notre-Dame were among the most luxurious in Paris, with facades painted by renowned artists. They were eventually demolished in 1786 on the orders of Louis XVI. The current bridge, rebuilt in 1919, is a sober structure of stone-clad concrete, contrasting with the historical richness of the site. Archaeological excavations carried out during maintenance works have uncovered remains of the ancient Roman bridge.</p>
<p>The Pont Notre-Dame offers a direct view of the Hotel-Dieu, Paris's oldest hospital (founded in 651), with Notre-Dame Cathedral in the background. During your <a href="/en/croisiere">private cruise aboard the Senang</a>, this passage plunges you into the very origins of Paris. Book your <a href="/en/reservation">cruise</a>.</p>`,

  "pont-d-arcole": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont d'Arcole, built in 1856, takes its name from the famous Battle of Arcole won by Bonaparte in Italy in 1796. However, a persistent legend attributes the name to a young revolutionary called Arcole (or d'Arcole) who was supposedly killed on the bridge's barricades in 1830 during the July Revolution, while brandishing the tricolour flag. Historians still debate the authenticity of this account.</p>
<p>The Pont d'Arcole has the distinction of being one of the first metal bridges in Paris, designed as a single 80-metre span by engineer Alphonse Oudry. At the time, this span without any intermediate pier was a remarkable technical feat. The bridge has been reserved for pedestrians for decades, making it one of the most peaceful crossings in central Paris, connecting the Hotel de Ville to Notre-Dame Cathedral.</p>
<p>From the Senang, the Pont d'Arcole is set against an exceptional panorama between the Renaissance-style Hotel de Ville and the Ile de la Cite. This passage is part of our <a href="/en/croisiere">two-hour private cruise</a> through the historic heart of Paris. Discover our <a href="/en/galerie">photo gallery</a> for a preview.</p>`,

  "pont-louis-philippe": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont Louis-Philippe, built in 1862, replaced a suspension bridge from 1833 that already bore the name of the "Citizen King." The first bridge partially collapsed in 1848 during the very revolution that overthrew Louis-Philippe. The current bridge, designed by engineers Vaudrey and De Lagalisserie (the same team behind the Pont au Change), is a sturdy three-arch stone structure.</p>
<p>The neighbourhood around the Pont Louis-Philippe is one of the most picturesque in Paris. On the Right Bank side, the Quai de l'Hotel-de-Ville hosts one of the capital's most beautiful flower markets. On the Ile Saint-Louis side, the 17th-century private mansions bear witness to the golden age of this artificial island, created by joining two islets under Louis XIII. The legendary Berthillon ice cream shop, a Parisian institution since 1954, stands just steps from the bridge.</p>
<p>The Pont Louis-Philippe marks the boundary between monumental Paris and the intimate Paris of the Ile Saint-Louis. During your <a href="/en/croisiere">private cruise aboard the Senang</a>, this crossing offers a striking contrast between the bustling quays and the island's serenity. See our <a href="/en/reservation">cruise packages</a>.</p>`,

  "pont-marie": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont Marie, completed in 1635, is named after Christophe Marie, the entrepreneur who financed its construction in exchange for the right to build and rent houses on the bridge. It is one of the oldest bridges in Paris, contemporary with the creation of the Ile Saint-Louis. In 1658, a devastating flood swept away two arches and twenty houses, claiming many lives. The remaining houses were definitively removed in 1788.</p>
<p>The Pont Marie is considered by many to be the most romantic bridge in Paris, even more so than the Pont des Arts. Its cut-stone structure, the rounded niches above the piers (which once housed small shops), and its soft evening lighting make it a favourite promenade for lovers. A local tradition holds that you should make a wish as you pass under each arch of the bridge — but beware, the wish only comes true if you keep your eyes closed!</p>
<p>The Pont Marie is a poetic highlight of our <a href="/en/croisiere">private cruise aboard the Senang</a>, with its asymmetrical arches (a rare architectural feature) and its views of the Ile Saint-Louis quays. Perfect for a <a href="/en/croisiere">romantic cruise</a>. Book your <a href="/en/reservation">experience</a>.</p>`,

  "pont-de-sully": `
<h2>Little-known history and anecdotes</h2>
<p>The Pont de Sully is actually composed of two separate bridges that meet at the eastern tip of the Ile Saint-Louis. Built between 1874 and 1876, it is named after Maximilien de Bethune, Duke of Sully, minister to Henri IV and a great builder. Engineer Paul Vaudrey designed an original metal structure whose two sections form an angle, perfectly following the geography of the site.</p>
<p>The tip of the Ile Saint-Louis, accessible from the bridge, is known to Parisians as the "Square Barye." This small triangular garden, situated below street level, is one of the most peaceful spots in all of Paris. It features a sculpture by Antoine-Louis Barye, celebrated for his bronze animal figures. It is also one of the best vantage points for watching the sunset over Notre-Dame, with the restored spire silhouetted against the sky.</p>
<p>The Pont de Sully often marks the turnaround point of our <a href="/en/croisiere">two-hour private cruise</a>. From the Senang, the view of the Ile Saint-Louis's tip with Notre-Dame in the background is one of the most photographed moments of the voyage. Explore our <a href="/en/galerie">gallery</a> and <a href="/en/reservation">book your cruise</a>.</p>`,
};

// Process posts-en.json
const postsPath = new URL("../src/data/posts-en.json", import.meta.url);
const posts = JSON.parse(readFileSync(postsPath, "utf8"));

let enrichedCount = 0;
for (const post of posts) {
  const extra = enrichments[post.slug];
  if (!extra) continue;

  // Check if already enriched (idempotent)
  if (post.content.includes("Little-known history")) {
    console.log(`⏭  ${post.slug} — already enriched, skipping`);
    continue;
  }

  // Insert enrichment before the CTA "Read also:" block if present, else at end
  const ctaMarker = '<p><strong>Read also:</strong>';
  const ctaIdx = post.content.indexOf(ctaMarker);
  if (ctaIdx > 0) {
    post.content = post.content.slice(0, ctaIdx) + extra.trim() + "\n" + post.content.slice(ctaIdx);
  } else {
    post.content = post.content + "\n" + extra.trim();
  }

  const wordCount = post.content.split(/\s+/).length;
  console.log(`✅ ${post.slug} — enriched (${wordCount} words)`);
  enrichedCount++;
}

writeFileSync(postsPath, JSON.stringify(posts, null, 2), "utf8");
console.log(`\nDone: ${enrichedCount} articles enriched in posts-en.json`);

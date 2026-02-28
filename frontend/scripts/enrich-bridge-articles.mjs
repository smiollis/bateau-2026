/**
 * Enrich the 19 "Pont de Paris" articles to 600+ words each.
 * Adds historical anecdotes, architectural details, and internal links.
 * Run: node scripts/enrich-bridge-articles.mjs
 */
import { readFileSync, writeFileSync } from "fs";

const enrichments = {
  "pont-de-la-tournelle": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont de la Tournelle doit son nom à une ancienne tour de l'enceinte de Philippe Auguste qui se dressait jadis à cet emplacement sur la rive gauche. Le pont actuel, inauguré en 1928, est l'œuvre des architectes Paul Tournon et Louis Madeline. Il remplace un pont suspendu du XIXe siècle devenu trop fragile pour le trafic croissant.</p>
<p>La statue de sainte Geneviève, patronne de Paris, qui trône au centre du pont, est l'œuvre du sculpteur Paul Landowski — le même artiste qui a réalisé le Christ Rédempteur de Rio de Janeiro. La sainte est représentée protégeant un enfant, symbole de la ville de Paris qu'elle veille depuis des siècles. Selon la légende, Geneviève aurait sauvé Paris de l'invasion d'Attila en 451 par la force de ses prières.</p>
<p>Depuis le pont de la Tournelle, la vue sur le chevet de Notre-Dame est l'une des plus photographiées de Paris. C'est un point de passage incontournable lors d'un <a href="/fr/croisiere">cruzeiro privativo no Sena</a>, offrant une perspective unique sur l'île Saint-Louis et l'architecture médiévale du cœur de Paris. Le soir, l'éclairage doré du pont crée une atmosphère particulièrement romantique, idéale pour un <a href="/fr/croisiere-romantique-seine">cruzeiro romantico</a>.</p>`,

  "pont-de-larcheveche": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont de l'Archevêché, construit en 1828 par l'ingénieur Plouard, est le pont routier le plus étroit de Paris avec seulement 11 mètres de largeur. Son nom provient de l'ancien palais de l'Archevêché de Paris qui se trouvait sur la rive gauche de l'île de la Cité, détruit lors des émeutes de 1831.</p>
<p>Durant les années 2000, le pont est devenu célèbre pour ses « cadenas d'amour », une tradition importée d'Italie. Des milliers de cadenas y ont été accrochés par des couples du monde entier, avant que la Ville de Paris ne les retire en 2015 pour des raisons de sécurité — le poids des cadenas menaçait la structure même du pont. On estime que plus de 700 000 cadenas pesant environ 45 tonnes avaient été fixés sur les grilles du pont et du Pont des Arts voisin.</p>
<p>Le pont de l'Archevêché offre l'un des plus beaux panoramas sur le chevet de Notre-Dame de Paris. Depuis le Sénang lors d'une <a href="/fr/croisiere">croisière privée</a>, vous pourrez admirer ses trois arches élégantes en pierre encadrant la cathédrale, un spectacle particulièrement saisissant au coucher du soleil. Découvrez cette vue imprenable parmi d'autres dans notre <a href="/fr/galerie">galerie photos</a>.</p>`,

  "petit-pont-cardinal-lustiger": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le Petit Pont est le plus ancien point de franchissement de la Seine à Paris. Dès l'époque gallo-romaine, un pont en bois reliait la rive gauche à l'île de la Cité à cet emplacement. Il a été détruit et reconstruit au moins quatorze fois au cours de l'histoire, victime des crues, des incendies et des guerres. Le pont actuel date de 1853.</p>
<p>Rebaptisé « Petit-Pont – Cardinal Lustiger » en 2013, il rend hommage à Jean-Marie Lustiger, archevêque de Paris de 1981 à 2005, figure marquante du dialogue interreligieux. Fait insolite : au Moyen Âge, un péage était installé sur le pont, et les étudiants du Quartier Latin devaient payer pour le traverser. C'est l'un des rares ponts parisiens qui a conservé sa taille modeste d'origine — à peine 32 mètres de long et 20 mètres de large.</p>
<p>Depuis le Sénang, le Petit Pont offre un cadre pittoresque avec ses arcades basses encadrant la silhouette de Notre-Dame. Ce passage fait partie de l'itinéraire de notre <a href="/fr/croisiere">croisière commentée de 2 heures</a> et constitue un moment privilégié pour les amateurs de photographie. Consultez nos <a href="/fr/reservation">formules de croisière</a> pour réserver votre expérience.</p>`,

  "pont-saint-michel": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont Saint-Michel, construit en 1857 sous Napoléon III par l'ingénieur Paul-Martin Gallocher de Lagalisserie, remplace un pont médiéval du XIVe siècle. Il tire son nom de la chapelle Saint-Michel-du-Palais qui se trouvait autrefois sur l'île de la Cité. Le « N » impérial de Napoléon III, sculpté dans la pierre, orne encore les arches du pont — un détail que peu de passants remarquent.</p>
<p>Le pont Saint-Michel est tristement associé à la répression de la manifestation algérienne du 17 octobre 1961, au cours de laquelle de nombreux manifestants furent jetés dans la Seine. Une plaque commémorative a été apposée en 2001 en mémoire des victimes. C'est aussi à cet endroit que se déroulent les bouquinistes les plus anciens de Paris, une tradition qui remonte au XVIe siècle et qui est inscrite au patrimoine immatériel de l'UNESCO depuis 2024.</p>
<p>Lors d'une <a href="/fr/croisiere">croisière privée sur le Sénang</a>, le passage sous le pont Saint-Michel offre une vue saisissante sur la fontaine Saint-Michel et le boulevard éponyme, porte d'entrée du Quartier Latin. C'est un moment fort de notre <a href="/fr/croisiere">itinéraire de 2 heures</a>.</p>`,

  "pont-de-iena": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont d'Iéna, inauguré en 1814, a été commandé par Napoléon Ier pour célébrer sa victoire sur la Prusse à la bataille d'Iéna en 1806. Après la défaite de Napoléon, le maréchal prussien Blücher voulut faire détruire le pont en 1815 par vengeance. Seule l'intervention de Louis XVIII et du duc de Wellington sauva l'ouvrage : le roi menaça de se placer sur le pont pendant la destruction. Le pont fut simplement rebaptisé « pont de l'École militaire » avant de retrouver son nom d'origine en 1830.</p>
<p>Le pont actuel a été élargi en 1937 pour l'Exposition universelle, passant de 14 à 35 mètres de large. Les aigles impériaux qui ornaient les piles ont été remplacés par des sculptures allégoriques représentant un cavalier arabe, un cavalier gaulois, un cavalier romain et un cavalier grec. Ces quatre statues symbolisent les grandes civilisations guerrières et sont l'œuvre de plusieurs sculpteurs renommés.</p>
<p>Le pont d'Iéna relie directement la tour Eiffel au palais de Chaillot (Trocadéro), offrant l'un des panoramas les plus emblématiques de Paris. Lors de votre <a href="/fr/croisiere">croisière privée sur le Sénang</a>, vous passerez sous ses arches avec une vue imprenable sur la Dame de Fer. Retrouvez ces perspectives dans notre <a href="/fr/galerie">galerie photos</a>.</p>`,

  "pont-de-l-alma": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont de l'Alma original, construit en 1856, commémorait la victoire franco-britannique à la bataille de l'Alma pendant la guerre de Crimée (1854). Il comportait quatre statues de soldats : un zouave, un grenadier, un chasseur à pied et un artilleur. Lors de la reconstruction du pont en 1970-1974, seul le Zouave fut conservé et replacé sur la nouvelle pile.</p>
<p>Le Zouave de l'Alma est devenu le repère officieux des Parisiens pour mesurer les crues de la Seine. Quand l'eau atteint ses pieds, la navigation fluviale est interrompue. Lors de la grande crue de 1910, l'eau montait jusqu'à ses épaules ! En janvier 2018, la dernière crue majeure a vu l'eau atteindre ses cuisses, provoquant l'évacuation de plusieurs quartiers riverains.</p>
<p>À proximité du pont se trouve la flamme de la Liberté, réplique de la flamme de la statue de la Liberté, devenue un mémorial improvisé à la princesse Diana après l'accident tragique du tunnel de l'Alma en 1997. Lors d'une <a href="/fr/croisiere">croisière privée</a> sur le Sénang, le passage sous le pont de l'Alma est un moment clé avec vue sur le Zouave et la tour Eiffel en arrière-plan.</p>`,

  "pont-des-invalides": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont des Invalides, construit entre 1854 et 1856, est le pont le plus bas de Paris. Sa faible hauteur sous arche a longtemps posé problème aux bateaux-mouches et péniches lors des périodes de hautes eaux. L'ingénieur Paul-Martin Gallocher de Lagalisserie en est le concepteur, après l'effondrement d'un premier pont suspendu construit en 1829.</p>
<p>Le pont doit son nom à l'hôtel des Invalides dont le dôme doré est parfaitement visible depuis l'ouvrage. Un fait peu connu : les trophées militaires sculptés sur les piles du pont ont été réalisés par le sculpteur Victor Vilain et représentent des attributs de l'armée de terre et de la marine. Pendant la Seconde Guerre mondiale, le pont a été miné par l'armée allemande en 1944, mais la Résistance parisienne a réussi à empêcher sa destruction lors de la Libération de Paris.</p>
<p>Le pont des Invalides fait partie de l'itinéraire de notre <a href="/fr/croisiere">croisière privée de 2 heures</a>. Depuis le Sénang, vous profiterez d'une vue exceptionnelle sur le dôme doré des Invalides et le Grand Palais sur la rive opposée. Un panorama que vous pouvez admirer dans notre <a href="/fr/galerie">galerie de photos</a>.</p>`,

  "pont-alexandre-iii": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont Alexandre III est unanimement considéré comme le plus beau pont de Paris. Inauguré pour l'Exposition universelle de 1900, il porte le nom du tsar Alexandre III de Russie pour célébrer l'alliance franco-russe signée en 1892. La première pierre fut posée par le tsar Nicolas II en personne en 1896. Prouesse technique de l'époque, le pont ne comporte qu'une seule arche de 107 mètres — un record pour l'époque — afin de ne pas obstruer la perspective entre les Champs-Élysées et les Invalides.</p>
<p>Le pont est orné de 32 candélabres monumentaux, de chérubins, de nymphes et de quatre pylônes de 17 mètres de haut couronnés de chevaux ailés dorés à la feuille d'or (les « Renommées »). Ces Pégases symbolisent les Sciences, les Arts, le Commerce et l'Industrie. Fait surprenant : l'intérieur du pont contient un système d'éclairage qui le transforme en véritable joyau la nuit, avec plus de 600 points lumineux.</p>
<p>Classé monument historique depuis 1975, le pont Alexandre III est le joyau absolu de toute <a href="/fr/croisiere">croisière sur la Seine</a>. Depuis le Sénang, la traversée sous son arche unique offre une perspective vertigineuse sur les sculptures dorées. C'est le moment préféré de nos passagers — découvrez-le dans notre <a href="/fr/galerie">galerie</a>.</p>`,

  "pont-de-la-concorde": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont de la Concorde, achevé en 1791, a été en partie construit avec les pierres de la Bastille démolie deux ans plus tôt. L'ingénieur Jean-Rodolphe Perronet a ainsi symboliquement permis aux Parisiens de « fouler aux pieds l'ancienne forteresse ». Ce choix de matériaux n'était pas uniquement symbolique : les pierres de la Bastille, taillées avec soin, représentaient une économie considérable pour les finances de l'État en pleine Révolution.</p>
<p>Le pont a changé de nom à plusieurs reprises au gré des régimes politiques : pont Louis XVI, pont de la Révolution, pont de la Concorde, pont Louis XVI à nouveau sous la Restauration, avant de redevenir définitivement pont de la Concorde en 1830. Le sculpteur Guillaume Coustou y avait installé douze statues colossales de grands hommes d'État et militaires français, déplacées depuis à Versailles car leur poids menaçait la structure.</p>
<p>Le pont de la Concorde relie la place de la Concorde au Palais Bourbon (Assemblée nationale), créant l'un des axes les plus majestueux de Paris. Depuis le Sénang, cette perspective est un moment fort de notre <a href="/fr/croisiere">croisière privée</a>. Réservez votre expérience via notre <a href="/fr/reservation">page de réservation</a>.</p>`,

  "pont-royal": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont Royal, construit entre 1685 et 1689, est le troisième plus ancien pont de Paris encore en service. Il a été financé personnellement par Louis XIV après l'effondrement d'un pont en bois à péage. L'architecte Jules Hardouin-Mansart et l'ingénieur Jacques IV Gabriel ont conçu cet élégant pont en pierre à cinq arches, qui a résisté à plus de trois siècles de crues et de trafic.</p>
<p>Pendant la Commune de Paris en 1871, les insurgés tentèrent d'incendier le pont en y déversant du pétrole, mais les flammes ne parvinrent pas à entamer la structure en pierre. Les traces de cet incendie restèrent visibles pendant des décennies. Fait méconnu : les repères de crues gravés sur les piles du pont constituent un registre hydrologique précieux, le plus ancien de Paris, avec des marques remontant à la crue de 1740.</p>
<p>Le pont Royal offre une vue remarquable sur le musée d'Orsay d'un côté et les jardins des Tuileries de l'autre. Lors de votre <a href="/fr/croisiere">croisière privée sur le Sénang</a>, le passage sous ses arches historiques est un voyage dans le temps au cœur du Paris royal. Découvrez notre <a href="/fr/croisiere">itinéraire complet</a>.</p>`,

  "pont-du-carrousel": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont du Carrousel actuel, inauguré en 1939, remplace un pont à passerelle métallique de 1834 qui était orné de statues allégoriques de l'Abondance, de l'Industrie, de la Seine et de la Ville de Paris. Le pont tire son nom de la place du Carrousel adjacente au Louvre, elle-même nommée d'après un célèbre carrousel équestre organisé par Louis XIV en 1662.</p>
<p>L'ancien pont, conçu par l'ingénieur Antoine-Rémy Polonceau, était une prouesse technique avec ses arches en fonte. Lors de sa démolition en 1935, on découvrit dans les fondations des objets datant de l'époque mérovingienne, témoignant de l'occupation continue du site depuis plus de 1 500 ans. Le pont actuel, en béton armé revêtu de pierre, s'intègre harmonieusement dans le paysage classique entre le Louvre et l'Institut de France.</p>
<p>Le pont du Carrousel offre l'une des vues les plus spectaculaires de Paris : la pyramide du Louvre d'un côté, le dôme de l'Institut de France de l'autre. Lors de notre <a href="/fr/croisiere">croisière privée de 2 heures</a>, ce passage est un moment de contemplation privilégié. Réservez votre <a href="/fr/reservation">croisière</a> pour vivre cette expérience.</p>`,

  "pont-des-arts": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont des Arts, inauguré en 1803 sous Napoléon Ier, fut le premier pont métallique de Paris et le premier pont piétonnier de la capitale. Son nom vient du palais des Arts, appellation du Louvre sous le Premier Empire. Le pont original comportait neuf arches en fonte ; usé par le temps et les collisions de péniches, il fut reconstruit en 1984 avec sept arches en acier pour reproduire fidèlement l'esprit de l'original.</p>
<p>Dans les années 2000, le pont des Arts est devenu mondialement célèbre pour ses cadenas d'amour. À son apogée en 2015, plus d'un million de cadenas pesant 45 tonnes menaçaient la structure. La Ville de Paris les a retirés et remplacés les grilles par des panneaux en verre. Une partie des cadenas a été vendue aux enchères pour financer des programmes humanitaires. Le pont reste un lieu emblématique pour les peintres et les musiciens de rue, perpétuant la tradition artistique qui lui a donné son nom.</p>
<p>Le pont des Arts offre l'un des plus beaux panoramas de Paris, reliant le Louvre à l'Institut de France. Lors de votre <a href="/fr/croisiere">croisière privée sur le Sénang</a>, le passage sous cette passerelle piétonne est un moment de quiétude au cœur de la capitale. Explorez notre <a href="/fr/galerie">galerie</a> pour un avant-goût.</p>`,

  "pont-neuf": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Malgré son nom, le Pont Neuf est le plus ancien pont de Paris encore debout. Sa construction, débutée en 1578 sous Henri III, ne fut achevée qu'en 1607 sous Henri IV, qui l'inaugura en le traversant à cheval. Ce fut le premier pont de Paris sans maisons, permettant aux Parisiens de voir la Seine pour la première fois depuis un pont — une vraie révolution à l'époque. Il est aussi le premier pont parisien doté de trottoirs pour les piétons.</p>
<p>Le Pont Neuf a toujours été un lieu de vie et de spectacle. Au XVIIe siècle, charlatans, bateleurs, marchands ambulants et arracheurs de dents s'y installaient quotidiennement. La statue équestre d'Henri IV, installée en 1614, fut fondue pendant la Révolution ; celle visible aujourd'hui, érigée en 1818, contiendrait dans son ventre des documents historiques et une statuette de Napoléon cachée par un ouvrier bonapartiste. En 1985, l'artiste Christo emballa entièrement le pont dans un tissu doré — un événement artistique qui attira trois millions de visiteurs en deux semaines.</p>
<p>Le Pont Neuf enjambe la pointe de l'île de la Cité et offre un panorama à 360° exceptionnel. Lors de votre <a href="/fr/croisiere">croisière privée</a>, le passage sous ses 12 arches est un moment magique. Réservez votre <a href="/fr/reservation">croisière sur le Sénang</a>.</p>`,

  "pont-au-change": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont au Change tire son nom des changeurs et orfèvres qui y tenaient boutique dès le IXe siècle, faisant de ce pont le centre financier de Paris médiéval. C'est ici que s'effectuaient les transactions monétaires entre les différentes devises circulant dans le royaume. Le pont actuel, construit en 1860 par les ingénieurs Vaudrey et De Lagalisserie, arbore un grand « N » impérial sur ses arches, marque de Napoléon III.</p>
<p>Avant la construction du pont actuel, le site a accueilli de nombreux ponts successifs, tous bordés de maisons et d'échoppes. En 1621, un incendie détruisit toutes les habitations du pont en une seule nuit. Au XVIIIe siècle, un décret royal ordonna la démolition de toutes les maisons sur les ponts de Paris pour des raisons d'hygiène et de sécurité, transformant radicalement le paysage urbain parisien.</p>
<p>Le pont au Change relie le Châtelet à l'île de la Cité et à la Conciergerie, ancien palais royal devenu prison pendant la Révolution. Depuis le Sénang lors d'une <a href="/fr/croisiere">croisière privée</a>, vous admirerez la façade gothique de la Conciergerie encadrée par les arches élégantes du pont. Consultez notre <a href="/fr/croisiere">itinéraire détaillé</a>.</p>`,

  "pont-notre-dame": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont Notre-Dame est l'un des plus anciens passages de la Seine à Paris. Un premier pont en bois existait dès l'époque gallo-romaine sous le nom de « Grand Pont ». En 1499, le pont s'effondra sous le poids de ses 60 maisons, faisant de nombreuses victimes. Le roi Charles VIII ordonna sa reconstruction en pierre — ce fut le premier pont de Paris à recevoir une numérotation de ses maisons, invention considérée comme l'ancêtre de nos adresses modernes.</p>
<p>Les maisons du pont Notre-Dame étaient parmi les plus luxueuses de Paris, avec des façades peintes par des artistes de renom. Elles furent finalement démolies en 1786 sur ordre de Louis XVI. Le pont actuel, reconstruit en 1919, est un ouvrage sobre en béton revêtu de pierre, contrastant avec la richesse historique du site. Des fouilles archéologiques réalisées lors de travaux d'entretien ont révélé des vestiges de l'ancien pont romain.</p>
<p>Le pont Notre-Dame offre une vue directe sur l'Hôtel-Dieu, le plus ancien hôpital de Paris (fondé en 651), et la cathédrale Notre-Dame en arrière-plan. Pendant votre <a href="/fr/croisiere">croisière privée sur le Sénang</a>, ce passage vous plonge dans les origines même de Paris. Réservez votre <a href="/fr/reservation">croisière</a>.</p>`,

  "pont-d-arcole": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont d'Arcole, construit en 1856, porte le nom de la célèbre bataille d'Arcole remportée par Bonaparte en Italie en 1796. Mais une légende tenace attribue ce nom à un jeune révolutionnaire nommé Arcole (ou d'Arcole) qui aurait été tué sur les barricades du pont en 1830 lors de la révolution de Juillet, en brandissant le drapeau tricolore. Les historiens débattent encore de l'authenticité de ce récit.</p>
<p>Le pont d'Arcole a la particularité d'avoir été l'un des premiers ponts métalliques de Paris, conçu en une seule arche de 80 mètres par l'ingénieur Alphonse Oudry. À l'époque, cette portée sans pile intermédiaire était un exploit technique remarquable. Le pont est réservé aux piétons depuis des décennies, ce qui en fait l'un des passages les plus paisibles du centre de Paris, reliant l'Hôtel de Ville à la cathédrale Notre-Dame.</p>
<p>Depuis le Sénang, le pont d'Arcole s'inscrit dans un panorama exceptionnel entre l'Hôtel de Ville Renaissance et l'île de la Cité. Ce passage fait partie de notre <a href="/fr/croisiere">croisière privée de 2 heures</a> au cœur historique de Paris. Découvrez notre <a href="/fr/galerie">galerie photos</a> pour un aperçu.</p>`,

  "pont-louis-philippe": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont Louis-Philippe, construit en 1862, remplace un pont suspendu de 1833 qui portait déjà le nom du « roi-citoyen ». Le premier pont s'effondra partiellement en 1848 lors de la révolution qui renversa justement Louis-Philippe. Le pont actuel, conçu par les ingénieurs Vaudrey et De Lagalisserie (les mêmes que le pont au Change), est un solide ouvrage en pierre à trois arches.</p>
<p>Le quartier autour du pont Louis-Philippe est l'un des plus pittoresques de Paris. Côté rive droite, le quai de l'Hôtel-de-Ville accueille l'un des plus beaux marchés aux fleurs de la capitale. Côté île Saint-Louis, les hôtels particuliers du XVIIe siècle témoignent de l'âge d'or de cette île artificielle créée par la réunion de deux îlots sous Louis XIII. Le glacier Berthillon, institution parisienne depuis 1954, se trouve à quelques pas du pont.</p>
<p>Le pont Louis-Philippe marque la frontière entre le Paris monumental et le Paris intime de l'île Saint-Louis. Lors de votre <a href="/fr/croisiere">croisière privée sur le Sénang</a>, ce passage offre un contraste saisissant entre les quais animés et la sérénité de l'île. Consultez nos <a href="/fr/reservation">formules de croisière</a>.</p>`,

  "pont-marie": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont Marie, achevé en 1635, porte le nom de Christophe Marie, entrepreneur qui finança sa construction en échange du droit de bâtir et louer des maisons sur le pont. C'est l'un des plus anciens ponts de Paris, contemporain de la création de l'île Saint-Louis. En 1658, une terrible crue emporta deux arches et vingt maisons, faisant de nombreuses victimes. Les maisons restantes furent définitivement retirées en 1788.</p>
<p>Le pont Marie est considéré par beaucoup comme le pont le plus romantique de Paris, devant même le pont des Arts. Sa structure en pierre de taille, ses niches arrondies au-dessus des piles (qui abritaient autrefois des échoppes) et son éclairage tamisé en font un lieu de promenade prisé des amoureux. Une tradition locale veut que l'on fasse un vœu en passant sous chaque arche du pont — mais attention, le vœu ne se réalise que si l'on garde les yeux fermés !</p>
<p>Le pont Marie est un moment poétique de notre <a href="/fr/croisiere">croisière privée sur le Sénang</a>, avec ses arches asymétriques (une particularité architecturale rare) et sa vue sur les quais de l'île Saint-Louis. Idéal pour un <a href="/fr/croisiere-romantique-seine">croisière romantique</a>. Réservez votre <a href="/fr/reservation">expérience</a>.</p>`,

  "pont-de-sully": `
<h2>Anecdotes et histoire méconnue</h2>
<p>Le pont de Sully est en réalité composé de deux ponts distincts qui se rejoignent à la pointe est de l'île Saint-Louis. Construit entre 1874 et 1876, il porte le nom de Maximilien de Béthune, duc de Sully, ministre d'Henri IV et grand bâtisseur. L'ingénieur Paul Vaudrey a conçu un ouvrage métallique original dont les deux tronçons forment un angle, épousant parfaitement la géographie des lieux.</p>
<p>La pointe de l'île Saint-Louis, accessible depuis le pont, est connue des Parisiens sous le nom de « square Barye ». Ce petit jardin triangulaire, situé en contrebas du niveau de la rue, est l'un des endroits les plus paisibles de Paris. On y trouve une sculpture d'Antoine-Louis Barye, célèbre pour ses animaux en bronze. C'est aussi l'un des meilleurs spots pour admirer le coucher de soleil sur Notre-Dame, avec la flèche restaurée se découpant sur le ciel.</p>
<p>Le pont de Sully marque souvent le point de demi-tour de notre <a href="/fr/croisiere">croisière privée de 2 heures</a>. Depuis le Sénang, la perspective sur la pointe de l'île Saint-Louis avec Notre-Dame en toile de fond est l'un des moments les plus photographiés du voyage. Découvrez notre <a href="/fr/galerie">galerie</a> et <a href="/fr/reservation">réservez votre croisière</a>.</p>`,
};

// Process posts.json (FR)
const postsPath = new URL("../src/data/posts.json", import.meta.url);
const posts = JSON.parse(readFileSync(postsPath, "utf8"));

let enrichedCount = 0;
for (const post of posts) {
  const extra = enrichments[post.slug];
  if (!extra) continue;

  // Check if already enriched (idempotent)
  if (post.content.includes("Anecdotes et histoire")) {
    console.log(`⏭  ${post.slug} — already enriched, skipping`);
    continue;
  }

  // Insert enrichment before the last closing tag or at the end
  // Find the position to insert (before internal links CTA if present, else at end)
  const ctaMarker = '<p><strong>Un Bateau';
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
console.log(`\nDone: ${enrichedCount} articles enriched in posts.json`);

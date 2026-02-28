import { readFileSync, writeFileSync } from "fs";

/* ------------------------------------------------------------------ */
/*  Spanish historical enrichments for the 19 "Pont de Paris" articles */
/* ------------------------------------------------------------------ */
const enrichments = {

/* 1 */
"pont-de-la-tournelle": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont de la Tournelle debe su nombre a una torre defensiva de la muralla de Felipe Augusto, erigida a finales del siglo XII para proteger la isla de la Cité. Aquella torre cuadrada, llamada «tournelle», vigilaba el brazo sur del Sena y servía de punto de cobro de peaje para las embarcaciones que remontaban el río. Tras siglos de puentes de madera destruidos por las crecidas, el puente actual fue inaugurado en 1928, obra de los arquitectos Paul Tournon y Julien Madeline, quienes optaron por un arco asimétrico de hormigón armado que respeta la perspectiva sobre el ábside de Notre-Dame.</p>
<p>La estatua de santa Genoveva que corona el pilar central es obra de Paul Landowski, el mismo escultor del Cristo Redentor de Río de Janeiro. Genoveva, patrona de París, habría convencido a los parisinos de no huir ante la amenaza de Atila en el año 451, salvando así la ciudad. La escultura, de más de catorce metros de altura, la representa portando en brazos a una pequeña París, orientada hacia el este para bendecir las aguas del Sena. Por la noche, la iluminación realza su silueta dorada contra el cielo.</p>
<p>Desde la cubierta de nuestros <a href="/es/croisiere">cruceros privados</a>, el Pont de la Tournelle ofrece sin duda la mejor vista del ábside de Notre-Dame y de sus arbotantes góticos. Contemple esta panorámica única navegando al atardecer y consulte nuestra <a href="/es/galerie">galería de fotos</a> o <a href="/es/reservation">reserve ahora</a>.</p>`,

/* 2 */
"pont-de-larcheveche": `<h2>Historia y anécdotas poco conocidas</h2>
<p>Construido en 1828, el Pont de l'Archevêché es el puente más estrecho de París con apenas once metros de ancho. Su nombre recuerda el palacio arzobispal que se alzaba en la orilla izquierda hasta que fue saqueado e incendiado durante los disturbios anticlericales de 1831. Los restos del palacio fueron demolidos y su solar se transformó en el actual Square Jean-XXIII, uno de los jardines más apacibles de la capital, desde donde se contempla la cabecera de Notre-Dame.</p>
<p>A partir de 2008, miles de parejas comenzaron a colgar candados de amor en sus barandillas de hierro. En su punto máximo, se estimaban más de setecientos mil candados que añadían unas cuarenta y cinco toneladas de peso a la estructura. Ante el riesgo de colapso, el Ayuntamiento retiró todos los candados en junio de 2015 y sustituyó las rejas por paneles de vidrio que hoy permiten disfrutar de una vista despejada del Sena.</p>
<p>A pesar de su modesta anchura, el puente ofrece una de las perspectivas más fotogénicas de París: el ábside de Notre-Dame enmarcado por los árboles del square. Navegando bajo sus arcos durante un <a href="/es/croisiere">crucero privado por el Sena</a>, se aprecia cómo la luz del atardecer tiñe de oro la piedra caliza. Vea las imágenes en nuestra <a href="/es/galerie">galería</a> o <a href="/es/reservation">reserve su experiencia</a>.</p>`,

/* 3 */
"petit-pont-cardinal-lustiger": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Petit-Pont es el cruce más antiguo del Sena: ya los galorromanos tendían aquí un paso entre Lutecia y la orilla izquierda por la vía principal norte-sur. Con solo treinta y dos metros, es además el puente más corto de París. A lo largo de los siglos fue reconstruido al menos catorce veces, víctima de incendios, riadas y el peso de las casas que lo cubrían en la Edad Media. En 2013 se le añadió el nombre del cardenal Jean-Marie Lustiger, arzobispo de París de origen judío polaco, en homenaje a su labor de diálogo interreligioso.</p>
<p>Durante la época medieval, cruzar el Petit-Pont exigía pagar un peaje: los estudiantes que iban a las escuelas de la Montaña de Santa Genoveva debían entregar una moneda o, según la leyenda, demostrar sus conocimientos de latín para obtener la exención. Este detalle ilustra la estrecha relación del puente con el Barrio Latino y la historia universitaria de París, que se remonta al siglo XII.</p>
<p>Hoy, el Petit-Pont-Cardinal-Lustiger es una pasarela tranquila que conecta la plaza del Parvis de Notre-Dame con la fuente Saint-Michel. Desde nuestros <a href="/es/croisiere">cruceros privados</a> se navega justo bajo su arco único, ofreciendo una perspectiva rasante sobre el río. Descubra más imágenes en la <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve su paseo</a>.</p>`,

/* 4 */
"pont-saint-michel": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont Saint-Michel actual data de 1857 y fue construido bajo Napoleón III, cuyas iniciales «N» aparecen esculpidas en los tímpanos de los arcos. Reemplazó un puente de piedra del siglo XIV que, como muchos de su época, soportaba hileras de casas y tiendas. El nombre proviene de la capilla de Saint-Michel-du-Palais, situada en el recinto del antiguo Palacio de la Cité, residencia de los reyes de Francia antes de que se trasladaran al Louvre.</p>
<p>El 17 de octubre de 1961, el puente fue escenario de uno de los episodios más sombríos de la historia contemporánea de París: durante una manifestación pacífica de argelinos, las fuerzas policiales bajo las órdenes del prefecto Maurice Papon cargaron brutalmente contra los manifestantes. Muchos fueron arrojados al Sena. Una placa conmemorativa recuerda hoy a las víctimas. En un registro más luminoso, los bouquinistes que bordean los muelles cercanos fueron inscritos en el Patrimonio Inmaterial de la UNESCO en 2024.</p>
<p>Al pasar bajo el Pont Saint-Michel durante un <a href="/es/croisiere">crucero privado</a>, se divisa la aguja de la Sainte-Chapelle asomando tras los tejados del Palacio de Justicia. Es un instante mágico, especialmente al anochecer. Explore estas vistas en nuestra <a href="/es/galerie">galería de fotos</a> o <a href="/es/reservation">reserve su travesía</a>.</p>`,

/* 5 */
"pont-de-iena": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont d'Iéna fue ordenado por Napoleón I en 1808 para conmemorar su victoria en la batalla de Jena contra Prusia en 1806. Tras la derrota de Napoleón en Waterloo, el mariscal prusiano Blücher quiso volar el puente como acto de venganza simbólica. Solo la intervención personal del rey Luis XVIII, quien amenazó con sentarse sobre el puente durante la explosión, logró salvar la estructura. Como compromiso, se rebautizó temporalmente «Pont de l'École Militaire», pero recuperó su nombre original tras la Revolución de 1830.</p>
<p>En 1937, con motivo de la Exposición Internacional, el puente fue ensanchado considerablemente para acoger el tráfico creciente entre el Trocadéro y la Torre Eiffel. En sus extremos se instalaron cuatro estatuas ecuestres que representan un guerrero galo, un guerrero romano, un guerrero árabe y un guerrero medieval, simbolizando las grandes civilizaciones de caballería. Sus cinco arcos de piedra de sillería ofrecen una simetría perfecta que enmarca la Torre Eiffel.</p>
<p>Navegar bajo el Pont d'Iéna durante un <a href="/es/croisiere">crucero privado por el Sena</a> es contemplar la Torre Eiffel desde su base misma, una perspectiva que ninguna otra posición en tierra permite. Vea las imágenes en nuestra <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve este momento inolvidable</a>.</p>`,

/* 6 */
"pont-de-l-alma": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont de l'Alma fue inaugurado en 1856 por Napoleón III para celebrar la victoria franco-británica en la batalla del Alma durante la guerra de Crimea. El puente original contaba con cuatro estatuas de soldados; solo se conservó el famoso Zuavo, que desde entonces sirve como indicador popular del nivel del Sena. Durante la gran crecida de 1910, el agua le llegó hasta los hombros, y en enero de 2018 le alcanzó los muslos, obligando a cerrar la navegación fluvial durante semanas.</p>
<p>Junto al puente, la Llama de la Libertad —réplica a tamaño real de la antorcha de la Estatua de la Libertad— se convirtió espontáneamente en un memorial no oficial tras el accidente de la princesa Diana en el túnel cercano en 1997. Aunque la llama fue instalada en 1989 para conmemorar la amistad franco-estadounidense, visitantes de todo el mundo siguen depositando flores y mensajes en su base, transformándola en uno de los lugares conmemorativos más singulares de París.</p>
<p>Desde la cubierta de nuestros <a href="/es/croisiere">cruceros privados</a>, el paso bajo el Pont de l'Alma ofrece una vista directa de la Torre Eiffel iluminada al caer la noche. Es uno de los momentos más espectaculares del recorrido. Descúbralo en nuestra <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve su crucero</a>.</p>`,

/* 7 */
"pont-des-invalides": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont des Invalides es el puente más bajo de París: su arco central deja un margen tan reducido sobre el nivel habitual del agua que las embarcaciones de gran calado deben calcular cuidadosamente su paso. Construido entre 1854 y 1856, reemplazó una pasarela colgante que había resultado insuficiente para el tráfico creciente del Segundo Imperio. Su decoración incluye trofeos militares y águilas imperiales que recuerdan la proximidad del Hôtel des Invalides, fundado por Luis XIV para acoger a los veteranos de guerra.</p>
<p>En agosto de 1944, durante la Liberación de París, las tropas alemanas en retirada minaron el puente para destruirlo y frenar el avance aliado. Gracias a la acción valiente de miembros de la Resistencia francesa, que desactivaron los explosivos en plena noche, el Pont des Invalides fue uno de los pocos puentes parisinos que sobrevivió intacto a la guerra. Una discreta placa en el pilar sur rinde homenaje a estos héroes anónimos.</p>
<p>Pasar bajo el Pont des Invalides en un <a href="/es/croisiere">crucero privado</a> es una experiencia singular: la proximidad del arco crea una sensación de intimidad con la piedra centenaria. A babor se alza la cúpula dorada de los Inválidos. Contemple estas vistas en la <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve su paseo</a>.</p>`,

/* 8 */
"pont-alexandre-iii": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont Alexandre III es considerado el puente más bello de París y uno de los más suntuosos del mundo. Inaugurado para la Exposición Universal de 1900, fue bautizado en honor al zar Alejandro III de Rusia, cuyo hijo Nicolás II colocó la primera piedra en 1896, sellando la alianza franco-rusa. Su proeza técnica reside en un arco único de acero de ciento siete metros de luz, diseñado para no obstruir la perspectiva entre los Campos Elíseos y los Inválidos.</p>
<p>La ornamentación es fastuosa: treinta y dos candelabros de bronce, cuatro pilonos coronados por Pegasos dorados que simbolizan las Artes, las Ciencias, el Comercio y la Industria, así como ninfas, querubines y guirnaldas talladas por los mejores artesanos de la época. Con más de seiscientas luces, su iluminación nocturna es un espectáculo en sí mismo. En 1975, el puente fue clasificado Monumento Histórico, reconociendo su excepcional valor patrimonial.</p>
<p>Navegar bajo el Pont Alexandre III durante un <a href="/es/croisiere">crucero privado al atardecer</a> es uno de los momentos culminantes de cualquier paseo por el Sena: los Pegasos dorados centellean con la última luz del día mientras la cúpula de los Inválidos se tiñe de rosa. Admire estas vistas en nuestra <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve esta experiencia única</a>.</p>`,

/* 9 */
"pont-de-la-concorde": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont de la Concorde fue terminado en 1791, en plena Revolución Francesa, utilizando piedras de la Bastilla recién demolida. Se dice que el ingeniero Jean-Rodolphe Perronet eligió estos sillares para que «el pueblo pudiera pisar la antigua fortaleza de la tiranía». A lo largo de los turbulentos siglos XIX y XX, el puente cambió de nombre repetidas veces: Pont Louis XVI, Pont de la Révolution, Pont de la Concorde, reflejando cada vaivén político de Francia.</p>
<p>Originalmente adornado con doce estatuas monumentales de grandes figuras francesas —entre ellas Sully, Colbert, Condé y Turena—, estas esculturas fueron retiradas bajo Luis Felipe I y trasladadas al Palacio de Versalles, donde hoy se pueden contemplar en la Galería de las Batallas. Los pedestales vacíos permanecieron durante años hasta que fueron finalmente eliminados en una renovación posterior, dando al puente su aspecto sobrio y elegante actual.</p>
<p>El Pont de la Concorde une la plaza de la Concorde con la Asamblea Nacional, conectando simbólicamente el poder legislativo con el corazón monumental de París. Desde nuestros <a href="/es/croisiere">cruceros privados</a>, se aprecia esta perspectiva grandiosa con el obelisco de Luxor al fondo. Vea las fotografías en nuestra <a href="/es/galerie">galería</a> o <a href="/es/reservation">reserve su crucero</a>.</p>`,

/* 10 */
"pont-royal": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont Royal, inaugurado entre 1685 y 1689, es el tercer puente más antiguo de París tras el Pont Neuf y el Pont Marie. Fue financiado personalmente por Luis XIV —de ahí su nombre «real»— después de que una pasarela de madera fuera arrastrada por las crecidas del Sena. El diseño se atribuye a Jacques Gabriel, padre del arquitecto de la plaza de la Concorde, y sus cinco arcos de piedra constituyen un ejemplo magistral de la ingeniería del Gran Siglo.</p>
<p>Durante la Comuna de París en 1871, los insurgentes intentaron incendiar el puente rociándolo con petróleo como parte de la estrategia de destrucción de los monumentos parisinos. Sin embargo, la piedra maciza resistió las llamas y solo sufrió daños superficiales. En uno de sus pilares se conservan las marcas de crecida más antiguas de París, que datan de 1740, proporcionando un valioso registro hidrológico de casi tres siglos.</p>
<p>Desde el Pont Royal, la vista abarca el Museo de Orsay a un lado y el Jardín de las Tullerías al otro, dos joyas culturales de la capital. Nuestros <a href="/es/croisiere">cruceros privados</a> pasan bajo sus arcos centenarios, permitiendo admirar la textura dorada de la piedra desde el agua. Explore estas perspectivas en la <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve su experiencia</a>.</p>`,

/* 11 */
"pont-du-carrousel": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont du Carrousel actual data de 1939, pero su nombre se remonta al gran carrusel ecuestre que Luis XIV organizó en 1662 en la explanada contigua a las Tullerías, un espectáculo tan fastuoso que dio nombre al lugar y, por extensión, al puente. La versión anterior del puente, construida en 1834, fue la primera en utilizar arcos metálicos mixtos en París, una innovación que maravilló a los ingenieros de la época.</p>
<p>Durante las obras de construcción del puente actual, los obreros descubrieron restos arqueológicos de la época merovingia, incluyendo objetos cotidianos y fragmentos de cerámica que testimonian la ocupación continua de las orillas del Sena desde el siglo VI. Estos hallazgos enriquecieron considerablemente el conocimiento de la París alto-medieval y hoy se exhiben en el museo Carnavalet.</p>
<p>El Pont du Carrousel ofrece una de las perspectivas más emblemáticas de la capital: la pirámide de cristal del Louvre asomando por encima de los tejados del palacio. Desde la cubierta de un <a href="/es/croisiere">crucero privado por el Sena</a>, esta vista cobra toda su magia al atardecer. Descubra más en nuestra <a href="/es/galerie">galería de fotos</a> y <a href="/es/reservation">reserve su paseo</a>.</p>`,

/* 12 */
"pont-des-arts": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont des Arts fue el primer puente metálico de París cuando se inauguró en 1803 bajo las órdenes de Napoleón Bonaparte. Su nombre proviene del «Palais des Arts», denominación que recibía entonces el Louvre. Concebido exclusivamente para peatones, estaba adornado con jardineras, bancos y hasta árboles en macetas, convirtiéndolo en un auténtico jardín suspendido sobre el Sena que los parisinos frecuentaban como lugar de paseo dominical.</p>
<p>Debilitado por las colisiones de barcazas y los bombardeos de las dos guerras mundiales, el puente original fue demolido y reconstruido entre 1981 y 1984 con siete arcos en lugar de los nueve originales. A partir de 2008, la moda de los candados del amor invadió sus barandillas: se llegaron a acumular más de un millón de candados cuyo peso —estimado en cuarenta y cinco toneladas— amenazaba la estructura. En junio de 2015 fueron retirados y posteriormente vendidos en una subasta benéfica cuyos fondos se destinaron a asociaciones de refugiados.</p>
<p>Navegar bajo el Pont des Arts en un <a href="/es/croisiere">crucero privado</a> es descubrir la fachada renacentista del Instituto de Francia alineada con la cúpula del Louvre: una postal inconfundible de París. Admire esta estampa en nuestra <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve su crucero</a>.</p>`,

/* 13 */
"pont-neuf": `<h2>Historia y anécdotas poco conocidas</h2>
<p>A pesar de su nombre —«Puente Nuevo»—, el Pont Neuf es el puente más antiguo de París que se conserva en pie. Su construcción, iniciada por Enrique III en 1578 y terminada bajo Enrique IV en 1607, fue revolucionaria para la época: fue el primer puente parisino sin casas edificadas encima y el primero dotado de aceras elevadas para proteger a los peatones del barro y los carruajes. Los trescientos ochenta y un mascarones grotescos que adornan sus cornisas representan rostros burlones, todos diferentes entre sí.</p>
<p>Pocos saben que en la estatua ecuestre de Enrique IV, restaurada en 1818, se ocultaron dentro del vientre del caballo una pequeña estatuilla de Napoleón Bonaparte y varios documentos bonapartistas, un gesto clandestino de los fundidores. En 1985, el artista Christo envolvió el puente entero con tela dorada de poliamida durante dos semanas, transformándolo en una obra de arte efímera que atrajo millones de visitantes.</p>
<p>El Pont Neuf ocupa la punta de la isla de la Cité, rodeado por el romántico Square du Vert-Galant. Desde un <a href="/es/croisiere">crucero privado por el Sena</a>, se navega bajo sus doce arcos de piedra blanca mientras se contempla esta joya del patrimonio parisino. Vea las imágenes en la <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve ahora</a>.</p>`,

/* 14 */
"pont-au-change": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont au Change debe su nombre a los cambistas y joyeros que instalaron sus puestos sobre el puente desde la Edad Media. Durante siglos, sus mostradores fueron el corazón financiero de París, donde se cambiaban monedas extranjeras y se comerciaba con metales preciosos. En 1141, Luis VII ordenó oficialmente que los cambistas se establecieran aquí, convirtiendo el puente en la primera «calle financiera» de la capital, muy anterior a la Bolsa de Valores.</p>
<p>Un devastador incendio en 1621 destruyó todas las casas del puente, que fue reconstruido aún con edificaciones. No fue hasta un decreto real del siglo XVIII cuando se ordenó la demolición de todas las viviendas sobre los puentes de París por razones de higiene y seguridad, liberando las perspectivas sobre el río que hoy conocemos. El puente actual, de tres arcos, fue erigido en 1860 bajo Napoleón III y está decorado con las «N» imperiales características.</p>
<p>El Pont au Change une el Châtelet con el Palacio de Justicia y la Conciergerie, antigua prisión de María Antonieta. Desde nuestros <a href="/es/croisiere">cruceros privados</a>, se admira la fachada medieval de la Conciergerie con sus torres redondas reflejadas en el Sena. Contemple estas vistas en nuestra <a href="/es/galerie">galería</a> o <a href="/es/reservation">reserve su paseo fluvial</a>.</p>`,

/* 15 */
"pont-notre-dame": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont Notre-Dame ocupa un emplazamiento utilizado desde la Antigüedad: los galorromanos ya tendían aquí un puente de madera que conectaba Lutecia con la orilla derecha del Sena. En 1499, el puente medieval se derrumbó espectacularmente bajo el peso de las sesenta casas construidas sobre él, arrastrando a sus habitantes al río. Este desastre impulsó la construcción de un nuevo puente de piedra que se convirtió en el primero de París con casas numeradas, un precedente que inspiró el sistema de numeración urbana moderno.</p>
<p>Las viviendas del Pont Notre-Dame eran célebres por su elegancia: fachadas uniformes pintadas y decoradas con motivos alegóricos, consideradas las más bellas de la ciudad. Fueron finalmente demolidas en 1786 por orden real. Durante obras recientes de mantenimiento, los arqueólogos descubrieron vestigios romanos en las cimentaciones, incluyendo pilotes de roble milenarios en perfecto estado de conservación gracias a la inmersión permanente en el agua.</p>
<p>Navegar junto al Pont Notre-Dame durante un <a href="/es/croisiere">crucero privado</a> es recorrer dos mil años de historia parisina en un solo instante. A estribor se alza el Hôtel-Dieu, el hospital más antiguo de la ciudad. Descubra estas perspectivas en nuestra <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve su experiencia</a>.</p>`,

/* 16 */
"pont-d-arcole": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El origen del nombre del Pont d'Arcole es objeto de debate entre historiadores. Según la versión oficial, rinde homenaje a la batalla de Arcole de 1796, una de las victorias italianas de Napoleón Bonaparte. Sin embargo, una tradición popular atribuye el nombre a un joven revolucionario que, durante los Tres Días Gloriosos de julio de 1830, habría plantado una bandera tricolor en la barricada del puente gritando «¡Seguidme o moriré solo!» antes de caer abatido por las balas.</p>
<p>El puente actual, inaugurado en 1856, destaca por su audaz estructura: un solo arco metálico de ochenta metros de luz que cruza el Sena sin ningún pilar intermedio, una proeza técnica para la época. Originalmente abierto al tráfico rodado, fue convertido en puente peatonal en las últimas décadas, ofreciendo un paso tranquilo entre el Hôtel de Ville y la isla de la Cité. Su tablero metálico de color verde contrasta elegantemente con la piedra dorada de los edificios circundantes.</p>
<p>Desde un <a href="/es/croisiere">crucero privado por el Sena</a>, el paso bajo el arco único del Pont d'Arcole revela la fachada renacentista del Ayuntamiento de París en toda su magnificencia. Es una de las vistas más fotografiadas del recorrido. Véala en nuestra <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve su crucero</a>.</p>`,

/* 17 */
"pont-louis-philippe": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont Louis-Philippe actual fue construido en 1862, pero su historia arranca en 1833, cuando se inauguró aquí un elegante puente colgante bautizado en honor al «rey ciudadano» Luis Felipe I. Aquel puente de suspensión, símbolo de la modernidad industrial, no resistió los tumultos de la revolución de 1848: los insurgentes lo incendiaron durante las jornadas de febrero. Los restos calcinados de las cadenas de suspensión fueron recuperados del Sena meses después.</p>
<p>El puente conecta la tranquila Île Saint-Louis con el animado barrio del Marais en la orilla derecha. A pocos pasos se encuentra el célebre mercado de flores de la isla de la Cité, uno de los más antiguos de París, que funciona desde 1808. También se halla a escasa distancia la heladería Berthillon, considerada la mejor de la capital, cuyas colas de clientes serpentean por la acera en los días de verano.</p>
<p>Pasar bajo el Pont Louis-Philippe a bordo de un <a href="/es/croisiere">crucero privado</a> marca la entrada en el tramo más íntimo del Sena, entre la Île Saint-Louis y sus mansiones del siglo XVII. La quietud del agua contrasta con la animación de las terrazas cercanas. Descubra este ambiente en nuestra <a href="/es/galerie">galería de fotos</a> y <a href="/es/reservation">reserve su paseo</a>.</p>`,

/* 18 */
"pont-marie": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont Marie, inaugurado en 1635, lleva el nombre de Christophe Marie, el promotor inmobiliario que financió la urbanización de la Île Saint-Louis y la construcción del puente. Marie no era ingeniero sino empresario: obtuvo la concesión para edificar casas sobre el puente y en la isla a cambio de costear las obras. Su arriesgada inversión transformó un islote pantanoso en uno de los barrios más elegantes de París.</p>
<p>En 1658, una crecida excepcional del Sena arrastró dos arcos del puente junto con las veintidós casas que sostenían y sus ocupantes. Esta catástrofe dejó una huella visible: los arcos fueron reconstruidos con diferentes proporciones, lo que explica la asimetría que se observa hoy entre el lado norte y el lado sur. Según una tradición parisina, si se pasa bajo el Pont Marie y se formula un deseo en silencio, este se cumplirá, lo que lo ha convertido en el puente más romántico de la capital.</p>
<p>El Pont Marie es una parada imprescindible de nuestros <a href="/es/croisiere">cruceros privados por el Sena</a>: sus arcos irregulares de piedra dorada reflejan la luz del atardecer como ningún otro puente. Compruébelo en nuestra <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve este momento mágico</a>.</p>`,

/* 19 */
"pont-de-sully": `<h2>Historia y anécdotas poco conocidas</h2>
<p>El Pont de Sully es en realidad un conjunto de dos puentes alineados que cruzan ambos brazos del Sena pasando por la punta oriental de la Île Saint-Louis. Construido entre 1874 y 1876, lleva el nombre de Maximilien de Béthune, duque de Sully, el célebre ministro de finanzas de Enrique IV que modernizó las infraestructuras de Francia a principios del siglo XVII. Su diseño, con arcos metálicos sobre pilares de piedra, representó la transición entre la ingeniería clásica y la industrial.</p>
<p>En la punta de la isla, entre los dos tramos del puente, se extiende el Square Barye, un jardín discreto bautizado en honor al escultor animalista Antoine-Louis Barye. Este rincón arbolado, casi secreto, es el lugar favorito de los parisinos para contemplar la puesta de sol sobre Notre-Dame: la catedral aparece recortada contra el cielo del poniente, enmarcada por los plátanos centenarios de la isla, en lo que muchos consideran la más bella panorámica vespertina de París.</p>
<p>Navegar bajo el Pont de Sully en un <a href="/es/croisiere">crucero privado</a> marca el punto de inflexión del recorrido, donde el Sena se divide en dos brazos abrazando la isla. Es un momento de pura magia fluvial. Admire esta perspectiva en la <a href="/es/galerie">galería</a> y <a href="/es/reservation">reserve su crucero</a>.</p>`

};

/* ------------------------------------------------------------------ */
/*  Inject enrichments into posts                                      */
/* ------------------------------------------------------------------ */
const postsPath = new URL("../src/data/posts-es.json", import.meta.url);
const posts = JSON.parse(readFileSync(postsPath, "utf8"));
let count = 0;

for (const post of posts) {
  const extra = enrichments[post.slug];
  if (!extra) continue;

  if (post.content.includes("anécdotas poco conocidas")) {
    console.log(`skip ${post.slug}`);
    continue;
  }

  const ctaIdx = post.content.indexOf('<p><strong>');
  if (ctaIdx > 0) {
    post.content = post.content.slice(0, ctaIdx) + extra.trim() + "\n" + post.content.slice(ctaIdx);
  } else {
    post.content += "\n" + extra.trim();
  }

  const wordCount = post.content.split(/\s+/).length;
  console.log(`\u2705 ${post.slug} \u2014 ${wordCount} words`);
  count++;
}

writeFileSync(postsPath, JSON.stringify(posts, null, 2), "utf8");
console.log(`Done: ${count} enriched`);

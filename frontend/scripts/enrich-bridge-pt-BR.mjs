/**
 * enrich-bridge-pt-BR.mjs
 * ---------------------------------------------------------------------------
 * Enriches the 19 "Pont de Paris" bridge articles in posts-pt-BR.json
 * with ~250-word historical sections in BRAZILIAN PORTUGUESE.
 * Each enrichment is an H2 + 3 paragraphs inserted before the CTA block.
 * ---------------------------------------------------------------------------
 */

import { readFileSync, writeFileSync } from "fs";

/* ------------------------------------------------------------------ */
/*  Enrichments – Brazilian Portuguese with proper accents            */
/* ------------------------------------------------------------------ */

const enrichments = {

  /* 1 ---------------------------------------------------------------- */
  "pont-de-la-tournelle": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont de la Tournelle carrega séculos de memória parisiense. Seu nome remonta à torre de Filipe Augusto, uma das fortificações da muralha medieval que protegia a margem esquerda do Sena no início do século XIII. Essa torre de vigia, chamada <em>tournelle</em>, controlava a passagem dos barcos e a cobrança de pedágios fluviais. A ponte atual, inaugurada em 1928, foi projetada pelos arquitetos Paul Tournon e Julien Madeline em um estilo que mescla Art Déco e tradição clássica, com um arco assimétrico que se harmoniza perfeitamente com o perfil da Île Saint-Louis.</p>
<p>O elemento mais emblemático da ponte é a estátua de Santa Genoveva, padroeira de Paris, esculpida por Paul Landowski — o mesmo artista que criou o célebre Cristo Redentor do Corcovado, no Rio de Janeiro. A santa aparece de pé, segurando a criança Paris nos braços, voltada para o leste como guardiã da cidade. Segundo a lenda, foi Genoveva quem encorajou os parisienses a resistir à invasão dos hunos de Átila em 451 d.C., evitando a destruição da cidade. A presença dessa estátua na ponte é, portanto, um símbolo de proteção que atravessa os séculos.</p>
<p>A Pont de la Tournelle oferece uma das mais belas vistas de <a href="/pt-BR/croisiere">Notre-Dame de Paris</a> vista de trás, com a abside e os arcobotantes da catedral emoldurados pelo rio. Ao entardecer, a luz dourada transforma a cena em um verdadeiro quadro impressionista. Durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>, a passagem sob essa ponte é um momento de pura emoção, unindo arte, história e a beleza intemporal da capital francesa.</p>`,

  /* 2 ---------------------------------------------------------------- */
  "pont-de-larcheveche": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont de l'Archevêché, construída em 1828, é a ponte mais estreita de Paris, com apenas 11 metros de largura. Seu nome faz referência ao antigo palácio do arcebispo de Paris, que ficava na margem esquerda da Île de la Cité até sua destruição durante os motins anticlericais de 1831. O palácio, vizinho direto de Notre-Dame, era uma residência suntuosa cujos jardins desciam até o Sena. Após sua demolição, o terreno foi transformado no atual Square Jean-XXIII, um dos parques mais fotografados de Paris.</p>
<p>A ponte tornou-se mundialmente famosa por um fenômeno inesperado: os cadeados do amor. A partir dos anos 2000, casais do mundo inteiro começaram a prender cadeados gravados com suas iniciais nas grades da ponte, jogando a chave no Sena como símbolo de amor eterno. Em seu auge, estimava-se que mais de 700.000 cadeados pendiam da estrutura, representando um peso de aproximadamente 45 toneladas. Em 2015, as autoridades municipais retiraram todos os cadeados por questões de segurança estrutural, substituindo as grades por painéis de vidro.</p>
<p>Apesar da remoção dos cadeados, a Pont de l'Archevêché continua sendo um dos pontos mais românticos de Paris. Sua proximidade com Notre-Dame e sua vista privilegiada sobre a abside da catedral fazem dela um local imperdível. Vista da água durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>, a ponte revela toda a sua delicadeza, emoldurada pela grandiosidade gótica de Notre-Dame e pela vegetação do Square Jean-XXIII. Confira também nossa <a href="/pt-BR/galerie">galeria de fotos</a> para admirar essa perspectiva única.</p>`,

  /* 3 ---------------------------------------------------------------- */
  "petit-pont-cardinal-lustiger": `<h2>História e curiosidades pouco conhecidas</h2>
<p>O Petit-Pont – Cardinal Lustiger é muito mais do que uma simples passagem sobre o Sena: é o mais antigo ponto de travessia de Paris. Desde a época galo-romana, existia aqui uma ponte ligando a Île de la Cité à margem esquerda, no traçado da antiga via romana que ia de Lutécia ao sul da Gália. Ao longo dos séculos, essa ponte foi reconstruída nada menos que 14 vezes, destruída por enchentes, incêndios e guerras. Com apenas 32 metros de comprimento, é também uma das menores pontes da capital, mas sua importância histórica é inversamente proporcional ao seu tamanho.</p>
<p>Na Idade Média, o Petit-Pont era uma das poucas passagens que ligavam a cidade à Universidade, na margem esquerda. Uma taxa de pedágio era cobrada de todos que o atravessavam — estudantes, comerciantes e peregrinos. As casas construídas sobre a ponte abrigavam lojas e oficinas, formando uma verdadeira rua suspensa sobre o rio. Em 2013, a ponte foi renomeada em homenagem ao Cardeal Jean-Marie Lustiger, arcebispo de Paris de 1981 a 2005, figura emblemática do diálogo inter-religioso, nascido de pais judeus poloneses e convertido ao catolicismo na adolescência.</p>
<p>Hoje, o Petit-Pont – Cardinal Lustiger oferece uma vista direta sobre a fachada de Notre-Dame e conecta o coração histórico da Île de la Cité ao vibrante Quartier Latin. É uma das passagens mais discretas e, no entanto, mais carregadas de história de toda Paris. Durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>, a passagem sob esse pequeno arco é um lembrete comovente das origens milenares da cidade.</p>`,

  /* 4 ---------------------------------------------------------------- */
  "pont-saint-michel": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont Saint-Michel, inaugurada em 1857 durante o reinado de Napoleão III, é uma das pontes mais carregadas de simbolismo político de Paris. Suas arcadas ostentam o monograma imperial "N" entrelaçado, testemunho da grandiosidade do Segundo Império francês. A ponte original, construída em 1378, já havia sido reconstruída várias vezes antes de ganhar sua forma atual em pedra, com três arcos elegantes que se harmonizam com a arquitetura haussmanniana das margens.</p>
<p>Um dos episódios mais sombrios ligados a essa ponte ocorreu em 17 de outubro de 1961, durante a Guerra da Argélia. Naquela noite, uma manifestação pacífica de argelinos em Paris foi brutalmente reprimida pela polícia. Dezenas de manifestantes foram jogados no Sena desde a Pont Saint-Michel e de outras pontes próximas. Esse massacre, durante muito tempo ocultado pela história oficial, é hoje lembrado por uma placa comemorativa afixada na ponte, um dever de memória que a cidade assume.</p>
<p>Nas proximidades da ponte, os célebres bouquinistes — os tradicionais vendedores de livros usados dos cais do Sena — exibem suas caixas verdes, uma tradição que remonta ao século XVI e que foi inscrita como Patrimônio Cultural Imaterial da UNESCO em 2024. A Pont Saint-Michel é, portanto, um cruzamento onde convergem a história imperial, a memória contemporânea e a cultura popular parisiense. Para apreciar esse panorama histórico, nada melhor do que um <a href="/pt-BR/croisiere">cruzeiro privado pelo Sena</a>.</p>`,

  /* 5 ---------------------------------------------------------------- */
  "pont-de-iena": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont d'Iéna é uma das pontes mais estratégicas de Paris, ligando diretamente a Torre Eiffel ao Trocadéro. Construída entre 1808 e 1814 por ordem de Napoleão I, recebeu seu nome em homenagem à vitória francesa na Batalha de Jena, em 1806, contra o exército prussiano. Essa referência militar quase lhe custou a existência: em 1815, após a derrota de Napoleão em Waterloo, o general prussiano Blücher quis destruir a ponte como vingança. Foi o rei Luís XVIII quem interveio pessoalmente para salvá-la, renomeando-a temporariamente como "Pont de l'École Militaire".</p>
<p>A ponte foi consideravelmente alargada em 1937 para a Exposição Internacional de Artes e Técnicas, passando de 14 para 35 metros de largura — uma transformação necessária para acomodar o fluxo de visitantes entre os pavilhões do Trocadéro e o Campo de Marte. Quatro estátuas equestres, representando guerreiros árabes, gregos, romanos e gauleses, adornam suas extremidades, simbolizando as grandes civilizações guerreiras da história.</p>
<p>Hoje, a Pont d'Iéna é provavelmente a ponte mais fotografada de Paris, graças à sua perspectiva perfeita sobre a Torre Eiffel. Ao anoitecer, quando a torre se ilumina e começa a cintilar, o espetáculo visto da ponte é absolutamente mágico. Durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>, a passagem sob a Pont d'Iéna com a Torre Eiffel como pano de fundo é invariavelmente o momento mais emocionante da navegação. <a href="/pt-BR/reservation">Reserve seu cruzeiro</a> e viva essa experiência inesquecível.</p>`,

  /* 6 ---------------------------------------------------------------- */
  "pont-de-l-alma": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont de l'Alma foi inaugurada em 1856 pelo imperador Napoleão III para comemorar a vitória franco-britânica na Batalha do Alma, durante a Guerra da Crimeia, em 1854. A ponte original possuía quatro estátuas de soldados representando os diferentes corpos do exército francês. Quando a ponte foi reconstruída entre 1970 e 1974, apenas uma dessas estátuas foi mantida: o célebre Zuavo, que se tornou o indicador popular mais famoso do nível do Sena. Durante a grande enchente de 1910, a água chegou até os ombros do Zuavo; em janeiro de 2018, chegou até suas coxas, provocando a preocupação de toda a cidade.</p>
<p>Acima da ponte, na praça que leva o mesmo nome, encontra-se uma réplica em tamanho real da chama da Estátua da Liberdade de Nova York. Inaugurada em 1989 como símbolo da amizade franco-americana, essa <em>Flamme de la Liberté</em> ganhou um significado adicional após a trágica morte da princesa Diana no túnel de l'Alma em 1997. Desde então, o monumento tornou-se um memorial informal onde admiradores do mundo inteiro depositam flores e mensagens, embora essa não fosse sua função original.</p>
<p>A Pont de l'Alma é também um ponto de referência essencial para a navegação no Sena: é aqui que as companhias fluviais verificam se o nível das águas permite a passagem dos barcos sob os arcos. Para os passageiros de um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>, a passagem sob essa ponte é sempre carregada de emoção, entre a história militar, as lendas urbanas e a vista espetacular sobre a Torre Eiffel que se revela logo em seguida.</p>`,

  /* 7 ---------------------------------------------------------------- */
  "pont-des-invalides": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont des Invalides detém um recorde discreto mas notável: é a ponte mais baixa de Paris, com seus arcos que passam rente à superfície do Sena. Essa característica a torna particularmente sensível às cheias do rio, sendo frequentemente uma das primeiras pontes a se tornar intransitável quando as águas sobem. A ponte atual, construída entre 1854 e 1856, substituiu uma estrutura anterior que havia parcialmente desmoronado. Seu estilo sóbrio e elegante, com três arcos em pedra, reflete a austeridade militar do bairro que ela serve.</p>
<p>A decoração da ponte é inteiramente dedicada à glória militar francesa. Troféus de armas, coroas de louros e emblemas marciais adornam os pilares e as balaustradas, criando um diálogo visual com o Hôtel des Invalides, a majestosa construção de Luís XIV que abriga o túmulo de Napoleão e o Museu do Exército. Essa coerência estética faz da Pont des Invalides uma verdadeira extensão monumental da esplanada dos Invalides.</p>
<p>Durante a Segunda Guerra Mundial, em agosto de 1944, as forças alemãs em retirada planejaram destruir várias pontes de Paris para retardar o avanço dos Aliados. A Pont des Invalides estava na lista dos alvos. Foram os combatentes da Resistência francesa que, com grande risco de vida, desarmaram os explosivos e salvaram a ponte da destruição. Esse ato heroico preservou não apenas a estrutura, mas também a continuidade histórica do patrimônio fluvial parisiense. Descubra essa ponte carregada de história durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>.</p>`,

  /* 8 ---------------------------------------------------------------- */
  "pont-alexandre-iii": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont Alexandre III é unanimemente considerada a mais bela ponte de Paris e uma das mais ornamentadas do mundo. Inaugurada para a Exposição Universal de 1900, é uma proeza da engenharia da <em>Belle Époque</em>: um único arco metálico de 107 metros vence o Sena de uma só vez, sem nenhum pilar no rio, para não obstruir a perspectiva entre os Invalides e o Grand Palais. A pedra fundamental foi colocada em 1896 pelo czar Nicolau II da Rússia, em homenagem a seu pai, o czar Alexandre III, selando a aliança franco-russa que redefiniu o equilíbrio de poder na Europa.</p>
<p>A exuberância decorativa da ponte é extraordinária: 32 candelabros monumentais, quatro pilares coroados por esculturas douradas de Pégaso — o cavalo alado da mitologia grega —, ninfas, querubins, guirlandas e brasões de armas. Mais de 600 pontos de iluminação transformam a ponte à noite em um verdadeiro cenário de conto de fadas. Em 1975, a Pont Alexandre III foi classificada como Monumento Histórico, reconhecimento da sua importância artística e patrimonial excepcional.</p>
<p>Do ponto de vista de quem navega pelo Sena, a passagem sob a Pont Alexandre III é o momento mais espetacular de qualquer cruzeiro. A grandiosidade dos ornamentos dourados, refletidos na água ao entardecer, cria uma atmosfera de encantamento impossível de reproduzir em terra firme. A bordo do Sénang, durante um <a href="/pt-BR/croisiere">cruzeiro privado</a>, esse instante é simplesmente mágico. Veja as imagens em nossa <a href="/pt-BR/galerie">galeria de fotos</a>.</p>`,

  /* 9 ---------------------------------------------------------------- */
  "pont-de-la-concorde": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont de la Concorde carrega em suas pedras a história mais tumultuada da França. Construída entre 1787 e 1791, ela foi erguida em parte com pedras provenientes da demolição da fortaleza da Bastilha, destruída durante a Revolução Francesa em 14 de julho de 1789. A lenda diz que os revolucionários quiseram que os parisienses pudessem "pisar na tirania" ao atravessar a ponte — uma vingança simbólica contra o absolutismo monárquico.</p>
<p>A ponte mudou de nome mais vezes do que qualquer outra em Paris, refletindo as turbulências políticas do país: Pont Louis XVI sob a monarquia, Pont de la Révolution durante o Terror, Pont de la Concorde após o Diretório, e assim por diante, ao sabor dos regimes que se sucediam. Em determinado momento, 12 estátuas colossais de grandes homens de Estado franceses foram instaladas sobre a ponte, mas o peso excessivo ameaçava a estrutura e elas foram transferidas para o Château de Versailles, onde permanecem até hoje.</p>
<p>Hoje, a Pont de la Concorde oferece uma perspectiva majestosa entre a Place de la Concorde (com seu obelisco egípcio) e o Palais Bourbon (sede da Assembleia Nacional). É um eixo simbólico que liga o poder legislativo à praça onde Luís XVI foi guilhotinado em 1793. Durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>, a passagem sob essa ponte é um verdadeiro mergulho nos capítulos mais dramáticos da história francesa.</p>`,

  /* 10 --------------------------------------------------------------- */
  "pont-royal": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont Royal é a terceira ponte mais antiga de Paris ainda em pé, atrás apenas da Pont Neuf e da Pont Marie. Construída entre 1685 e 1689, foi inteiramente financiada pelo rei Luís XIV com seus recursos pessoais — daí o nome "Real". Antes de sua construção, uma frágil ponte de madeira ligava o Palácio das Tulherias à margem esquerda, mas as enchentes frequentes do Sena a destruíam repetidamente. O Rei Sol decidiu então construir uma ponte em pedra que resistisse aos séculos, e assim foi feito.</p>
<p>Durante a Comuna de Paris, em maio de 1871, os <em>communards</em> tentaram incendiar a Pont Royal junto com o Palácio das Tulherias e vários outros edifícios públicos. A ponte foi atingida pelas chamas, mas sua sólida construção em pedra resistiu ao fogo, ao contrário do palácio, que foi completamente destruído. As marcas de queimadura permaneceram visíveis durante décadas nos pilares.</p>
<p>Um detalhe fascinante da Pont Royal são as marcas de enchentes gravadas em seus pilares. Desde 1740, os níveis máximos das cheias do Sena são registrados na pedra, criando uma espécie de arquivo hidrológico a céu aberto. A marca mais alta, de 1910, está a uma altura impressionante que faz refletir sobre a força do rio. Para observar de perto esses testemunhos do passado, um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a> é a maneira ideal de contemplar essa ponte carregada de memória.</p>`,

  /* 11 --------------------------------------------------------------- */
  "pont-du-carrousel": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont du Carrousel, inaugurada em 1939, é uma ponte relativamente recente na paisagem parisiense, mas o local que ela ocupa é carregado de história. Seu nome faz referência à célebre parada equestre (<em>carrousel</em>) organizada por Luís XIV em 1662 nos jardins das Tulherias, um espetáculo suntuoso de cavaleiros ricamente adornados que deu nome à praça e, por extensão, à ponte. A estrutura atual, em concreto armado revestido de pedra, substituiu uma ponte metálica anterior que havia se tornado insuficiente para o tráfego moderno.</p>
<p>Durante as escavações para a construção da ponte atual, os arqueólogos fizeram descobertas surpreendentes: vestígios de uma ocupação merovíngia dos séculos VI e VII foram encontrados nos fundamentos, testemunhando que esse ponto de passagem sobre o Sena já era utilizado muito antes da construção das primeiras pontes medievais. Essas descobertas arqueológicas enriqueceram consideravelmente o conhecimento da Paris dos primeiros reis francos.</p>
<p>Hoje, a Pont du Carrousel é particularmente apreciada pela vista excepcional que oferece: de um lado, a pirâmide de vidro do Louvre emerge acima dos telhados do museu; do outro, a cúpula do Institut de France brilha ao sol. É uma das perspectivas fotográficas mais procuradas de Paris. A bordo de um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>, essa vista panorâmica se revela em toda a sua grandiosidade, impossível de captar da mesma forma desde a margem.</p>`,

  /* 12 --------------------------------------------------------------- */
  "pont-des-arts": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont des Arts ocupa um lugar singular na história da engenharia francesa: foi a primeira ponte inteiramente metálica de Paris, inaugurada em 1803 sob o Consulado de Napoleão Bonaparte. Projetada pelo engenheiro Louis-Alexandre de Cessart, ela era originalmente uma passarela com nove arcos em ferro fundido, dotada de bancos, jardineiras com flores e até árvores — uma verdadeira inovação para a época, que transformou a ponte em um jardim suspenso sobre o Sena. Seu nome vem do Palácio das Artes, como o Louvre era chamado na época.</p>
<p>Após décadas de deterioração — bombardeios, colisões de barcaças e desgaste natural —, a ponte original foi demolida e reconstruída entre 1981 e 1984 pelo arquiteto Louis Arretche, que manteve o espírito original, mas reduziu o número de arcos de nove para sete. A nova ponte tornou-se então cenário de um fenômeno global: os cadeados do amor. Mais de um milhão de cadeados foram presos às suas grades, até que em 2015 as autoridades os removeram por razões de segurança. Uma parte dos cadeados foi vendida em leilão para fins de caridade.</p>
<p>Hoje, a Pont des Arts continua sendo o point de encontro predileto de pintores, músicos de rua e casais apaixonados. Reservada exclusivamente a pedestres, ela oferece uma vista magnífica sobre a Île de la Cité e a Pont Neuf. Vista do rio durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>, sua silhueta delicada e aérea contrasta com a solidez das pontes em pedra vizinhas, criando um dos mais belos enquadramentos do panorama parisiense.</p>`,

  /* 13 --------------------------------------------------------------- */
  "pont-neuf": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont Neuf — literalmente "Ponte Nova" — é, paradoxalmente, a ponte mais antiga de Paris ainda em pé. Sua construção começou em 1578 sob o reinado de Henrique III e foi concluída em 1607 por Henrique IV, que a inaugurou pessoalmente cavalgando um cavalo branco. A ponte foi revolucionária para a época: pela primeira vez em Paris, uma ponte era construída sem casas em cima, oferecendo uma vista desimpedida sobre o Sena. Essa inovação a tornou imediatamente o passeio mais popular da cidade, atraindo artistas de rua, charlatães, vendedores ambulantes e toda a vida boêmia parisiense.</p>
<p>Poucos conhecem o segredo escondido na estátua equestre de Henrique IV, que se ergue no centro da ponte, sobre a ponta da Île de la Cité. Dentro da estátua, instalada em 1818 para substituir a original destruída durante a Revolução, os artesãos ocultaram uma pequena estatueta de Napoleão Bonaparte — uma provocação discreta dos bonapartistas durante a Restauração monárquica. Em 1985, o artista búlgaro Christo embalou inteiramente a Pont Neuf em tecido dourado, criando uma das intervenções artísticas mais célebres do século XX, vista por milhões de pessoas.</p>
<p>Com seus doze arcos, seus 238 mascarões esculpidos (rostos grotescos decorativos) e sua curvatura elegante que abraça a ponta da Île de la Cité, a Pont Neuf é muito mais do que uma ponte: é o símbolo de Paris. Durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>, a passagem sob seus arcos centenários é um dos momentos mais emocionantes da navegação, um encontro com 400 anos de história parisiense. <a href="/pt-BR/reservation">Reserve seu cruzeiro</a> para viver essa experiência.</p>`,

  /* 14 --------------------------------------------------------------- */
  "pont-au-change": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont au Change deve seu nome aos cambistas e ourives medievais que ali instalaram suas bancas a partir do século IX. Na Idade Média, essa ponte era o principal centro de câmbio monetário de Paris: mercadores de toda a Europa vinham trocar suas moedas antes de entrar na cidade. As casas construídas sobre a ponte abrigavam as oficinas dos cambistas (<em>changeurs</em>), formando uma verdadeira rua comercial suspensa sobre o Sena, com fachadas ornamentadas que rivalizavam em riqueza.</p>
<p>Em 1621, um incêndio devastador destruiu todas as casas da ponte, provocando uma catástrofe que marcou profundamente a memória parisiense. A reconstrução que se seguiu levou a um decreto real proibindo progressivamente a construção de casas sobre as pontes de Paris — uma decisão de urbanismo que transformaria para sempre a aparência da cidade e a relação dos parisienses com seu rio. A ponte atual, construída em 1860 sob Napoleão III, apresenta três arcos em pedra ornados com o monograma imperial "N".</p>
<p>Hoje, a Pont au Change liga a Place du Châtelet à Île de la Cité, oferecendo uma perspectiva privilegiada sobre a Conciergerie — a antiga prisão real onde Maria Antonieta foi encarcerada antes de sua execução em 1793. A torre do relógio da Conciergerie, o mais antigo relógio público de Paris, é visível desde a ponte. Para contemplar essa vista histórica desde a água, embarque em um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>.</p>`,

  /* 15 --------------------------------------------------------------- */
  "pont-notre-dame": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont Notre-Dame é a herdeira direta do <em>Grand Pont</em> galo-romano, a principal ponte de Lutécia que ligava a Île de la Cité à margem direita desde a Antiguidade. Esse ponto de passagem é, portanto, utilizado há mais de dois mil anos, fazendo dele um dos mais antigos cruzamentos urbanos contínuos da Europa. Vestígios de pilares romanos foram descobertos durante escavações no leito do rio, comprovando a importância desse eixo na rede viária da Gália romana.</p>
<p>Em 1499, uma catástrofe marcou a história da ponte: a estrutura medieval desmoronou de repente, arrastando consigo as 60 casas construídas sobre ela. A reconstrução que se seguiu trouxe uma inovação notável para a época: as novas casas foram as primeiras em Paris a receber uma numeração oficial, inaugurando o sistema de endereçamento que mais tarde seria adotado em toda a cidade. As fachadas uniformes e numeradas da ponte eram consideradas tão belas que ela ganhou o apelido de "a ponte mais elegante de Paris".</p>
<p>A ponte atual, construída em 1919, é mais sóbria que suas predecessoras, mas sua localização continua excepcional: entre Notre-Dame e o Hôtel-Dieu, o hospital mais antigo de Paris (fundado em 651 d.C.), ela ocupa o coração histórico absoluto da capital. Durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>, a passagem sob a Pont Notre-Dame é um retorno às raízes mais profundas da cidade, às origens romanas de uma metrópole que nasceu sobre as águas.</p>`,

  /* 16 --------------------------------------------------------------- */
  "pont-d-arcole": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont d'Arcole, que liga a margem direita do Sena à Île de la Cité, carrega em seu nome uma dupla referência histórica disputada até hoje pelos historiadores. Para alguns, o nome remete à Batalha da Ponte de Arcole, na Itália, em 1796, onde o jovem general Napoleão Bonaparte realizou uma de suas façanhas militares mais célebres. Para outros, o nome homenageia um jovem revolucionário anônimo que, durante a Revolução de Julho de 1830, avançou sobre a ponte brandindo uma bandeira tricolor e gritando "Sigam-me ou morrerei sozinho!". Ele foi abatido, mas sua coragem inspirou os insurgentes a tomar a prefeitura.</p>
<p>A ponte atual, construída em 1856, é uma proeza técnica para a época: um único arco metálico de 80 metros de comprimento vence o braço do Sena sem nenhum pilar intermediário, criando uma elegante curva que reflete na água. É uma das raras pontes de Paris reservadas exclusivamente a pedestres, o que lhe confere uma atmosfera particularmente calma e contemplativa, em contraste com as ruas agitadas que a cercam.</p>
<p>Da Pont d'Arcole, a vista sobre a fachada do Hôtel de Ville (Prefeitura de Paris) é magnífica, especialmente quando o edifício se ilumina ao entardecer. Do outro lado, a praça em frente a Notre-Dame se revela em toda a sua amplitude. Vista da água durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>, a ponte é uma moldura perfeita para fotografar a arquitetura renascentista da Prefeitura.</p>`,

  /* 17 --------------------------------------------------------------- */
  "pont-louis-philippe": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont Louis-Philippe, inaugurada em 1862, é a terceira ponte a ocupar esse local sobre o Sena. A primeira, inaugurada em 1833 durante o reinado do rei Luís Filipe I, desmoronou parcialmente poucos anos depois. A segunda foi destruída durante a Revolução de 1848, quando os insurgentes atearam fogo às barricadas erguidas sobre a ponte. A versão atual, com seus três arcos em pedra de estilo clássico, é portanto uma sobrevivente das turbulências políticas do século XIX francês.</p>
<p>A ponte liga a margem direita à Île Saint-Louis, uma das ilhas mais encantadoras de Paris. Ao cruzá-la, chega-se ao coração de um bairro que parece ter parado no tempo, com suas mansões do século XVII, suas ruas estreitas e suas lojas artesanais. Nas proximidades, o célebre Marché aux Fleurs (Mercado de Flores) da Île de la Cité, hoje chamado Marché aux Fleurs Reine Elizabeth II, encanta os visitantes com suas flores, plantas e pássaros desde 1808 — um dos mercados mais antigos de Paris.</p>
<p>A Pont Louis-Philippe é também indissociável de uma das maiores instituições gastronômicas parisienses: a sorveteria Berthillon, localizada na vizinha Île Saint-Louis. Desde 1954, os parisienses e turistas fazem fila pacientemente na ponte para saborear os sorvetes artesanais mais famosos da capital. Durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>, a passagem sob essa ponte evoca todas essas delícias parisienses. Confira nossa <a href="/pt-BR/galerie">galeria de fotos</a>.</p>`,

  /* 18 --------------------------------------------------------------- */
  "pont-marie": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont Marie, inaugurada em 1635, é uma das pontes mais antigas e mais românticas de Paris. Seu nome não tem relação com a Virgem Maria, como muitos imaginam, mas com Christophe Marie, o engenheiro e empreendedor que financiou e supervisionou sua construção. Marie foi também o promotor imobiliário da Île Saint-Louis, transformando essa ilha pantanosa em um dos bairros mais elegantes da capital. A ponte era originalmente ladeada de casas em seus dois lados, como era costume na época.</p>
<p>Em março de 1658, uma enchente catastrófica do Sena destruiu dois dos arcos da ponte e as casas construídas sobre eles. Vinte moradias foram engolidas pelas águas, causando dezenas de mortes. Após essa tragédia, as casas não foram reconstruídas, e a ponte ganhou seu perfil atual, mais austero e assimétrico — os arcos do lado da Île Saint-Louis são visivelmente diferentes daqueles do lado da margem direita, testemunhando as reconstruções sucessivas.</p>
<p>Uma tradição popular afirma que quem passar sob a Pont Marie a bordo de um barco deve fazer um pedido, fechar os olhos e jogar uma moeda no Sena para que o desejo se realize. Essa superstição charmosa faz da passagem sob a Pont Marie um momento particularmente especial durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a>. A bordo do Sénang, não se esqueça de preparar sua moeda e seu desejo mais caro ao se aproximar dessa ponte encantada. <a href="/pt-BR/reservation">Reserve seu cruzeiro</a> e descubra a magia.</p>`,

  /* 19 --------------------------------------------------------------- */
  "pont-de-sully": `<h2>História e curiosidades pouco conhecidas</h2>
<p>A Pont de Sully é, na realidade, composta por duas pontes distintas que se encontram na ponta leste da Île Saint-Louis, formando um eixo contínuo entre as duas margens do Sena. Construída entre 1874 e 1876, durante os grandes trabalhos de modernização de Paris, ela recebeu o nome do Duque de Sully, o célebre ministro de Henrique IV que reformou as finanças do reino no início do século XVII. Essa configuração em duas partes, com a ilha como pivô central, é única entre as pontes de Paris.</p>
<p>Na ponta da Île Saint-Louis, entre os dois tramos da ponte, encontra-se o discreto Square Barye, um jardim arborizado que é um dos segredos mais bem guardados de Paris. Nomeado em homenagem ao escultor animalista Antoine-Louis Barye, cujas obras adornam o Louvre e as Tulherias, esse pequeno parque é um refúgio de tranquilidade no coração da capital. Os parisienses vêm aqui fazer piqueniques ao entardecer, desfrutando de uma vista privilegiada sobre a abside de Notre-Dame e o início do Canal Saint-Martin.</p>
<p>A Pont de Sully é particularmente apreciada pelos fotógrafos pelo espetáculo do pôr do sol sobre Notre-Dame, quando a catedral se recorta em sombra contra o céu flamejante. Durante um <a href="/pt-BR/croisiere">cruzeiro privado no Sena</a> a bordo do Sénang, a partida do Port de l'Arsenal passa pela Pont de Sully logo no início da navegação, oferecendo um primeiro vislumbre deslumbrante da Île Saint-Louis e da catedral. Um início de cruzeiro simplesmente memorável.</p>`

};

/* ------------------------------------------------------------------ */
/*  Main logic – insert enrichments before "Leia também" CTA block    */
/* ------------------------------------------------------------------ */

const postsPath = new URL("../src/data/posts-pt-BR.json", import.meta.url);
const posts = JSON.parse(readFileSync(postsPath, "utf8"));

let count = 0;

for (const post of posts) {
  const extra = enrichments[post.slug];
  if (!extra) continue;

  // Skip if already enriched
  if (post.content.includes("curiosidades pouco conhecidas")) {
    console.log(`skip ${post.slug}`);
    continue;
  }

  // Insert before the "Leia também" CTA block
  const ctaMarker = "Leia também";
  const ctaIdx = post.content.indexOf(ctaMarker);
  if (ctaIdx > 0) {
    // Find the <p> that contains the CTA
    const pStart = post.content.lastIndexOf("<p>", ctaIdx);
    if (pStart > 0) {
      post.content =
        post.content.slice(0, pStart) +
        extra.trim() +
        "\n" +
        post.content.slice(pStart);
    } else {
      post.content += "\n" + extra.trim();
    }
  } else {
    // Fallback: append at end
    post.content += "\n" + extra.trim();
  }

  const wordCount = post.content.split(/\s+/).length;
  console.log(`✅ ${post.slug} — ${wordCount} words`);
  count++;
}

writeFileSync(postsPath, JSON.stringify(posts, null, 2), "utf8");
console.log(`\nDone: ${count} articles enriched`);

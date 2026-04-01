const allPokemon = [
  {
    id: 1,
    name: "flexape", // 👈 minuscolo
    types: ["lotta"],
    image: "images/flexape.jpeg", // 👈 minuscolo
    stats: {
      hp: 50,
      attack: 65,
      defense: 40,
      sp_attack: 35,
      sp_defense: 40,
      speed: 50
    },
    description: "Mena le mani con allegria seguendo il ritmo della canzone che ha nelle cuffie"
  },
{
    id: 2,
    name: "chefurious", // 👈 minuscolo
    types: ["lotta", "fuoco"],
    image: "images/chefurious.jpeg", // 👈 minuscolo
    stats: {
      hp: 60,
      attack: 80,
      defense: 50,
      sp_attack: 35,
      sp_defense: 50,
      speed: 50
    },
    description: "Adora cucinare e arrabbiarsi, una combo pericolosa con delle padelle roventi in mano"
  },
{
    id: 3,
    name: "gorillhate", // 👈 minuscolo
    types: ["lotta", "fuoco"],
    image: "images/gorillhate.jpeg", // 👈 minuscolo
    stats: {
      hp: 88,
      attack: 100,
      defense: 65,
      sp_attack: 40,
      sp_defense: 60,
      speed: 50
    },
    description: "Ha i pugni nelle mani e il potere dell'odio nel cuore, ma almeno sa cucinare una carbonara fantastica"
  },
{
    id: 4,
    name: "vessilly", // 👈 minuscolo
    types: ["buio", "folletto"],
    image: "images/vessilly.jpeg", // 👈 minuscolo
    stats: {
      hp: 60,
      attack: 40,
      defense: 45,
      sp_attack: 70,
      sp_defense: 50,
      speed: 55
    },
    description: "Non lasciatevi incantare dai suoi modi graziosi, o potrebbe essere l'ultima cosa che vedrete"
  },
{
    id: 5,
    name: "vessalia", // 👈 minuscolo
    types: ["buio", "folletto"],
    image: "images/vessalia.jpeg", // 👈 minuscolo
    stats: {
      hp: 75,
      attack: 45,
      defense: 55,
      sp_attack: 90,
      sp_defense: 70,
      speed: 65
    },
    description: "Secondo le leggende, appare in sogno agli uomini giusti per ispirarli e ai malfattori per tormentarli"
  },
{
    id: 6,
    name: "psy'in", // 👈 minuscolo
    types: ["psico"],
    image: "images/psy'in.jpeg", // 👈 minuscolo
    stats: {
      hp: 60,
      attack: 35,
      defense: 50,
      sp_attack: 60,
      sp_defense: 60,
      speed: 60
    },
    description: "Con la sola forza del pensiero riesce a calmare qualsiasi cuore, tranne il suo"
  },
{
    id: 7,
    name: "psy'ang", // 👈 minuscolo
    types: ["psico", "fuoco"],
    image: "images/psy'ang.jpeg", // 👈 minuscolo
    stats: {
      hp: 80,
      attack: 40,
      defense: 60,
      sp_attack: 75,
      sp_defense: 80,
      speed: 70
    },
    description: "Può capitare a molti esploratori di scambiare le sfere psichiche che gli ruotano attorno per delle meteore, a ragion veduta"
  },
{
    id: 8,
    name: "puppit", // 👈 minuscolo
    types: ["terra", "ghiaccio"],
    image: "images/puppit.jpeg", // 👈 minuscolo
    stats: {
      hp: 55,
      attack: 70,
      defense: 45,
      sp_attack: 70,
      sp_defense: 50,
      speed: 60
    },
    description: "Scalerebbe con gioia anche la cima più impervia durante la più dura delle bufere, se non fosse così occupato a sonnecchiare tutto il tempo"
  },
{
    id: 9,
    name: "frostound", // 👈 minuscolo
    types: ["terra", "ghiaccio"],
    image: "images/frostound.jpeg", // 👈 minuscolo
    stats: {
      hp: 80,
      attack: 75,
      defense: 60,
      sp_attack: 45,
      sp_defense: 80,
      speed: 70
    },
    description: "Grazie alla sua stazza rappresenta spesso un tempestivo punto di riferimento per gli esploratori che finiscono vittime del gelo perenne, e si prodiga sempre con gentilezza e abnegazione per aiutare chiunque si trovi in difficoltà"
  },
{
    id: 10,
    name: "boltkin", // 👈 minuscolo
    types: ["spettro", "elettro"],
    image: "images/boltkin.jpeg", // 👈 minuscolo
    stats: {
      hp: 50,
      attack: 40,
      defense: 45,
      sp_attack: 65,
      sp_defense: 40,
      speed: 60
    },
    description: "Per lui ogni giorno è halloween, dategli il dolcetto o farete meglio a stare attenti ai suoi scherzetti...  "
  },
{
    id: 11,
    name: "wattgast", // 👈 minuscolo
    types: ["spettro", "elettro"],
    image: "images/wattgast.jpeg", // 👈 minuscolo
    stats: {
      hp: 60,
      attack: 45,
      defense: 50,
      sp_attack: 80,
      sp_defense: 45,
      speed: 70
    },
    description: "Quando starnutisce fuoriescono tante saette dalla sua zucca, un motivo come un altro per stare accorti ogni qualvolta vi troviate nelle sue vicinanze"
  },
{
    id: 12,
    name: "polterpump", // 👈 minuscolo
    types: ["spettro", "lotta"],
    image: "images/polterpump.jpeg", // 👈 minuscolo
    stats: {
      hp: 70,
      attack: 75,
      defense: 55,
      sp_attack: 90,
      sp_defense: 45,
      speed: 85
    },
    description: "Probabilmente avrà consumato tutta l'elettricità per integrare elettroliti e altre sostanze dèdite alla massellanza, oppure la pubertà agisce in modo strano nei fantasmi"
  },
{
    id: 13,
    name: "titalion", // 👈 minuscolo
    types: ["acciaio"],
    image: "images/titalion.jpeg", // 👈 minuscolo
    stats: {
      hp: 50,
      attack: 60,
      defense: 60,
      sp_attack: 40,
      sp_defense: 45,
      speed: 60
    },
    description: "L'aspetto feroce va in netto constrasto con il suo animo mansueto e un'indomabile pigrizia"
  },
{
    id: 14,
    name: "venoclaw", // 👈 minuscolo
    types: ["acciaio", "veleno"],
    image: "images/venoclaw.jpeg", // 👈 minuscolo
    stats: {
      hp: 60,
      attack: 75,
      defense: 65,
      sp_attack: 50,
      sp_defense: 50,
      speed: 60
    },
    description: "Gli studi più recenti affermano che il veleno che permea su tutto il corpo venga prodotto unicamente dalla sua coda, a cui è stato dato un nome di donna"
  },
{
    id: 15,
    name: "toxydra", // 👈 minuscolo
    types: ["acciaio", "veleno"],
    image: "images/toxydra.jpeg", // 👈 minuscolo
    stats: {
      hp: 70,
      attack: 90,
      defense: 65,
      sp_attack: 70,
      sp_defense: 55,
      speed: 60
    },
    description: "Questo bestione è capace di triturare un masso con le fauci e sciogliere una lega metallica col suo veleno, ma basta lanciargli un pallone e rincoglionisce per ore intere giocandoci appresso"
  },
{
    id: 16,
    name: "frankenfin", // 👈 minuscolo
    types: ["acqua", "spettro"],
    image: "images/frankenfin.jpeg", // 👈 minuscolo
    stats: {
      hp: 50,
      attack: 50,
      defense: 50,
      sp_attack: 50,
      sp_defense: 50,
      speed: 50
    },
    description: "Non è uno squalo, non è un delfino, sa solo quello che non è"
  },
{
    id: 17,
    name: "phantofin", // 👈 minuscolo
    types: ["acqua", "spettro"],
    image: "images/phantofin.jpeg", // 👈 minuscolo
    stats: {
      hp: 60,
      attack: 60,
      defense: 60,
      sp_attack: 60,
      sp_defense: 60,
      speed: 60
    },
    description: "Utilizza il secondo paio di occhi per ottimizzare la vista periferica e non farsi cogliere impreparato da quei pochi predatori che osano attaccarlo"
  },
{
    id: 18,
    name: "werejaws", // 👈 minuscolo
    types: ["acqua", "spettro"],
    image: "images/werejaws.jpeg", // 👈 minuscolo
    stats: {
      hp: 70,
      attack: 75,
      defense: 70,
      sp_attack: 70,
      sp_defense: 70,
      speed: 70
    },
    description: "...Sharknado? Davvero??"
  },
{
    id: 19,
    name: "fatitì", // 👈 minuscolo
    types: ["coleottero", "folletto"],
    image: "images/fatitì.jpeg", // 👈 minuscolo
    stats: {
      hp: 40,
      attack: 5,
      defense: 50,
      sp_attack: 70,
      sp_defense: 60,
      speed: 75
    },
    description: "Miiiiiiiiii, Mi Mi Mi"
  },
{
    id: 20,
    name: "fatitelle", // 👈 minuscolo
    types: ["coleottero", "folletto"],
    image: "images/fatitelle.jpeg", // 👈 minuscolo
    stats: {
      hp: 50,
      attack: 5,
      defense: 50,
      sp_attack: 80,
      sp_defense: 60,
      speed: 90
    },
    description: "Oiiiiiiiiiii, Oi Oi Oi"
  },
{
    id: 21,
    name: "fatitoille", // 👈 minuscolo
    types: ["coleottero", "folletto"],
    image: "images/fatitoille.jpeg", // 👈 minuscolo
    stats: {
      hp: 55,
      attack: 5,
      defense: 55,
      sp_attack: 95,
      sp_defense: 65,
      speed: 95
    },
    description: "Goh Goh Goh"
  },
{
    id: 22,
    name: "restroc", // 👈 minuscolo
    types: ["roccia"],
    image: "images/restroc.jpeg", // 👈 minuscolo
    stats: {
      hp: 60,
      attack: 45,
      defense: 60,
      sp_attack: 25,
      sp_defense: 50,
      speed: 40
    },
    description: "Adora farsi i fatti suoi, e giocare col cristallo verde che tiene sempre con sé"
  },
{
    id: 23,
    name: "healquake", // 👈 minuscolo
    types: ["roccia", "erba"],
    image: "images/healquake.jpeg", // 👈 minuscolo
    stats: {
      hp: 80,
      attack: 60,
      defense: 70,
      sp_attack: 25,
      sp_defense: 50,
      speed: 45
    },
    description: "Quando gioca a nascondino tenta di sembrare un cespuglio accovacciandosi ma viene tradito sempre dalle corna di smeraldo, e dal fatto che sia fatto di rocce poco nascondibili"
  },
{
    id: 24,
    name: "richteryll", // 👈 minuscolo
    types: ["roccia", "erba"],
    image: "images/richteryll.jpeg", // 👈 minuscolo
    stats: {
      hp: 100,
      attack: 75,
      defense: 80,
      sp_attack: 25,
      sp_defense: 55,
      speed: 50
    },
    description: "Viene spesso braccato dai cacciatori intenti a vendere i costosissimi bonsai che gli crescono sulla schiena, ma non sono in molti a poter raccontare di esserci riusciti"
  },
{
    id: 25,
    name: "beawings", // 👈 minuscolo
    types: ["volante", "normale"],
    image: "images/beawings.jpeg", // 👈 minuscolo
    stats: {
      hp: 80,
      attack: 40,
      defense: 70,
      sp_attack: 40,
      sp_defense: 80,
      speed: 60
    },
    description: "Consegna approviggionamenti con lo stesso affetto di una mamma e dispensa saggi consigli con lo stesso savoir faire di un papà"
  },
{
    id: 26,
    name: "obsawk", // 👈 minuscolo
    types: ["volante", "buio"],
    image: "images/obsawk.jpeg", // 👈 minuscolo
    stats: {
      hp: 60,
      attack: 80,
      defense: 40,
      sp_attack: 70,
      sp_defense: 40,
      speed: 80
    },
    description: "Un beawings con la vergarite tira fuori il peggio di sé, tant'è che è lui stesso a beneficiare te lu mestulu te pasuli "
  },
];

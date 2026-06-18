// data.jsx — mock content for "Scouting De Wilgenroos"

// Speltak palette (real-world scouting age bands). Colors double as team colors
// for the white-label "sport club" case.
// comm: hoe loopt communicatie — 'ouders' (via ouder/verzorger), 'direct' (met lid), 'beide'
const SPELTAKKEN = [
  { id: 'bevers',  name: 'Bevers',      age: '5–7 jr',   color: '#d97f2e', comm: 'ouders', count: 12 },
  { id: 'welpen',  name: 'Welpen',      age: '7–11 jr',  color: '#caa12a', comm: 'ouders', count: 16 },
  { id: 'scouts',  name: 'Scouts',      age: '11–15 jr', color: '#2f8f5b', comm: 'beide',  count: 18 },
  { id: 'explo',   name: 'Explorers',   age: '15–18 jr', color: '#2f6bd0', comm: 'direct', count: 14 },
  { id: 'rovers',  name: 'Roverscouts', age: '18+ jr',   color: '#b0413e', comm: 'direct', count: 9 },
];

// Curated color palette for new/edited speltakken
const SPELTAK_COLORS = ['#d97f2e','#caa12a','#2f8f5b','#2f6bd0','#b0413e','#7a5bbd','#3b7ea1','#c25a36','#4a8d8d','#9a5d8a','#6b8e23','#bf5f82'];

const COMM_OPTS = {
  ouders: { label: 'Via ouders', short: 'Ouders', desc: 'Berichten & aanmeldingen lopen via de ouder/verzorger.' },
  direct: { label: 'Direct met lid', short: 'Direct', desc: 'Leden ontvangen zelf berichten en melden zichzelf aan.' },
  beide:  { label: 'Ouders én lid', short: 'Beide', desc: 'Zowel het lid als de ouder krijgen berichten.' },
};

// Team & rollen
const ROLES = {
  beheerder:   { label: 'Beheerder',   desc: 'Volledige toegang: instellingen, rollen, alle speltakken.', color: '#7a5bbd' },
  leiding:     { label: 'Leiding',     desc: 'Plant opkomsten en beheert de eigen speltak.',            color: '#2f5a3f' },
  hulpleiding: { label: 'Hulpleiding', desc: 'Streept aanwezigheid af en stuurt berichten.',            color: '#3b7ea1' },
};

const TEAM = [
  { id: 'u1', name: 'Tom Verheul',   role: 'beheerder',   speltak: 'welpen', email: 'tom@wilgenroos.nl',   avatar: '#7a5bbd', you: true },
  { id: 'u2', name: 'Lieke de Groot', role: 'leiding',     speltak: 'welpen', email: 'lieke@wilgenroos.nl', avatar: '#c25a36' },
  { id: 'u3', name: 'Sander Pauw',    role: 'leiding',     speltak: 'welpen', email: 'sander@wilgenroos.nl', avatar: '#2f8f5b' },
  { id: 'u4', name: 'Fenna Dijk',     role: 'hulpleiding', speltak: 'bevers', email: 'fenna@wilgenroos.nl',  avatar: '#caa12a' },
  { id: 'u5', name: 'Joost Maas',     role: 'leiding',     speltak: 'scouts', email: 'joost@wilgenroos.nl',  avatar: '#3b7ea1' },
];

const speltakById = (id) => SPELTAKKEN.find(s => s.id === id) || SPELTAKKEN[1];

// Leader is responsible for the Welpen.
const ACTIVE_SPELTAK = 'welpen';

const FIRST = ['Sara','Daan','Mila','Luuk','Noor','Tijn','Fleur','Sem','Liv','Bram','Yara','Finn','Loïs','Joep','Roos','Cas'];
const LAST = ['de Vries','Jansen','Bakker','Visser','Smit','Meijer','Mulder','de Boer','Kok','Bos'];

function makeMembers() {
  const palette = ['#3b7ea1','#c25a36','#7a5bbd','#2f8f5b','#d08a2e','#b0413e','#4a8d8d','#9a5d8a'];
  return FIRST.map((f, i) => {
    const id = 'm' + (i + 1);
    return {
      id,
      name: f + ' ' + LAST[i % LAST.length],
      first: f,
      speltak: 'welpen',
      avatar: palette[i % palette.length],
      parent: ['Anne','Mark','Esra','Peter','Lotte','Hans'][i % 6] + ' ' + LAST[i % LAST.length],
      phone: '06 ' + (10000000 + i * 1234567).toString().slice(0, 8).replace(/(\d{2})(\d{3})(\d{3})/, '$1 $2 $3'),
    };
  });
}
const MEMBERS = makeMembers();

// Attendance rate helper for member history
const ATTEND_RATE = {};
MEMBERS.forEach((m, i) => { ATTEND_RATE[m.id] = 70 + ((i * 7) % 30); });

// Build sign-up / attendance maps for an opkomst
function signupSeed(offset) {
  const map = {};
  MEMBERS.forEach((m, i) => {
    const v = (i + offset) % 5;
    map[m.id] = v < 3 ? 'yes' : v === 3 ? 'no' : 'pending';
  });
  return map;
}
function attendSeed(offset) {
  const map = {};
  MEMBERS.forEach((m, i) => {
    const v = (i + offset) % 6;
    map[m.id] = v < 4 ? 'present' : v === 4 ? 'absent' : 'unknown';
  });
  return map;
}

// dates relative to "now" = Thu 18 Jun 2026
const OPKOMSTEN = [
  {
    id: 'o1', title: 'Speurtocht door het bos', emoji: '🧭',
    speltak: 'welpen', date: '2026-06-20', start: '10:00', end: '12:30',
    location: 'Blokhut De Wilgenroos', address: 'Boslaan 12, Bilthoven',
    bring: ['Stevige schoenen', 'Regenjas', 'Gevulde drinkbeker'],
    program: [
      { t: '10:00', a: 'Opening & spelregels' },
      { t: '10:20', a: 'Speurtocht met opdrachten' },
      { t: '11:45', a: 'Limonade & afsluiting' },
    ],
    desc: 'We trekken het bos in met een speurtocht vol raadsels en natuuropdrachten. Kun jij alle sporen volgen?',
    signups: signupSeed(0), attendance: null, status: 'open',
  },
  {
    id: 'o2', title: 'Knutselen: vogelhuisjes', emoji: '🪵',
    speltak: 'welpen', date: '2026-06-27', start: '10:00', end: '12:30',
    location: 'Blokhut De Wilgenroos', address: 'Boslaan 12, Bilthoven',
    bring: ['Oude kleren', 'Eventueel eigen hamer'],
    program: [
      { t: '10:00', a: 'Opening' },
      { t: '10:15', a: 'Vogelhuisjes timmeren' },
      { t: '12:00', a: 'Opruimen & afsluiting' },
    ],
    desc: 'We bouwen echte vogelhuisjes van hout. Aan het eind mag iedereen er eentje mee naar huis nemen.',
    signups: signupSeed(2), attendance: null, status: 'open',
  },
  {
    id: 'o3', title: 'Zomerkamp-info & BBQ', emoji: '🔥',
    speltak: 'welpen', date: '2026-07-04', start: '17:00', end: '20:00',
    location: 'Blokhut De Wilgenroos', address: 'Boslaan 12, Bilthoven',
    bring: ['Goed humeur'],
    program: [
      { t: '17:00', a: 'Inloop ouders' },
      { t: '17:15', a: 'Presentatie zomerkamp' },
      { t: '18:00', a: 'BBQ' },
    ],
    desc: 'Afsluiting van het seizoen met een gezellige BBQ. We bespreken alle praktische info over het zomerkamp.',
    signups: signupSeed(1), attendance: null, status: 'open',
  },
  // past
  {
    id: 'o0', title: 'Pionieren met touw', emoji: '🪢',
    speltak: 'welpen', date: '2026-06-13', start: '10:00', end: '12:30',
    location: 'Blokhut De Wilgenroos', address: 'Boslaan 12, Bilthoven',
    bring: ['Stevige schoenen'],
    program: [{ t: '10:00', a: 'Knopen leren' }, { t: '11:00', a: 'Bouwwerk maken' }],
    desc: 'We leerden de belangrijkste knopen en bouwden samen een groot pionierbouwwerk.',
    signups: signupSeed(3), attendance: attendSeed(0), status: 'done',
  },
];

const MESSAGES = [
  {
    id: 't1', who: 'Esra Bakker', sub: 'ouder van Mila', avatar: '#c25a36',
    last: 'Mila is volgende week jarig, mag ze trakteren?', time: '9:24', unread: 2,
    thread: [
      { from: 'them', text: 'Hoi! Mila is zondag jarig 🎉 Mag ze iets uitdelen tijdens de opkomst?', time: '9:18' },
      { from: 'them', text: 'En kan het iets zonder noten zijn i.v.m. allergie van Sem?', time: '9:24' },
    ],
  },
  {
    id: 't2', who: 'Mark Jansen', sub: 'ouder van Daan', avatar: '#3b7ea1',
    last: 'Top, dan is Daan er zaterdag bij!', time: 'gisteren', unread: 0,
    thread: [
      { from: 'me', text: 'Hoi Mark, Daan staat nog op "misschien" voor zaterdag. Lukt het?', time: 'gisteren' },
      { from: 'them', text: 'Top, dan is Daan er zaterdag bij!', time: 'gisteren' },
    ],
  },
  {
    id: 't3', who: 'Welpen — ouders', sub: 'groepsbericht · 16 ontvangers', avatar: '#caa12a', group: true,
    last: 'Jij: Denk aan stevige schoenen voor de speurtocht!', time: 'ma', unread: 0,
    thread: [
      { from: 'me', text: 'Beste ouders, zaterdag gaan we het bos in. Denk aan stevige schoenen en een regenjas! 🌲', time: 'ma 19:02' },
    ],
  },
];

Object.assign(window, {
  SPELTAKKEN, SPELTAK_COLORS, COMM_OPTS, ROLES, TEAM,
  speltakById, ACTIVE_SPELTAK, MEMBERS, ATTEND_RATE, OPKOMSTEN, MESSAGES,
});

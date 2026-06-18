// theme.jsx — 3 visual directions + white-label vocabulary
// Each direction is a complete token set applied as CSS variables on a root wrapper.

const THEMES = {
  kampvuur: {
    key: 'kampvuur',
    label: 'Kampvuur',
    blurb: 'Warm, aards, avontuurlijk',
    fontDisplay: "'Zilla Slab', Georgia, serif",
    fontBody: "'Hanken Grotesk', system-ui, sans-serif",
    displayWeight: 600,
    vars: {
      '--bg': '#f4eee1',
      '--surface': '#fffdf7',
      '--surface-2': '#efe7d6',
      '--text': '#2c271f',
      '--muted': '#7c7264',
      '--faint': '#a89c89',
      '--line': '#e6dcc7',
      '--primary': '#2f5a3f',
      '--primary-ink': '#fbf8ef',
      '--primary-soft': '#e0e9e0',
      '--accent': '#c25a36',
      '--accent-soft': '#f4e0d4',
      '--radius': '15px',
      '--radius-sm': '10px',
      '--radius-lg': '22px',
      '--shadow': '0 1px 2px rgba(60,45,20,0.05), 0 8px 24px rgba(60,45,20,0.07)',
    },
  },
  helder: {
    key: 'helder',
    label: 'Helder',
    blurb: 'Clean, neutraal, white-label',
    fontDisplay: "'Space Grotesk', system-ui, sans-serif",
    fontBody: "'Hanken Grotesk', system-ui, sans-serif",
    displayWeight: 600,
    vars: {
      '--bg': '#f3f4f6',
      '--surface': '#ffffff',
      '--surface-2': '#eceef1',
      '--text': '#15181e',
      '--muted': '#697086',
      '--faint': '#a3a9b8',
      '--line': '#e6e8ed',
      '--primary': '#2f63d6',
      '--primary-ink': '#ffffff',
      '--primary-soft': '#e2ebfb',
      '--accent': '#1f9d6b',
      '--accent-soft': '#dcf2e8',
      '--radius': '12px',
      '--radius-sm': '9px',
      '--radius-lg': '18px',
      '--shadow': '0 1px 2px rgba(20,30,60,0.05), 0 8px 24px rgba(20,30,60,0.06)',
    },
  },
  speels: {
    key: 'speels',
    label: 'Speels',
    blurb: 'Vriendelijk, rond, kleurrijk',
    fontDisplay: "'Baloo 2', system-ui, sans-serif",
    fontBody: "'Nunito', system-ui, sans-serif",
    displayWeight: 700,
    vars: {
      '--bg': '#f6f2fb',
      '--surface': '#ffffff',
      '--surface-2': '#efe9f8',
      '--text': '#2b2540',
      '--muted': '#8780a0',
      '--faint': '#b4adc8',
      '--line': '#ece5f5',
      '--primary': '#6c49d6',
      '--primary-ink': '#ffffff',
      '--primary-soft': '#ece3fb',
      '--accent': '#f0566b',
      '--accent-soft': '#fde0e4',
      '--radius': '22px',
      '--radius-sm': '14px',
      '--radius-lg': '28px',
      '--shadow': '0 2px 4px rgba(70,40,130,0.05), 0 10px 30px rgba(70,40,130,0.09)',
    },
  },
};

// White-label vocabulary — proves the "any club" / management-layer idea.
const VOCAB = {
  scouting: {
    app: 'Scouting',
    event: 'Opkomst', eventLower: 'opkomst', events: 'Opkomsten',
    subgroup: 'Speltak', subgroups: 'Speltakken',
    members: 'Leden', member: 'Lid', leaders: 'Leiding',
    parent: 'Ouder/verzorger',
  },
  sport: {
    app: 'Club',
    event: 'Training', eventLower: 'training', events: 'Trainingen',
    subgroup: 'Team', subgroups: 'Teams',
    members: 'Spelers', member: 'Speler', leaders: 'Staf',
    parent: 'Ouder/verzorger',
  },
};

function applyTheme(themeKey) {
  const t = THEMES[themeKey] || THEMES.kampvuur;
  return {
    ...t.vars,
    fontFamily: t.fontBody,
    '--font-display': t.fontDisplay,
    '--font-body': t.fontBody,
    '--display-weight': t.displayWeight,
  };
}

Object.assign(window, { THEMES, VOCAB, applyTheme });

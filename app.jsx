// app.jsx — root: navigation stack, tab bar, theme + tweaks wiring

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "kampvuur",
  "vocab": "scouting",
  "accent": "#c25a36",
  "radiusScale": 1
}/*EDITMODE-END*/;

// ── device stage (scale-to-fit) ──────────────────────────────
function Stage({ children }) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const m = 24;
      setScale(Math.min((window.innerWidth - m) / 402, (window.innerHeight - m) / 874, 1.1));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1714', overflow: 'hidden' }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center', flexShrink: 0 }}>{children}</div>
    </div>
  );
}

// ── back header for pushed views ─────────────────────────────
function BackHeader({ title, onBack, accentBg }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '52px 14px 10px', flexShrink: 0, background: 'var(--bg)', borderBottom: '1px solid var(--line)' }}>
      <button onClick={onBack} style={{ all: 'unset', cursor: 'pointer', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-2)' }}>
        <Icon name="chevL" size={20} color="var(--text)" stroke={2.4} />
      </button>
      {title && <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{title}</div>}
    </div>
  );
}

// ── bottom tab bar ───────────────────────────────────────────
function TabBar({ active, onChange, V, unread }) {
  const tabs = [
    ['home', 'home', 'Start'],
    ['agenda', 'calendar', V.events],
    ['berichten', 'message', 'Berichten'],
    ['leden', 'users', V.members],
    ['meer', 'grid', 'Beheer'],
  ];
  return (
    <div style={{ flexShrink: 0, display: 'flex', padding: '8px 6px 22px', background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
      {tabs.map(([id, icon, label]) => {
        const on = active === id;
        return (
          <button key={id} onClick={() => onChange(id)} style={{ all: 'unset', cursor: 'pointer', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <Icon name={icon} size={23} color={on ? 'var(--primary)' : 'var(--faint)'} stroke={on ? 2.4 : 2} />
              {id === 'berichten' && unread > 0 && <span style={{ position: 'absolute', top: -3, right: -5, minWidth: 15, height: 15, padding: '0 3px', borderRadius: 999, background: 'var(--accent)', color: '#fff', fontSize: 9.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>{unread}</span>}
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: on ? 'var(--primary)' : 'var(--faint)', letterSpacing: 0.1 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── root app ─────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [tab, setTab] = useState('home');
  const [stack, setStack] = useState([]);

  // mock mutable state
  const [opkomsten, setOpkomsten] = useState(OPKOMSTEN);
  const [threads, setThreads] = useState(MESSAGES);
  const [, bump] = useState(0);
  const force = () => bump(n => n + 1);
  const [group, setGroup] = useState({ name: 'De Wilgenroos', place: 'Bilthoven', venue: 'Blokhut De Wilgenroos', emoji: '🏕️' });

  const V = VOCAB[t.vocab] || VOCAB.scouting;
  const unread = threads.reduce((n, x) => n + x.unread, 0);

  const push = (v) => {
    if (v.name === 'berichten-stack') { setTab('berichten'); setStack([]); return; }
    setStack(s => [...s, v]);
  };
  const pop = () => setStack(s => s.slice(0, -1));
  const switchTab = (id) => { setTab(id); setStack([]); };

  const setSignup = (oid, mid, val) => setOpkomsten(os => os.map(o => o.id === oid ? { ...o, signups: { ...o.signups, [mid]: val } } : o));
  const setAttend = (oid, mid, val) => setOpkomsten(os => os.map(o => o.id === oid ? { ...o, attendance: { ...(o.attendance || {}), [mid]: val } } : o));
  const sendMessage = (tid, text) => setThreads(ts => ts.map(x => x.id === tid ? { ...x, unread: 0, last: 'Jij: ' + text, time: 'nu', thread: [...x.thread, { from: 'me', text, time: 'nu' }] } : x));
  const addOpkomst = (f) => {
    const sigs = {}; MEMBERS.forEach(m => sigs[m.id] = 'pending');
    setOpkomsten(os => [...os, { ...f, id: 'n' + Date.now(), title: f.title || 'Nieuwe ' + V.eventLower, program: [{ t: f.start, a: 'Opening' }], address: 'Boslaan 12, Bilthoven', signups: sigs, attendance: null, status: 'open' }]);
    setTab('agenda');
  };

  // speltakken + team are mutated in place (so speltakById stays in sync everywhere); force re-render via bump
  const AVA = ['#7a5bbd', '#c25a36', '#2f8f5b', '#3b7ea1', '#caa12a', '#b0413e'];
  const addSpeltak = (d) => { SPELTAKKEN.push({ id: 's' + Date.now(), count: 0, ...d }); force(); };
  const updateSpeltak = (id, d) => { const i = SPELTAKKEN.findIndex(s => s.id === id); if (i >= 0) SPELTAKKEN[i] = { ...SPELTAKKEN[i], ...d }; force(); };
  const removeSpeltak = (id) => { const i = SPELTAKKEN.findIndex(s => s.id === id); if (i >= 0) SPELTAKKEN.splice(i, 1); force(); };
  const addTeam = (d) => { TEAM.push({ id: 'u' + Date.now(), avatar: AVA[TEAM.length % AVA.length], ...d }); force(); };
  const updateTeam = (id, d) => { const i = TEAM.findIndex(u => u.id === id); if (i >= 0) TEAM[i] = { ...TEAM[i], ...d }; force(); };
  const removeTeam = (id) => { const i = TEAM.findIndex(u => u.id === id); if (i >= 0) TEAM.splice(i, 1); force(); };
  const updateGroup = (d) => setGroup(g => ({ ...g, ...d }));

  const ctx = { V, vocabKey: t.vocab, setVocabKey: v => setTweak('vocab', v), opkomsten, threads, members: MEMBERS, speltakken: SPELTAKKEN, team: TEAM, group, push, pop, switchTab, setSignup, setAttend, sendMessage, addOpkomst, addSpeltak, updateSpeltak, removeSpeltak, addTeam, updateTeam, removeTeam, updateGroup };

  // theme vars
  const themeStyle = applyTheme(t.direction);
  const rs = t.radiusScale;
  ['--radius', '--radius-sm', '--radius-lg'].forEach(k => {
    const base = parseFloat(themeStyle[k]); themeStyle[k] = Math.round(base * rs) + 'px';
  });
  if (t.accent) {
    themeStyle['--accent'] = t.accent;
    themeStyle['--accent-soft'] = `color-mix(in oklab, ${t.accent} 16%, #fff)`;
  }

  const top = stack[stack.length - 1];
  const titleFor = (v) => ({ opkomst: V.event, plan: '', thread: '', lid: V.member, beheer: 'Beheer', speltakken: '', rollen: '', groep: '' }[v.name] || '');
  const isFill = top && top.name === 'thread';

  let body;
  if (top) {
    if (top.name === 'opkomst') body = <OpkomstDetail ctx={ctx} id={top.id} initialTab={top.tab} />;
    else if (top.name === 'plan') body = <PlanForm ctx={ctx} />;
    else if (top.name === 'thread') body = <Thread ctx={ctx} id={top.id} />;
    else if (top.name === 'lid') body = <LidDetail ctx={ctx} id={top.id} />;
    else if (top.name === 'beheer') body = <Beheer ctx={ctx} />;
    else if (top.name === 'speltakken') body = <SpeltakkenBeheer ctx={ctx} />;
    else if (top.name === 'rollen') body = <RollenBeheer ctx={ctx} />;
    else if (top.name === 'groep') body = <GroepProfiel ctx={ctx} />;
  } else {
    body = { home: <Dashboard ctx={ctx} />, agenda: <Agenda ctx={ctx} />, berichten: <Berichten ctx={ctx} />, leden: <Leden ctx={ctx} />, meer: <Beheer ctx={ctx} /> }[tab];
  }

  return (
    <Stage>
      <div style={{ ...themeStyle, fontFamily: 'var(--font-body)' }}>
        <IOSDevice>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)', color: 'var(--text)', overflow: 'hidden' }}>
            {top
              ? <BackHeader title={titleFor(top)} onBack={pop} />
              : <div style={{ height: 52, flexShrink: 0, background: 'var(--bg)' }} />}
            <div style={{ flex: 1, overflowY: isFill ? 'hidden' : 'auto', overflowX: 'hidden' }}>{body}</div>
            {!top && <TabBar active={tab} onChange={switchTab} V={V} unread={unread} />}
          </div>
        </IOSDevice>
      </div>

      <TweaksPanel>
        <TweakSection label="Visuele richting" />
        <TweakRadio label="Stijl" value={t.direction} options={[{ value: 'kampvuur', label: 'Kampvuur' }, { value: 'helder', label: 'Helder' }, { value: 'speels', label: 'Speels' }]} onChange={v => setTweak('direction', v)} />
        <TweakSection label="Organisatie (white-label)" />
        <TweakRadio label="Woordenschat" value={t.vocab} options={[{ value: 'scouting', label: 'Scouting' }, { value: 'sport', label: 'Sportclub' }]} onChange={v => setTweak('vocab', v)} />
        <TweakSection label="Vormgeving" />
        <TweakColor label="Accent" value={t.accent} options={['#c25a36', '#2f6bd0', '#2f8f5b', '#6c49d6', '#caa12a', '#d97f2e']} onChange={v => setTweak('accent', v)} />
        <TweakSlider label="Rondingen" value={t.radiusScale} min={0.3} max={1.6} step={0.1} onChange={v => setTweak('radiusScale', v)} />
      </TweaksPanel>
    </Stage>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

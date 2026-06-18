// wf-kit.jsx — low-fi sketchy wireframe primitives

// wonky hand-drawn border-radius presets (cycled so boxes don't look uniform)
const SK = [
  '14px 8px 12px 9px / 9px 13px 8px 14px',
  '9px 14px 8px 13px / 13px 8px 14px 9px',
  '12px 10px 14px 8px / 8px 14px 9px 13px',
];
let _sk = 0;
const skr = () => SK[_sk++ % SK.length];

function Box({ children, style, fill, accent, dashed, r, onPick }) {
  return (
    <div style={{
      border: `2px ${dashed ? 'dashed' : 'solid'} ${accent ? 'var(--wf-accent)' : 'var(--ink)'}`,
      borderRadius: r || skr(),
      background: fill ? 'var(--fillc)' : 'transparent',
      boxSizing: 'border-box',
      ...style,
    }}>{children}</div>
  );
}

// text placeholder bar(s)
function Bar({ w = '100%', h = 7, mt = 0, strong, style }) {
  return <div style={{ width: w, height: h, marginTop: mt, borderRadius: 4, background: strong ? 'var(--ink)' : 'var(--barc)', opacity: strong ? 0.78 : 1, ...style }} />;
}
function Lines({ n = 3, gap = 6, last = '60%', h = 6 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {Array.from({ length: n }).map((_, i) => <Bar key={i} h={h} w={i === n - 1 ? last : (85 + (i * 7) % 15) + '%'} />)}
    </div>
  );
}

function Circle({ s = 34, fill, accent, children, style }) {
  return <div style={{ width: s, height: s, borderRadius: '50%', border: `2px solid ${accent ? 'var(--wf-accent)' : 'var(--ink)'}`, background: fill ? 'var(--fillc)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: s * 0.42, ...style }}>{children}</div>;
}

function Pill({ children, accent, fill, w, style }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
      padding: '6px 12px', borderRadius: 999, width: w,
      border: `2px solid ${accent ? 'var(--wf-accent)' : 'var(--ink)'}`,
      background: fill ? (accent ? 'var(--wf-accent-soft)' : 'var(--fillc)') : 'transparent',
      color: 'var(--ink)', fontFamily: 'var(--hand)', fontSize: 13, whiteSpace: 'nowrap',
      ...style,
    }}>{children}</div>
  );
}

// hand-written label
function H({ children, s = 20, style }) {
  return <div style={{ fontFamily: 'var(--hand)', fontWeight: 700, fontSize: s, color: 'var(--ink)', lineHeight: 1.1, ...style }}>{children}</div>;
}
function T({ children, s = 13, dim, style }) {
  return <span style={{ fontFamily: 'var(--hand)', fontSize: s, color: 'var(--ink)', opacity: dim ? 0.55 : 1, ...style }}>{children}</span>;
}

// little glyph drawn from simple shapes (kept crude on purpose)
function Glyph({ k, s = 16 }) {
  const st = { width: s, height: s, display: 'block' };
  const p = { fill: 'none', stroke: 'var(--ink)', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const g = {
    home: <path d="M3 9l7-6 7 6v8a1 1 0 01-1 1h-4v-5H8v5H4a1 1 0 01-1-1z" {...p} />,
    cal: <g {...p}><rect x="3" y="4" width="14" height="13" rx="2" /><path d="M3 8h14M7 2v4M13 2v4" /></g>,
    msg: <path d="M3 4h14v9H8l-3 3v-3H3z" {...p} />,
    user: <g {...p}><circle cx="10" cy="7" r="3" /><path d="M4 17c0-3 2.5-5 6-5s6 2 6 5" /></g>,
    grid: <g {...p}><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="11" y="3" width="6" height="6" rx="1" /><rect x="3" y="11" width="6" height="6" rx="1" /><rect x="11" y="11" width="6" height="6" rx="1" /></g>,
    bell: <path d="M5 14V9a5 5 0 0110 0v5l1 2H4zM8 16a2 2 0 004 0" {...p} />,
    plus: <path d="M10 4v12M4 10h12" {...p} />,
    clock: <g {...p}><circle cx="10" cy="10" r="7" /><path d="M10 6v4l3 2" /></g>,
    pin: <g {...p}><path d="M10 18s6-5 6-9a6 6 0 10-12 0c0 4 6 9 6 9z" /><circle cx="10" cy="9" r="2" /></g>,
    check: <path d="M4 10l4 4 8-9" {...p} />,
    x: <path d="M5 5l10 10M15 5L5 15" {...p} />,
    chev: <path d="M8 4l6 6-6 6" {...p} />,
    chevL: <path d="M12 4l-6 6 6 6" {...p} />,
    send: <path d="M4 10L17 4l-4 13-3-6-6-1z" {...p} />,
    search: <g {...p}><circle cx="9" cy="9" r="5" /><path d="M16 16l-3-3" /></g>,
    eye: <g {...p}><path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" /><circle cx="10" cy="10" r="2.2" /></g>,
    edit: <path d="M4 16l1-3 8-8 2 2-8 8-3 1z" {...p} />,
    dots: <g fill="var(--ink)"><circle cx="5" cy="10" r="1.5" /><circle cx="10" cy="10" r="1.5" /><circle cx="15" cy="10" r="1.5" /></g>,
    bag: <g {...p}><path d="M5 7h10l-1 10H6zM8 7V5a2 2 0 014 0v2" /></g>,
    phone: <path d="M5 4h2l1 4-2 1a8 8 0 004 4l1-2 4 1v2a2 2 0 01-2 2A12 12 0 014 6a2 2 0 011-2z" {...p} />,
    paint: <g {...p}><path d="M5 9a5 5 0 1110 0c0 1.5-1 2-2 2h-1a1 1 0 00-.7 1.7c.3.4.4 1-.3 1.3A5 5 0 015 9z" /></g>,
    tag: <g {...p}><path d="M4 4h6l6 6-6 6-6-6z" /></g>,
  };
  return <svg viewBox="0 0 20 20" style={st}>{g[k] || g.dots}</svg>;
}

// annotation callout (hidden when notes off)
function Note({ children, top, left, right, bottom, w = 90, dir = 'left', show = true }) {
  if (!show) return null;
  const arrow = { left: '→', right: '←', up: '↓', down: '↑' }[dir] || '→';
  return (
    <div style={{ position: 'absolute', top, left, right, bottom, width: w, zIndex: 6, display: 'flex', gap: 3, alignItems: 'flex-start', pointerEvents: 'none' }}>
      {dir === 'right' && <span style={{ fontFamily: 'var(--hand)', color: 'var(--wf-accent)', fontSize: 15 }}>{arrow}</span>}
      <span style={{ fontFamily: 'var(--hand)', color: 'var(--wf-accent)', fontSize: 11.5, lineHeight: 1.15, transform: 'rotate(-1.5deg)' }}>{children}</span>
      {dir === 'left' && <span style={{ fontFamily: 'var(--hand)', color: 'var(--wf-accent)', fontSize: 15 }}>{arrow}</span>}
    </div>
  );
}

// row helper (icon-ish square + lines + trailing)
function ListRow({ lead, title, sub, trail, gap = 10, pb = 10, line = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap, paddingBottom: pb, marginBottom: pb, borderBottom: line ? '1.5px solid var(--linec)' : 'none' }}>
      {lead}
      <div style={{ flex: 1, minWidth: 0 }}>{title}{sub}</div>
      {trail}
    </div>
  );
}

// ── phone frame ──────────────────────────────────────────────
function Phone({ children, h = 640, w = 300, title }) {
  return (
    <div style={{ width: w, position: 'relative' }}>
      <div style={{
        width: w, height: h, border: '2.5px solid var(--ink)', borderRadius: 30,
        background: 'var(--paper)', position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: '3px 4px 0 rgba(40,38,34,0.13)',
      }}>
        {/* status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px 4px', flexShrink: 0 }}>
          <T s={12}>9:41</T>
          <div style={{ width: 50, height: 14, borderRadius: 9, border: '2px solid var(--ink)' }} />
          <div style={{ display: 'flex', gap: 3 }}>
            <Bar w={14} h={8} /><div style={{ width: 16, height: 9, border: '1.5px solid var(--ink)', borderRadius: 2 }} />
          </div>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>{children}</div>
      </div>
    </div>
  );
}

// bottom tab bar (sketchy)
function TabBar({ active = 0, V }) {
  const tabs = [['home', V.events ? 'Start' : 'Start'], ['cal', V.events], ['msg', 'Berichten'], ['user', V.members], ['grid', 'Beheer']];
  return (
    <div style={{ display: 'flex', borderTop: '2px solid var(--ink)', padding: '7px 4px 9px', flexShrink: 0, background: 'var(--paper)' }}>
      {tabs.map(([k, l], i) => (
        <div key={k} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, opacity: i === active ? 1 : 0.45 }}>
          <Glyph k={k} s={18} />
          <span style={{ fontFamily: 'var(--hand)', fontSize: 9.5, color: 'var(--ink)' }}>{l}</span>
          {i === active && <div style={{ width: 16, height: 3, background: 'var(--wf-accent)', borderRadius: 2 }} />}
        </div>
      ))}
    </div>
  );
}

// scroll-body padding wrapper
function Body({ children, p = '12px 14px', gap = 11 }) {
  return <div style={{ padding: p, display: 'flex', flexDirection: 'column', gap, flex: 1, minHeight: 0 }}>{children}</div>;
}

// back header
function Back({ title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px 8px', borderBottom: '1.5px solid var(--linec)', flexShrink: 0 }}>
      <Circle s={28}><Glyph k="chevL" s={15} /></Circle>
      {title && <H s={16}>{title}</H>}
    </div>
  );
}

Object.assign(window, { Box, Bar, Lines, Circle, Pill, H, T, Glyph, Note, ListRow, Phone, TabBar, Body, Back, skr });

// ui.jsx — icon set + shared primitives (all theme-aware via CSS vars)

function Icon({ name, size = 22, color = 'currentColor', stroke = 2 }) {
  const p = { fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home: <path d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-4v-6h-8v6H4a1 1 0 01-1-1z" {...p} />,
    calendar: <g {...p}><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 9h18M8 3v4M16 3v4"/></g>,
    message: <path d="M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1H9l-4 3v-3H4a1 1 0 01-1-1V6a1 1 0 011-1z" {...p} />,
    users: <g {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c0-3 2.4-5 5.5-5s5.5 2 5.5 5"/><path d="M16 5.2a3 3 0 010 5.8M17.5 20c0-2.4-1-3.8-2.2-4.6"/></g>,
    grid: <g {...p}><rect x="4" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6"/></g>,
    plus: <path d="M12 5v14M5 12h14" {...p} />,
    chevR: <path d="M9 5l7 7-7 7" {...p} />,
    chevL: <path d="M15 5l-7 7 7 7" {...p} />,
    chevD: <path d="M5 9l7 7 7-7" {...p} />,
    clock: <g {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></g>,
    pin: <g {...p}><path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></g>,
    check: <path d="M5 12.5l4.5 4.5L19 7" {...p} />,
    x: <path d="M6 6l12 12M18 6L6 18" {...p} />,
    bell: <path d="M6 16V11a6 6 0 1112 0v5l1.5 2.5h-15zM9.5 19a2.5 2.5 0 005 0" {...p} />,
    edit: <path d="M4 20l1-4L16 5l3 3L8 19zM14 7l3 3" {...p} />,
    send: <path d="M5 12L20 4l-4 16-4-7-7-1z" {...p} />,
    gear: <g {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2.5l1.4 2.2 2.5-.5.6 2.5 2.4 1-.6 2.5 1.6 2-1.6 2 .6 2.5-2.4 1-.6 2.5-2.5-.5L12 21.5l-1.4-2.2-2.5.5-.6-2.5-2.4-1 .6-2.5L4 12l1.6-2-.6-2.5 2.4-1 .6-2.5 2.5.5z"/></g>,
    camera: <g {...p}><path d="M3 8.5A1.5 1.5 0 014.5 7H7l1.5-2h7L17 7h2.5A1.5 1.5 0 0121 8.5V18a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 18z"/><circle cx="12" cy="12.5" r="3.2"/></g>,
    info: <g {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 7.8v.2"/></g>,
    bag: <g {...p}><path d="M5 8h14l-1 12H6zM8.5 8V6a3.5 3.5 0 017 0v2"/></g>,
    phone: <path d="M5 4h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" {...p} />,
    dots: <g fill={color}><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></g>,
    search: <g {...p}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-3.5-3.5"/></g>,
    sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" {...p} />,
    eye: <g {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></g>,
    paint: <g {...p}><path d="M5 11a7 7 0 1114 0c0 2-1.5 2.5-3 2.5h-1.5a1.5 1.5 0 00-1 2.6c.4.5.5 1.4-.5 1.9A7 7 0 015 11z"/><circle cx="8.5" cy="11" r="1"/><circle cx="12" cy="8" r="1"/><circle cx="15.5" cy="11" r="1"/></g>,
    tag: <g {...p}><path d="M4 4h7l9 9-7 7-9-9z"/><circle cx="8" cy="8" r="1.3"/></g>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>{paths[name]}</svg>;
}

function Avatar({ name, color, size = 40, ring }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: color,
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 700, flexShrink: 0, letterSpacing: 0.2,
      boxShadow: ring ? `0 0 0 3px ${ring}` : 'none',
      fontFamily: 'var(--font-body)',
    }}>{initials}</div>
  );
}

function Chip({ children, color, soft, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 999, fontSize: 12.5, fontWeight: 700,
      background: soft || 'var(--surface-2)', color: color || 'var(--muted)',
      letterSpacing: 0.1, whiteSpace: 'nowrap', ...style,
    }}>{children}</span>
  );
}

function SpeltakDot({ id, size = 9 }) {
  const s = speltakById(id);
  return <span style={{ width: size, height: size, borderRadius: '50%', background: s.color, display: 'inline-block', flexShrink: 0 }} />;
}

function Card({ children, style, onClick, pad = 16 }) {
  return (
    <div onClick={onClick} style={{
      background: 'var(--surface)', borderRadius: 'var(--radius)', padding: pad,
      boxShadow: 'var(--shadow)', border: '1px solid var(--line)',
      cursor: onClick ? 'pointer' : 'default', ...style,
    }}>{children}</div>
  );
}

function Btn({ children, onClick, variant = 'primary', size = 'md', icon, style, full }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    fontFamily: 'var(--font-body)', fontWeight: 700, cursor: 'pointer',
    border: 'none', borderRadius: 999, transition: 'transform .08s, filter .15s',
    width: full ? '100%' : undefined, whiteSpace: 'nowrap',
    fontSize: size === 'sm' ? 13.5 : 15.5,
    padding: size === 'sm' ? '8px 14px' : '12px 20px',
  };
  const variants = {
    primary: { background: 'var(--primary)', color: 'var(--primary-ink)' },
    accent: { background: 'var(--accent)', color: '#fff' },
    soft: { background: 'var(--primary-soft)', color: 'var(--primary)' },
    ghost: { background: 'transparent', color: 'var(--text)', border: '1.5px solid var(--line)' },
    danger: { background: 'var(--surface-2)', color: 'var(--accent)' },
  };
  return (
    <button onClick={onClick}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      style={{ ...base, ...variants[variant], ...style }}>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} stroke={2.2} />}
      {children}
    </button>
  );
}

// section header label
function Eyebrow({ children, style }) {
  return <div style={{
    fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase',
    color: 'var(--faint)', ...style,
  }}>{children}</div>;
}

// ── date / format helpers ───────────────────────────────────
const DOW = ['zo','ma','di','wo','do','vr','za'];
const DOW_LONG = ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'];
const MON = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];
const MON_LONG = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
function parseD(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
function fmtDay(s) { const d = parseD(s); return { dow: DOW[d.getDay()], dd: d.getDate(), mon: MON[d.getMonth()] }; }
function fmtLong(s) { const d = parseD(s); return `${DOW_LONG[d.getDay()]} ${d.getDate()} ${MON_LONG[d.getMonth()]}`; }
function relDay(s) {
  const now = new Date(2026, 5, 18); const d = parseD(s);
  const diff = Math.round((d - now) / 864e5);
  if (diff === 0) return 'Vandaag'; if (diff === 1) return 'Morgen';
  if (diff > 1 && diff < 7) return 'Over ' + diff + ' dagen';
  if (diff < 0) return Math.abs(diff) + ' dagen geleden';
  return fmtLong(s);
}

function ProgressBar({ value, max, color }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ height: 7, borderRadius: 99, background: 'var(--surface-2)', overflow: 'hidden' }}>
      <div style={{ width: pct + '%', height: '100%', background: color || 'var(--primary)', borderRadius: 99, transition: 'width .4s' }} />
    </div>
  );
}

// date block (day-of-week + number) used in agenda rows
function DateBlock({ date, color }) {
  const f = fmtDay(date);
  return (
    <div style={{
      width: 50, height: 56, borderRadius: 'var(--radius-sm)', flexShrink: 0,
      background: 'var(--surface-2)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', lineHeight: 1,
    }}>
      <span style={{ fontSize: 11, fontWeight: 800, color: color || 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{f.dow}</span>
      <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', fontFamily: 'var(--font-display)' }}>{f.dd}</span>
      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--faint)', textTransform: 'uppercase' }}>{f.mon}</span>
    </div>
  );
}

function Display({ children, size = 28, style }) {
  return <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)', fontSize: size, color: 'var(--text)', letterSpacing: -0.2, lineHeight: 1.1, ...style }}>{children}</div>;
}

Object.assign(window, {
  Icon, Avatar, Chip, SpeltakDot, Card, Btn, Eyebrow,
  fmtDay, fmtLong, relDay, ProgressBar, DateBlock, Display,
  DOW, MON, MON_LONG,
});

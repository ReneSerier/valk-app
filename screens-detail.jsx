// screens-detail.jsx — Opkomst detail (Info / Aanmeldingen / Aanwezigheid) + lid-weergave

function OpkomstDetail({ ctx, id, initialTab }) {
  const { V, opkomsten, members, setSignup, setAttend } = ctx;
  const o = opkomsten.find(x => x.id === id);
  const [tab, setTab] = React.useState(initialTab || 'info');
  const [preview, setPreview] = React.useState(false);
  if (!o) return null;
  const sp = speltakById(o.speltak);
  const c = signupCounts(o);

  return (
    <div style={{ paddingBottom: 28 }}>
      {/* hero */}
      <div style={{ background: 'var(--primary)', color: 'var(--primary-ink)', padding: '6px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Chip soft="rgba(255,255,255,0.18)" color="var(--primary-ink)"><SpeltakDotW />{sp.name}</Chip>
          <span style={{ fontSize: 40, lineHeight: 1 }}>{o.emoji}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)', fontSize: 27, marginTop: 8, lineHeight: 1.12 }}>{o.title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 14, fontSize: 14, fontWeight: 600 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 9, opacity: 0.95 }}><Icon name="calendar" size={16} />{fmtLong(o.date)} · <span style={{ opacity: 0.85 }}>{relDay(o.date)}</span></span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 9, opacity: 0.95 }}><Icon name="clock" size={16} />{o.start}–{o.end}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 9, opacity: 0.95 }}><Icon name="pin" size={16} />{o.location} · {o.address}</span>
        </div>
      </div>

      {/* sub tabs */}
      <div style={{ display: 'flex', gap: 4, padding: '12px 16px 0', background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 4, borderBottom: '1px solid var(--line)' }}>
        {[['info', 'Info'], ['aanmeldingen', `Aanmeldingen`], ['aanwezigheid', 'Aanwezigheid']].map(([v, l]) => (
          <button key={v} onClick={() => setTab(v)} style={{ all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center', padding: '10px 0 12px', fontSize: 13.5, fontWeight: 700, color: tab === v ? 'var(--primary)' : 'var(--muted)', borderBottom: tab === v ? '2.5px solid var(--primary)' : '2.5px solid transparent' }}>{l}</button>
        ))}
      </div>

      <div style={{ padding: '18px' }}>
        {tab === 'info' && <InfoTab o={o} onPreview={() => setPreview(true)} V={V} />}
        {tab === 'aanmeldingen' && <SignupTab o={o} members={members} setSignup={setSignup} c={c} />}
        {tab === 'aanwezigheid' && <AttendTab o={o} members={members} setAttend={setAttend} />}
      </div>

      {preview && <MemberPreview o={o} onClose={() => setPreview(false)} V={V} />}
    </div>
  );
}
function SpeltakDotW() { return <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />; }

function InfoTab({ o, onPreview, V }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Card>
        <Eyebrow style={{ marginBottom: 12 }}>Programma</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {o.program.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: i < o.program.length - 1 ? 14 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', border: '2.5px solid var(--primary)', background: 'var(--surface)', flexShrink: 0, marginTop: 3 }} />
                {i < o.program.length - 1 && <span style={{ width: 2, flex: 1, background: 'var(--line)', marginTop: 2 }} />}
              </div>
              <div style={{ marginTop: -1 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)', fontVariantNumeric: 'tabular-nums' }}>{p.t}</div>
                <div style={{ fontSize: 14.5, color: 'var(--text)' }}>{p.a}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <Eyebrow style={{ marginBottom: 12 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="bag" size={15} color="var(--faint)" />Wat meenemen</span></Eyebrow>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {o.bring.map((b, i) => <Chip key={i} style={{ fontSize: 13.5, padding: '7px 13px' }}>{b}</Chip>)}
        </div>
      </Card>

      <div>
        <Eyebrow style={{ marginBottom: 8 }}>Beschrijving</Eyebrow>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--text)', textWrap: 'pretty' }}>{o.desc}</p>
      </div>

      <button onClick={onPreview} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 'var(--radius)', border: '1.5px dashed var(--line)', background: 'var(--surface)' }}>
        <Icon name="eye" size={20} color="var(--primary)" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>Bekijk als {V.member.toLowerCase()}</div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>Zo ziet een {V.member.toLowerCase()} deze {V.eventLower}</div>
        </div>
        <Icon name="chevR" size={18} color="var(--faint)" />
      </button>
    </div>
  );
}

// ── Aanmeldingen ─────────────────────────────────────────────
const STATES = { yes: { label: 'Aangemeld', color: 'var(--primary)' }, no: { label: 'Afgemeld', color: 'var(--accent)' }, pending: { label: 'Open', color: 'var(--faint)' } };
function SignupTab({ o, members, setSignup, c }) {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9, marginBottom: 16 }}>
        <CountPill n={c.yes} label="aangemeld" color="var(--primary)" />
        <CountPill n={c.no} label="afgemeld" color="var(--accent)" />
        <CountPill n={c.pending} label="open" color="var(--faint)" />
      </div>
      {c.pending > 0 && <Btn variant="soft" full icon="bell" style={{ marginBottom: 16 }}>Herinnering naar {c.pending} ouders</Btn>}
      <Card pad={0}>
        {members.map((m, i) => {
          const st = o.signups[m.id] || 'pending';
          return (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
              <Avatar name={m.name} color={m.avatar} size={38} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>{m.first}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{m.name.split(' ').slice(1).join(' ')}</div>
              </div>
              <Seg3 value={st} onChange={v => setSignup(o.id, m.id, v)} />
            </div>
          );
        })}
      </Card>
    </div>
  );
}
function CountPill({ n, label, color }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: '11px 8px', textAlign: 'center', boxShadow: 'var(--shadow)' }}>
      <div style={{ fontSize: 24, fontWeight: 800, color, fontFamily: 'var(--font-display)', lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, marginTop: 3 }}>{label}</div>
    </div>
  );
}
function Seg3({ value, onChange }) {
  const opts = [['yes', 'check'], ['pending', 'dots'], ['no', 'x']];
  const colors = { yes: 'var(--primary)', no: 'var(--accent)', pending: 'var(--faint)' };
  return (
    <div style={{ display: 'flex', gap: 3, background: 'var(--surface-2)', borderRadius: 999, padding: 3 }}>
      {opts.map(([v, ic]) => (
        <button key={v} onClick={() => onChange(v)} style={{ all: 'unset', cursor: 'pointer', width: 32, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, background: value === v ? 'var(--surface)' : 'transparent', boxShadow: value === v ? '0 1px 2px rgba(0,0,0,0.1)' : 'none' }}>
          <Icon name={ic} size={16} stroke={2.6} color={value === v ? colors[v] : 'var(--faint)'} />
        </button>
      ))}
    </div>
  );
}

// ── Aanwezigheid ─────────────────────────────────────────────
function AttendTab({ o, members, setAttend }) {
  const att = o.attendance || {};
  const present = Object.values(att).filter(x => x === 'present').length;
  const future = o.status !== 'done';
  return (
    <div>
      {future && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '11px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--accent-soft)', marginBottom: 14 }}>
          <Icon name="info" size={18} color="var(--accent)" />
          <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>Deze opkomst is nog niet geweest — je kunt alvast vooraf afstrepen.</span>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, padding: '0 2px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{present} van {members.length} aanwezig</div>
        <Btn size="sm" variant="ghost" icon="check" onClick={() => members.forEach(m => setAttend(o.id, m.id, 'present'))}>Allemaal</Btn>
      </div>
      <Card pad={0}>
        {members.map((m, i) => {
          const st = att[m.id] || 'unknown';
          return (
            <button key={m.id} onClick={() => setAttend(o.id, m.id, st === 'present' ? 'absent' : 'present')} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderTop: i ? '1px solid var(--line)' : 'none', width: '100%', boxSizing: 'border-box' }}>
              <Avatar name={m.name} color={st === 'absent' ? 'var(--faint)' : m.avatar} size={38} />
              <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: st === 'absent' ? 'var(--muted)' : 'var(--text)', textDecoration: st === 'absent' ? 'line-through' : 'none' }}>{m.first} {m.name.split(' ').slice(1).join(' ')}</div>
              <CheckBox state={st} />
            </button>
          );
        })}
      </Card>
    </div>
  );
}
function CheckBox({ state }) {
  const on = state === 'present';
  return (
    <span style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: on ? 'var(--primary)' : 'transparent', border: on ? 'none' : `2px solid ${state === 'absent' ? 'var(--line)' : 'var(--faint)'}` }}>
      {on && <Icon name="check" size={16} stroke={3} color="var(--primary-ink)" />}
    </span>
  );
}

// ── Lid-weergave (member preview) ────────────────────────────
function MemberPreview({ o, onClose, V }) {
  const [status, setStatus] = React.useState('pending');
  const sp = speltakById(o.speltak);
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(20,15,10,0.45)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg)', borderTopLeftRadius: 26, borderTopRightRadius: 26, maxHeight: '92%', overflow: 'auto', paddingBottom: 24 }}>
        <div style={{ position: 'sticky', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px 10px', background: 'var(--bg)', zIndex: 2 }}>
          <Chip color="var(--accent)" soft="var(--accent-soft)"><Icon name="eye" size={14} />Weergave als {V.member.toLowerCase()}</Chip>
          <button onClick={onClose} style={{ all: 'unset', cursor: 'pointer', width: 34, height: 34, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={18} color="var(--muted)" /></button>
        </div>
        <div style={{ padding: '0 18px' }}>
          {/* the simplified member card */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow)', border: '1px solid var(--line)' }}>
            <div style={{ height: 120, background: `linear-gradient(135deg, ${sp.color}, color-mix(in oklab, ${sp.color} 60%, #000 20%))`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 56 }}>{o.emoji}</span>
            </div>
            <div style={{ background: 'var(--surface)', padding: 20 }}>
              <Display size={24}>{o.title}</Display>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 16 }}>
                <InfoLine icon="calendar" main={fmtLong(o.date)} sub={relDay(o.date)} />
                <InfoLine icon="clock" main={`${o.start} – ${o.end}`} />
                <InfoLine icon="pin" main={o.location} sub={o.address} />
              </div>
              <div style={{ height: 1, background: 'var(--line)', margin: '18px 0' }} />
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--muted)', marginBottom: 9, display: 'flex', alignItems: 'center', gap: 7 }}><Icon name="bag" size={16} color="var(--faint)" />Wat neem je mee?</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {o.bring.map((b, i) => <Chip key={i} style={{ fontSize: 13.5, padding: '7px 13px' }}>{b}</Chip>)}
              </div>
            </div>
          </div>

          {/* aan/afmelden */}
          <div style={{ marginTop: 16, background: 'var(--surface)', borderRadius: 'var(--radius)', border: '1px solid var(--line)', padding: 16, boxShadow: 'var(--shadow)' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12, textAlign: 'center' }}>
              {status === 'yes' ? '✅ Je bent aangemeld!' : status === 'no' ? 'Je hebt je afgemeld' : 'Ben je erbij?'}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn full variant={status === 'no' ? 'danger' : 'ghost'} onClick={() => setStatus('no')} icon="x">Afmelden</Btn>
              <Btn full variant={status === 'yes' ? 'primary' : 'soft'} onClick={() => setStatus('yes')} icon="check">Aanmelden</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function InfoLine({ icon, main, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={icon} size={18} color="var(--primary)" /></div>
      <div><div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>{main}</div>{sub && <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{sub}</div>}</div>
    </div>
  );
}

Object.assign(window, { OpkomstDetail });

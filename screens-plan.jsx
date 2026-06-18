// screens-plan.jsx — Dashboard, Agenda, PlanForm

function signupCounts(o) {
  const v = Object.values(o.signups || {});
  return {
    yes: v.filter(x => x === 'yes').length,
    no: v.filter(x => x === 'no').length,
    pending: v.filter(x => x === 'pending').length,
    total: v.length,
  };
}

// ── Dashboard ────────────────────────────────────────────────
function Dashboard({ ctx }) {
  const { V, opkomsten, threads, push } = ctx;
  const sp = speltakById(ACTIVE_SPELTAK);
  const upcoming = opkomsten.filter(o => o.status !== 'done').sort((a, b) => a.date < b.date ? -1 : 1);
  const next = upcoming[0];
  const c = next ? signupCounts(next) : null;
  const unread = threads.reduce((n, t) => n + t.unread, 0);
  const pending = upcoming.reduce((n, o) => n + signupCounts(o).pending, 0);

  return (
    <div style={{ padding: '8px 18px 28px' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 600 }}>Hallo Tom 👋</div>
          <button onClick={() => push({ name: 'beheer' })} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
            <SpeltakDot id={sp.id} size={12} />
            <Display size={26}>{sp.name}</Display>
            <Icon name="chevD" size={18} color="var(--faint)" />
          </button>
        </div>
        <button onClick={() => push({ name: 'berichten-stack' })} style={{ all: 'unset', cursor: 'pointer', position: 'relative', width: 44, height: 44, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)' }}>
          <Icon name="bell" size={21} color="var(--text)" />
          {unread > 0 && <span style={{ position: 'absolute', top: 8, right: 9, width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', border: '2px solid var(--surface)' }} />}
        </button>
      </div>

      {/* next opkomst hero */}
      {next && (
        <Card onClick={() => push({ name: 'opkomst', id: next.id })} pad={0} style={{ overflow: 'hidden', marginBottom: 14 }}>
          <div style={{ padding: '16px 16px 14px', background: 'var(--primary)', color: 'var(--primary-ink)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Chip soft="rgba(255,255,255,0.18)" color="var(--primary-ink)">{relDay(next.date)}</Chip>
              <span style={{ fontSize: 30, lineHeight: 1 }}>{next.emoji}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)', fontSize: 23, marginTop: 10, lineHeight: 1.15 }}>{next.title}</div>
            <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 13.5, opacity: 0.92, fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="clock" size={15} />{next.start}–{next.end}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="pin" size={15} />{next.location}</span>
            </div>
          </div>
          <div style={{ padding: '13px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 7 }}>
              <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Aangemeld</span>
              <span style={{ color: 'var(--text)', fontWeight: 800 }}>{c.yes} van {c.total}{c.pending ? ` · ${c.pending} open` : ''}</span>
            </div>
            <ProgressBar value={c.yes} max={c.total} />
          </div>
        </Card>
      )}

      {/* quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 18 }}>
        <StatCard n={pending} label="open aanmeldingen" icon="tag" onClick={() => push({ name: 'opkomst', id: next.id, tab: 'aanmeldingen' })} />
        <StatCard n={unread} label="nieuwe berichten" icon="message" accent onClick={() => ctx.switchTab('berichten')} />
        <StatCard n={ctx.members.length} label={V.members.toLowerCase()} icon="users" onClick={() => ctx.switchTab('leden')} />
      </div>

      {/* quick actions */}
      <Eyebrow style={{ marginBottom: 10 }}>Snel regelen</Eyebrow>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        <ActionRow icon="plus" label={`${V.event} plannen`} sub={`Nieuwe ${V.eventLower} in de agenda`} onClick={() => push({ name: 'plan' })} />
        <ActionRow icon="send" label="Bericht naar ouders" sub="Stuur een groepsbericht" onClick={() => push({ name: 'thread', id: 't3' })} />
        <ActionRow icon="check" label="Aanwezigheid afstrepen" sub="Wie was er bij de laatste keer" onClick={() => push({ name: 'opkomst', id: 'o0', tab: 'aanwezigheid' })} />
      </div>

      {/* activity */}
      <Eyebrow style={{ marginBottom: 10 }}>Recent</Eyebrow>
      <Card pad={0}>
        <FeedRow color={sp.color} title="Mila de Vries meldde zich aan" sub="Speurtocht door het bos" time="9u" />
        <FeedRow color="var(--accent)" title="Nieuw bericht van Esra Bakker" sub="ouder van Mila" time="9u" line />
        <FeedRow color="var(--primary)" title="Daan Jansen meldde zich af" sub="Knutselen: vogelhuisjes" time="gisteren" line />
      </Card>
    </div>
  );
}

function StatCard({ n, label, icon, accent, onClick }) {
  return (
    <button onClick={onClick} style={{ all: 'unset', cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '13px 12px', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: 6, minHeight: 92, boxSizing: 'border-box' }}>
      <Icon name={icon} size={19} color={accent ? 'var(--accent)' : 'var(--primary)'} />
      <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text)', lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 11.5, color: 'var(--muted)', fontWeight: 600, lineHeight: 1.15 }}>{label}</div>
    </button>
  );
}

function ActionRow({ icon, label, sub, onClick }) {
  return (
    <button onClick={onClick} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 13, padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', boxSizing: 'border-box' }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={icon} size={19} color="var(--primary)" stroke={2.3} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{label}</div>
        <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{sub}</div>
      </div>
      <Icon name="chevR" size={18} color="var(--faint)" />
    </button>
  );
}

function FeedRow({ color, title, sub, time, line }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: line ? '1px solid var(--line)' : 'none' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{sub}</div>
      </div>
      <span style={{ fontSize: 12, color: 'var(--faint)', fontWeight: 600 }}>{time}</span>
    </div>
  );
}

// ── Agenda ───────────────────────────────────────────────────
function Agenda({ ctx }) {
  const { V, opkomsten, push } = ctx;
  const [seg, setSeg] = React.useState('komend');
  const list = opkomsten
    .filter(o => seg === 'komend' ? o.status !== 'done' : o.status === 'done')
    .sort((a, b) => (a.date < b.date ? -1 : 1) * (seg === 'komend' ? 1 : -1));

  return (
    <div style={{ padding: '8px 18px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <Display size={30}>{V.events}</Display>
        <Btn size="sm" icon="plus" onClick={() => push({ name: 'plan' })}>Plannen</Btn>
      </div>

      <Segmented value={seg} onChange={setSeg} options={[['komend', 'Komend'], ['geweest', 'Geweest']]} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 16 }}>
        {list.map(o => {
          const c = signupCounts(o);
          const sp = speltakById(o.speltak);
          return (
            <Card key={o.id} onClick={() => push({ name: 'opkomst', id: o.id })} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <DateBlock date={o.date} color={sp.color} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: 18 }}>{o.emoji}</span>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.title}</div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 5, fontSize: 12.5, color: 'var(--muted)', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="clock" size={13} />{o.start}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><Icon name="pin" size={13} />{o.location}</span>
                </div>
                <div style={{ marginTop: 9 }}>
                  {o.status === 'done'
                    ? <Chip color="var(--primary)" soft="var(--primary-soft)"><Icon name="check" size={13} stroke={2.6} />Afgerond</Chip>
                    : <span style={{ fontSize: 12.5, fontWeight: 700, color: c.pending ? 'var(--accent)' : 'var(--muted)' }}>{c.yes}/{c.total} aangemeld{c.pending ? ` · ${c.pending} open` : ''}</span>}
                </div>
              </div>
              <Icon name="chevR" size={18} color="var(--faint)" />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Segmented({ value, onChange, options }) {
  return (
    <div style={{ display: 'flex', background: 'var(--surface-2)', borderRadius: 999, padding: 4, gap: 4 }}>
      {options.map(([v, l]) => (
        <button key={v} onClick={() => onChange(v)} style={{
          all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center', padding: '8px 0',
          borderRadius: 999, fontSize: 14, fontWeight: 700,
          color: value === v ? 'var(--text)' : 'var(--muted)',
          background: value === v ? 'var(--surface)' : 'transparent',
          boxShadow: value === v ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
        }}>{l}</button>
      ))}
    </div>
  );
}

// ── Plan form ────────────────────────────────────────────────
const EMOJIS = ['🧭','🪵','🔥','🏕️','🎨','⚽','🥾','🧩','🌲','🛶','🎯','🍳'];
function PlanForm({ ctx }) {
  const { V, pop, addOpkomst } = ctx;
  const [f, setF] = React.useState({ title: '', emoji: '🏕️', speltak: ACTIVE_SPELTAK, date: '2026-07-11', start: '10:00', end: '12:30', location: 'Blokhut De Wilgenroos', desc: '', bring: ['Stevige schoenen'] });
  const [bringInput, setBringInput] = React.useState('');
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));

  return (
    <div style={{ padding: '4px 18px 40px' }}>
      <Display size={26} style={{ marginBottom: 18 }}>Nieuwe {V.eventLower}</Display>

      <Field label="Titel">
        <Inp value={f.title} onChange={e => set('title', e.target.value)} placeholder="bv. Speurtocht door het bos" />
      </Field>

      <Field label="Icoon">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {EMOJIS.map(e => (
            <button key={e} onClick={() => set('emoji', e)} style={{ all: 'unset', cursor: 'pointer', width: 42, height: 42, borderRadius: 12, fontSize: 21, display: 'flex', alignItems: 'center', justifyContent: 'center', background: f.emoji === e ? 'var(--primary-soft)' : 'var(--surface)', border: f.emoji === e ? '2px solid var(--primary)' : '1px solid var(--line)', boxSizing: 'border-box' }}>{e}</button>
          ))}
        </div>
      </Field>

      <Field label={V.subgroup}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SPELTAKKEN.map(s => (
            <button key={s.id} onClick={() => set('speltak', s.id)} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, padding: '8px 13px', borderRadius: 999, fontSize: 13.5, fontWeight: 700, color: f.speltak === s.id ? '#fff' : 'var(--text)', background: f.speltak === s.id ? s.color : 'var(--surface)', border: '1px solid var(--line)' }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: f.speltak === s.id ? '#fff' : s.color }} />{s.name}
            </button>
          ))}
        </div>
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
        <Field label="Datum"><Inp type="date" value={f.date} onChange={e => set('date', e.target.value)} /></Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Begintijd"><Inp type="time" value={f.start} onChange={e => set('start', e.target.value)} /></Field>
          <Field label="Eindtijd"><Inp type="time" value={f.end} onChange={e => set('end', e.target.value)} /></Field>
        </div>
      </div>

      <Field label="Locatie"><Inp value={f.location} onChange={e => set('location', e.target.value)} /></Field>

      <Field label="Wat meenemen">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 8 }}>
          {f.bring.map((b, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 8px 6px 12px', borderRadius: 999, background: 'var(--surface-2)', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
              {b}<button onClick={() => set('bring', f.bring.filter((_, j) => j !== i))} style={{ all: 'unset', cursor: 'pointer', display: 'flex' }}><Icon name="x" size={14} color="var(--muted)" /></button>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Inp value={bringInput} onChange={e => setBringInput(e.target.value)} placeholder="Voeg item toe…" onKeyDown={e => { if (e.key === 'Enter' && bringInput.trim()) { set('bring', [...f.bring, bringInput.trim()]); setBringInput(''); } }} />
          <Btn variant="soft" onClick={() => { if (bringInput.trim()) { set('bring', [...f.bring, bringInput.trim()]); setBringInput(''); } }}>Toevoegen</Btn>
        </div>
      </Field>

      <Field label="Beschrijving">
        <textarea value={f.desc} onChange={e => set('desc', e.target.value)} placeholder="Vertel leden wat ze kunnen verwachten…" rows={3} style={inpStyle} />
      </Field>

      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <Btn variant="ghost" full onClick={pop}>Annuleren</Btn>
        <Btn full onClick={() => { addOpkomst(f); pop(); }}>Opslaan & publiceren</Btn>
      </div>
    </div>
  );
}

const inpStyle = {
  width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)',
  fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical',
};
function Inp(props) { return <input {...props} style={{ ...inpStyle, ...(props.style || {}) }} />; }
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 7 }}>{label}</div>
      {children}
    </div>
  );
}

Object.assign(window, { Dashboard, Agenda, PlanForm, Segmented, signupCounts });

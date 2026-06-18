// screens-people.jsx — Berichten, Leden, Beheer (white-label management layer)

// ── Berichten list ───────────────────────────────────────────
function Berichten({ ctx }) {
  const { threads, push } = ctx;
  return (
    <div style={{ padding: '8px 18px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <Display size={30}>Berichten</Display>
        <Btn size="sm" icon="send" onClick={() => push({ name: 'thread', id: 't3' })}>Groep</Btn>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 14px', background: 'var(--surface-2)', borderRadius: 999, marginBottom: 16 }}>
        <Icon name="search" size={18} color="var(--faint)" />
        <span style={{ fontSize: 14.5, color: 'var(--faint)' }}>Zoek in gesprekken</span>
      </div>
      <Card pad={0}>
        {threads.map((t, i) => (
          <button key={t.id} onClick={() => push({ name: 'thread', id: t.id })} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 13, padding: '13px 15px', borderTop: i ? '1px solid var(--line)' : 'none', width: '100%', boxSizing: 'border-box' }}>
            {t.group
              ? <div style={{ width: 46, height: 46, borderRadius: '50%', background: t.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="users" size={22} color="#fff" /></div>
              : <Avatar name={t.who} color={t.avatar} size={46} />}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.who}</span>
                <span style={{ fontSize: 12, color: 'var(--faint)', fontWeight: 600, flexShrink: 0 }}>{t.time}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <span style={{ fontSize: 13.5, color: t.unread ? 'var(--text)' : 'var(--muted)', fontWeight: t.unread ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.last}</span>
                {t.unread > 0 && <span style={{ flexShrink: 0, minWidth: 19, height: 19, padding: '0 5px', borderRadius: 999, background: 'var(--accent)', color: '#fff', fontSize: 11.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>{t.unread}</span>}
              </div>
            </div>
          </button>
        ))}
      </Card>
    </div>
  );
}

// ── Thread ───────────────────────────────────────────────────
function Thread({ ctx, id }) {
  const { threads, sendMessage } = ctx;
  const t = threads.find(x => x.id === id);
  const [text, setText] = React.useState('');
  const endRef = React.useRef(null);
  React.useEffect(() => { if (endRef.current) endRef.current.scrollTop = endRef.current.scrollHeight; }, [t && t.thread.length]);
  if (!t) return null;
  const send = () => { if (text.trim()) { sendMessage(t.id, text.trim()); setText(''); } };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 18px 14px', borderBottom: '1px solid var(--line)' }}>
        {t.group
          ? <div style={{ width: 42, height: 42, borderRadius: '50%', background: t.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="users" size={20} color="#fff" /></div>
          : <Avatar name={t.who} color={t.avatar} size={42} />}
        <div><div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{t.who}</div><div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{t.sub}</div></div>
      </div>

      <div ref={endRef} style={{ flex: 1, overflow: 'auto', padding: '18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {t.thread.map((m, i) => (
          <div key={i} style={{ alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start', maxWidth: '78%' }}>
            <div style={{ padding: '10px 14px', borderRadius: 18, fontSize: 14.5, lineHeight: 1.4, background: m.from === 'me' ? 'var(--primary)' : 'var(--surface)', color: m.from === 'me' ? 'var(--primary-ink)' : 'var(--text)', border: m.from === 'me' ? 'none' : '1px solid var(--line)', borderBottomRightRadius: m.from === 'me' ? 5 : 18, borderBottomLeftRadius: m.from === 'me' ? 18 : 5 }}>{m.text}</div>
            <div style={{ fontSize: 11, color: 'var(--faint)', marginTop: 3, textAlign: m.from === 'me' ? 'right' : 'left', padding: '0 6px' }}>{m.time}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 9, padding: '12px 16px', borderTop: '1px solid var(--line)', background: 'var(--surface)', alignItems: 'center' }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Typ een bericht…" style={{ flex: 1, border: 'none', outline: 'none', background: 'var(--surface-2)', borderRadius: 999, padding: '11px 16px', fontSize: 14.5, fontFamily: 'var(--font-body)', color: 'var(--text)' }} />
        <button onClick={send} style={{ all: 'unset', cursor: 'pointer', width: 42, height: 42, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="send" size={19} color="var(--primary-ink)" /></button>
      </div>
    </div>
  );
}

// ── Leden ────────────────────────────────────────────────────
function Leden({ ctx }) {
  const { V, members, push } = ctx;
  const sp = speltakById(ACTIVE_SPELTAK);
  return (
    <div style={{ padding: '8px 18px 28px' }}>
      <Display size={30} style={{ marginBottom: 4 }}>{V.members}</Display>
      <div style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 7 }}><SpeltakDot id={sp.id} />{sp.name} · {members.length} {V.members.toLowerCase()}</div>
      <Card pad={0}>
        {members.map((m, i) => (
          <button key={m.id} onClick={() => push({ name: 'lid', id: m.id })} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 13, padding: '11px 15px', borderTop: i ? '1px solid var(--line)' : 'none', width: '100%', boxSizing: 'border-box' }}>
            <Avatar name={m.name} color={m.avatar} size={42} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{m.name}</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{V.parent}: {m.parent}</div>
            </div>
            <Chip style={{ fontSize: 11.5 }} color={ATTEND_RATE[m.id] >= 85 ? 'var(--primary)' : 'var(--muted)'} soft={ATTEND_RATE[m.id] >= 85 ? 'var(--primary-soft)' : 'var(--surface-2)'}>{ATTEND_RATE[m.id]}%</Chip>
            <Icon name="chevR" size={17} color="var(--faint)" />
          </button>
        ))}
      </Card>
    </div>
  );
}

function LidDetail({ ctx, id }) {
  const { V, members, push } = ctx;
  const m = members.find(x => x.id === id);
  if (!m) return null;
  const sp = speltakById(m.speltak);
  return (
    <div style={{ padding: '4px 18px 28px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 22 }}>
        <Avatar name={m.name} color={m.avatar} size={84} />
        <Display size={24} style={{ marginTop: 14 }}>{m.name}</Display>
        <div style={{ marginTop: 8 }}><Chip color="#fff" soft={sp.color}>{sp.name} · {sp.age}</Chip></div>
      </div>

      <Eyebrow style={{ marginBottom: 10 }}>Contact {V.parent.toLowerCase()}</Eyebrow>
      <Card pad={0} style={{ marginBottom: 20 }}>
        <ContactRow icon="users" label={m.parent} sub={V.parent} />
        <ContactRow icon="phone" label={m.phone} sub="Telefoon" action="message" line onAction={() => push({ name: 'thread', id: 't1' })} />
      </Card>

      <Eyebrow style={{ marginBottom: 10 }}>Aanwezigheid dit seizoen</Eyebrow>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <span style={{ fontSize: 30, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text)' }}>{ATTEND_RATE[m.id]}%</span>
          <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>aanwezig</span>
        </div>
        <ProgressBar value={ATTEND_RATE[m.id]} max={100} color={sp.color} />
        <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
          {['di','di','vr','di','vr','di','vr','di','vr','di','vr','di'].map((_, i) => (
            <div key={i} style={{ flex: 1, height: 26, borderRadius: 5, background: (i * 7 + 3) % 10 > 2 ? sp.color : 'var(--surface-2)' }} title={i} />
          ))}
        </div>
      </Card>

      <Btn variant="soft" full icon="message" style={{ marginTop: 20 }} onClick={() => push({ name: 'thread', id: 't1' })}>Bericht naar {V.parent.toLowerCase()}</Btn>
    </div>
  );
}
function ContactRow({ icon, label, sub, action, onAction, line }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '12px 15px', borderTop: line ? '1px solid var(--line)' : 'none' }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={icon} size={18} color="var(--muted)" /></div>
      <div style={{ flex: 1 }}><div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>{label}</div><div style={{ fontSize: 12, color: 'var(--muted)' }}>{sub}</div></div>
      {action && <button onClick={onAction} style={{ all: 'unset', cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={action} size={18} color="var(--primary)" /></button>}
    </div>
  );
}

Object.assign(window, { Berichten, Thread, Leden, LidDetail });

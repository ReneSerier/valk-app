// screens-beheer.jsx — management layer: groep, speltakken/teams, rollen

// ── generic bottom sheet ─────────────────────────────────────
function Sheet({ title, eyebrow, onClose, children }) {
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(20,15,10,0.45)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--bg)', borderTopLeftRadius: 26, borderTopRightRadius: 26, maxHeight: '92%', overflow: 'auto', paddingBottom: 26 }}>
        <div style={{ position: 'sticky', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px 12px', background: 'var(--bg)', zIndex: 2 }}>
          <div>
            {eyebrow && <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 3 }}>{eyebrow}</div>}
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)', fontSize: 21, color: 'var(--text)', lineHeight: 1.15 }}>{title}</div>
          </div>
          <button onClick={onClose} style={{ all: 'unset', cursor: 'pointer', width: 34, height: 34, borderRadius: '50%', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={18} color="var(--muted)" /></button>
        </div>
        <div style={{ padding: '0 18px' }}>{children}</div>
      </div>
    </div>
  );
}

const bInp = { width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--text)', fontSize: 15, fontFamily: 'var(--font-body)', outline: 'none' };
function BField({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 7 }}>{label}</div>
      {children}
      {hint && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6, lineHeight: 1.4 }}>{hint}</div>}
    </div>
  );
}

function CommBadge({ comm }) {
  const o = COMM_OPTS[comm] || COMM_OPTS.ouders;
  const ic = comm === 'direct' ? 'message' : comm === 'beide' ? 'users' : 'users';
  return <Chip style={{ fontSize: 11.5 }}><Icon name={ic} size={13} color="var(--muted)" />{o.short}</Chip>;
}

// segmented control with N options (objects {value,label})
function Seg({ value, options, onChange }) {
  return (
    <div style={{ display: 'flex', background: 'var(--surface-2)', borderRadius: 999, padding: 4, gap: 4 }}>
      {options.map(o => (
        <button key={o.value} onClick={() => onChange(o.value)} style={{ all: 'unset', cursor: 'pointer', flex: 1, textAlign: 'center', padding: '9px 4px', borderRadius: 999, fontSize: 13, fontWeight: 700, color: value === o.value ? 'var(--text)' : 'var(--muted)', background: value === o.value ? 'var(--surface)' : 'transparent', boxShadow: value === o.value ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}>{o.label}</button>
      ))}
    </div>
  );
}

// ── Beheer hub ───────────────────────────────────────────────
function Beheer({ ctx }) {
  const { V, vocabKey, setVocabKey, speltakken, team, group, push } = ctx;
  const beheerders = team.filter(t => t.role === 'beheerder').length;
  return (
    <div style={{ padding: '4px 18px 28px' }}>
      <Display size={26} style={{ marginBottom: 4 }}>Beheer</Display>
      <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 20 }}>Stel de app in voor jouw groep — namen, {V.subgroups.toLowerCase()}, rollen en uitstraling.</div>

      <Eyebrow style={{ marginBottom: 10 }}>Groep</Eyebrow>
      <Card onClick={() => push({ name: 'groep' })} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ fontSize: 26 }}>{group.emoji}</span></div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{group.name}</div><div style={{ fontSize: 13, color: 'var(--muted)' }}>{group.place} · {speltakken.reduce((n, s) => n + s.count, 0)} {V.members.toLowerCase()}</div></div>
        <Icon name="chevR" size={18} color="var(--faint)" />
      </Card>

      <Eyebrow style={{ marginBottom: 10 }}>Type organisatie</Eyebrow>
      <Card style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 12 }}>Bepaalt de woordenschat door de hele app heen.</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <OrgChoice active={vocabKey === 'scouting'} onClick={() => setVocabKey('scouting')} emoji="🏕️" title="Scouting" sub="Opkomst · Speltak · Lid" />
          <OrgChoice active={vocabKey === 'sport'} onClick={() => setVocabKey('sport')} emoji="⚽" title="Sportclub" sub="Training · Team · Speler" />
        </div>
      </Card>
      <div style={{ fontSize: 12.5, color: 'var(--faint)', marginBottom: 22, padding: '0 4px', lineHeight: 1.4 }}>Labels als "{V.event}" en "{V.subgroup}" passen zich direct aan — zo werkt dezelfde app ook voor een voetbalvereniging.</div>

      <Eyebrow style={{ marginBottom: 10 }}>Inrichting</Eyebrow>
      <Card pad={0} style={{ marginBottom: 22 }}>
        <NavRow icon="grid" label={V.subgroups} detail={`${speltakken.length}`} onClick={() => push({ name: 'speltakken' })} />
        <NavRow icon="users" label={`${V.leaders} & rollen`} detail={`${team.length} · ${beheerders} beheerder`} onClick={() => push({ name: 'rollen' })} line />
        <NavRow icon="tag" label={`${V.members} & inschrijvingen`} detail="" onClick={() => ctx.switchTab('leden')} line />
      </Card>

      <Eyebrow style={{ marginBottom: 10 }}>Uitstraling</Eyebrow>
      <Card pad={0}>
        <NavRow icon="paint" label="Thema & kleuren" detail="" sub="Open het Tweaks-paneel rechtsboven" />
        <NavRow icon="bell" label="Meldingen" sub="Aanmeldingen, berichten, herinneringen" line />
      </Card>
    </div>
  );
}

function OrgChoice({ active, onClick, emoji, title, sub }) {
  return (
    <button onClick={onClick} style={{ all: 'unset', cursor: 'pointer', flex: 1, padding: '14px 12px', borderRadius: 'var(--radius-sm)', textAlign: 'center', background: active ? 'var(--primary-soft)' : 'var(--surface)', border: active ? '2px solid var(--primary)' : '1.5px solid var(--line)', boxSizing: 'border-box' }}>
      <div style={{ fontSize: 28 }}>{emoji}</div>
      <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)', marginTop: 4 }}>{title}</div>
      <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{sub}</div>
    </button>
  );
}
function NavRow({ icon, label, sub, detail, onClick, line }) {
  return (
    <button onClick={onClick} disabled={!onClick} style={{ all: 'unset', cursor: onClick ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: 13, padding: '13px 15px', borderTop: line ? '1px solid var(--line)' : 'none', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={icon} size={18} color="var(--muted)" /></div>
      <div style={{ flex: 1 }}><div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>{label}</div>{sub && <div style={{ fontSize: 12, color: 'var(--muted)' }}>{sub}</div>}</div>
      {detail && <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>{detail}</span>}
      {onClick && <Icon name="chevR" size={17} color="var(--faint)" />}
    </button>
  );
}

// ── Speltakken beheer ────────────────────────────────────────
function SpeltakkenBeheer({ ctx }) {
  const { V, speltakken, addSpeltak, updateSpeltak, removeSpeltak } = ctx;
  const [edit, setEdit] = React.useState(null); // speltak obj or 'new' or null
  return (
    <div style={{ padding: '4px 18px 28px' }}>
      <Display size={24} style={{ marginBottom: 6 }}>{V.subgroups}</Display>
      <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 18, lineHeight: 1.45 }}>Bepaal de indeling van je groep. Per {V.subgroup.toLowerCase()} stel je de kleur en de communicatieroute in.</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        {speltakken.map(s => (
          <Card key={s.id} onClick={() => setEdit(s)} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontFamily: 'var(--font-display)', fontSize: 17 }}>{s.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--text)' }}>{s.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12.5, color: 'var(--muted)', fontWeight: 600 }}>{s.age} · {s.count} {V.members.toLowerCase()}</span>
                <CommBadge comm={s.comm} />
              </div>
            </div>
            <Icon name="chevR" size={18} color="var(--faint)" />
          </Card>
        ))}
      </div>

      <Btn variant="soft" full icon="plus" style={{ marginTop: 16 }} onClick={() => setEdit('new')}>{V.subgroup} toevoegen</Btn>

      {edit && <SpeltakSheet key={edit === 'new' ? 'new' : edit.id} ctx={ctx} item={edit === 'new' ? null : edit} onClose={() => setEdit(null)}
        onSave={d => { edit === 'new' ? addSpeltak(d) : updateSpeltak(edit.id, d); setEdit(null); }}
        onDelete={() => { removeSpeltak(edit.id); setEdit(null); }} />}
    </div>
  );
}

function SpeltakSheet({ ctx, item, onClose, onSave, onDelete }) {
  const { V } = ctx;
  const [f, setF] = React.useState(item ? { ...item } : { name: '', age: '', color: SPELTAK_COLORS[5], comm: 'ouders', count: 0 });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  return (
    <Sheet eyebrow={item ? 'Bewerken' : 'Nieuw'} title={item ? item.name : V.subgroup} onClose={onClose}>
      <BField label="Naam"><input value={f.name} onChange={e => set('name', e.target.value)} placeholder={`bv. ${V.subgroup === 'Team' ? 'JO11-1' : 'Welpen'}`} style={bInp} /></BField>
      <BField label="Leeftijd"><input value={f.age} onChange={e => set('age', e.target.value)} placeholder="bv. 7–11 jr" style={bInp} /></BField>
      <BField label="Kleur">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
          {SPELTAK_COLORS.map(c => (
            <button key={c} onClick={() => set('color', c)} style={{ all: 'unset', cursor: 'pointer', width: 34, height: 34, borderRadius: 10, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: f.color === c ? '0 0 0 3px var(--bg), 0 0 0 5px ' + c : 'none' }}>{f.color === c && <Icon name="check" size={17} stroke={3} color="#fff" />}</button>
          ))}
        </div>
      </BField>
      <BField label="Communicatie" hint={COMM_OPTS[f.comm].desc}>
        <Seg value={f.comm} onChange={v => set('comm', v)} options={[{ value: 'ouders', label: 'Via ouders' }, { value: 'direct', label: 'Direct' }, { value: 'beide', label: 'Beide' }]} />
      </BField>

      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
        {item && <Btn variant="danger" icon="x" onClick={onDelete}>Verwijderen</Btn>}
        <Btn full onClick={() => f.name.trim() && onSave(f)}>{item ? 'Opslaan' : 'Toevoegen'}</Btn>
      </div>
    </Sheet>
  );
}

// ── Rollen & leiding ─────────────────────────────────────────
function RollenBeheer({ ctx }) {
  const { V, team, updateTeam, removeTeam, addTeam } = ctx;
  const [edit, setEdit] = React.useState(null);
  const [invite, setInvite] = React.useState(false);
  return (
    <div style={{ padding: '4px 18px 28px' }}>
      <Display size={24} style={{ marginBottom: 6 }}>{V.leaders} & rollen</Display>
      <div style={{ fontSize: 13.5, color: 'var(--muted)', marginBottom: 18, lineHeight: 1.45 }}>Wie heeft toegang en wat mag diegene. Rollen bepalen de rechten in de app.</div>

      <Eyebrow style={{ marginBottom: 10 }}>Rollen</Eyebrow>
      <Card pad={0} style={{ marginBottom: 22 }}>
        {Object.entries(ROLES).map(([k, r], i) => (
          <div key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 15px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: r.color, flexShrink: 0, marginTop: 5 }} />
            <div><div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{r.label}</div><div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.4 }}>{r.desc}</div></div>
          </div>
        ))}
      </Card>

      <Eyebrow style={{ marginBottom: 10 }}>Team ({team.length})</Eyebrow>
      <Card pad={0}>
        {team.map((u, i) => {
          const r = ROLES[u.role]; const sp = speltakById(u.speltak);
          return (
            <button key={u.id} onClick={() => setEdit(u)} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 15px', borderTop: i ? '1px solid var(--line)' : 'none', width: '100%', boxSizing: 'border-box' }}>
              <Avatar name={u.name} color={u.avatar} size={42} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>{u.name}</span>
                  {u.you && <span style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--primary)', background: 'var(--primary-soft)', padding: '1px 6px', borderRadius: 5 }}>JIJ</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.email}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <Chip color="#fff" soft={r.color} style={{ fontSize: 11 }}>{r.label}</Chip>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}><SpeltakDot id={sp.id} size={7} />{sp.name}</span>
              </div>
            </button>
          );
        })}
      </Card>

      <Btn variant="soft" full icon="plus" style={{ marginTop: 16 }} onClick={() => setInvite(true)}>{V.leaders} uitnodigen</Btn>

      {edit && <RolSheet key={edit.id} ctx={ctx} user={edit} onClose={() => setEdit(null)}
        onSave={d => { updateTeam(edit.id, d); setEdit(null); }}
        onRemove={() => { removeTeam(edit.id); setEdit(null); }} />}
      {invite && <InviteSheet ctx={ctx} onClose={() => setInvite(false)} onInvite={d => { addTeam(d); setInvite(false); }} />}
    </div>
  );
}

function RoleAndSpeltak({ role, speltak, setRole, setSpeltak, speltakken }) {
  return (
    <>
      <BField label="Rol" hint={ROLES[role].desc}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {Object.entries(ROLES).map(([k, r]) => (
            <button key={k} onClick={() => setRole(k)} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px', borderRadius: 'var(--radius-sm)', background: role === k ? 'var(--primary-soft)' : 'var(--surface)', border: role === k ? '2px solid var(--primary)' : '1.5px solid var(--line)', boxSizing: 'border-box' }}>
              <span style={{ width: 11, height: 11, borderRadius: 3, background: r.color, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: 'var(--text)' }}>{r.label}</span>
              {role === k && <Icon name="check" size={18} stroke={2.6} color="var(--primary)" />}
            </button>
          ))}
        </div>
      </BField>
      <BField label="Speltak">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {speltakken.map(s => (
            <button key={s.id} onClick={() => setSpeltak(s.id)} style={{ all: 'unset', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7, padding: '8px 13px', borderRadius: 999, fontSize: 13.5, fontWeight: 700, color: speltak === s.id ? '#fff' : 'var(--text)', background: speltak === s.id ? s.color : 'var(--surface)', border: '1px solid var(--line)' }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: speltak === s.id ? '#fff' : s.color }} />{s.name}
            </button>
          ))}
        </div>
      </BField>
    </>
  );
}

function RolSheet({ ctx, user, onClose, onSave, onRemove }) {
  const [role, setRole] = React.useState(user.role);
  const [speltak, setSpeltak] = React.useState(user.speltak);
  return (
    <Sheet eyebrow={user.email} title={user.name} onClose={onClose}>
      <RoleAndSpeltak role={role} speltak={speltak} setRole={setRole} setSpeltak={setSpeltak} speltakken={ctx.speltakken} />
      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
        {!user.you && <Btn variant="danger" icon="x" onClick={onRemove}>Verwijderen</Btn>}
        <Btn full onClick={() => onSave({ role, speltak })}>Opslaan</Btn>
      </div>
    </Sheet>
  );
}

function InviteSheet({ ctx, onClose, onInvite }) {
  const { V } = ctx;
  const [f, setF] = React.useState({ name: '', email: '', role: 'leiding', speltak: ctx.speltakken[0].id });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  return (
    <Sheet eyebrow="Uitnodigen" title="Nieuw teamlid" onClose={onClose}>
      <BField label="Naam"><input value={f.name} onChange={e => set('name', e.target.value)} placeholder="Voor- en achternaam" style={bInp} /></BField>
      <BField label="E-mailadres" hint="Diegene ontvangt een uitnodiging om de app te installeren."><input value={f.email} onChange={e => set('email', e.target.value)} placeholder="naam@email.nl" style={bInp} /></BField>
      <RoleAndSpeltak role={f.role} speltak={f.speltak} setRole={v => set('role', v)} setSpeltak={v => set('speltak', v)} speltakken={ctx.speltakken} />
      <Btn full icon="send" onClick={() => f.name.trim() && onInvite({ name: f.name, email: f.email || 'uitgenodigd', role: f.role, speltak: f.speltak })}>Uitnodiging sturen</Btn>
    </Sheet>
  );
}

// ── Groepsprofiel ────────────────────────────────────────────
const GROUP_EMOJIS = ['🏕️','🦉','⚜️','🌲','🔥','🏹','⛺','🧭','⚽','🏑','🏐','🥏'];
function GroepProfiel({ ctx }) {
  const { V, group, updateGroup, pop } = ctx;
  const [f, setF] = React.useState({ ...group });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));
  return (
    <div style={{ padding: '4px 18px 28px' }}>
      <Display size={24} style={{ marginBottom: 18 }}>Groepsprofiel</Display>

      <BField label="Logo / icoon">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ fontSize: 30 }}>{f.emoji}</span></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, flex: 1 }}>
            {GROUP_EMOJIS.map(e => (
              <button key={e} onClick={() => set('emoji', e)} style={{ all: 'unset', cursor: 'pointer', width: 36, height: 36, borderRadius: 10, fontSize: 19, display: 'flex', alignItems: 'center', justifyContent: 'center', background: f.emoji === e ? 'var(--primary-soft)' : 'var(--surface)', border: f.emoji === e ? '2px solid var(--primary)' : '1px solid var(--line)', boxSizing: 'border-box' }}>{e}</button>
            ))}
          </div>
        </div>
      </BField>

      <BField label="Naam van de groep"><input value={f.name} onChange={e => set('name', e.target.value)} style={bInp} /></BField>
      <BField label="Plaats"><input value={f.place} onChange={e => set('place', e.target.value)} style={bInp} /></BField>
      <BField label="Vaste locatie" hint="Wordt voorgesteld bij het plannen van een nieuwe opkomst."><input value={f.venue} onChange={e => set('venue', e.target.value)} style={bInp} /></BField>

      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <Btn variant="ghost" full onClick={pop}>Annuleren</Btn>
        <Btn full onClick={() => { updateGroup(f); pop(); }}>Opslaan</Btn>
      </div>
    </div>
  );
}

Object.assign(window, { Beheer, SpeltakkenBeheer, RollenBeheer, GroepProfiel });

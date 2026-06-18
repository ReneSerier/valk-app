// wf-screens.jsx — low-fi wireframe of every screen (1:1 with the hi-fi app)

const WV = { events: 'Opkomsten', members: 'Leden' };

// small building blocks reused across screens
function StatBox() {
  return <Box style={{ flex: 1, padding: '9px 8px', display: 'flex', flexDirection: 'column', gap: 6 }}><Glyph k="tag" s={15} /><Bar w="40%" h={12} strong /><Bar w="80%" h={5} /></Box>;
}
function ActionRow() {
  return <Box style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 9 }}><Box r="8px" style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }} fill><Glyph k="plus" s={15} /></Box><div style={{ flex: 1 }}><Bar w="60%" h={7} /><Bar w="80%" h={5} mt={5} /></div><Glyph k="chev" s={14} /></Box>;
}

// 1 — Dashboard / Start
function WfStart({ notes }) {
  return (
    <Phone h={660}>
      <Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div><Bar w={70} h={6} /><H s={21} style={{ marginTop: 7 }}>● Welpen ⌄</H></div>
          <Circle s={34}><Glyph k="bell" /></Circle>
        </div>
        <Box fill style={{ padding: 12, marginTop: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><Pill>over 2 dagen</Pill><T s={20}>🧭</T></div>
          <Bar w="75%" h={13} mt={10} strong /><Bar w="45%" h={9} mt={6} />
          <div style={{ display: 'flex', gap: 10, marginTop: 9 }}><T s={11} dim>⏱ 10–12:30</T><T s={11} dim>📍 blokhut</T></div>
          <div style={{ height: 7, borderRadius: 5, border: '1.5px solid var(--ink)', marginTop: 10, overflow: 'hidden' }}><div style={{ width: '62%', height: '100%', background: 'var(--wf-accent)' }} /></div>
        </Box>
        <div style={{ display: 'flex', gap: 8 }}><StatBox /><StatBox /><StatBox /></div>
        <T s={11} dim style={{ letterSpacing: 1 }}>SNEL REGELEN</T>
        <ActionRow /><ActionRow />
        <T s={11} dim style={{ letterSpacing: 1 }}>RECENT</T>
        <Box style={{ padding: 10 }}><ListRow lead={<div style={{ width: 8, height: 8, borderRadius: 9, background: 'var(--wf-accent)' }} />} title={<Bar w="70%" h={6} />} sub={<Bar w="45%" h={5} mt={5} />} pb={8} /><ListRow lead={<div style={{ width: 8, height: 8, borderRadius: 9, border: '1.5px solid var(--ink)' }} />} title={<Bar w="60%" h={6} />} sub={<Bar w="40%" h={5} mt={5} />} pb={0} line={false} /></Box>
      </Body>
      <TabBar active={0} V={WV} />
    </Phone>
  );
}

// 2 — Agenda
function WfAgenda({ notes }) {
  const card = (done) => (
    <Box style={{ display: 'flex', gap: 11, padding: 10, alignItems: 'center' }}>
      <Box r="9px" style={{ width: 44, height: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><T s={9}>za</T><H s={18}>20</H><T s={8} dim>jun</T></Box>
      <div style={{ flex: 1 }}><Bar w="80%" h={9} strong /><Bar w="55%" h={5} mt={7} />{done ? <Pill style={{ marginTop: 8 }}>✓ afgerond</Pill> : <Bar w="40%" h={5} mt={8} />}</div>
      <Glyph k="chev" s={14} />
    </Box>
  );
  return (
    <Phone h={660}>
      <Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><H s={24}>Opkomsten</H><Pill accent><Glyph k="plus" s={13} />plannen</Pill></div>
        <Box style={{ display: 'flex', padding: 4, gap: 4 }}><Pill fill style={{ flex: 1, border: 'none' }}>Komend</Pill><div style={{ flex: 1, textAlign: 'center', alignSelf: 'center' }}><T s={13} dim>Geweest</T></div></Box>
        {card()}{card()}{card()}{card(true)}
      </Body>
      <TabBar active={1} V={WV} />
    </Phone>
  );
}

// 3 — Plan form
function WfPlan({ notes }) {
  const field = (label, hint) => <div><T s={12}>{label}</T><Box style={{ height: 34, marginTop: 5 }} />{hint}</div>;
  return (
    <Phone h={720}>
      <Back title="" />
      <Body gap={13}>
        <H s={20}>Nieuwe opkomst</H>
        {field('Titel')}
        <div><T s={12}>Icoon</T><div style={{ display: 'flex', gap: 6, marginTop: 5 }}>{['🧭','🪵','🔥','🏕️','🎨','⚽'].map(e => <Box key={e} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{e}</Box>)}</div></div>
        <div><T s={12}>Speltak</T><div style={{ display: 'flex', gap: 6, marginTop: 5, flexWrap: 'wrap' }}>{['Bevers','Welpen','Scouts'].map((s, i) => <Pill key={s} accent={i === 1} fill={i === 1}>● {s}</Pill>)}</div></div>
        <div style={{ display: 'flex', gap: 10 }}>{field('Datum')}{field('Tijd')}</div>
        {field('Wat meenemen')}
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}><Pill style={{ flex: 1 }}>Annuleren</Pill><Pill accent fill style={{ flex: 1 }}>Opslaan</Pill></div>
      </Body>
    </Phone>
  );
}

// 4 — Opkomst detail (Info)
function WfOpkomst({ notes }) {
  return (
    <Phone h={680}>
      <Back title="" />
      <Box fill style={{ margin: 12, padding: 12, borderRadius: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><Pill>● Welpen</Pill><T s={22}>🧭</T></div>
        <Bar w="80%" h={13} mt={10} strong />
        <Bar w="90%" h={6} mt={10} /><Bar w="60%" h={6} mt={6} /><Bar w="75%" h={6} mt={6} />
      </Box>
      <div style={{ display: 'flex', gap: 14, padding: '0 16px 8px', borderBottom: '1.5px solid var(--linec)' }}>
        <div><T s={13}>Info</T><div style={{ height: 3, background: 'var(--wf-accent)', borderRadius: 2, marginTop: 4 }} /></div>
        <T s={13} dim>Aanmeldingen</T><T s={13} dim>Aanwezigheid</T>
      </div>
      <Body gap={11}>
        <Box style={{ padding: 11 }}><T s={11} dim>PROGRAMMA</T>{[0, 1, 2].map(i => <div key={i} style={{ display: 'flex', gap: 10, marginTop: 9 }}><Circle s={12} /><div style={{ flex: 1 }}><Bar w="25%" h={6} strong /><Bar w="65%" h={5} mt={4} /></div></div>)}</Box>
        <Box style={{ padding: 11 }}><T s={11} dim>🎒 WAT MEENEMEN</T><div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}><Pill>schoenen</Pill><Pill>regenjas</Pill><Pill>beker</Pill></div></Box>
        <Box dashed style={{ padding: 10, display: 'flex', alignItems: 'center', gap: 9 }}><Glyph k="eye" /><div style={{ flex: 1 }}><T s={12}>Bekijk als lid</T></div><Glyph k="chev" s={13} /></Box>
      </Body>
    </Phone>
  );
}

// 5 — Aanmeldingen tab
function WfAanmeldingen({ notes }) {
  const seg = () => <div style={{ display: 'flex', gap: 3, border: '2px solid var(--ink)', borderRadius: 999, padding: 3 }}><Circle s={22} accent><Glyph k="check" s={12} /></Circle><Circle s={22}><Glyph k="dots" s={12} /></Circle><Circle s={22}><Glyph k="x" s={12} /></Circle></div>;
  return (
    <Phone h={680}>
      <Back title="" />
      <Body gap={11}>
        <div style={{ display: 'flex', gap: 8 }}>{[0, 1, 2].map(i => <Box key={i} style={{ flex: 1, padding: '10px 4px', textAlign: 'center' }}><H s={20}>{[10, 3, 3][i]}</H><Bar w="70%" h={4} mt={5} style={{ margin: '5px auto 0' }} /></Box>)}</div>
        <Pill fill style={{ width: '100%', padding: '9px' }}>🔔 herinnering naar 3 ouders</Pill>
        <Box style={{ padding: 10 }}>{Array.from({ length: 5 }).map((_, i) => <ListRow key={i} lead={<Circle s={30} fill />} title={<Bar w="50%" h={7} />} sub={<Bar w="35%" h={5} mt={4} />} trail={seg()} pb={9} line={i < 4} />)}</Box>
      </Body>
    </Phone>
  );
}

// 6 — Aanwezigheid
function WfAanwezigheid({ notes }) {
  return (
    <Phone h={680}>
      <Back title="" />
      <Body gap={11}>
        <Box dashed accent style={{ padding: 9, display: 'flex', gap: 8, alignItems: 'center' }}><Glyph k="bell" s={15} /><Bar w="80%" h={5} /></Box>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><H s={15}>0 van 16 aanwezig</H><Pill><Glyph k="check" s={12} />allemaal</Pill></div>
        <Box style={{ padding: 10 }}>{Array.from({ length: 7 }).map((_, i) => <ListRow key={i} lead={<Circle s={30} fill />} title={<Bar w="55%" h={7} />} trail={<Circle s={26} accent={i < 2} fill={i < 2}>{i < 2 && <Glyph k="check" s={13} />}</Circle>} pb={9} line={i < 6} />)}</Box>
      </Body>
    </Phone>
  );
}

// 7 — Lid-weergave (member preview sheet)
function WfLid({ notes }) {
  return (
    <Phone h={660}>
      <div style={{ padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Pill accent><Glyph k="eye" s={12} />weergave als lid</Pill><Circle s={28}><Glyph k="x" s={13} /></Circle></div>
      <Body gap={12}>
        <Box style={{ overflow: 'hidden', padding: 0 }}>
          <Box fill r="0" style={{ height: 80, border: 'none', borderBottom: '2px solid var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🧭</Box>
          <div style={{ padding: 12 }}>
            <Bar w="70%" h={12} strong />
            {[['📅', '90%'], ['⏱', '50%'], ['📍', '75%']].map(([ic, w], i) => <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'center', marginTop: 9 }}><Box r="8px" style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }} fill>{ic}</Box><Bar w={w} h={6} /></div>)}
            <div style={{ borderTop: '1.5px solid var(--linec)', margin: '12px 0' }} />
            <T s={11} dim>🎒 WAT NEEM JE MEE?</T><div style={{ display: 'flex', gap: 6, marginTop: 7 }}><Pill>schoenen</Pill><Pill>regenjas</Pill></div>
          </div>
        </Box>
        <Box style={{ padding: 12 }}><div style={{ textAlign: 'center' }}><T s={13}>Ben je erbij?</T></div><div style={{ display: 'flex', gap: 10, marginTop: 10 }}><Pill style={{ flex: 1 }}><Glyph k="x" s={12} />Afmelden</Pill><Pill accent fill style={{ flex: 1 }}><Glyph k="check" s={12} />Aanmelden</Pill></div></Box>
      </Body>
    </Phone>
  );
}

// 8 — Berichten
function WfBerichten({ notes }) {
  return (
    <Phone h={660}>
      <Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><H s={24}>Berichten</H><Pill accent><Glyph k="send" s={12} />Groep</Pill></div>
        <Box fill style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 12px' }}><Glyph k="search" s={15} /><Bar w="55%" h={6} /></Box>
        <Box style={{ padding: 10 }}>{Array.from({ length: 5 }).map((_, i) => <ListRow key={i} lead={<Circle s={40} fill />} title={<div style={{ display: 'flex', justifyContent: 'space-between' }}><Bar w="45%" h={7} strong /><Bar w={24} h={5} /></div>} sub={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}><Bar w="60%" h={5} />{i < 1 && <Circle s={16} accent fill />}</div>} pb={11} line={i < 4} />)}</Box>
      </Body>
      <TabBar active={2} V={WV} />
    </Phone>
  );
}

// 9 — Gesprek (thread)
function WfThread({ notes }) {
  const bub = (me, w) => <div style={{ alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: '75%' }}><Box fill={!me} accent={me} style={{ padding: 10, borderRadius: me ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: me ? 'var(--wf-accent-soft)' : 'var(--fillc)' }}><Lines n={w} h={5} last="70%" /></Box></div>;
  return (
    <Phone h={660}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 14px 9px', borderBottom: '1.5px solid var(--linec)' }}><Circle s={26}><Glyph k="chevL" s={14} /></Circle><Circle s={34} fill /><div><Bar w={90} h={7} strong /><Bar w={60} h={4} mt={5} /></div></div>
      <Body gap={9}>{bub(false, 2)}{bub(false, 1)}{bub(true, 2)}{bub(false, 1)}</Body>
      <div style={{ display: 'flex', gap: 8, padding: '8px 12px', borderTop: '2px solid var(--ink)', alignItems: 'center', flexShrink: 0 }}><Box fill style={{ flex: 1, height: 30, borderRadius: 999 }} /><Circle s={32} accent fill><Glyph k="send" s={15} /></Circle></div>
    </Phone>
  );
}

// 10 — Leden
function WfLeden({ notes }) {
  return (
    <Phone h={660}>
      <Body>
        <H s={24}>Leden</H><T s={12} dim>● Welpen · 16 leden</T>
        <Box style={{ padding: 10, marginTop: 4 }}>{Array.from({ length: 7 }).map((_, i) => <ListRow key={i} lead={<Circle s={36} fill />} title={<Bar w="55%" h={7} strong />} sub={<Bar w="70%" h={5} mt={5} />} trail={<><Pill style={{ padding: '3px 8px', fontSize: 11 }}>{80 + i}%</Pill><Glyph k="chev" s={13} /></>} gap={10} pb={9} line={i < 6} />)}</Box>
      </Body>
      <TabBar active={3} V={WV} />
    </Phone>
  );
}

// 11 — Lid detail
function WfLidDetail({ notes }) {
  return (
    <Phone h={680}>
      <Back title="" />
      <Body gap={13}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}><Circle s={70} fill /><Bar w={110} h={11} strong /><Pill>Welpen · 7–11 jr</Pill></div>
        <T s={11} dim style={{ letterSpacing: 1 }}>CONTACT OUDER</T>
        <Box style={{ padding: 10 }}><ListRow lead={<Box r="8px" style={{ width: 28, height: 28 }} fill />} title={<Bar w="55%" h={7} />} sub={<Bar w="35%" h={5} mt={4} />} pb={9} /><ListRow lead={<Box r="8px" style={{ width: 28, height: 28 }} fill />} title={<Bar w="45%" h={7} />} trail={<Circle s={28} accent fill><Glyph k="msg" s={13} /></Circle>} pb={0} line={false} /></Box>
        <T s={11} dim style={{ letterSpacing: 1 }}>AANWEZIGHEID</T>
        <Box style={{ padding: 11 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><H s={22}>87%</H><T s={11} dim>aanwezig</T></div><div style={{ height: 7, border: '1.5px solid var(--ink)', borderRadius: 5, marginTop: 9, overflow: 'hidden' }}><div style={{ width: '87%', height: '100%', background: 'var(--wf-accent)' }} /></div><div style={{ display: 'flex', gap: 4, marginTop: 12 }}>{Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ flex: 1, height: 22, borderRadius: 4, background: i % 4 ? 'var(--wf-accent)' : 'var(--fillc)', border: '1.5px solid var(--ink)' }} />)}</div></Box>
        <Pill fill style={{ width: '100%', padding: 9 }}><Glyph k="msg" s={13} />Bericht naar ouder</Pill>
      </Body>
    </Phone>
  );
}

// 12 — Beheer hub
function WfBeheer({ notes }) {
  return (
    <Phone h={680}>
      <Body>
        <H s={22}>Beheer</H><Bar w="80%" h={5} />
        <T s={11} dim style={{ letterSpacing: 1 }}>GROEP</T>
        <Box style={{ display: 'flex', alignItems: 'center', gap: 11, padding: 11 }}><Box r="10px" style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }} fill>🏕️</Box><div style={{ flex: 1 }}><Bar w="60%" h={8} strong /><Bar w="45%" h={5} mt={6} /></div><Glyph k="chev" s={14} /></Box>
        <T s={11} dim style={{ letterSpacing: 1 }}>TYPE ORGANISATIE</T>
        <div style={{ display: 'flex', gap: 9 }}><Box accent fill style={{ flex: 1, textAlign: 'center', padding: 10 }}><T s={16}>🏕️</T><Bar w="50%" h={6} mt={6} style={{ margin: '6px auto 0' }} /></Box><Box style={{ flex: 1, textAlign: 'center', padding: 10 }}><T s={16}>⚽</T><Bar w="50%" h={6} mt={6} style={{ margin: '6px auto 0' }} /></Box></div>
        <T s={11} dim style={{ letterSpacing: 1 }}>INRICHTING</T>
        <Box style={{ padding: 10 }}>{['Speltakken', 'Leiding & rollen', 'Leden'].map((l, i) => <ListRow key={l} lead={<Box r="8px" style={{ width: 28, height: 28 }} fill />} title={<T s={12}>{l}</T>} trail={<Glyph k="chev" s={13} />} pb={9} line={i < 2} />)}</Box>
      </Body>
      <TabBar active={4} V={WV} />
    </Phone>
  );
}

// 13 — Speltakken beheer
function WfSpeltakken({ notes }) {
  return (
    <Phone h={680}>
      <Back title="" />
      <Body gap={11}>
        <H s={20}>Speltakken</H><Bar w="85%" h={5} />
        {['Bevers','Welpen','Scouts','Explorers','Rovers'].map((s, i) => (
          <Box key={s} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: 9 }}>
            <Box r="9px" fill style={{ width: 38, height: 38 }} />
            <div style={{ flex: 1 }}><T s={13}>{s}</T><div style={{ display: 'flex', gap: 6, marginTop: 5, alignItems: 'center' }}><Bar w={70} h={5} /><Pill style={{ padding: '2px 8px', fontSize: 10 }}>{i < 2 ? 'ouders' : i < 3 ? 'beide' : 'direct'}</Pill></div></div>
            <Glyph k="chev" s={13} />
          </Box>
        ))}
        <Pill fill style={{ width: '100%', padding: 9 }}><Glyph k="plus" s={13} />Speltak toevoegen</Pill>
      </Body>
    </Phone>
  );
}

// 14 — Rollen & leiding
function WfRollen({ notes }) {
  return (
    <Phone h={700}>
      <Back title="" />
      <Body gap={11}>
        <H s={20}>Leiding & rollen</H>
        <T s={11} dim style={{ letterSpacing: 1 }}>ROLLEN</T>
        <Box style={{ padding: 10 }}>{['Beheerder','Leiding','Hulpleiding'].map((r, i) => <div key={r} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', paddingBottom: i < 2 ? 9 : 0, marginBottom: i < 2 ? 9 : 0, borderBottom: i < 2 ? '1.5px solid var(--linec)' : 'none' }}><div style={{ width: 9, height: 9, borderRadius: 3, background: 'var(--wf-accent)', marginTop: 3 }} /><div style={{ flex: 1 }}><T s={12}>{r}</T><Bar w="80%" h={4} mt={5} /></div></div>)}</Box>
        <T s={11} dim style={{ letterSpacing: 1 }}>TEAM (5)</T>
        <Box style={{ padding: 10 }}>{Array.from({ length: 5 }).map((_, i) => <ListRow key={i} lead={<Circle s={34} fill />} title={<Bar w="55%" h={7} strong />} sub={<Bar w="70%" h={4} mt={5} />} trail={<div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}><Pill style={{ padding: '2px 8px', fontSize: 10 }}>{['Beheerder','Leiding','Leiding','Hulp','Leiding'][i]}</Pill><T s={9} dim>● speltak</T></div>} pb={9} line={i < 4} />)}</Box>
        <Pill fill style={{ width: '100%', padding: 9 }}><Glyph k="plus" s={13} />Leiding uitnodigen</Pill>
      </Body>
    </Phone>
  );
}

// 15 — Groepsprofiel
function WfProfiel({ notes }) {
  const field = (l) => <div><T s={12}>{l}</T><Box style={{ height: 34, marginTop: 5 }} /></div>;
  return (
    <Phone h={640}>
      <Back title="" />
      <Body gap={14}>
        <H s={20}>Groepsprofiel</H>
        <div><T s={12}>Logo / icoon</T><div style={{ display: 'flex', gap: 10, marginTop: 6, alignItems: 'center' }}><Box r="12px" fill style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🏕️</Box><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>{['🦉','⚜️','🌲','🔥','⛺','⚽'].map(e => <Box key={e} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{e}</Box>)}</div></div></div>
        {field('Naam van de groep')}{field('Plaats')}{field('Vaste locatie')}
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}><Pill style={{ flex: 1 }}>Annuleren</Pill><Pill accent fill style={{ flex: 1 }}>Opslaan</Pill></div>
      </Body>
    </Phone>
  );
}

Object.assign(window, { WfStart, WfAgenda, WfPlan, WfOpkomst, WfAanmeldingen, WfAanwezigheid, WfLid, WfBerichten, WfThread, WfLeden, WfLidDetail, WfBeheer, WfSpeltakken, WfRollen, WfProfiel });

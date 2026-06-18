// wf-app.jsx — lays every wireframe onto the design canvas + tweaks

const { useState, useEffect } = React;

const WF_DEFAULTS = /*EDITMODE-BEGIN*/{
  "notes": true,
  "kleur": true
}/*EDITMODE-END*/;

const PHONE_W = 300;
const GUTTER = 130;

const FRAMES = [
  ['Leiding — dagelijks', 'De schermen die leiding het vaakst gebruikt', [
    ['01 · Start / Dashboard', 'WfStart', 672],
    ['02 · Agenda', 'WfAgenda', 672],
    ['03 · Opkomst plannen', 'WfPlan', 732],
  ]],
  ['Opkomst', 'Detail, aanmeldingen, aanwezigheid en de lid-weergave', [
    ['04 · Opkomst-detail (Info)', 'WfOpkomst', 692],
    ['05 · Aanmeldingen', 'WfAanmeldingen', 692],
    ['06 · Aanwezigheid afstrepen', 'WfAanwezigheid', 692],
    ['07 · Lid-weergave', 'WfLid', 672],
  ]],
  ['Mensen', 'Communicatie met ouders en leden', [
    ['08 · Berichten', 'WfBerichten', 672],
    ['09 · Gesprek', 'WfThread', 672],
    ['10 · Leden', 'WfLeden', 672],
    ['11 · Lid-detail', 'WfLidDetail', 692],
  ]],
  ['Beheer', 'Instellen per groep — white-label, speltakken, rollen', [
    ['12 · Beheer-hub', 'WfBeheer', 692],
    ['13 · Speltakken', 'WfSpeltakken', 692],
    ['14 · Leiding & rollen', 'WfRollen', 712],
    ['15 · Groepsprofiel', 'WfProfiel', 652],
  ]],
];

// annotations shown in the right gutter (top = px from frame top)
const NOTES = {
  WfStart: [[60, 'volgende opkomst — tik opent detail'], [300, 'snelacties']],
  WfAgenda: [[96, 'wissel komend / geweest']],
  WfPlan: [[110, 'invulvelden + kleur per speltak']],
  WfOpkomst: [[150, 'sub-tabs: info · aanmeldingen · aanwezigheid']],
  WfAanmeldingen: [[150, 'ja / open / nee per lid']],
  WfAanwezigheid: [[150, 'tik rij = aanwezig of afwezig']],
  WfLid: [[44, 'zo ziet een lid de opkomst'], [560, 'aan- / afmelden']],
  WfBerichten: [[120, 'ongelezen → badge']],
  WfThread: [[560, 'typ + verstuur']],
  WfLeden: [[120, '% = opkomst-trouw']],
  WfLidDetail: [[240, 'contact via ouder']],
  WfBeheer: [[150, 'white-label: scouting ↔ sportclub']],
  WfSpeltakken: [[120, 'kleur + communicatieroute']],
  WfRollen: [[78, 'rechten per rol']],
  WfProfiel: [[110, 'naam · plaats · logo']],
};

function GutterNote({ top, text }) {
  return (
    <div style={{ position: 'absolute', left: PHONE_W + 6, top, width: GUTTER - 12, display: 'flex', gap: 4, alignItems: 'flex-start' }}>
      <span style={{ fontFamily: 'var(--hand)', color: 'var(--wf-accent)', fontSize: 16, lineHeight: 1 }}>←</span>
      <span style={{ fontFamily: 'var(--hand)', color: 'var(--wf-accent)', fontSize: 12, lineHeight: 1.2, transform: 'rotate(-1deg)' }}>{text}</span>
    </div>
  );
}

function WfApp() {
  const [t, setTweak] = useTweaks(WF_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--wf-accent', t.kleur ? '#d8503a' : 'var(--ink)');
    root.style.setProperty('--wf-accent-soft', t.kleur ? '#f4ddd4' : 'var(--fillc)');
  }, [t.kleur]);

  return (
    <>
      <DesignCanvas>
        {FRAMES.map(([title, sub, items]) => (
          <DCSection key={title} id={title} title={title} subtitle={sub}>
            {items.map(([label, comp, h]) => {
              const C = window[comp];
              return (
                <DCArtboard key={label} id={label} label={label} width={PHONE_W + GUTTER} height={h}>
                  <div style={{ position: 'relative', width: PHONE_W + GUTTER, height: '100%', paddingTop: 6 }}>
                    <C notes={t.notes} />
                    {t.notes && (NOTES[comp] || []).map(([top, text], i) => <GutterNote key={i} top={top + 6} text={text} />)}
                  </div>
                </DCArtboard>
              );
            })}
          </DCSection>
        ))}
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Wireframe" />
        <TweakToggle label="Annotaties" value={t.notes} onChange={v => setTweak('notes', v)} />
        <TweakToggle label="Accentkleur" value={t.kleur} onChange={v => setTweak('kleur', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<WfApp />);

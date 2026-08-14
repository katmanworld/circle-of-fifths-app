import { useMemo, useState } from 'react'
import { CIRCLE_KEYS, capoOptions, diatonicChords, keyForPitch, noteIndex, primaryChords, relativeMinor, shapeKeyFor, transposeKey } from './musicTheory'
import './styles.css'

const signed = n => n > 0 ? `+${n}` : `${n}`

function Circle({ selected, onSelect }) {
  const selectedIndex = CIRCLE_KEYS.indexOf(selected)
  const iv = CIRCLE_KEYS[(selectedIndex + 11) % 12]
  const v = CIRCLE_KEYS[(selectedIndex + 1) % 12]
  return <section className="card circle-card">
    <div className="section-heading"><div><span className="eyebrow">Navigate harmony</span><h2>Circle of Fifths</h2></div><div className="direction">← fourths <span>•</span> fifths →</div></div>
    <div className="circle" aria-label="Interactive circle of fifths">
      <div className="circle-center"><small>SELECTED KEY</small><strong>{selected}</strong><span>Major</span></div>
      {CIRCLE_KEYS.map((key, index) => {
        const angle = index * 30 - 90
        const style = { '--x': `${50 + 40 * Math.cos(angle * Math.PI/180)}%`, '--y': `${50 + 40 * Math.sin(angle * Math.PI/180)}%` }
        const role = key === selected ? 'tonic' : key === iv ? 'fourth' : key === v ? 'fifth' : ''
        return <button key={key} style={style} className={`key-node ${role}`} onClick={() => onSelect(key)} aria-label={`${key} major${role ? `, ${role}` : ''}`}>
          {role && <b>{role === 'tonic' ? 'I' : role === 'fourth' ? 'IV' : 'V'}</b>}<strong>{key}</strong><small>{relativeMinor(key).replace(' minor','m')}</small>
        </button>
      })}
    </div>
    <div className="legend"><span><i className="dot tonic-dot"/>Tonic (I)</span><span><i className="dot iv-dot"/>Fourth (IV)</span><span><i className="dot v-dot"/>Fifth (V)</span></div>
  </section>
}

function KeyDetails({ keyName }) {
  const chords = diatonicChords(keyName)
  return <section className="card details-card"><span className="eyebrow">Selected key</span><div className="key-title"><div><h2>{keyName} Major</h2><p>Relative minor: <strong>{relativeMinor(keyName)}</strong></p></div><div className="pill">Sounding key</div></div>
    <div className="chord-grid">{chords.map((chord, i) => <div className={`chord ${[0,3,4].includes(i) ? `primary p${i}` : ''}`} key={chord.roman}><span>{chord.roman}</span><strong>{chord.name}</strong>{[0,3,4].includes(i) && <small>{i === 0 ? 'TONIC' : i === 3 ? 'FOURTH' : 'FIFTH'}</small>}</div>)}</div>
  </section>
}

function Transpose({ original, amount, setAmount, sounding }) {
  const progression = [0,5,3,4]
  return <section className="card"><span className="eyebrow">Songwriter tool</span><h2>Transpose</h2><div className="key-comparison"><div><small>ORIGINAL KEY</small><strong>{original} Major</strong></div><span>→</span><div><small>TRANSPOSED KEY</small><strong>{sounding} Major</strong></div></div>
    <div className="stepper"><button onClick={() => setAmount(Math.max(-12, amount-1))} aria-label="Transpose down">−</button><div><strong>{signed(amount)}</strong><small>SEMITONES</small></div><button onClick={() => setAmount(Math.min(12, amount+1))} aria-label="Transpose up">+</button><button className="reset" onClick={() => setAmount(0)}>Reset</button></div>
    <input aria-label="Transpose semitones" type="range" min="-12" max="12" value={amount} onChange={e => setAmount(Number(e.target.value))}/>
    <div className="progressions"><p><span>Original progression</span>{progression.map(i => diatonicChords(original)[i].name).join(' – ')}</p><p><span>Transposed progression</span><strong>{progression.map(i => diatonicChords(sounding)[i].name).join(' – ')}</strong></p></div>
  </section>
}

function Capo({ enabled, setEnabled, capo, setCapo, sounding }) {
  const shapeKey = keyForPitch(noteIndex(shapeKeyFor(sounding, capo)))
  return <section className={`card capo-card ${enabled ? '' : 'disabled'}`}><div className="toggle-line"><div><span className="eyebrow">Guitar tool</span><h2>Capo Mode</h2></div><button className={`toggle ${enabled ? 'on' : ''}`} role="switch" aria-checked={enabled} onClick={() => setEnabled(!enabled)}><i/></button></div>
    {enabled ? <><div className="capo-summary"><div><small>SOUNDING KEY</small><strong>{sounding} Major</strong></div><div><small>CAPO</small><strong>{capo}</strong></div><div><small>PLAY SHAPES IN</small><strong>{shapeKey} Major</strong></div></div>
      <label className="capo-slider">Capo position: <strong>{capo}</strong><input type="range" min="0" max="12" value={capo} onChange={e => setCapo(Number(e.target.value))}/><span><i>0</i><i>12</i></span></label>
      <div className="play-callout">Play <strong>{shapeKey} shapes</strong><span>Sounds as</span><strong>{sounding}</strong></div>
      <h3>Play This Key Using...</h3><p className="hint">Choose a familiar open-position chord family.</p><div className="options">{capoOptions(sounding).map(option => <button className={capo === option.capo ? 'selected' : ''} onClick={() => setCapo(option.capo)} key={option.shapeKey}><strong>Capo {option.capo}</strong><span>{option.shapeKey} shapes</span></button>)}</div>
    </> : <p className="mode-off">Turn on Capo Mode to find easy open-chord shapes for <strong>{sounding} Major</strong>.</p>}
  </section>
}

export default function App() {
  const [original, setOriginal] = useState('C'); const [amount, setAmount] = useState(0); const [capo, setCapo] = useState(0); const [capoMode, setCapoMode] = useState(true)
  const sounding = useMemo(() => keyForPitch(noteIndex(transposeKey(original, amount))), [original, amount])
  const chooseKey = key => { setOriginal(key); setAmount(0) }
  return <><header><div><span className="brand-mark">♮</span><div><h1>Circle of Fifths <em>– Guitar &amp; Songwriter Edition</em></h1><p>Harmony made practical for guitarists and songwriters</p></div></div><b>BETA</b></header>
    <main><Circle selected={sounding} onSelect={chooseKey}/><div className="side"><KeyDetails keyName={sounding}/><Transpose original={original} amount={amount} setAmount={setAmount} sounding={sounding}/><Capo enabled={capoMode} setEnabled={setCapoMode} capo={capo} setCapo={setCapo} sounding={sounding}/></div>
      <section className="feedback"><span>β</span><div><h2>Beta Feedback</h2><p>Try different keys, capo positions, and transpositions. Tell me what is confusing, missing, or especially useful.</p></div></section>
    </main><footer>Built for musicians · Theory you can use</footer></>
}

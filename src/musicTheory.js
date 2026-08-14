export const CHROMATIC = ['C', 'C♯/D♭', 'D', 'E♭', 'E', 'F', 'F♯/G♭', 'G', 'A♭', 'A', 'B♭', 'B']

// Circle order is intentionally separate from chromatic order.
export const CIRCLE_KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭', 'F']

const KEY_DATA = {
  C:  ['C','D','E','F','G','A','B'],
  G:  ['G','A','B','C','D','E','F♯'],
  D:  ['D','E','F♯','G','A','B','C♯'],
  A:  ['A','B','C♯','D','E','F♯','G♯'],
  E:  ['E','F♯','G♯','A','B','C♯','D♯'],
  B:  ['B','C♯','D♯','E','F♯','G♯','A♯'],
  'F♯':['F♯','G♯','A♯','B','C♯','D♯','E♯'],
  'D♭':['D♭','E♭','F','G♭','A♭','B♭','C'],
  'A♭':['A♭','B♭','C','D♭','E♭','F','G'],
  'E♭':['E♭','F','G','A♭','B♭','C','D'],
  'B♭':['B♭','C','D','E♭','F','G','A'],
  F:  ['F','G','A','B♭','C','D','E']
}

const PITCH = { C:0, 'C♯':1, 'D♭':1, D:2, 'D♯':3, 'E♭':3, E:4, 'E♯':5, F:5, 'F♯':6, 'G♭':6, G:7, 'G♯':8, 'A♭':8, A:9, 'A♯':10, 'B♭':10, B:11 }
const GUITAR_NAMES = ['C','D♭','D','E♭','E','F','F♯','G','A♭','A','B♭','B']
const QUALITIES = ['', 'm', 'm', '', '', 'm', 'dim']
export const ROMANS = ['I','ii','iii','IV','V','vi','vii°']

export const noteIndex = note => PITCH[note.replace(' Major','')]
export const moveNote = (note, semitones) => GUITAR_NAMES[(noteIndex(note) + semitones + 120) % 12]
export const transposeKey = (key, semitones) => moveNote(key, semitones)
export const diatonicChords = key => KEY_DATA[key].map((note, i) => ({ roman: ROMANS[i], note, quality: QUALITIES[i], name: note + QUALITIES[i] }))
export const relativeMinor = key => `${KEY_DATA[key][5]} minor`
export const primaryChords = key => ({ I: KEY_DATA[key][0], IV: KEY_DATA[key][3], V: KEY_DATA[key][4] })
export const shapeKeyFor = (soundingKey, capo) => moveNote(soundingKey, -capo)
export const capoForShape = (soundingKey, shapeKey) => (noteIndex(soundingKey) - noteIndex(shapeKey) + 12) % 12
export const capoOptions = soundingKey => ['C','A','G','E','D','F']
  .map(shapeKey => ({ shapeKey, capo: capoForShape(soundingKey, shapeKey) }))
  .filter(({ capo }) => capo <= 7)
  .sort((a,b) => a.capo - b.capo)

export const keyForPitch = pitch => CIRCLE_KEYS.find(key => noteIndex(key) === pitch)

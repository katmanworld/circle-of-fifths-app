import { describe, expect, it } from 'vitest'
import { CIRCLE_KEYS, capoForShape, diatonicChords, noteIndex, primaryChords, relativeMinor, shapeKeyFor, transposeKey } from './musicTheory'

describe('music theory', () => {
  it('contains twelve unique major keys and correct C harmony', () => {
    expect(new Set(CIRCLE_KEYS.map(noteIndex)).size).toBe(12)
    expect(diatonicChords('C').map(c => c.name)).toEqual(['C','Dm','Em','F','G','Am','Bdim'])
    expect(relativeMinor('C')).toBe('A minor')
  })
  it.each(CIRCLE_KEYS)('%s has seven chords, relative minor vi, and circle I-IV-V', key => {
    const chords = diatonicChords(key); const index = CIRCLE_KEYS.indexOf(key)
    expect(chords).toHaveLength(7)
    expect(relativeMinor(key)).toBe(`${chords[5].note} minor`)
    expect(noteIndex(primaryChords(key).IV)).toBe(noteIndex(CIRCLE_KEYS[(index+11)%12]))
    expect(noteIndex(primaryChords(key).V)).toBe(noteIndex(CIRCLE_KEYS[(index+1)%12]))
    expect(chords.map(c => c.quality)).toEqual(['','m','m','','','m','dim'])
  })
  it('transposes every key through the full -12 to +12 range', () => {
    for (const key of CIRCLE_KEYS) for(let n=-12;n<=12;n++) expect(noteIndex(transposeKey(key,n))).toBe((noteIndex(key)+n+120)%12)
  })
  it('calculates all capo positions and combined transposition', () => {
    for (const key of CIRCLE_KEYS) for(let capo=0;capo<=12;capo++) expect((noteIndex(shapeKeyFor(key,capo))+capo)%12).toBe(noteIndex(key))
    expect(capoForShape('A','G')).toBe(2)
    expect(shapeKeyFor(transposeKey('G',2),2)).toBe('G')
  })
})

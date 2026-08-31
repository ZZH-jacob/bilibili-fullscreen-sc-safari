import {
    DEFAULT_UI_SCALE,
    MAX_UI_SCALE,
    MIN_UI_SCALE,
    normalizeUIScale,
} from '@/constant'

describe('normalizeUIScale', () => {
    it.each([
        ['min', 0.8],
        ['medium', 1],
        ['max', 1.2],
    ])('migrates legacy size %s to %s', (legacySize, expectedScale) => {
        expect(normalizeUIScale(legacySize)).toBe(expectedScale)
    })

    it('clamps values to the supported range', () => {
        expect(normalizeUIScale(0.1)).toBe(MIN_UI_SCALE)
        expect(normalizeUIScale(3)).toBe(MAX_UI_SCALE)
    })

    it('rounds values to the nearest slider step', () => {
        expect(normalizeUIScale(1.23)).toBe(1.25)
    })

    it.each([undefined, null, 'invalid', Number.NaN, Number.POSITIVE_INFINITY])(
        'falls back to the default for invalid value %s',
        (value) => {
            expect(normalizeUIScale(value)).toBe(DEFAULT_UI_SCALE)
        },
    )
})
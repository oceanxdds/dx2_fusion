import { describe, it, expect } from 'vitest'
import DevilBom from './devil_bom'

function makeDevil(overrides = {}) {
    return {
        name: 'test-devil',
        rarity: 3,
        grade: 30,
        source: 'normal_fusion',
        min: 0,
        max: 100,
        costs: [null, null, null, null, null, null],
        pure_costs: [null, null, null, null, null, null],
        ...overrides
    }
}

describe('DevilBom fusion mag calculation', () => {
    it('flags upgrade when both materials are a lower rarity than the result', () => {
        const target = makeDevil({ rarity: 4, grade: 40 })
        const d1 = makeDevil({ rarity: 3, grade: 30 })
        const d2 = makeDevil({ rarity: 3, grade: 35 })
        const bom = new DevilBom(target, d1, d2)

        expect(bom.upgrade).toBe(true)
        expect(bom.downgrade).toBe(false)
    })

    it('flags downgrade when a material is a higher rarity than the result', () => {
        const target = makeDevil({ rarity: 4, grade: 40 })
        const d1 = makeDevil({ rarity: 5, grade: 50 })
        const d2 = makeDevil({ rarity: 4, grade: 45 })
        const bom = new DevilBom(target, d1, d2)

        expect(bom.downgrade).toBe(true)
    })

    it('computes mag from the fusion table for a non-4/5 rarity result', () => {
        const target = makeDevil({ rarity: 3, grade: 30 })
        const d1 = makeDevil({ rarity: 2, grade: 20 })
        const d2 = makeDevil({ rarity: 2, grade: 25 })
        const bom = new DevilBom(target, d1, d2)

        // A = table[rarity 3][r=2] = 5000, B = table[grade/10=3] = 0.45
        // mag = 5000 + (30 - 22.5) * 0.45 = 5003.375 -> floor 5003
        expect(bom.mag).toBe(5003)
        // rarity 3 is neither 4 nor 5, so mag_pure equals mag exactly
        expect(bom.mag_pure).toBe(bom.mag)
    })

    it('discounts mag_pure for a rarity 5 result (0.7x)', () => {
        const target = makeDevil({ rarity: 5, grade: 50 })
        const d1 = makeDevil({ rarity: 4, grade: 40 })
        const d2 = makeDevil({ rarity: 4, grade: 45 })
        const bom = new DevilBom(target, d1, d2)

        expect(bom.mag).toBe(3000562)
        expect(bom.mag_pure).toBe(2100393)
    })

    it('zeroes out mag and mag_pure for a rarity combination the fusion table has no entry for', () => {
        const target = makeDevil({ rarity: 4, grade: 40 })
        const d1 = makeDevil({ rarity: 5, grade: 50 })
        const d2 = makeDevil({ rarity: 4, grade: 40 })
        const bom = new DevilBom(target, d1, d2)

        expect(bom.mag).toBe(0)
        expect(bom.mag_pure).toBe(0)
    })

    it('takes the fixed fusionMag for a multi-fusion result instead of the A/B table', () => {
        const target = makeDevil({ rarity: 5, grade: 60, source: 'multi_fusion', fusionMag: 12345 })
        const d1 = makeDevil({ rarity: 4, grade: 40 })
        const d2 = makeDevil({ rarity: 4, grade: 40 })
        const d3 = makeDevil({ rarity: 4, grade: 40 })
        const d4 = makeDevil({ rarity: 4, grade: 40 })
        const bom = new DevilBom(target, d1, d2, d3, d4)

        expect(bom.mag).toBe(12345)
        expect(bom.mag_pure).toBe(12345)
    })

    it('has zero mag and is not marked upgrade/downgrade when it has no children', () => {
        const target = makeDevil({ rarity: 3, grade: 30 })
        const bom = new DevilBom(target)

        expect(bom.mag).toBe(0)
        expect(bom.mag_pure).toBe(0)
        expect(bom.upgrade).toBe(false)
        expect(bom.downgrade).toBe(false)
    })
})

describe('DevilBom.bom static factory', () => {
    it('rejects a material combination whose average grade falls outside the target devil\'s [min, max) range', () => {
        const target = makeDevil({ rarity: 4, grade: 40, min: 50, max: 60 })
        const d1 = makeDevil({ rarity: 3, grade: 30 })
        const d2 = makeDevil({ rarity: 3, grade: 30 })

        expect(DevilBom.bom(target, d1, d2)).toBeNull()
    })

    it('accepts a material combination whose average grade falls inside the target devil\'s [min, max) range', () => {
        const target = makeDevil({ rarity: 4, grade: 40, min: 20, max: 60 })
        const d1 = makeDevil({ rarity: 3, grade: 30 })
        const d2 = makeDevil({ rarity: 3, grade: 30 })

        expect(DevilBom.bom(target, d1, d2)).toBeInstanceOf(DevilBom)
    })
})

describe('DevilBom cost propagation', () => {
    it('returns null from getCost/getCostPure when a material\'s cost table has no entry yet', () => {
        const target = makeDevil({ rarity: 3, grade: 30 })
        const d1 = makeDevil({ rarity: 2, grade: 20 })
        const d2 = makeDevil({ rarity: 2, grade: 25 })
        const bom = new DevilBom(target, d1, d2)

        expect(bom.getCost(1)).toBeNull()
        expect(bom.getCostPure(1)).toBeNull()
    })

    it('adds its own mag on top of material costs once those costs are known', () => {
        const target = makeDevil({ rarity: 3, grade: 30 })
        const d1 = makeDevil({ rarity: 2, grade: 20, costs: [0, 100, 100, 100, 100, 100], pure_costs: [0, 80, 80, 80, 80, 80] })
        const d2 = makeDevil({ rarity: 2, grade: 25, costs: [0, 50, 50, 50, 50, 50], pure_costs: [0, 40, 40, 40, 40, 40] })
        const bom = new DevilBom(target, d1, d2)

        // both materials are rarity 2, which is above the requested cutoff rarity 1,
        // so both of their pure_costs[1] entries are included
        expect(bom.getCostPure(1)).toBe(80 + 40 + bom.mag_pure)
    })
})

describe('DevilBom parent/child bookkeeping', () => {
    it('identifies the first and last bom among its children', () => {
        const target = makeDevil({ rarity: 4, grade: 40 })
        const d1 = makeDevil({ rarity: 3, grade: 30 })
        const d2 = makeDevil({ rarity: 3, grade: 35 })
        const bom = new DevilBom(target, d1, d2)

        expect(bom.isFirstBom(bom.child1)).toBe(true)
        expect(bom.isFirstBom(bom.child2)).toBe(false)
        expect(bom.isLastBom(bom.child2)).toBe(true)
        expect(bom.isLastBom(bom.child1)).toBe(false)
    })

    it('clears mag and children on unset', () => {
        const target = makeDevil({ rarity: 4, grade: 40 })
        const d1 = makeDevil({ rarity: 3, grade: 30 })
        const d2 = makeDevil({ rarity: 3, grade: 35 })
        const bom = new DevilBom(target, d1, d2)

        bom.unset()

        expect(bom.child1).toBeNull()
        expect(bom.child2).toBeNull()
        expect(bom.mag).toBe(0)
        expect(bom.mag_pure).toBe(0)
        expect(bom.auto).toBe(true)
    })
})

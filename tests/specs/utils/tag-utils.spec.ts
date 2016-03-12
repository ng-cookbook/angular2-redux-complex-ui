/// <reference path="../../../typings/browser/ambient/jasmine/index.d.ts" />

import {
    containsSelectedTag,
    isSelectedTag,
    isMatchingTag,
    tagCompareValue
} from '../../../src/app/utils/tag-utils'

describe('Tag utils', () => {

    describe('containsSelectedTag', () => {

        it('should handled undefined input', () => {
            expect(containsSelectedTag(undefined, undefined)).toBe(false)
            expect(containsSelectedTag([], undefined)).toBe(false)
            expect(containsSelectedTag(undefined, [])).toBe(false)
        })

        it('should return true if any tag is in list', () => {
            expect(containsSelectedTag(['x', 'b', 'z'], ['a', 'b', 'c'])).toBe(true)
        })

        it('should return false if tag is not in list', () => {
            expect(containsSelectedTag(['x', 'y', 'z'], ['a', 'b', 'c'])).toBe(false)
        })

    })

    describe('isSelectedTag', () => {

        it('should handled undefined input', () => {
            expect(isSelectedTag(undefined, undefined)).toBe(false)
            expect(isSelectedTag('abc', undefined)).toBe(false)
        })

        it('should return true if tag is in list', () => {
            expect(isSelectedTag('b', ['a', 'b', 'c'])).toBe(true)
        })

        it('should return false if tag is not in list', () => {
            expect(isSelectedTag('x', ['a', 'b', 'c'])).toBe(false)
        })

    })

    describe('isMatchingTag', () => {

        it('should do case-insensitive compare', () => {
            expect(isMatchingTag('ABC', 'ABC')).toBe(true)
            expect(isMatchingTag('AbC', 'aBc')).toBe(true)
            expect(isMatchingTag('abc', 'abc')).toBe(true)
        })

    })

    describe('tagCompareValue', () => {

        it('should provide lower-case value', () => {
            expect(tagCompareValue('ABC')).toBe('abc')
            expect(tagCompareValue('AbC')).toBe('abc')
            expect(tagCompareValue('abc')).toBe('abc')
        })

    })

})

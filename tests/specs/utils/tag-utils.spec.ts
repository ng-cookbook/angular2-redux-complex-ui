
import {
    areAllTagsExcluded,
    isTagIncludedInList,
    isMatchingTag,
    tagCompareValue,
    getSelectedTagsList,
    getExcludedTagsFromSelectedTagsList
} from '../../../src/app/utils/tag-utils'

describe('Tag utils', () => {

    describe('areAllTagsExcluded', () => {

        it('should handled undefined input', () => {
            expect(areAllTagsExcluded(undefined, undefined)).toBe(false)
            expect(areAllTagsExcluded([], undefined)).toBe(false)
            expect(areAllTagsExcluded(undefined, [])).toBe(false)
        })

        it('should return false if some tags are in list of excluded tags', () => {
            expect(areAllTagsExcluded(['x', 'b', 'z'], ['a', 'b', 'c'])).toBe(false)
        })

        it('should return true if all tags are in list of excluded tags', () => {
            expect(areAllTagsExcluded(['c', 'b', 'a'], ['a', 'b', 'c'])).toBe(true)
        })

        it('should return true if no tags are in list of excluded tags', () => {
            expect(areAllTagsExcluded(['x', 'y', 'z'], ['a', 'b', 'c'])).toBe(false)
        })

    })

    describe('isTagIncludedInList', () => {

        it('should handled undefined input', () => {
            expect(isTagIncludedInList(undefined, undefined)).toBe(false)
            expect(isTagIncludedInList('abc', undefined)).toBe(false)
        })

        it('should return true if tag is in list', () => {
            expect(isTagIncludedInList('b', ['a', 'b', 'c'])).toBe(true)
        })

        it('should return false if tag is not in list', () => {
            expect(isTagIncludedInList('x', ['a', 'b', 'c'])).toBe(false)
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

    describe('getSelectedTagsList', () => {

        it('should extract, sort, and select all unique tags', () => {
            let testData = {
                a: { tags: ['xxx', 'bbb', 'ccc' ]},
                b: { tags: ['aaa', 'yyy', 'ccc' ]},
                c: { tags: ['aaa', 'bbb', 'zzz' ]}
            }
            expect(getSelectedTagsList(testData, [])).toEqual([
                { tag: 'aaa', isSelected: true },
                { tag: 'bbb', isSelected: true },
                { tag: 'ccc', isSelected: true },
                { tag: 'xxx', isSelected: true },
                { tag: 'yyy', isSelected: true },
                { tag: 'zzz', isSelected: true }
            ])
        })

        it('should extract, sort unique tags and exclude some', () => {
            let testData = {
                a: { tags: ['xxx', 'bbb', 'ccc' ]},
                b: { tags: ['aaa', 'yyy', 'ccc' ]},
                c: { tags: ['aaa', 'bbb', 'zzz' ]}
            }
            expect(getSelectedTagsList(testData, ['bbb', 'zzz'])).toEqual([
                { tag: 'aaa', isSelected: true },
                { tag: 'bbb', isSelected: false },
                { tag: 'ccc', isSelected: true },
                { tag: 'xxx', isSelected: true },
                { tag: 'yyy', isSelected: true },
                { tag: 'zzz', isSelected: false }
            ])
        })

        it('should extract, sort, and select all unique tags, ignoring case', () => {
            let testData = {
                a: { tags: ['xxx', 'bbb', 'CCC' ]},
                b: { tags: ['AAA', 'yyy', 'ccc' ]},
                c: { tags: ['aaa', 'BBB', 'zzz' ]}
            }
            expect(getSelectedTagsList(testData, [])).toEqual([
                { tag: 'aaa', isSelected: true },
                { tag: 'bbb', isSelected: true },
                { tag: 'ccc', isSelected: true },
                { tag: 'xxx', isSelected: true },
                { tag: 'yyy', isSelected: true },
                { tag: 'zzz', isSelected: true }
            ])
        })

    })

    describe('getExcludedTagsFromSelectedTagsList', () => {

        it('should provide list of excluded tags', () => {
            let testData = [
                { tag: 'aaa', isSelected: true },
                { tag: 'bbb', isSelected: false },
                { tag: 'ccc', isSelected: true },
                { tag: 'xxx', isSelected: true },
                { tag: 'yyy', isSelected: true },
                { tag: 'zzz', isSelected: false }
            ]
            expect(getExcludedTagsFromSelectedTagsList(testData)).toEqual([
                'bbb',
                'zzz'
            ])
        })

    })

})

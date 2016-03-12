
import _ from 'lodash'

export function containsSelectedTag(tagList, selectedTags) {
  return _.some(tagList || [], tag => isSelectedTag(tag, selectedTags))
}

export function isSelectedTag(tag, selectedTags) {
  return _.some(selectedTags || [], selectedTag => isMatchingTag(selectedTag, tag));
}

export function isMatchingTag(tag1, tag2) {
  return tagCompareValue(tag1) === tagCompareValue(tag2);
}

export function tagCompareValue(tag) {
  return (tag || '').toLocaleLowerCase();
}


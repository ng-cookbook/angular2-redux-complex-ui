
export function isMatchingText (text1, text2) {
  if (text1 == null || text2 == null) {
    return false
  }
  return String(text1).trim().toLocaleLowerCase() === String(text2).trim().toLocaleLowerCase()
}

// All credits go to https://www.designedbyaturtle.co.uk/2014/convert-string-to-hexidecimal-colour-with-javascript-vanilla/

// Then we'll use the int and convert to hex.
export const hashCode = (str: string) => {
  let hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

// Convert an int to hexadecimal with a max length
// of six characters.
export const intToARGB = (i: number) => {
  let hex =
    ((i >> 24) & 0xff).toString(16) +
    ((i >> 16) & 0xff).toString(16) +
    ((i >> 8) & 0xff).toString(16) +
    (i & 0xff).toString(16)
  // Sometimes the string returned will be too short so we
  // add zeros to pad it out, which later get removed if
  // the length is greater than six.
  hex += '000000'

  return `#${hex.substring(0, 6)}`
}

export const stringToHexColor = (s: string) => {
  return intToARGB(hashCode(s))
}

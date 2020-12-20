/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size === undefined) {
    return string;
  } else if (size === 0 || !size) {
    return '';
  }

  const result = [];
  let counter = 0;
  let current = null;

  for (const char of string) {
    if (current !== char) {
      current = char;
      counter = 0;
    }
    if (counter < size) {
      counter++;
      result.push(char);
    }
  }

  return result.join('');
}

/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sorted = [...arr];
  sorted.sort(function (a, b) {
    const compare = a.localeCompare(b, ['ru', 'eu'], { sensitivity: 'case', caseFirst: 'upper' });
    return param === 'asc' ? compare : -compare;
  });
  return sorted;
}

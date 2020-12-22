/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  if (arr === undefined || !arr.length) {
    return [];
  }
  const result = [];
  // для выбора уникальных и сохранения порядка
  // их следования придется делать 2 цикла
  for (const el of arr) {
    if (!result.includes(el)) {
      result.push(el);
    }
  }
  return result;
}

// можно решить в одну строку
function uniqOneLine(arr) {
  return [...new Set(arr)];
}

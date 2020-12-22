/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const props = path.split('.');
  const getprop_ = (obj) => {
    const prop = props.shift();
    if (typeof obj[prop] === 'object' && props.length) {
      return getprop_(obj[prop]);
    }
    return obj[prop];
  };
  return getprop_;
}

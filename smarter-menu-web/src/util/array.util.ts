export const sortByKeys = (arr: object[], keys: string[]): object[] => {
  return arr.sort((a, b) => {
    for (const key of keys) {
      const compare = compareValues(a[key], b[key]);
      if (compare !== 0) {
        return compare;
      }
    }
    return 0;
  });
};

const compareValues = (a: any, b: any): number => {
  if (a === undefined && b === undefined) return 0;
  if (a === undefined || b === undefined) return a === undefined ? 1 : -1;
  if (typeof a === 'string' && typeof b === 'string')
    return a === b ? 0 : a < b ? -1 : 1;
  if (typeof a === 'number' && typeof b === 'number')
    return a === b ? 0 : a < b ? -1 : 1;
  return 0;
};

export const isSubset = (subset: any[], set: any[]): boolean => {
  const bigSet = new Set(set);

  for (let val of subset) {
    if (!bigSet.has(val)) return false;
  }

  return true;
};

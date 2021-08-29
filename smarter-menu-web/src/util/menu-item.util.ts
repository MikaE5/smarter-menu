export const buildItemLabel = (
  name: string,
  item_number: number | undefined
): string => {
  // do not display number for now
  return name;
  /* if (item_number === undefined) return name;

  return `${item_number} ${name}`; */
};

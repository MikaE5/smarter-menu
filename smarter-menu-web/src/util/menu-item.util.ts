export const buildItemLabel = (
  name: string,
  item_number: number | undefined
): string => {
  if (item_number === undefined) return name;

  return `${item_number} ${name}`;
};

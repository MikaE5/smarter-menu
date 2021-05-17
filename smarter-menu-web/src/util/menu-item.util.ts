import pageContent from '../data/menu-data/page-content.json';

const showItemNumber: boolean = pageContent.menuItems['showItemNumber'];

export const buildItemLabel = (
  name: string,
  item_number: number | undefined
): string => {
  if (!showItemNumber || item_number === undefined) return name;

  return `${item_number} ${name}`;
};

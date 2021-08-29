export interface PageConfig {
  customer_id: string;
  customer_information?: {
    name: string;
    address: string[];
    maps_link?: string;
  };
  page_content: {
    bookmarks: {
      title: string;
      to_bookmarks: string;
      no_items: string;
    };
    header: { title: string };
    menu_items: { allergens: string };
    categories: { home_bread_crumb: string };
    footer: {
      slogan: string;
      data_privacy: string;
      imprint: string;
    };
  };
  id: string;
}

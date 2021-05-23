export const getBaseCustomerPath = (customer: string) => {
  return `/menu/${encodeURIComponent(customer)}`;
};

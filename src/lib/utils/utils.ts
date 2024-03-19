export const formatCurrency = (x: string): string =>
  x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

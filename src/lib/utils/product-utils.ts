export const isProductContains = (product: Product, value: string): boolean => {
  return (
    product.id.toString().includes(value) ||
    product.title.toString().includes(value) ||
    product.body.includes(value) ||
    product.size.includes(value) ||
    product.quantity.toString().includes(value) ||
    (product.variants ?? []).some(
      (variant) =>
        variant.quantity.toString().includes(value) ||
        variant.size.includes(value)
    )
  );
};

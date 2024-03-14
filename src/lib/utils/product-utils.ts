import { Product } from "../../../awsApis";

export const isProductContains = (product: Product, value: string): boolean => {
  const variants = JSON.parse(product.variants ?? "[]") as ProductVariant[];

  return (
    product.id.toString().includes(value) ||
    product.title.toString().includes(value) ||
    product.body.includes(value) ||
    product.size.includes(value) ||
    (variants ?? []).some(
      (variant) =>
        variant.size.includes(value)
    )
  );
};

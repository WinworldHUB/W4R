import { Product } from "../awsApis";
import { forEach, countBy, uniq, filter, map } from "lodash";
import { BEST_SELLER, DEFAULT_BRAND } from "../constants";
export const isProductContains = (product: Product, value: string): boolean => {
  const variants = JSON.parse(product.variants ?? "[]") as ProductVariant[];

  return (
    product.id.toString().includes(value) ||
    product.title.toString().includes(value) ||
    product.body.includes(value) ||
    product.size.includes(value) ||
    product.quantity.toString().includes(value) ||
    (variants ?? []).some(
      (variant) =>
        variant.quantity.toString().includes(value) ||
        variant.size.includes(value)
    )
  );
};


export const getAllSizes = (products: Product[]): ProductFilter[] => {
  const output: string[] = [];

  forEach(products, (product) => {
    const productVariants = JSON.parse(product.variants) as ProductVariant[];

    if (productVariants) {
      output.push(...productVariants.map((variant) => variant.size));
    }
  });

  const uniqueSizes = uniq(output);

  const sizeFilters: ProductFilter[] = [];
  forEach(uniqueSizes, (size) => {
    sizeFilters.push({
      filter: size,
      count: countBy(output, (o) => o === size).true,
      productIds: map(
        filter(products, (product) => {
          const productVariants = JSON.parse(
            product.variants
          ) as ProductVariant[];
          return productVariants.some((variant) => variant.size === size);
        }),
        "id"
      ),
    } as ProductFilter);
  });

  return sizeFilters;
};

export const getAllBrands = (products: Product[]): ProductFilter[] => {
  const output: string[] = Array.from<string>(
    new Set((products ?? []).map((product) => product.brand ?? DEFAULT_BRAND))
  );

  if (output.length === 0)
    return [
      { filter: DEFAULT_BRAND, count: 0, productIds: [] },
    ] as ProductFilter[];

  const brandFilters: ProductFilter[] = [
    getAllFilter(products),
    getBestSellersFilter(products),
  ];
  forEach(
    output.sort((a, b) => a.localeCompare(b)),
    (brand: string) => {
      brandFilters.push({
        filter: brand,
        count: countBy(
          products,
          (product: Product) => (product.brand ?? DEFAULT_BRAND) === brand
        ).true,
        productIds: map(
          filter(
            products,
            (product: Product) => (product.brand ?? DEFAULT_BRAND) === brand
          ),
          "id"
        ),
      } as ProductFilter);
    }
  );

  return brandFilters;
};

export const getBestSellersFilter = (products: Product[]): ProductFilter => {
  const bestSellers = (products ?? []).filter(
    (product) => product.tag.toLowerCase() === BEST_SELLER
  );
  return {
    count: bestSellers.length,
    filter: "Best Sellers",
    productIds: map(bestSellers, "id"),
  };
};

export const getAllFilter = (products: Product[]): ProductFilter => {
  return {
    count: products?.length,
    filter: "All",
    productIds: map(products ?? [], "id"),
  };
};

import { DateTime } from "luxon";
import { useEffect, useState } from "react";

const DEFAULT_ORDER: Order = {
  id: 0,
  orderDate: DateTime.now().toString(),
  orderValue: 0,
  status: "pending",
  member: null,
  paymentDate: null,
  products: [],
  packaging: null,
};

interface OrderState {
  order: Order;
  addPackaging: (packaging: Packaging) => void;
  addMember: (member: Member) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (product: Product) => void;
}

const useOrder = (): OrderState => {
  const [order, updateOrder] = useState<Order>(DEFAULT_ORDER);
  const [products, updateProducts] = useState<Product[]>(
    DEFAULT_ORDER.products
  );

  useEffect(() => {
    updateOrder({ ...order, products: products });
  }, [products]);

  const addPackaging = (packaging: Packaging) =>
    updateOrder({ ...order, packaging: packaging });

  const addMember = (member: Member) =>
    updateOrder({ ...order, member: member });

  const addProduct = (product: Product) =>
    updateProducts([...products, product]);

  const removeProduct = (productId: string) =>
    updateProducts([...products.filter((product) => product.id !== productId)]);

  const updateProduct = (product: Product) =>
    updateProducts(
      products.map((item) => (item.id === product.id ? product : item))
    );

  return {
    order,
    addPackaging,
    addMember,
    addProduct,
    removeProduct,
    updateProduct,
  };
};

export default useOrder;

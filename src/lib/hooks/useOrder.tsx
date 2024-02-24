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
};

interface OrderState {
  order: Order;
  addMember: (member: Member) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
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

  const addMember = (member: Member) =>
    updateOrder({ ...order, member: member });

  const addProduct = (product: Product) =>
    updateProducts([...products, product]);

  const removeProduct = (productId: number) =>
    updateProducts([...products.filter((product) => product.id !== productId)]);

  const updateProduct = (product: Product) =>
    updateProducts(
      products.map((item) => (item.id === product.id ? product : item))
    );

  return { order, addMember, addProduct, removeProduct, updateProduct };
};

export default useOrder;

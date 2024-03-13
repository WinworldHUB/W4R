import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../../../awsApis";

const DEFAULT_ORDER: Order = {
  id: uuidv4(),
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
  const [order, setOrder] = useState<Order>(DEFAULT_ORDER);
  const [products, setProducts] = useState<Product[]>(order.products);

  useEffect(() => {
    setOrder({ ...order, products: products });
  }, [products]);

  const addPackaging = (packaging: Packaging) =>
    setOrder({ ...order, packaging: packaging });

  const addMember = (member: Member) => setOrder({ ...order, member: member });

  const addProduct = (product: Product) => setProducts([...products, product]);

  const removeProduct = (productId: string) =>
    setProducts([...products.filter((product) => product.id !== productId)]);

  const updateProduct = (product: Product) =>
    setProducts([
      ...products.map((item) => (item.id === product.id ? product : item)),
    ]);

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

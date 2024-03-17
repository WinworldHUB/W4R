import { DateTime } from "luxon";
import { useEffect, useState } from "react";

import { OrderVM } from "../vms/order";
import { Member, OrderStatus, PackagingType, Product } from "../awsApis";
const DEFAULT_ORDER: OrderVM = {
  orderDate: DateTime.now().toString(),
  orderValue: 0,
  status: OrderStatus.UNPAID,
  products: [],
  orderNumber: "",
  deliveryDetails: "",
  packagingType: PackagingType.BOX_PACK,
  member: null,
  packaging: null,
};

interface OrderState {
  order: OrderVM;
  addPackaging: (packaging: Packaging) => void;
  addMember: (member: Member) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (product: Product, index: number) => void;
}

const useOrder = (): OrderState => {
  const [order, setOrder] = useState<OrderVM>(DEFAULT_ORDER);
  const [products, setProducts] = useState<Product[]>(order.products);

  useEffect(() => {
    setOrder({ ...order, products: products });
  }, [products]);

  const addPackaging = (packaging: Packaging) =>
    setOrder({
      ...order,
      packagingType: PackagingType[packaging.id],
      packaging: packaging,
    });

  const addMember = (member: Member) => setOrder({ ...order, member: member });

  const addProduct = (product: Product) => setProducts([...products, product]);

  const removeProduct = (productId: string) =>
    setProducts([...products.filter((product) => product.id !== productId)]);

  const updateProduct = (product: Product, index: number) =>
    setProducts([
      ...products.map((item, itemIndex) =>
        itemIndex === index ? product : item
      ),
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

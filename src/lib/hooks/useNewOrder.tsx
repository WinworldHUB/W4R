import { DateTime } from "luxon";
import { useEffect, useState } from "react";

import { OrderVM } from "../vms/order";
import { Member, OrderStatus, PackagingType, Product } from "../awsApis";
import { toAWSDateFormat } from "../utils/date-utils";
import { generateOrderNumber } from "../utils/order-utils";

interface OrderState {
  order: OrderVM;
  addPackaging: (packaging: Packaging) => void;
  addMember: (member: Member) => void;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  updateProduct: (product: Product, index: number) => void;
  updateDeliveryDetails: (deliveryDetails: OrderDeliveryDetails) => void;
  updateOrderNumber: (orderNumber: string) => void;
  updateOrderValue: (orderValue: number) => void;
}

const useNewOrder = (totalOrders: number): OrderState => {
  const DEFAULT_ORDER: OrderVM = {
    orderDate: toAWSDateFormat(DateTime.now()),
    orderValue: 0,
    status: OrderStatus.UNPAID,
    products: [],
    orderNumber: generateOrderNumber(totalOrders),
    deliveryDetails: "",
    packagingType: PackagingType.BOX_PACK,
    member: null,
    packaging: null,
  };

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

  const updateDeliveryDetails = (deliveryDetails: OrderDeliveryDetails) =>
    setOrder({ ...order, deliveryDetails: JSON.stringify(deliveryDetails) });

  const updateOrderNumber = (orderNumber: string) =>
    setOrder({ ...order, orderNumber: orderNumber });

  const updateOrderValue = (orderValue: number) =>
    setOrder({ ...order, orderValue: orderValue });

  return {
    order,
    addPackaging,
    addMember,
    addProduct,
    removeProduct,
    updateProduct,
    updateDeliveryDetails,
    updateOrderNumber,
    updateOrderValue,
  };
};

export default useNewOrder;

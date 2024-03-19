import { useState } from "react";
import { Order } from "../awsApis";
import useApi from "./useApi";
import { ORDERS_APIS } from "../constants/api-constants";
import { trimOrder } from "../utils/order-utils";

interface ExistingOrderState {
  order: Order;
  updateOrder: (updatedOrder: Order) => void;
  saveOrder: (updatedOrder: Order) => void;
  isShouldReload: boolean;
}

const useExistingOrder = (existingOrder: Order): ExistingOrderState => {
  const [order, updateOrder] = useState<Order>(existingOrder);
  const { putData: updateOrderOnServer } = useApi<Order>();
  const [isShouldReload, setIsShouldReload] = useState<boolean>(false);

  const saveOrder = (updatedOrder: Order) => {
    setIsShouldReload(false);
    updateOrderOnServer(
      ORDERS_APIS.UPDATE_ORDER_API,
      trimOrder(updatedOrder)
    ).then(() => setIsShouldReload(true));
  };

  return { order, updateOrder, isShouldReload, saveOrder };
};

export default useExistingOrder;

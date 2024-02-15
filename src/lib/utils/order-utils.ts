export const isOrderContains = (order: Order, value: string): boolean => {
  return (
    order.id.toString().includes(value) ||
    order.orderDate.includes(value) ||
    order.status.includes(value) ||
    order.orderValue.toString().includes(value) ||
    (order.paymentDate ?? "").includes(value)
  );
};

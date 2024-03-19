import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import PageLayout from "../lib/components/page-layout";
import OrdersDataTable from "../lib/components/order/orders-data-table";
import CreateOrder from "../lib/components/order/create-order";
import useApi from "../lib/hooks/useApi";
import {
  MEMBERS_APIS,
  ORDERS_APIS,
  PRODUCTS_APIS,
} from "../lib/constants/api-constants";
import { Product, Member, Order } from "../lib/awsApis";
import PageLoading from "../lib/components/pageLoading";
import EditOrder from "../lib/components/order/edit-order";
import useExistingOrder from "../lib/hooks/useExistingOrder";
import { trimOrder } from "../lib/utils/order-utils";
const Home: FC<PageProps> = (pageProps) => {
  const { data: members, getData: getAllMembers } = useApi<Member[]>();
  const { data: products, getData: getAllProducts } = useApi<Product[]>();
  const { data: orders, getData: getAllOrders } = useApi<Order[]>();
  const { postData: createOrder } = useApi<Order[]>();
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  const {
    order: selectedOrder,
    updateOrder,
    saveOrder,
    isShouldReload,
  } = useExistingOrder(null);

  useEffect(() => {
    if (isShouldReload) {
      getAllOrders(ORDERS_APIS.GET_ALL_ORDERS_API);
    }
  }, [isShouldReload]);

  useEffect(() => {
    getAllOrders(ORDERS_APIS.GET_ALL_ORDERS_API);
    getAllMembers(MEMBERS_APIS.GET_ALL_MEMBERS_API);
    getAllProducts(PRODUCTS_APIS.GET_ALL_PRODUCTS_API);
  }, []);

  if (!members || !products || !orders)
    return (
      <PageLayout {...pageProps}>
        <PageLoading />
      </PageLayout>
    );

  return (
    <PageLayout {...pageProps}>
      <Modal
        size="xl"
        show={showNewOrderModal}
        onHide={() => setShowNewOrderModal(false)}
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>New Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateOrder
            totalOrders={orders.length}
            members={members ?? []}
            products={products ?? []}
            handleClose={() => setShowNewOrderModal(false)}
            onOrderReady={(newOrder) => {
              createOrder(
                ORDERS_APIS.ADD_ORDER_API,
                trimOrder(newOrder, true)
              ).then(() => {
                getAllOrders(ORDERS_APIS.GET_ALL_ORDERS_API);
                setShowNewOrderModal(false);
              });
            }}
          />
        </Modal.Body>
      </Modal>

      <Modal
        size="xl"
        show={selectedOrder !== null}
        onHide={() => updateOrder(null)}
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditOrder
            order={selectedOrder}
            onClose={() => updateOrder(null)}
            onUpdate={(updatedOrder) => {
              saveOrder(updatedOrder);
              updateOrder(null);
            }}
          />
        </Modal.Body>
      </Modal>

      <OrdersDataTable
        data={orders}
        onRowClicked={(clickedOrder) => updateOrder(clickedOrder)}
        onCreateClick={() => setShowNewOrderModal(true)}
      />
    </PageLayout>
  );
};

export default Home;

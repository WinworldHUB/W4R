import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import PageLayout from "../lib/components/page-layout";
import OrdersDataTable from "../lib/components/order/orders-data-table";
import CreateOrder from "../lib/components/order/create-order";
import useApi from "../lib/hooks/useApi";
import { MEMBERS_APIS, PRODUCTS_APIS } from "../lib/constants/api-constants";
import { Product, Member, Order } from "../lib/awsApis";
import PageLoading from "../lib/components/pageLoading";
const Home: FC<PageProps> = (pageProps) => {
  const { data: members, getData: getAllMembers } = useApi<Member[]>();
  const { data: products, getData: getAllProducts } = useApi<Product[]>();
  const { data: orders, getData: getAllOrders } = useApi<Order[]>();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    getAllMembers(MEMBERS_APIS.GET_ALL_MEMBERS_API);
    getAllProducts(PRODUCTS_APIS.GET_ALL_PRODUCTS_API);
  }, []);

  if (!members || !products)
    return (
      <PageLayout {...pageProps}>
        <PageLoading />
      </PageLayout>
    );

  return (
    <PageLayout {...pageProps}>
      <Modal size="xl" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>New Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateOrder
            members={members ?? []}
            products={products ?? []}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>

      <OrdersDataTable
        data={orders}
        onRowClicked={() => {}}
        onCreateClick={handleShow}
      />
    </PageLayout>
  );
};

export default Home;

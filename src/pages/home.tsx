import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import PageLayout from "../lib/components/page-layout";
import data from "../lib/data/orders.json";
import OrdersDataTable from "../lib/components/order/orders-data-table";
import CreateOrder from "../lib/components/order/create-order";
import useApi from "../lib/hooks/useApi";
import { MEMBERS_APIS, PRODUCTS_APIS } from "../lib/constants/api-constants";

const Home: FC<PageProps> = (pageProps) => {
  const { data: members, getData: getAllMembers } = useApi<Member[]>();
  const { data: products, getData: getAllProducts } = useApi<Product[]>();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    getAllMembers(MEMBERS_APIS.GET_ALL_MEMBERS_API);
    getAllProducts(PRODUCTS_APIS.GET_ALL_PRODUCTS_API);
  }, []);

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
        data={data}
        onRowClicked={() => {}}
        onCreateClick={handleShow}
      />
    </PageLayout>
  );
};

export default Home;

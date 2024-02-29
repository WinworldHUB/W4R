import { FC, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import PageLayout from "../lib/components/page-layout";
import data from "../lib/data/orders.json";
import OrdersDataTable from "../lib/components/order/orders-data-table";
import CreateOrder from "../lib/components/order/create-order";
import useApi from "../lib/hooks/useApi";

const Home: FC<PageProps> = (pageProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <PageLayout {...pageProps}>
      <Modal size="xl" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>New Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateOrder handleClose={handleClose} />
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

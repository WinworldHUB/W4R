import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PageLayout from "../lib/components/page-layout";
import data from "../lib/data/orders.json";
import OrdersDataTable from "../lib/components/orders-data-table";
import CreateOrder from "../lib/components/create-order";

const Home = (pageProps: PageProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <PageLayout {...pageProps}>
      <Button className="my-4" onClick={handleShow}>Create Order</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateOrder handleClose={handleClose} />
        </Modal.Body>
      </Modal>

      <OrdersDataTable data={data} onRowClicked={() => {}} />
    </PageLayout>
  );
};

export default Home;

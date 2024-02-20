import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
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
      <Modal size="xl" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>New Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateOrder handleClose={handleClose} />
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="light" onClick={() => {}}>
            Cancel
          </Button>
          <div>
            <Button variant="secondary" onClick={() => {}} className="me-2">
              Reset
            </Button>
            <Button variant="primary" onClick={() => {}}>
              Submit
            </Button>
          </div>
        </Modal.Footer>
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

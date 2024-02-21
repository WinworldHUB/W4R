import React, { useState } from "react";
import { Form, Button, ListGroup, Card, Row, Col } from "react-bootstrap";
import members from "../data/users.json";
import products from "../data/products.json";

import { Typeahead } from "react-bootstrap-typeahead";
import OrderCart from "./order-cart";


interface CreateOrderProps {
  handleClose: () => void;
}

const CreateOrder: React.FC<CreateOrderProps> = ({ handleClose }) => {
  const [selectedMember, setSelectedMember] = useState<Member>();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const processedProducts = Array.from(
    new Set<Product>(products.filter((product) => (product.Title ?? "") !== ""))
  );

  return (
    <>
      <Row>
        <Col xs="auto">
          <Form.Label>Member:</Form.Label>
        </Col>
        <Col>
          <Typeahead
            id="basic-typeahead-single"
            labelKey="Customer name"
            options={members}
            placeholder="Choose a member..."
            onChange={(selected) => setSelectedMember(selected[0] as Member)}
          />
        </Col>
        <Col>
          <Card>
            <Card.Header>{selectedMember?.["Customer name"]}</Card.Header>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  Email: {selectedMember?.["Customer email"]}
                </ListGroup.Item>
                <ListGroup.Item>
                  Status: {selectedMember?.["Status"]}
                </ListGroup.Item>
                <ListGroup.Item>
                  Subscription: {selectedMember?.["Line 0 title"]}
                </ListGroup.Item>
                <ListGroup.Item>
                  Subscription type:{" "}
                  {selectedMember?.["Line 0 selling plan name"]}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="py-3">
        <Col xs="auto">Products: </Col>
        <Col>
          <Typeahead
            id="basic-typeahead-single"
            labelKey="Title"
            options={processedProducts ?? []}
            placeholder="Choose a product..."
            onChange={(selected) => setSelectedProduct(selected[0] as Product)}
          />
        </Col>
        <Col xs="auto">
          <Button
            variant="warning"
            onClick={() => {
              if (selectedProduct) {
                setSelectedProducts([...selectedProducts, selectedProduct]);
              }
            }}
          >
            Add product
          </Button>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          <OrderCart data={selectedProducts}/>
        </Col>
      </Row>
    </>
  );
};

export default CreateOrder;

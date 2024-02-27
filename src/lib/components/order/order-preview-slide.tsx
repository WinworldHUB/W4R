import { FC } from "react";
import ProductsPreviewTable from "./products-preview-table";
import { Card, Col, Row } from "react-bootstrap";

interface OrderPreviewSlideProps {
  order: Order;
}

const OrderPreviewSlide: FC<OrderPreviewSlideProps> = ({ order }) => {
  return (
    <Row>
      <Col xs="6">
        <h6>Order in name of: {order.member?.["Customer name"]}</h6>
        <p>
          Deliver to: {order.member?.["Delivery first name"]}&nbsp;
          {order.member?.["Delivery last name"]}
        </p>
      </Col>
      <Col xs="6" className="text-end bg-light rounded pe-4">
        <p>Email: {order.member?.["Customer email"]}</p>
        <p>Phone: {order.member?.["Customer phone"]}</p>
        <p>Delivery Phone: {order.member?.["Delivery phone"]}</p>
        <p>Delivery Address: {order.member?.["Delivery address 1"]}</p>
      </Col>
      <Col xs="12" className="pt-3">
        <ProductsPreviewTable products={order.products ?? []} />
      </Col>
      <Col xs="12" className="pt-3">
        <Card>
          <Card.Header>
            <Card.Title>{order.packaging?.title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <p>{order.packaging?.description}</p>
            <p>Minimum Quantity: {order.packaging?.minQuantity}</p>
            <p>Maximum Quantity: {order.packaging?.maxQuantity}</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderPreviewSlide;

import { FC, useEffect, useMemo, useState } from "react";
import ProductsPreviewTable from "./products-preview-table";
import { Card, Col, Form, Row } from "react-bootstrap";
import { OrderVM } from "../../vms/order";
import {
  generateOrderNumber,
  getDeliveryDetails,
} from "../../utils/order-utils";
import { EMPTY_STRING } from "../../constants";

interface OrderPreviewSlideProps {
  order: OrderVM;
  onReady: (isReady: boolean) => void;
  onUpdate: (deliveryDetails: OrderDeliveryDetails) => void;
  onOrderNumberUpdate: (orderNumber: string) => void;
  onOrderValueUpdate: (orderValue: number) => void;
  totalOrders: number;
}

const OrderPreviewSlide: FC<OrderPreviewSlideProps> = ({
  order,
  onReady,
  onUpdate,
  onOrderNumberUpdate,
  onOrderValueUpdate,
  totalOrders,
}) => {
  const [deliveryDetails, setDeliveryDetails] = useState<OrderDeliveryDetails>(
    getDeliveryDetails(order)
  );
  const [orderNumber, setOrderNumber] = useState<string>(
    order.orderNumber === EMPTY_STRING
      ? generateOrderNumber(totalOrders)
      : order.orderNumber
  );

  useEffect(() => {
    onReady(
      deliveryDetails.memberName !== EMPTY_STRING &&
        deliveryDetails.deliverAt !== EMPTY_STRING &&
        deliveryDetails.memberPhone !== EMPTY_STRING
    );
    onUpdate(deliveryDetails);
  }, [deliveryDetails]);

  const orderValue = useMemo(
    () =>
      order.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ),
    [order]
  );

  onOrderValueUpdate(orderValue);

  return (
    <Row>
      <Col xs="6">
        <Row>
          <Col xs={4}>
            <strong>Order #:</strong>
          </Col>
          <Col xs={8}>
            <Form.Control
              type="text"
              placeholder="Order #"
              value={orderNumber}
              onChange={(e) => onOrderNumberUpdate(e.target.value)}
            />
          </Col>
          <Col xs={4}>
            <strong>Order in name of:</strong>
          </Col>
          <Col xs={8}>
            <p>{deliveryDetails.memberName}</p>
          </Col>
          <Col xs={4}>
            <strong>Deliver To:</strong>
          </Col>
          <Col xs={8}>
            <p>
              {deliveryDetails.deliverTo} <br />
              {deliveryDetails.deliverAt} <br />
              {deliveryDetails.memberEmail} <br />
              {deliveryDetails.memberPhone}
            </p>
          </Col>
        </Row>
      </Col>
      <Col xs="6" className="text-end bg-light rounded pe-4">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={4}>
              Email:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="email"
                placeholder="Email"
                value={deliveryDetails.memberEmail}
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    memberEmail: e.target.value,
                  })
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhone">
            <Form.Label column sm={4}>
              Phone:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="phone"
                placeholder="Phone"
                value={deliveryDetails.memberPhone}
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    memberPhone: e.target.value,
                  })
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhone">
            <Form.Label column sm={4}>
              Deliver to:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Deliver to"
                value={deliveryDetails.deliverTo}
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    deliverTo: e.target.value,
                  })
                }
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPhone">
            <Form.Label column sm={4}>
              Deliver at:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Deliver at"
                value={deliveryDetails.deliverAt}
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    deliverAt: e.target.value,
                  })
                }
              />
            </Col>
          </Form.Group>
        </Form>
      </Col>
      <Col xs="12" className="pt-3">
        <ProductsPreviewTable
          products={order.products ?? []}
          orderValue={orderValue}
        />
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

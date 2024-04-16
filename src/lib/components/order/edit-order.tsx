import { FC, useState } from "react";
import { Order, OrderStatus, Product } from "../../awsApis";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import ProductsPreviewTable from "./products-preview-table";
import {
  DEFAULT_PACKAGES,
  GBP_SYMBOL,
  TIMELINE_STATUSES,
} from "../../constants";
import HorizontalTimeline from "../horizontal-timeline";

interface EditOrderProps {
  order: Order;
  onClose: VoidFunction;
  onUpdate: (updatedOrder: Order) => void;
}

const EditOrder: FC<EditOrderProps> = ({ order, onClose, onUpdate }) => {
  const [currentOrder, setCurrentOrder] = useState<Order>(order);
  const deliveryDetails = JSON.parse(
    currentOrder?.deliveryDetails ?? "{}"
  ) as OrderDeliveryDetails;
  const products = JSON.parse(currentOrder?.products ?? "[]") as Product[];
  const packaging = DEFAULT_PACKAGES.filter(
    (p) => p.id === currentOrder?.packagingType.toString()
  )[0];

  return (
    <Row>
      <Col xs="6">
        <Row>
          <Col xs={4}>
            <strong>Order #:</strong>
          </Col>
          <Col xs={8}>
            <p>{currentOrder.orderNumber}</p>
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
        <Form className="py-2">
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={4}>
              Status:
            </Form.Label>
            <Col sm={8}>
              <Form.Select
                value={currentOrder?.status ?? ""}
                onChange={(e) =>
                  setCurrentOrder({
                    ...currentOrder,
                    status: OrderStatus[e.target.value],
                  })
                }
              >
                {Object.values(OrderStatus).map((status, index) => (
                  <option key={`${status}-${index}`}>{status}</option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={4}>
              Tracking Number:
            </Form.Label>
            <Col sm={8}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Royal mail tracking number"
                  aria-label="Royal mail tracking number"
                  value={currentOrder?.trackingNumber ?? ""}
                  onChange={(e) =>
                    setCurrentOrder({
                      ...currentOrder,
                      trackingNumber: OrderStatus[e.target.value],
                    })
                  }
                  disabled={currentOrder.status !== OrderStatus.PROCESSING}
                />
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={4}>
              Tracking status:
            </Form.Label>
            <Col sm={8}>
              <Form.Select
                disabled={currentOrder.status !== OrderStatus.PROCESSING}
              >
                <option value="IN TRANSIT">IN TRANSIT</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </Form>
      </Col>
      <Col xs="12" className="pt-3">
        <ProductsPreviewTable
          products={products ?? []}
          orderValue={currentOrder.orderValue}
        />
      </Col>
      <Col xs="12" className="pt-3">
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <Card.Title>{packaging.title ?? ""}</Card.Title>
            <Card.Title>
              {GBP_SYMBOL}
              {packaging.cost ?? 0}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <p>{packaging.description ?? ""}</p>
            <p>Minimum Quantity: {packaging.minQuantity ?? ""}</p>
            <p>Maximum Quantity: {packaging.maxQuantity ?? ""}</p>
          </Card.Body>
        </Card>
      </Col>
      {currentOrder.status === OrderStatus.PROCESSING && (
        <Col xs="12" className="pt-3">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title>Order tracking status</Card.Title>
              <Card.Title className="fw-bold text-primary">
                {currentOrder.trackingStatus ??
                  "Status will be updated here when available ..."}
              </Card.Title>
            </Card.Header>
            <Card.Body className="d-flex justify-content-center">
              <HorizontalTimeline
                items={TIMELINE_STATUSES}
                orderStatus={order?.status}
                deliveryStatus={order?.trackingStatus}
              />
            </Card.Body>
          </Card>
        </Col>
      )}
      <Col xs="12" className="text-end pt-2">
        <Button variant="secondary" className="me-2" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => onUpdate(currentOrder)}>Save</Button>
      </Col>
    </Row>
  );
};

export default EditOrder;

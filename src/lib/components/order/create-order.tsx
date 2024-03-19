import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card, Spinner } from "react-bootstrap";

import Slider from "../slider";
import AddMemberSlide from "./add-member-slide";
import AddProductSlide from "./add-product-slide";
import AddPackagingSlide from "./add-packaging-slide";
import {
  CreateOrderSlides,
  DEFAULT_PACKAGES,
  EMPTY_STRING,
} from "../../constants";
import AddProductQuantitySlide from "./add-product-quantities-slide";
import OrderPreviewSlide from "./order-preview-slide";
import CannotProceed from "./caanot-proceed";
import { Member, Order, Product } from "../../awsApis";
import useNewOrder from "../../hooks/useNewOrder";
import { DateTime } from "luxon";
import { toAWSDateFormat } from "../../utils/date-utils";
import {
  calculateOrderValue,
  isDeliveryDetailsValid,
} from "../../utils/order-utils";

const TOTAL_SLIDES = 5;
const SLIDE_TITLES = [
  "STEP 1: Select packaging type",
  "STEP 2: Select member to place an order",
  "STEP 3: Add products to the order",
  "STEP 4: Update quantities and variants for products",
  "STEP 5: Review and confirm the order",
  "STEP 6: Order placed",
];
const NEXT_BUTTON_TITLES = [
  "Add Member",
  "Add Products",
  "Add Quantities",
  "Preview",
  "Submit",
  "",
];
const BACK_BUTTON_TITLES = [
  "",
  "Select Packaging",
  "Add Member",
  "Add Products",
  "Add Quantities",
  "Preview",
];

interface CreateOrderProps {
  handleClose: () => void;
  members: Member[];
  products: Product[];
  onOrderReady: (order: Order) => void;
  totalOrders: number;
}

const CreateOrder: React.FC<CreateOrderProps> = ({
  handleClose,
  members,
  products,
  onOrderReady,
  totalOrders,
}) => {
  const [slideIndex, setSlideIndex] = useState<CreateOrderSlides>(
    CreateOrderSlides.SelectPackaging
  );
  const [isPageValid, setIsPageValid] = useState<boolean>(false);

  const {
    order,
    addPackaging,
    addMember,
    addProduct,
    updateProduct,
    removeProduct,
    updateDeliveryDetails,
    updateOrderNumber,
  } = useNewOrder(totalOrders);

  useEffect(() => {
    const totalQuantities = order.products.reduce(
      (total, product) => total + product.quantity,
      0
    );

    switch (slideIndex) {
      case CreateOrderSlides.SelectPackaging:
        setIsPageValid(!!order.packaging);
        break;

      case CreateOrderSlides.SelectMember:
        setIsPageValid(!!order.member);
        break;

      case CreateOrderSlides.SelectProducts:
        setIsPageValid(order.products.length > 0);
        break;

      case CreateOrderSlides.SelectQuantities:
        setIsPageValid(
          totalQuantities >= order.packaging?.minQuantity &&
            totalQuantities <= order.packaging?.maxQuantity
        );
        break;

      case CreateOrderSlides.Preview:
        const isValid = isDeliveryDetailsValid(order.deliveryDetails);
        setIsPageValid(isValid);

        if (isValid) {
          setIsPageValid(order.orderNumber.trim() !== EMPTY_STRING);
        }

        break;

      case CreateOrderSlides.Submit:
        // Submit order
        onOrderReady({
          ...order,
          orderDate: toAWSDateFormat(DateTime.now()),
          products: JSON.stringify(order.products),
          orderValue: calculateOrderValue(order.products),
          __typename: null,
          createdAt: null,
          updatedAt: null,
          id: null,
        });
        break;

      default:
        setIsPageValid(true);
        break;
    }
  }, [order, slideIndex]);

  if (members.length === 0) {
    return <CannotProceed message="Cannot proceed since, no members loaded" />;
  }

  if (products.length === 0) {
    return <CannotProceed message="Cannot proceed since, no products loaded" />;
  }

  return (
    <>
      <Row>
        <Col md="12" sm="12">
          <Card>
            <Card.Header>
              <Card.Title>{SLIDE_TITLES[slideIndex]}</Card.Title>
            </Card.Header>
            <Card.Body className="max-500">
              <Slider slideTo={slideIndex}>
                {slideIndex === CreateOrderSlides.SelectPackaging && (
                  <AddPackagingSlide
                    selectedPackagingId={order.packaging?.id}
                    packagings={DEFAULT_PACKAGES}
                    onSelectPackaging={(packaging) => addPackaging(packaging)}
                  />
                )}
                {slideIndex === CreateOrderSlides.SelectMember && (
                  <AddMemberSlide
                    selectedMember={order.member}
                    members={members}
                    onSelectedMember={(member) => addMember(member)}
                  />
                )}
                {slideIndex === CreateOrderSlides.SelectProducts && (
                  <AddProductSlide
                    products={products}
                    productsInOrder={order.products}
                    onSelectedProduct={(product) => addProduct(product)}
                    onRemoveProduct={(product) => removeProduct(product.id)}
                  />
                )}
                {slideIndex === CreateOrderSlides.SelectQuantities && (
                  <AddProductQuantitySlide
                    minQuantity={order.packaging?.minQuantity}
                    maxQuantity={order.packaging?.maxQuantity}
                    products={order.products}
                    onProductUpdate={(product, index) =>
                      updateProduct(product, index)
                    }
                  />
                )}
                {slideIndex === CreateOrderSlides.Preview && (
                  <OrderPreviewSlide
                    totalOrders={totalOrders}
                    order={order}
                    onReady={(isReady) => {
                      setIsPageValid(isReady);
                    }}
                    onUpdate={(deliveryDetails) =>
                      updateDeliveryDetails(deliveryDetails)
                    }
                    onOrderNumberUpdate={updateOrderNumber}
                    onOrderValueUpdate={() => {}}
                  />
                )}
                {slideIndex === CreateOrderSlides.Submit && (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Creating order...</span>
                  </Spinner>
                )}
              </Slider>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="pt-3">
        <Col md="12" sm="12" className="d-flex justify-content-between">
          {BACK_BUTTON_TITLES[slideIndex] !== "" ? (
            <Button
              variant="secondary"
              disabled={slideIndex === 0}
              onClick={() => {
                if (slideIndex > 0) {
                  setSlideIndex(slideIndex - 1);
                }
              }}
            >
              {BACK_BUTTON_TITLES[slideIndex]}
            </Button>
          ) : (
            <span>&nbsp;</span>
          )}
          {slideIndex + 1} / {TOTAL_SLIDES + 1}
          {NEXT_BUTTON_TITLES[slideIndex] !== "" ? (
            <Button
              disabled={slideIndex === TOTAL_SLIDES || !isPageValid}
              onClick={() => {
                if (slideIndex < TOTAL_SLIDES) {
                  setSlideIndex(slideIndex + 1);
                }
              }}
            >
              {NEXT_BUTTON_TITLES[slideIndex]}
            </Button>
          ) : (
            <span>&nbsp;</span>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CreateOrder;

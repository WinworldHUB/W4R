import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import members from "../../data/users.json";
import products from "../../data/formatted_products.json";

import Slider from "../slider";
import AddMemberSlide from "./add-member-slide";
import AddProductSlide from "./add-product-slide";
import useOrder from "../../hooks/useOrder";

const TOTAL_SLIDES = 4;
const NEXT_BUTTON_TITLES = [
  "Add Products",
  "Add Quantities",
  "Preview",
  "Submit",
  "",
];
const BACK_BUTTON_TITLES = [
  "",
  "Select Member",
  "Add Products",
  "Add Quantities",
];

interface CreateOrderProps {
  handleClose: () => void;
}

const CreateOrder: React.FC<CreateOrderProps> = ({ handleClose }) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const { order, addMember, addProduct } = useOrder();

  return (
    <>
      <Row>
        <Col md="8" sm="12">
          <Slider slideTo={slideIndex}>
            <AddMemberSlide
              members={members}
              onSelectedMember={(member) => addMember(member)}
            />
            <AddProductSlide
              products={products as Product[]}
              productsInOrder={order.products}
              onSelectedProduct={(product) => addProduct(product)}
            />
            <div
              style={{ height: "300px", width: "100%" }}
              className="bg-primary"
            >
              Slide 3
            </div>
            <div
              style={{ height: "400px", width: "100%" }}
              className="bg-primary"
            >
              Slide 4
            </div>
            <div
              style={{ height: "500px", width: "100%" }}
              className="bg-primary"
            >
              Slide 5
            </div>
          </Slider>
        </Col>
        <Col md="4" className=".d-none .d-md-block  bg-light shadow">
          Preview
        </Col>
      </Row>
      <Row className="pt-3">
        <Col md="8" sm="12" className="d-flex justify-content-between">
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
              disabled={slideIndex === TOTAL_SLIDES}
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
        <Col md="4" className=".d-none .d-md-block">
          Preview
        </Col>
      </Row>
    </>
  );
};

export default CreateOrder;

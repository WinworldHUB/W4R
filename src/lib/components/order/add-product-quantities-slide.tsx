import { FC, useMemo, useState } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import { getArrayFromTo } from "../../utils/array-utils";

interface AddProductQuantitySlideProps {
  maxQuantities: number;
  products: Product[];
  onProductUpdate: (product: Product) => void;
}

const AddProductQuantitySlide: FC<AddProductQuantitySlideProps> = ({
  maxQuantities,
  products,
  onProductUpdate,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

  const totalQuantities = useMemo(() => {}, [products]);

  return (
    <>
      <Accordion
        onSelect={(activeEventKey) => {
          console.log(activeEventKey);
          if (activeEventKey) {
            setSelectedProduct(
              products.filter(
                (product) => product.id === activeEventKey?.[0]
              )[0]
            );
          }
        }}
        defaultActiveKey={selectedProduct?.id}
        alwaysOpen={false}
      >
        {products.map((product, index) => (
          <Accordion.Item eventKey={product.id} key={`${product.id}-${index}`}>
            <Accordion.Header>{product.title}</Accordion.Header>
            <Accordion.Body>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalSize"
              >
                <Form.Label column sm={2}>
                  Size
                </Form.Label>
                <Col sm={10}>
                  <Form.Select
                    aria-label="Products sizes"
                    title="Product sizes"
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  >
                    {product.variants.map((variant, vIndex) => (
                      <option key={`${variant.size}-${vIndex}`} value={vIndex}>
                        {variant.size}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalQuantity"
              >
                <Form.Label column sm={2}>
                  Quantity
                </Form.Label>
                <Col sm={10}>
                  <Form.Select
                    aria-label="Products quantities"
                    title="Product quantities"
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  >
                    {getArrayFromTo(1, maxQuantities).map(
                      (quantity, qIndex) => (
                        <option key={`${quantity}-${qIndex}`} value={quantity}>
                          {quantity}
                        </option>
                      )
                    )}
                  </Form.Select>
                </Col>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

export default AddProductQuantitySlide;

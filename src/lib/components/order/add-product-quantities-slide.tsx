import { FC, useMemo, useState } from "react";
import { Accordion, Col, Form, Row, Image, Container } from "react-bootstrap";
import { getArrayFromTo } from "../../utils/array-utils";
import { Product } from "../../../../awsApis";

interface AddProductQuantitySlideProps {
  minQuantity: number;
  maxQuantity: number;
  products: Product[];
  onProductUpdate: (product: Product) => void;
}

const AddProductQuantitySlide: FC<AddProductQuantitySlideProps> = ({
  minQuantity,
  maxQuantity,
  products,
  onProductUpdate,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const variants = useMemo(
    () => JSON.parse(selectedProduct?.variants ?? "[]") as ProductVariant[],
    [selectedProduct]
  );

  return (
    <Container className="min-400">
      <Accordion
        onSelect={(activeEventKey) => {
          if (activeEventKey) {
            setSelectedProduct(
              products.filter((product) => product.id === activeEventKey)[0]
            );
          }
        }}
        defaultActiveKey={selectedProduct?.id}
        alwaysOpen={false}
      >
        {products.map((product) => (
          <Accordion.Item eventKey={product.id} key={product.id}>
            <Accordion.Header>
              <div className="w-50">
                <Image
                  rounded
                  src={product["featuredImage"]}
                  width="32px"
                  loading="lazy"
                />
                &nbsp;{product.title}
              </div>
              <div className="w-50 text-end me-2">
                Size:&nbsp;{product.size}&nbsp;&nbsp;&nbsp;&nbsp;Quantity:&nbsp;
                {product.quantity}
              </div>
            </Accordion.Header>
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
                      setSelectedProduct({
                        ...selectedProduct,
                        size: variants[parseInt(e.target.value)].size,
                      });
                      onProductUpdate({
                        ...selectedProduct,
                        size: variants[parseInt(e.target.value)].size,
                      });
                    }}
                  >
                    {variants.map((variant, vIndex) => (
                      <option key={variant.size} value={vIndex}>
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
                      setSelectedProduct({
                        ...selectedProduct,
                        quantity: parseInt(e.target.value),
                      });
                      onProductUpdate({
                        ...selectedProduct,
                        quantity: parseInt(e.target.value),
                      });
                    }}
                  >
                    {getArrayFromTo(1, maxQuantity).map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default AddProductQuantitySlide;

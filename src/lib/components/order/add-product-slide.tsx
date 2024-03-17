import { FC } from "react";
import { Card, Col, Container, ListGroup, Row, Image } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { Product } from "../../awsApis";

interface AddProductSlideProps {
  products: Product[];
  productsInOrder: Product[];
  onSelectedProduct: (product: Product) => void;
  onRemoveProduct: (product: Product) => void;
}

const AddProductSlide: FC<AddProductSlideProps> = ({
  products,
  productsInOrder,
  onSelectedProduct,
  onRemoveProduct,
}) => {
  return (
    <Container className="min-400">
      <Row>
        <Col xs="auto">Select product:</Col>
        <Col>
          <Typeahead
            id="select-member-slide-typeahead"
            options={products}
            labelKey="title"
            onChange={(selected: unknown[]) => {
              const product = selected[0] as Product;

              if (product) {
                product.quantity = 1;
                onSelectedProduct(product);
              }
            }}
          />
        </Col>
      </Row>
      <Row className="pt-3">
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>Selected products</Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup className="max-350">
                {(productsInOrder ?? []).map((product) => (
                  <ListGroup.Item
                    className="d-flex justify-content-between align-items-center"
                    key={product.id}
                  >
                    <div className="d-flex align-items-center">
                      <Image
                        rounded
                        src={product["featuredImage"]}
                        width="50px"
                        loading="lazy"
                      />
                      &nbsp;
                      {product.title}
                    </div>
                    <Link to="" onClick={() => onRemoveProduct(product)}>
                      <MdClose className="text-danger" title="Remove product" />
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProductSlide;

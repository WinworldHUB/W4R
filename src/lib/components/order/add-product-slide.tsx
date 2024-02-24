import { FC } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

interface AddProductSlideProps {
  products: Product[];
  productsInOrder: Product[];
  onSelectedProduct: (product: Product) => void;
}

const AddProductSlide: FC<AddProductSlideProps> = ({
  products,
  productsInOrder,
  onSelectedProduct,
}) => {
  return (
    <Container>
      <Row>
        <Col xs="auto">Select product:</Col>
        <Col>
          <Typeahead
            id="select-member-slide-typeahead"
            options={products}
            labelKey="Title"
            onChange={(selected: unknown[]) => {
              const product = selected[0] as Product;

              if (product) {
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
              <ListGroup>
                {(productsInOrder ?? []).map((product) => (
                  <ListGroup.Item>{product.Title}</ListGroup.Item>
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

import { FC } from "react";
import { Card, Col, Form, Nav, Row } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";

interface ProductsPreviewTableProps {
  products: Product[];
}

const columns: TableColumn<Product>[] = [
  {
    name: "Pic",
    maxWidth: "70px",
    selector: (row) => row.featuredImage,
    cell: (row) => (
      <img
        src={row.featuredImage}
        alt="Featured"
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    maxWidth: "70px",
    name: "Size",
    selector: (row) => row.size,
  },
  {
    maxWidth: "70px",
    name: "Quantity",
    selector: (row) => row.quantity,
  },

  {
    maxWidth: "100px",
    name: "Price",
    selector: (row) => row.price,
  },
];

const ProductsPreviewTable: FC<ProductsPreviewTableProps> = ({ products }) => {
  const total = products.reduce((total, product) => total + product.price, 0);

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <Card.Title>Products</Card.Title>
        <Card.Title>Total: {total}</Card.Title>
      </Card.Header>
      <Card.Body>
        <DataTable
          columns={columns}
          data={products}
          responsive
          className="border"
        />
      </Card.Body>
    </Card>
  );
};

export default ProductsPreviewTable;

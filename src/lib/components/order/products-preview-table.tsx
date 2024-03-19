import { FC } from "react";
import { Card } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { Product } from "../../awsApis";
import { GBP_SYMBOL } from "../../constants";
import { formatCurrency } from "../../utils/utils";

interface ProductsPreviewTableProps {
  products: Product[];
  orderValue: number;
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
    selector: (row) => `${GBP_SYMBOL} ${formatCurrency(row.price.toFixed(2))}`,
  },
];

const ProductsPreviewTable: FC<ProductsPreviewTableProps> = ({
  products,
  orderValue,
}) => {
  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <Card.Title>Products</Card.Title>
        <Card.Title>
          Total: {GBP_SYMBOL} {formatCurrency(orderValue.toFixed(2))}
        </Card.Title>
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

import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { Card, Col, Form, Nav, Row } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";

interface ProductsDataTableProps {
  data;
  onRowClicked: Dispatch<SetStateAction<Product>>;
}

const ProductsDataTable: FC<ProductsDataTableProps> = ({
  data,
  onRowClicked,
}: ProductsDataTableProps) => {
  const [filterText, setFilterText] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const columns: TableColumn<Product>[] = [
    {
      name: "Handle",
      selector: (row) => row.Handle,
      sortable: true,
      wrap: true,
      cell: (row) => <div style={{ whiteSpace: "normal" }}>{row.Handle}</div>, // Custom cell styling
    },
    {
      name: "Option1 Value",
      selector: (row) => row["Option1 Value"],
      sortable: true,
    },
    {
      name: "Variant Inventory Tracker",
      selector: (row) => row["Variant Inventory Tracker"],
      sortable: true,
    },
    {
      name: "Variant Inventory Qty",
      selector: (row) => row["Variant Inventory Qty"],
      sortable: true,
    },
    {
      name: "Variant Inventory Policy",
      selector: (row) => row["Variant Inventory Policy"],
      sortable: true,
    },
    {
      name: "Variant Fulfillment Service",
      selector: (row) => row["Variant Fulfillment Service"],
      sortable: true,
    },
    {
      name: "Variant Price",
      selector: (row) => `£${row["Variant Price"]}`,
      sortable: true,
    },
  ];

  const filteredData = useMemo(() => {
    return data.filter((product) => {
      if (activeCategory === "bulk") {
        return (
          product.Handle.includes("-bulk") &&
          product.Handle.includes(filterText)
        );
      } else {
        return product.Handle.includes(filterText);
      }
    });
  }, [data, activeCategory, filterText]);

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col xs="2">
            <Card.Title>Products</Card.Title>
          </Col>
          <Col xs="7">
            <Nav
              justify
              variant="pills"
              activeKey={activeCategory}
              onSelect={(eventKey) => {
                setActiveCategory(eventKey ?? "all");
              }}
            >
              <Nav.Item>
                <Nav.Link eventKey="all">All</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="bulk">Bulk</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs="3">
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <DataTable
          columns={columns}
          data={filteredData}
          striped
          highlightOnHover
          pagination
          onRowClicked={onRowClicked}
        />
      </Card.Body>
    </Card>
  );
};

export default ProductsDataTable;

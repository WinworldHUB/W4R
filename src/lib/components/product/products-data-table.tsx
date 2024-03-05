import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { Card, Col, Form, Nav, Row } from "react-bootstrap";
import CSVReader from "react-csv-reader";
import DataTable, { TableColumn } from "react-data-table-component";
import useApi from "../../hooks/useApi";
interface ProductsDataTableProps {
  data: Product[];
  onRowClicked: Dispatch<SetStateAction<Product>>;
}

const ProductsDataTable: FC<ProductsDataTableProps> = ({
  data,
  onRowClicked,
}: ProductsDataTableProps) => {
  const [filterText, setFilterText] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const {postData} = useApi()
  const columns: TableColumn<Product>[] = [
    {
      name: "Featured Image",
      selector: (row) => row.featuredImage,
      sortable: true,
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
      sortable: true,
      wrap: true,
      cell: (row) => <div style={{ whiteSpace: "normal" }}>{row.title}</div>, // Custom cell styling
    },
    {
      name: "Description",
      selector: (row) => row.body,
      sortable: true,
      wrap: true,
      cell: (row) => <div style={{ whiteSpace: "normal" }}>{row.body}</div>, // Custom cell styling
    },
    {
      name: "Sizes",
      selector: (row) => row.variants.map((variant) => variant.size).join(", "),
      sortable: true,
    },
    {
      name: "Prices",
      selector: (row) =>
        row.variants.map((variant) => `£${variant.price}`).join(", "),
      sortable: true,
    },
  ];

  const filteredData = useMemo(() => {
    return data.filter((product) => {
      if (activeCategory === "bulk") {
        return product.id.includes("-bulk") && product.id.includes(filterText);
      } else {
        return product.id.includes(filterText);
      }
    });
  }, [data, activeCategory, filterText]);

  const handleImportProduct = async(jsonData: Product[])=>{
    try {
      // Send the JSON data to the backend API using postData function
      const responseData = await postData(
        "/products",
        jsonData
      );
      console.log("Response from server:", responseData);
  
      // Handle response from the backend if needed
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  }

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col xs="2">
            <Card.Title>Products</Card.Title>
          </Col>
          <Col xs="5">
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
          <Col xs="auto">
            <label
              className="btn btn-warning cursor-hand"
              htmlFor="importProduct"
            >
              Import
            </label>
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
        <CSVReader
          inputName="importProduct"
          inputId="importProduct"
          cssClass="d-none"
          accept=".csv"
          parserOptions={{ header: true }}
          onFileLoaded={(data, fileInfo) => {
            handleImportProduct(data as Product[])
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default ProductsDataTable;

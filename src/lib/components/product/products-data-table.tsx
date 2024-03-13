import { FC, useMemo, useState } from "react";
import {
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import DataTable, {
  ExpanderComponentProps,
  TableColumn,
} from "react-data-table-component";
import { DATA_TABLE_DEFAULT_STYLE, KEY_ALL } from "../../constants";
import { isProductContains } from "../../utils/product-utils";
import CSVReader from "react-csv-reader";
import { Product } from "../../../../awsApis";

const filters: string[] = [KEY_ALL];

const columns: TableColumn<Product>[] = [
  {
    name: "Featured Image",
    selector: (row) => row.featuredImage,
    sortable: true,
    cell: (row) => (
      <img src={row.featuredImage} alt="Featured" className="thumbnail-50" />
    ),
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    wrap: true,
    cell: (row) => <div>{row.title}</div>, // Custom cell styling
  },
  {
    name: "Description",
    selector: (row) => row.body,
    sortable: true,
    wrap: true,
    cell: (row) => <div>{row.body}</div>, // Custom cell styling
  },
];

const VariantsTableComponent = (product: ExpanderComponentProps<Product>) => {
  const variants = JSON.parse(
    product.data.variants ?? "[]"
  ) as ProductVariant[];
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th className="bg-primary text-white shadow">Size</th>
          <th className="bg-primary text-white shadow">Price</th>
        </tr>
      </thead>
      <tbody>
        {(variants ?? []).map((variant) => (
          <tr key={variant.size}>
            <td>{variant.size}</td>
            <td>{variant.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const ProductsDataTable: FC<DataTableProps<Product>> = ({
  data,
  onRowClicked,
  onDataImport,
  onCreateClick,
}: DataTableProps<Product>) => {
  const [filterText, setFilterText] = useState<string>("");
  const [activeKey, setActiveKey] = useState<string>(filters[0]);

  const filteredData = useMemo(
    () =>
      (data ?? []).filter((order) =>
        isProductContains(order, filterText.trim())
      ),
    [data, filterText]
  );

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>
            <Card.Title>Products</Card.Title>
          </Col>
          <Col lg="3">
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Col>
          <Col lg="auto" className="text-end">
            <DropdownButton
              id="dropdown-basic-button"
              title={`Filters (${activeKey})`}
            >
              {filters.map((filterKey, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => setActiveKey(filters[index])}
                >
                  {filterKey}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col lg="auto" className="text-end">
            <label
              className="btn btn-warning cursor-hand"
              htmlFor="importProducts"
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
          customStyles={DATA_TABLE_DEFAULT_STYLE}
          striped
          highlightOnHover
          pagination
          onRowClicked={onRowClicked}
          expandableRows
          expandableRowsComponent={(data) => VariantsTableComponent(data)}
        />
        <CSVReader
          inputName="importProducts"
          inputId="importProducts"
          cssClass="d-none"
          accept=".csv"
          parserOptions={{ header: true }}
          onFileLoaded={(data, fileInfo) => {
            onDataImport?.(data as Product[]);
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default ProductsDataTable;

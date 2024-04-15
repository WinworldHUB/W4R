import { FC, useEffect, useMemo, useState } from "react";
import {
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import DataTable, {
  TableColumn,
} from "react-data-table-component";
import { DATA_TABLE_DEFAULT_STYLE, PRODUCTS_APIS } from "../../constants";
import { getAllBrands } from "../../utils/product-utils";
import CSVReader from "react-csv-reader";
import { Product } from "../../awsApis";
import useApi from "../../hooks/useApi";
import VariantsTableComponent from "./product-variant-table";

const columns: TableColumn<Product>[] = [
  {
    name: "Featured Image",
    width: "150px",
    center: true,
    cell: (row) => (
      <img
        src={row.featuredImage}
        alt="Featured"
        className="thumbnail-50 remove-bg"
      />
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
    wrap: true,
    cell: (row) => (
      <div
        dangerouslySetInnerHTML={{
          __html: row.body.replaceAll("\n", "<br />"),
        }}
      ></div>
    ), // Custom cell styling
  },
];



const ProductsDataTable: FC<DataTableProps<Product>> = ({
  onRowClicked,
  onDataImport,
}: DataTableProps<Product>) => {
  const { data: products, getData: getProducts } = useApi<Product[]>();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedBrandFilters, setselectedBrandFilters] = useState<
    ProductFilter[]
  >([]);

  useEffect(() => {
    getProducts(PRODUCTS_APIS.GET_ALL_PRODUCTS_API);
  }, []);
  const brandsFilter = useMemo(() => getAllBrands(products ?? []), [products]);

  const filteredProducts = useMemo(() => {
    if (selectedBrandFilters.length === 0) {
      return products;
    }
    return products?.filter((p) =>
      selectedBrandFilters.some((f) => f.productIds.includes(p.id))
    );
  }, [products, selectedBrandFilters]);

  const handleFilterChange = (
    filter: ProductFilter,
    applied: boolean,
    isShowAll: boolean = false,
    isApplySingle: boolean = false
  ) => {
    if (isShowAll) {
      setselectedBrandFilters([]);
      setSelectedFilter("All");
    } else if (applied) {
      setSelectedFilter(filter.filter);
      setselectedBrandFilters(
        isApplySingle ? [filter] : [...selectedBrandFilters, filter]
      );
    } else {
      setselectedBrandFilters(
        selectedBrandFilters.filter((f) => f.filter !== filter.filter)
      );
    }
  };
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
              onChange={(e) => setSelectedFilter(e.target.value)}
            />
          </Col>
          <Col lg="auto" className="text-end">
            <DropdownButton
              title={selectedFilter}
              onSelect={(eventKey) =>
                handleFilterChange(
                  brandsFilter?.[parseInt(eventKey, 10)],
                  true,
                  parseInt(eventKey, 10) === 0,
                  true
                )
              }
            >
              {(brandsFilter ?? []).map((brandFilter, index) => (
                <Dropdown.Item
                  key={`${brandFilter.productIds}-${index}`}
                  eventKey={(index).toString()}
                >
                  {brandFilter.filter}
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
          data={filteredProducts}
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

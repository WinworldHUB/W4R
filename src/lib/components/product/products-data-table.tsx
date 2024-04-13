import { FC, useEffect, useMemo, useState } from "react";
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
import {
  DATA_TABLE_DEFAULT_STYLE,
  PRODUCTS_APIS,
} from "../../constants";
import { getAllBrands } from "../../utils/product-utils";
import CSVReader from "react-csv-reader";
import { Product } from "../../awsApis";
import useApi from "../../hooks/useApi";


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
  const { data: products, getData: getProducts } = useApi<Product[]>();
  const [filterText, setFilterText] = useState<string>("");
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
    } else if (applied) {
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
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Col>
          <Col lg="auto" className="text-end">
          <select
                className="form-control"
                title="Filter by brand"
                onChange={(e) =>
                  handleFilterChange(
                    brandsFilter?.[e.target.selectedIndex],
                    true,
                    e.target.selectedIndex === 0,
                    true
                  )
                }
              >
                {(brandsFilter ?? []).map((sizeFilter, index) => (
                  <option key={`${sizeFilter.productIds}-${index}`}>
                    {sizeFilter.filter}
                  </option>
                ))}
              </select>
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

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  Badge,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import { DATA_TABLE_DEFAULT_STYLE, KEY_ALL, KEY_LATEST } from "../../constants";
import { DateTime } from "luxon";
import { Invoice } from "../../awsApis";
import { isLatest, sortByDate } from "../../utils/date-utils";

const filters: string[] = [KEY_ALL];

const columns: TableColumn<Invoice>[] = [
  {
    name: "Invoice#",
    selector: (row) => row.id,
    sortable: true,
    cell: (row) => (
      <p>
        {row.orderId}&nbsp;
        {isLatest(row.invoiceDate) && <Badge bg="primary">recent</Badge>}
      </p>
    ),
  },
  {
    name: "Invoice Date",
    selector: (row) => row.invoiceDate,
    //DateTime.fromISO(row.invoiceDate).toFormat(APP_CONVERSION_DATE_FORMAT),
    sortable: true,
  },
  {
    name: "Payment Date",
    selector: (row) => row.paymentDate ?? "N/A",
    sortable: true,
  },
];

interface DataTableProps {
  isEditable?: boolean;
  data: Invoice[];
  onRowClicked: Dispatch<SetStateAction<Invoice>>;
}

const InvoiceDataTable = ({
  isEditable = false,
  data,
  onRowClicked,
}: DataTableProps) => {
  const [filterText, setFilterText] = useState<string>("");
  const [activeKey, setActiveKey] = useState<string>(filters[0]);

  const filteredData = useMemo(() => {
    const searchTextLower = filterText.toLowerCase();
    const currentDate = DateTime.now().toISODate();
    var data2Use: Invoice[] = [];

    switch (activeKey) {
      case KEY_LATEST:
        data2Use = (data ?? []).filter(
          (invoice) =>
            invoice.invoiceDate === currentDate &&
            (invoice.id?.toString().includes(searchTextLower) ||
              invoice.orderId?.toString().includes(searchTextLower) ||
              invoice.paymentDate?.toLowerCase().includes(searchTextLower) ||
              invoice.invoiceDate?.toLowerCase().includes(searchTextLower))
        );
        break;

      case KEY_ALL:
        data2Use = (data ?? []).filter(
          (invoice) =>
            invoice.id?.toString().includes(searchTextLower) ||
            invoice.orderId?.toString().includes(searchTextLower) ||
            invoice.paymentDate?.toLowerCase().includes(searchTextLower) ||
            invoice.invoiceDate?.toLowerCase().includes(searchTextLower)
        );
        break;

      default:
        data2Use = [];
        break;
    }

    (data2Use ?? []).sort((a, b) => sortByDate(a.invoiceDate, b.invoiceDate));
    return data2Use;
  }, [activeKey, filterText, data]);

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>
            <Card.Title>Invoices</Card.Title>
          </Col>
          <Col lg="5">
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
              style={{ width: "200px" }}
            >
              {filters.map((filterKey, index) => (
                <Dropdown.Item
                  key={`${filterKey}-${index}`}
                  onClick={() => setActiveKey(filters[index])}
                >
                  {filterKey}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <DataTable
          columns={columns}
          data={filteredData}
          striped
          customStyles={DATA_TABLE_DEFAULT_STYLE}
          highlightOnHover
          pagination
          onRowClicked={onRowClicked}
        />
      </Card.Body>
    </Card>
  );
};

export default InvoiceDataTable;

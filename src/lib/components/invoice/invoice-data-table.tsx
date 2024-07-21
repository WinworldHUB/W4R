import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import {
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  APP_CONVERSION_DATE_FORMAT,
  DATA_TABLE_DEFAULT_STYLE,
  KEY_ALL,
  KEY_LATEST,
} from "../../constants";
import { DateTime } from "luxon";
import { Invoice } from "../../awsApis";

const filters: string[] = [KEY_ALL];

const columns: TableColumn<Invoice>[] = [
  {
    name: "Invoice#",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Invoice Date",
    selector: (row) =>
      DateTime.fromISO(row.invoiceDate).toFormat(APP_CONVERSION_DATE_FORMAT),
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
    switch (activeKey) {
      case KEY_LATEST:
        return (data ?? []).filter(
          (invoice) =>
            invoice.invoiceDate === currentDate &&
            (invoice.id?.toString().includes(searchTextLower) ||
              invoice.orderId?.toString().includes(searchTextLower) ||
              invoice.paymentDate?.toLowerCase().includes(searchTextLower) ||
              invoice.invoiceDate?.toLowerCase().includes(searchTextLower))
        );
      case KEY_ALL:
        return (data ?? []).filter(
          (invoice) =>
            invoice.id?.toString().includes(searchTextLower) ||
            invoice.orderId?.toString().includes(searchTextLower) ||
            invoice.paymentDate?.toLowerCase().includes(searchTextLower) ||
            invoice.invoiceDate?.toLowerCase().includes(searchTextLower)
        );
      default:
        return [];
    }
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

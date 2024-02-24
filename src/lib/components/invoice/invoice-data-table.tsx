import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Card, Col, Form, Nav, Row } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  APP_CONVERSION_DATE_FORMAT,
  KEY_ALL,
  KEY_LATEST,
  KEY_UNPAID,
} from "../../constants";
import { DateTime } from "luxon";

const filters: string[] = [KEY_LATEST, KEY_UNPAID, KEY_ALL];

const columns: TableColumn<Invoice>[] = [
  {
    name: "Invoice#",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Order#",
    selector: (row) => row.orderId,
    sortable: true,
  },
  {
    name: "Invoice Payment",
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Order Date",
    selector: (row) =>
      DateTime.fromISO(row.paymentDate).toFormat(APP_CONVERSION_DATE_FORMAT),
    sortable: true,
  },
  {
    name: "Order Value",
    selector: (row) => row.orderValue,
    sortable: true,
  },
  {
    name: "Invoice Date",
    selector: (row) =>
      DateTime.fromISO(row.invoiceDate).toFormat(APP_CONVERSION_DATE_FORMAT),
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
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    center: true,
    conditionalCellStyles: [
      {
        when: (row) => row.status === "Paid",
        style: {
          backgroundColor: "rgba(63, 195, 128, 0.9)",
          color: "white",
        },
      },
      {
        when: (row) => row.status === "Un-paid",
        style: {
          backgroundColor: "rgba(242, 38, 19, 0.9)",
          color: "white",
          fontWeight: "bold",
        },
      },
    ],
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
            (invoice.id.toString().includes(searchTextLower) ||
              invoice.orderId.toString().includes(searchTextLower) ||
              invoice.status.toString().includes(searchTextLower) ||
              invoice.paymentDate.toLowerCase().includes(searchTextLower) ||
              invoice.invoiceDate.toLowerCase().includes(searchTextLower))
        );
      case KEY_UNPAID:
        return (data ?? []).filter(
          (invoice) =>
            invoice.status !== "Paid" &&
            (invoice.id.toString().includes(searchTextLower) ||
              invoice.orderId.toString().includes(searchTextLower) ||
              invoice.status.toString().includes(searchTextLower) ||
              invoice.paymentDate.toLowerCase().includes(searchTextLower) ||
              invoice.invoiceDate.toLowerCase().includes(searchTextLower))
        );
      case KEY_ALL:
        return (data ?? []).filter(
          (invoice) =>
            invoice.id.toString().includes(searchTextLower) ||
            invoice.orderId.toString().includes(searchTextLower) ||
            invoice.status.toString().includes(searchTextLower) ||
            invoice.paymentDate.toLowerCase().includes(searchTextLower) ||
            invoice.invoiceDate.toLowerCase().includes(searchTextLower)
        );
      default:
        return [];
    }
  }, [activeKey, filterText, data]);

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col xs="2">
            <Card.Title>Invoices</Card.Title>
          </Col>
          <Col xs="7">
            <Nav
              justify
              variant="pills"
              activeKey={activeKey}
              onSelect={(eventKey) => {
                setActiveKey(eventKey ?? filters[0]);
              }}
            >
              {filters.map((filter) => (
                <Nav.Item key={filter}>
                  <Nav.Link eventKey={filter}>{filter}</Nav.Link>
                </Nav.Item>
              ))}
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

export default InvoiceDataTable;

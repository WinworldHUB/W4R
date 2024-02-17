import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Card, Col, Form, Nav, Row } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  APP_CONVERSION_DATE_FORMAT,
  KEY_ALL,
  KEY_Latest,
  KEY_UNPAID,
} from "../constants";
import { DateTime } from "luxon";

const filters: string[] = [KEY_Latest, KEY_UNPAID, KEY_ALL];

const columns: TableColumn<Invoice>[] = [
  {
    name: "Invoice#",
    selector: (row) => row.InvoiceId,
    sortable: true,
  },
  {
    name: "Order#",
    selector: (row) => row.OrderId,
    sortable: true,
  },
  {
    name: "Invoice Payment",
    selector: (row) => row.Status,
    sortable: true,
  },
  {
    name: "Order Date",
    selector: (row) =>
      DateTime.fromISO(row.PaymentDate).toFormat(APP_CONVERSION_DATE_FORMAT),
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
      DateTime.fromISO(row.InvoiceDate).toFormat(APP_CONVERSION_DATE_FORMAT),
    sortable: true,
  },
  {
    name: "Invoice Date",
    selector: (row) =>
      DateTime.fromISO(row.InvoiceDate).toFormat(APP_CONVERSION_DATE_FORMAT),
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
  const [activeKey, setActiveKey] = useState<string>("all");

  const filteredData = useMemo(() => {
    const searchTextLower = filterText.toLowerCase();
    const currentDate = DateTime.now().toISODate();
    switch (activeKey) {
      case "Latest":
        return (data ?? []).filter(
          (invoice) =>
            invoice.InvoiceDate === currentDate &&
            (invoice.InvoiceId.toString().includes(searchTextLower) ||
              invoice.OrderId.toString().includes(searchTextLower) ||
              invoice.Status.toString().includes(searchTextLower) ||
              invoice.PaymentDate.toLowerCase().includes(searchTextLower) ||
              invoice.InvoiceDate.toLowerCase().includes(searchTextLower))
        );
      case "all":
        return (data ?? []).filter(
          (invoice) =>
            invoice.InvoiceId.toString().includes(searchTextLower) ||
            invoice.OrderId.toString().includes(searchTextLower) ||
            invoice.Status.toString().includes(searchTextLower) ||
            invoice.PaymentDate.toLowerCase().includes(searchTextLower) ||
            invoice.InvoiceDate.toLowerCase().includes(searchTextLower)
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
                setActiveKey(eventKey ?? "Latest");
              }}
            >
              <Nav.Item>
                <Nav.Link eventKey="Latest">Latest</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="all">All</Nav.Link>
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

export default InvoiceDataTable;

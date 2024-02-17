import { DateTime } from "luxon";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { Card, Col, Form, Nav, Row } from "react-bootstrap";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  APP_CONVERSION_DATE_FORMAT,
  KEY_ALL,
  KEY_Latest,
  KEY_UNPAID,
} from "../constants";
import { isOrderContains } from "../utils/order-utils";

const filters: string[] = [KEY_Latest, KEY_UNPAID, KEY_ALL];

const columns: TableColumn<Order>[] = [
  {
    name: "Order#",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Order Value",
    selector: (row) => row.orderValue,
    sortable: true,
  },
  {
    name: "Order Date",
    selector: (row) => row.orderDate,
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
  data: Order[];
  onRowClicked: Dispatch<SetStateAction<Order>>;
}

const OrdersDataTable: FC<DataTableProps> = ({
  data,
  onRowClicked,
  isEditable = false,
}: DataTableProps) => {
  const [filterText, setFilterText] = useState<string>("");
  const [activeKey, setActiveKey] = useState<string>(filters[0]);
  useState<boolean>(false);

  const filteredData = useMemo(() => {
    switch (activeKey) {
      case KEY_Latest:
        return (data ?? []).filter(
          (order) =>
            order.orderDate ===
              DateTime.now().toFormat(APP_CONVERSION_DATE_FORMAT) &&
            isOrderContains(order, filterText.trim())
        );
      case KEY_UNPAID:
        return (data ?? []).filter(
          (order) =>
            order.status === "Un-paid" &&
            isOrderContains(order, filterText.trim())
        );
      case KEY_ALL:
        return (data ?? []).filter((order) =>
          isOrderContains(order, filterText.trim())
        );
    }
  }, [data, activeKey, filterText]);
  return (
    <Card>
      <Card.Header>
        <Row>
          <Col xs="2">
            <Card.Title>Orders</Card.Title>
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
              {filters.map((filterKey, index) => (
                <Nav.Item>
                  <Nav.Link eventKey={filterKey}>{filterKey}</Nav.Link>
                </Nav.Item>
              ))}
              {/* <Nav.Item>
                <Nav.Link eventKey={KEY_Latest}>Latest</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={KEY_UNPAID}>Unpaid</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={KEY_ALL}>All</Nav.Link>
              </Nav.Item> */}
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
          data={filteredData ?? []}
          striped
          highlightOnHover
          pagination
          onRowClicked={onRowClicked}
        />
      </Card.Body>
    </Card>
  );
};

export default OrdersDataTable;

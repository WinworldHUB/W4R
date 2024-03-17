import { DateTime } from "luxon";
import { FC, useMemo, useState } from "react";
import {
  Button,
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
  KEY_UNPAID,
} from "../../constants";
import { isOrderContains } from "../../utils/order-utils";
import { Order, OrderStatus } from "../../awsApis";

const filters: string[] = [KEY_LATEST, KEY_UNPAID, KEY_ALL];

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
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    center: true,
    conditionalCellStyles: [
      {
        when: (row) => row.status === OrderStatus.PAID,
        style: {
          backgroundColor: "rgba(63, 195, 128, 0.9)",
          color: "white",
        },
      },
      {
        when: (row) => row.status === OrderStatus.UNPAID,
        style: {
          backgroundColor: "rgba(242, 38, 19, 0.9)",
          color: "white",
          fontWeight: "bold",
        },
      },
    ],
  },
];

const OrdersDataTable: FC<DataTableProps<Order>> = ({
  data,
  onRowClicked,
  isEditable = false,
  onCreateClick,
}) => {
  const [filterText, setFilterText] = useState<string>("");
  const [activeKey, setActiveKey] = useState<string>(filters[0]);

  const filteredData = useMemo(() => {
    switch (activeKey) {
      case KEY_LATEST:
        return (data ?? []).filter(
          (order) =>
            order.orderDate ===
              DateTime.now().toFormat(APP_CONVERSION_DATE_FORMAT) &&
            isOrderContains(order, filterText.trim())
        );
      case KEY_UNPAID:
        return (data ?? []).filter(
          (order) =>
            order.status === OrderStatus.UNPAID &&
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
          <Col>
            <Card.Title>Orders</Card.Title>
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
                  key={`${filterKey}-${index}`}
                  onClick={() => setActiveKey(filters[index])}
                >
                  {filterKey}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col lg="auto" className="text-end">
            <Button variant="warning" onClick={onCreateClick}>
              New Order
            </Button>
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
          customStyles={DATA_TABLE_DEFAULT_STYLE}
        />
      </Card.Body>
    </Card>
  );
};

export default OrdersDataTable;

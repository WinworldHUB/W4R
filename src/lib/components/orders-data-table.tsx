import { Dispatch, FC, SetStateAction, useMemo, useState, useEffect } from "react";
import { Card, Col, Form, Nav, Row } from 'react-bootstrap';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../reducers/ordersSlice';
import { APP_CONVERSION_DATE_FORMAT } from '../constants';
import { DateTime } from 'luxon';
import orderData from "../data/orders.json"
import { isOrderContains } from "../utils/order-utils";

const KEY_Latest = 'Latest';
const KEY_UNPAID = 'unpaid';
const KEY_ALL = 'all';

const columns: TableColumn<Order>[] = [
  {
    name: 'Order#',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Order Value',
    selector: (row) => row.orderValue,
    sortable: true,
  },
  {
    name: 'Order Date',
    selector: (row) => row.orderDate,
    sortable: true,
  },
  {
    name: 'Payment Date',
    selector: (row) => row.paymentDate ?? 'N/A',
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
    sortable: true,
    center: true,
    conditionalCellStyles: [
      {
        when: (row) => row.status === 'Paid',
        style: {
          backgroundColor: 'rgba(63, 195, 128, 0.9)',
          color: 'white',
        },
      },
      {
        when: (row) => row.status === 'Un-paid',
        style: {
          backgroundColor: 'rgba(242, 38, 19, 0.9)',
          color: 'white',
          fontWeight: 'bold',
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

const OrdersDataTable: FC<DataTableProps> = ({ onRowClicked, isEditable = false }: DataTableProps) => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.order.orders);

  useEffect(() => {

    const fetchData = async () => {
      try {
        dispatch(setOrders(orderData)); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const [filterText, setFilterText] = useState<string>('');
  const [activeKey, setActiveKey] = useState<string>(KEY_Latest);
  const [selectedOrder, setSelectedOrder] = useState<Order>(null);
  const [isShowStatusDropDown, setIsShowStatusDropDown] = useState<boolean>(false);

  const onItemClicked = (item: Order) => {
    setSelectedOrder(item);
    onRowClicked(item);
  };

  const filteredData = useMemo(() => {
    switch (activeKey) {
      case KEY_Latest:
        return (orders ?? []).filter(
          (order: Order) =>
            order.orderDate ===
              DateTime.now().toFormat(APP_CONVERSION_DATE_FORMAT) &&
            isOrderContains(order, filterText.trim())
        );
      case KEY_UNPAID:
        return (orders ?? []).filter(
          (order: Order) =>
            order.status === 'Un-paid' &&
            isOrderContains(order, filterText.trim())
        );
      case KEY_ALL:
        return (orders ?? []).filter((order) =>
          isOrderContains(order, filterText.trim())
        );
    }
  }, [orders, activeKey, filterText]);

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
                setActiveKey(eventKey ?? KEY_Latest);
              }}
            >
              <Nav.Item>
                <Nav.Link eventKey={KEY_Latest}>Latest</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={KEY_UNPAID}>Unpaid</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={KEY_ALL}>All</Nav.Link>
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
          data={filteredData ?? []}
          striped
          highlightOnHover
          pagination
          onRowClicked={onItemClicked}
        />
      </Card.Body>
    </Card>
  );
};

export default OrdersDataTable;

import React, { useMemo, useState } from 'react';
import { Card, Col, Form, Nav, Row } from 'react-bootstrap';
import DataTable, { TableColumn } from 'react-data-table-component';
import invoiceData from '../data/invoice.json'; 
import { APP_CONVERSION_DATE_FORMAT } from '../constants';
import { DateTime } from 'luxon';

type Invoice = {
  InvoiceId: number;
  OrderId: number;
  PaymentDate: string;
  InvoiceDate: string;
  Status: string;
};

const InvoiceTable = () => {
  const [filterText, setFilterText] = useState<string>('');
  const [activeKey, setActiveKey] = useState<string>('all');
  const invoices = invoiceData;

  
  const columns: TableColumn<Invoice>[] = [
    {
      name: 'Invoice ID',
      selector: (row) => row.InvoiceId,
      sortable: true,
    },
    {
      name: 'Order ID',
      selector: (row) => row.OrderId,
      sortable: true,
    },
    {
      name: 'Invoice Payment',
      selector: (row) => row.Status,
      sortable: true,
    },
    {
      name: 'Order Date',
      selector: (row) => DateTime.fromISO(row.PaymentDate).toFormat(APP_CONVERSION_DATE_FORMAT),
      sortable: true,
    },
    {
      name: 'Invoice Date',
      selector: (row) => DateTime.fromISO(row.InvoiceDate).toFormat(APP_CONVERSION_DATE_FORMAT),
      sortable: true,
    },
  ];


  const filteredData = useMemo(() => {
    const searchTextLower = filterText.toLowerCase();
    const currentDate = DateTime.now().toISODate();
    switch (activeKey) {
      case 'Latest':
        return invoices.filter((invoice) => invoice.InvoiceDate === currentDate && (
          invoice.InvoiceId.toString().includes(searchTextLower) ||
          invoice.OrderId.toString().includes(searchTextLower) ||
          invoice.Status.toString().includes(searchTextLower) ||
          invoice.PaymentDate.toLowerCase().includes(searchTextLower) ||
          invoice.InvoiceDate.toLowerCase().includes(searchTextLower)
        ));
      case 'all':
        return invoices.filter((invoice) => (
          invoice.InvoiceId.toString().includes(searchTextLower) ||
          invoice.OrderId.toString().includes(searchTextLower) ||
          invoice.Status.toString().includes(searchTextLower) ||
          invoice.PaymentDate.toLowerCase().includes(searchTextLower) ||
          invoice.InvoiceDate.toLowerCase().includes(searchTextLower)
        ));
      default:
        return [];
    }
  }, [activeKey, filterText, invoices]);

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
                setActiveKey(eventKey || 'Latest');
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
        />
      </Card.Body>
    </Card>
  );
};

export default InvoiceTable;

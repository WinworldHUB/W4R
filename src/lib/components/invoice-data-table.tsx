import React, { useState, useMemo } from 'react';
import { DateTime } from 'luxon';
import { Card, Col, Form, Nav, Row } from 'react-bootstrap';
import DataTable, { TableColumn } from 'react-data-table-component';
import invoiceData from '../data/invoice.json'; // Importing the JSON data

const InvoiceTable = () => {
  const [filterText, setFilterText] = useState<string>('');
  const [activeKey, setActiveKey] = useState<string>('today');
  const [invoices, setInvoices] = useState<Invoice[]>(invoiceData);

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
      selector: (row) =>`₹ ${row.InvoicePayment}`,
      sortable: true,
    },
    {
      name: 'Order Date',
      selector: (row) => row.OrderDate,
      sortable: true,
    },
    {
      name: 'Invoice Date',
      selector: (row) => row.InvoiceDate,
      sortable: true,
    },
  ];

  const filteredData = useMemo(() => {
    const searchTextLower = filterText.toLowerCase();
    return invoices.filter((invoice) => {
      return (
        invoice.InvoiceId.toString().includes(searchTextLower) ||
        invoice.OrderId.toString().includes(searchTextLower) ||
        invoice.InvoicePayment.toString().includes(searchTextLower) ||
        invoice.OrderDate.toLowerCase().includes(searchTextLower) ||
        invoice.InvoiceDate.toLowerCase().includes(searchTextLower)
      );
    });
  }, [filterText, invoices]);

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col xs="2">
            <Card.Title>Invoice Table</Card.Title>
          </Col>
          <Col xs="7">
            <Nav
              justify
              variant="pills"
              activeKey={activeKey}
              onSelect={(eventKey) => {
                setActiveKey(eventKey || 'today');
              }}
            >
              <Nav.Item>
                <Nav.Link eventKey="today">Today</Nav.Link>
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

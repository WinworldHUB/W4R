import  { useMemo, useState } from 'react';
import { Card, Col, Form, Nav, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
const UserTable = ({ data }) => {
  const [filterText, setFilterText] = useState("");
  
  const columns = useMemo(() => {
    return [
      {
        name: "User ID",
        selector: (row) => row.ID,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.Status,
        sortable: true,
      },
      {
        name: "Customer Name",
        selector: (row) => row["Customer name"],
        sortable: true,
      },
      {
        name: "Customer Email",
        selector: (row) => row["Customer email"],
        sortable: true,
      },
      {
        name: "Customer Phone",
        selector: (row) => row["Customer phone"],
        sortable: true,
      },
      {
        name: "Created At",
        selector: (row) => row["Created at"],
        sortable: true,
      },
      {
        name: "Last Order Date",
        selector: (row) => row["Last order date"],
        sortable: true,
      },
    ];
  }, []);


  return (
    <Card>
      <Card.Header>
        <Row>
          <Col xs="3">
            <Card.Title>Users</Card.Title>
          </Col>
          <Col xs="9">
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
          data={data}
          striped
          highlightOnHover
          pagination
        />
      </Card.Body>
    </Card>
  );
};

export default UserTable;
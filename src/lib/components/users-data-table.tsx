import React, { useMemo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, Col, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { setUsers } from "../store/users/usersSlice";
import userData from "../data/users.json";
const UserTable = () => {
  
  const [filterText, setFilterText] = useState("");
  const users = useSelector((state: RootState) => state.users.users);

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
        name: "Payment method brand",
        selector: (row) => row["Payment method brand"],
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

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setUsers(userData));
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredData = useMemo(() => {
    return users.filter((user) => {
      const {
        Status,
        "Customer name": customerName,
        "Customer email": customerEmail,
        "Payment method brand": paymentMethodBrand,
        "Created at": createdAt,
        "Last order date": lastOrderDate,
      } = user;
      const searchText = filterText.toLowerCase();
      return (
        Status.toLowerCase().includes(searchText) ||
        customerName.toLowerCase().includes(searchText) ||
        customerEmail.toLowerCase().includes(searchText) ||
        paymentMethodBrand.toLowerCase().includes(searchText) ||
        createdAt.toLowerCase().includes(searchText) ||
        lastOrderDate.toLowerCase().includes(searchText)
      );
    });
  }, [users, filterText]);

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col xs="9">
            <Card.Title>Users</Card.Title>
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

export default UserTable;

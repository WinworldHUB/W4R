import React, { FC, useMemo, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { isMemberContains } from "../../utils/member-utils";
import { dateFromString } from "../../utils/date-utils";
import CSVReader from "react-csv-reader";

const MembersDataTable: FC<DataTableProps<Member>> = ({
  data,
  onDataImport,
}) => {
  const [filterText, setFilterText] = useState<string>("");

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
        selector: (row) => dateFromString(row["Created at"]),
        sortable: true,
      },
      {
        name: "Last Order Date",
        selector: (row) => dateFromString(row["Last order date"]),
        sortable: true,
      },
    ];
  }, []);

  const filteredData = useMemo(
    () =>
      (data ?? []).filter((member) =>
        isMemberContains(member, filterText.trim())
      ),
    [data, filterText]
  );

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>
            <Card.Title>Users</Card.Title>
          </Col>
          <Col xs="3">
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <label
              className="btn btn-warning cursor-hand"
              htmlFor="importMember"
            >
              Import
            </label>
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
        <CSVReader
          inputName="importMember"
          inputId="importMember"
          cssClass="d-none"
          accept=".csv"
          parserOptions={{ header: true }}
          onFileLoaded={(data, fileInfo) => {
            onDataImport?.(data as Member[]);
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default MembersDataTable;

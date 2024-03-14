import React, { FC, useMemo, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { isMemberContains } from "../../utils/member-utils";
import { dateFromString } from "../../utils/date-utils";
import CSVReader from "react-csv-reader";
import { DATA_TABLE_DEFAULT_STYLE } from "../../constants";
import { Member } from "../../../../awsApis";

const MembersDataTable: FC<DataTableProps<Member>> = ({
  data,
  onDataImport,
}) => {
  const [filterText, setFilterText] = useState<string>("");

  const columns = useMemo(() => {
    return [
      {
        name: "Customer Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Customer Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "Phone No.",
        selector: (row) => row.phone,
        sortable: true,
      },
      {
        name: "City",
        selector: (row) => row.city,
        sortable: true,
      },
    ];
  }, []);

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];  
    return data.filter((member) => isMemberContains(member, filterText.trim()));
  }, [data, filterText]);
  
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
          customStyles={DATA_TABLE_DEFAULT_STYLE}
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

import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button } from "react-bootstrap";

interface OrderCartProps {
    data: Product[];
}

const cleanUpDescription = (html: string): string => {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;
  
  const cleanText = tempElement.textContent || tempElement.innerText;

  return cleanText.trim();
};

const OrderCart: React.FC<OrderCartProps> = ({data}) => {
  const columns: TableColumn<Product>[] = [ // Change TableColumn type to Product
    {
      name: "SR No",
      selector: (_, index) => index + 1, // Generate serial number dynamically
      sortable: true,
    },
    {
      name: "Item Name",
      selector: (row) => row.Title, // Use the appropriate property from Product
      sortable: true,
      wrap: true,
      cell: (row) => <div style={{ whiteSpace: "normal" }}>{row.Title}</div>, // Use the appropriate property from Product
    },
    {
      name: "Item Description",
      selector: (row) => cleanUpDescription(row["Body (HTML)"]), // Clean up the description
      sortable: true,
      wrap: true,
      cell: (row) => (
        <div style={{ whiteSpace: "normal" }}>{cleanUpDescription(row["Body (HTML)"])}</div> // Use the cleaned-up description
      ),
    },
    {
      name: "Quantity",
      cell: (row, index) => (
        <div className="d-flex align-items-center">
          <Button variant="danger" className="ms-1" onClick={() => {}}>
            -
          </Button>
          {/* You may need to handle quantity differently based on your business logic */}
          <span className="ms-2">{row["Variant Inventory Qty"]}</span> 
          <Button variant="primary" className="ms-1" onClick={() => {}}>
            +
          </Button>
        </div>
      ),
    },
    {
      name: "Cost",
      selector: (row) => `£${row["Variant Price"].toFixed(2)}`, // Use the appropriate property from Product
      sortable: true,
    },
  ];
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default OrderCart;

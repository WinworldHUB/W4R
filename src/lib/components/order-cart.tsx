import React, { useState } from "react";
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
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    data.reduce<{ [key: string]: number }>((acc, product) => {
      acc[product.Handle] = 1; // Set default quantity to 1
      return acc;
    }, {})
  );

  const handleDecrement = (productId: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
    }));
  };

  const handleIncrement = (productId: string) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  const columns: TableColumn<Product>[] = [
    {
      name: "SR No",
      selector: (_, index) => index + 1,
      sortable: true,
    },
    {
      name: "Item Name",
      selector: (row) => row.Title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Item Description",
      selector: (row) => cleanUpDescription(row["Body (HTML)"]),
      sortable: true,
      wrap: true,
    },
    {
      name: "Quantity",
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Button variant="danger" className="ms-1" onClick={() => handleDecrement(row.Handle)}>
            -
          </Button>
          <span className="ms-2">{quantities[row.Handle] || 1}</span>
          <Button variant="primary" className="ms-1" onClick={() => handleIncrement(row.Handle)}>
            +
          </Button>
        </div>
      ),
    },
    {
      name: "Cost",
      selector: (row) => `£${(row["Variant Price"] * (quantities[row.Handle] || 1)).toFixed(2)}`,
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

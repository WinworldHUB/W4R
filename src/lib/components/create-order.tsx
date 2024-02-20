import React, { useState, useRef } from "react";
import { Form, Button, ListGroup, Card, Row, Col } from "react-bootstrap";
import members from "../data/users.json";
import products from "../data/products.json";
import DataTable, { TableColumn } from "react-data-table-component";

type Order = {
  SrNo: number;
  itemName: string;
  itemDescription: string;
  quantity: number;
  cost: number;
};

interface CreateOrderProps {
  handleClose: ()=> void
}

const CreateOrder: React.FC<CreateOrderProps> = ({handleClose}) => {
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderItems, setOrderItems] = useState<Order[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  const memberInputRef = useRef<HTMLInputElement>(null);
  const productInputRef = useRef<HTMLInputElement>(null);

  const handleMemberInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm.length >= 3) {
      const filtered = members
        .filter((member) =>
          member["Customer name"].toLowerCase().includes(searchTerm)
        )
        .slice(0, 5);
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers([]);
    }
  };

  const uniqueProducts = Array.from(
    new Set(products.map((product) => product.Handle))
  ).map((handle) => products.find((product) => product.Handle === handle));

  const handleProductInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm.length >= 3) {
      const filtered = uniqueProducts
        .filter((product) => product.Handle.toLowerCase().includes(searchTerm))
        .slice(0, 5);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const addMemberToOrder = (member: Member) => {
    setSelectedMember(member);
    if (memberInputRef.current) {
      memberInputRef.current.value = member["Customer name"];
      setFilteredMembers([]);
    }
    console.log(selectedMember)
  };

  const addProductToOrder = (product: Product) => {
    setSelectedProduct(product);
    if (productInputRef.current) {
      productInputRef.current.value = product.Handle;
      setFilteredProducts([]);
    }
  };

  const addToOrder = () => {
    if (selectedProduct) {
      const description = Object.keys(selectedProduct)
        .filter((key) => key !== "Handle")
        .map((key) => `${key}: ${selectedProduct[key]}`)
        .join(", ");

      const newOrderItem: Order = {
        SrNo: orderItems.length + 1,
        itemName: selectedProduct.Handle,
        itemDescription: description,
        quantity: 1,
        cost: selectedProduct["Variant Price"] || 0,
      };
      setOrderItems([...orderItems, newOrderItem]);
      setSelectedProduct(null);
      updateTotalCost()
    }
  };

  const incrementQuantity = (index: number) => {
    const updatedItems = [...orderItems];
    updatedItems[index].quantity += 1;
    updatedItems[index].cost *= updatedItems[index].quantity;
    setOrderItems(updatedItems);
    updateTotalCost();
  };
  
  const decrementQuantity = (index: number) => {
    const updatedItems = [...orderItems];
    const currentItem = updatedItems[index];
    if (currentItem.quantity > 1) {
      currentItem.quantity -= 1;
      currentItem.cost -= currentItem.cost / (currentItem.quantity + 1);
      setOrderItems(updatedItems);
      updateTotalCost();
    } else {
      const newItems = orderItems.filter((item, i) => i !== index);
      setOrderItems(newItems);
      updateTotalCost();
    }
  };
  
  const updateTotalCost = () => {
    let total = 0;
    orderItems.forEach((item) => {
      total += item.cost;
    });
    setTotalCost(total);
  };
  
  

  const resetOrder = () =>{
    setOrderItems([])
    setTotalCost(0)
    setFilteredProducts([])
    setFilteredMembers([])
    setSelectedProduct(null)
    setSelectedMember(null)
  }

  const columns: TableColumn<Order>[] = [
    {
      name: "Item Name",
      selector: (row) => row.itemName,
      sortable: true,
      wrap: true,
      cell: (row) => <div style={{ whiteSpace: "normal" }}>{row.itemName}</div>,
    },
    {
      name: "Item Description",
      selector: (row) => row.itemDescription,
      sortable: true,
      wrap: true,
      cell: (row) => (
        <div style={{ whiteSpace: "normal" }}>{row.itemDescription}</div>
      ),
    },
    {
      name: "Quantity",
      cell: (row, index) => (
        <div className="d-flex align-items-center">
          <Button
            variant="danger"
            className="ms-1"
            onClick={() => decrementQuantity(index)}
          >
            -
          </Button>
          <span className="ms-2">{row.quantity}</span>
          <Button
            variant="primary"
            className="ms-1"
            onClick={() => incrementQuantity(index)}
          >
            +
          </Button>
        </div>
      ),
    },
    {
      name: "Cost",
      selector: (row) => `£${row.cost.toFixed(2)}`,
      sortable: true,
    },
  ];

  return (
    <div className="container">
      <div className="mb-3">
        <Form.Control
          type="text"
          ref={memberInputRef}
          placeholder="Search Members"
          onChange={handleMemberInputChange}
        />
        <ListGroup>
          {filteredMembers.map((member) => (
            <ListGroup.Item
              key={member.ID}
              onClick={() => addMemberToOrder(member)}
              action
            >
              {member["Customer name"]}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="mb-3">
        <Form.Control
          type="text"
          ref={productInputRef}
          placeholder="Search Products"
          onChange={handleProductInputChange}
        />
        <ListGroup>
          {filteredProducts.map((product) => (
            <ListGroup.Item
              key={product.Handle}
              onClick={() => addProductToOrder(product)}
              action
            >
              {product.Handle}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Button onClick={addToOrder}>Add product</Button>
      <Card.Body>
        <DataTable
          columns={columns}
          data={orderItems}
          striped
          highlightOnHover
        />
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Row>
            <Col>Total :</Col>
            <Col xs="auto">
              <Card
                style={{
                  backgroundColor: "lightgrey",
                  padding: "0 5px",
                  display: "inline-block",
                }}
              >
                £{totalCost.toFixed(2)}
              </Card>
            </Col>
          </Row>
        </div>
      </Card.Body>
      <Col>
        <Button onClick={handleClose} variant="">Cancel</Button>
        <Button onClick={()=>{resetOrder()}} variant="">Reset</Button>
        <Button
          onClick={() => {
            console.log(orderItems);
            handleClose()
          }}
          variant="primary"
        >
          Submit
        </Button>
      </Col>
    </div>
  );
};

export default CreateOrder;

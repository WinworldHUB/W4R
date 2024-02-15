// import React, { useState, useRef, useEffect } from "react";
// import { Card, Row, Col, Modal, Button, Form } from "react-bootstrap";
// import Chart from "chart.js/auto";
// import dummyOrders, { Order } from "../lib/data/dummyData";
// import PageLayout from "../lib/components/page-layout";
// import DataTable, { TableColumn } from "react-data-table-component";

// const Dashboard: React.FC = () => {
//   const [selectedCard, setSelectedCard] = useState<string>("Card 1");
//   const [data, setData] = useState<Order[]>([]);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const chartRef = useRef<Chart<"line"> | null>(null);

//   const handleCardClick = (card: string) => {
//     setSelectedCard(card);
//     let filteredData: Order[] = [];
//     if (card === "Card 1") {
//       filteredData = dummyOrders.filter((order) => order.status === "status1");
//     } else if (card === "Card 2") {
//       filteredData = dummyOrders.filter((order) => order.status === "status2");
//     } else if (card === "Card 3") {
//       filteredData = dummyOrders.filter((order) => order.status === "status3");
//     } else if (card === "Card 4") {
//       filteredData = dummyOrders.filter((order) => order.status === "status4");
//     }
//     setData(filteredData);
//     updateChart(filteredData);
//   };

//   const updateChart = (data: Order[]) => {
//     if (chartRef.current) {
//       chartRef.current.destroy();
//     }

//     const ctx = document.getElementById("myChart") as HTMLCanvasElement;
//     chartRef.current = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: data.map((item) => item.id),
//         datasets: [
//           {
//             label: "Order value",
//             data: data.map((item) => item.orderValue),
//             fill: false,
//             borderColor: "rgba(54, 162, 235, 1)",
//             borderWidth: 1,
//           },
//         ],
//       },
//     });
//   };

//   useEffect(() => {
//     handleCardClick(selectedCard);
//   }, []);

//   const columns: TableColumn<Order>[] = [
//     {
//       name: "#",
//       selector: (row) => row.id,
//       sortable: true,
//     },
//     {
//       name: "Order Date",
//       selector: (row) => row.orderDate,
//       sortable: true,
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status,
//       sortable: true,
//     },
//     {
//       name: "Order Value",
//       selector: (row) => row.orderValue,
//       sortable: true,
//     },
//   ];
//   const handleEdit = (order: Order) => {
//     setSelectedOrder(order);
//   };

//   const handleCloseModal = () => {
//     setSelectedOrder(null);
//   };

//   const handleSaveModal = () => {
//     if (selectedOrder) {
//       // Update the order in the data
//       const newData = data.map((order) =>
//         order.id === selectedOrder.id ? selectedOrder : order
//       );
//       setData(newData);
//     }
//     handleCloseModal();
//   };

//   const handleDeleteOrder = () => {
//     if (selectedOrder) {
//       // Filter out the selected order from data
//       const newData = data.filter((order) => order.id !== selectedOrder.id);
//       setData(newData);
//     }
//     handleCloseModal();
//   };

//   return (
//     <PageLayout isShowSideMenu>
//       <div className="dashboard-content ">
//         <Row className="justify-content-center" style={{ marginTop: "20px" }}>
//           <Col>
//             <Card
//               style={{ width: "18rem", cursor: "pointer" }}
//               onClick={() => handleCardClick("Card 1")}
//             >
//               <Card.Body>
//                 <Card.Title>Orders (Today)</Card.Title>
//                 <Card.Text>Click to see orders placed today</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col>
//             <Card
//               style={{ width: "18rem", cursor: "pointer" }}
//               onClick={() => handleCardClick("Card 2")}
//             >
//               <Card.Body>
//                 <Card.Title>All unpaid orders</Card.Title>
//                 <Card.Text>Click to see all unpaid orders</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//           <Col>
//             <Card
//               style={{ width: "18rem", cursor: "pointer" }}
//               onClick={() => handleCardClick("Card 3")}
//             >
//               <Card.Body>
//                 <Card.Title>All orders</Card.Title>
//                 <Card.Text>Click to see all orders</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         <Row style={{ marginRight: "40px", marginTop: "20px" }}>
//           <Col xs={6}>
//             <div>
//               <h2>{selectedCard}</h2>
//               <canvas id="myChart" width={600} height={400}></canvas>
//             </div>
//           </Col>
//           <Col xs={6}>
//             {selectedCard && (
//               <div>
//                 <h2>{selectedCard}</h2>
//                 <DataTable
//                   columns={columns}
//                   data={data}
//                   striped
//                   highlightOnHover
//                   pagination
//                   onRowClicked={handleEdit}
//                 />
//               </div>
//             )}
//           </Col>
//         </Row>
//       </div>
//       <Modal
//         centered
//         backdrop="static"
//         size="lg"
//         show={!!selectedOrder}
//         onHide={handleCloseModal}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>#{selectedOrder ? selectedOrder.id : ""}</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form.Group controlId="formOrderId">
//             <Form.Label>Order ID</Form.Label>
//             <Form.Control
//               type="number"
//               disabled
//               value={selectedOrder ? selectedOrder.id.toString() : ""}
//               onChange={(e) =>
//                 setSelectedOrder((prevState) => ({
//                   ...prevState!,
//                   id: parseInt(e.target.value),
//                 }))
//               }
//             />
//           </Form.Group>
//           <Form.Group controlId="formOrderDate">
//             <Form.Label>Order Date</Form.Label>
//             <Form.Control
//               type="text"
//               disabled
//               value={selectedOrder ? selectedOrder.orderDate : ""}
//               onChange={(e) =>
//                 setSelectedOrder((prevState) => ({
//                   ...prevState!,
//                   orderDate: e.target.value,
//                 }))
//               }
//             />
//           </Form.Group>
//           <Form.Group controlId="formStatus">
//             <Form.Label>Status</Form.Label>
//             <Form.Select
//               value={selectedOrder ? selectedOrder.status : ""}
//               onChange={(e) =>
//                 setSelectedOrder((prevState) => ({
//                   ...prevState!,
//                   status: e.target.value,
//                 }))
//               }
//             >
//               <option value="">Select Status</option>
//               <option value="status1">status1</option>
//               <option value="status2">status2</option>
//               <option value="status3">status3</option>
//             </Form.Select>
//           </Form.Group>
//           <Form.Group controlId="formOrderValue">
//             <Form.Label>Order Value</Form.Label>
//             <Form.Control
//               type="number"
//               disabled
//               value={selectedOrder ? selectedOrder.orderValue.toString() : ""}
//               onChange={(e) =>
//                 setSelectedOrder((prevState) => ({
//                   ...prevState!,
//                   orderValue: parseFloat(e.target.value),
//                 }))
//               }
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="danger"
//             onClick={handleDeleteOrder}
//             className="me-auto"
//           >
//             Delete
//           </Button>
//           <div>
//             <Button
//               variant="secondary"
//               onClick={handleCloseModal}
//               className="me-2"
//             >
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleSaveModal}>
//               Save Changes
//             </Button>
//           </div>
//         </Modal.Footer>
//       </Modal>
//     </PageLayout>
//   );
// };

// export default Dashboard;

// // delete button in modal on left side

export {};

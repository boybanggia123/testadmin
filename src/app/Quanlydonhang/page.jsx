"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../public/css/oder.css"


const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/stripe/admin/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId) => {
    if (!selectedOrderStatus) {
      return alert("Please select a status");
    }

    try {
      await axios.put(`http://localhost:3000/stripe/admin/orders/${orderId}`, {
        order_status: selectedOrderStatus,
      });

      alert("Order status updated");
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, order_status: selectedOrderStatus } : order
      ));
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  const handleViewDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:3000/stripe/admin/orders/${orderId}`);
      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div className="container text mt-5">
      <h1 className="text-center mb-4 order-management-title">Order Management</h1>
      <div className="table-responsive">
      <table className="table  custom-table">
  <thead>
    <tr className="table-light">
      <th>Order ID</th>
      <th>Email</th>
      <th>Payment Status</th>
      
      <th>Total</th>
      <th>Update Status</th>
      <th>View Details</th>
      <th>Order Status</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order) => (
      <tr key={order._id}>
        <td>{order._id}</td>
        <td>{order.shipping.email || "No email available"}</td>
        <td ><p className="oder-status">{order.payment_status}
        <i class="bi bi-check"></i>
        </p>
        </td>
        <td>${order.total}</td>
        <td><select
            className="form-select custom-select"
            onChange={(e) => {
              setSelectedOrderStatus(e.target.value);
              setSelectedOrderId(order._id);
            }}
            value={selectedOrderId === order._id ? selectedOrderStatus : order.order_status}
          >
            
            <option value="chưa giải quyết">Chưa giải quyết</option>
            <option value="đã vận chuyển">đã vận chuyển</option>
            <option value="đã giao hàng">đã giao hàng</option>
            <option value="đã hủy bỏ">đã hủy bỏ</option>
          </select></td>
        
        <td>
          
          <button
            className="btn btn-primary custom-btn mt-2"
            onClick={() => handleStatusChange(order._id)}
          >
            Update
          </button>
        </td>
        <td>
          <button
            className="btn btn-info custom-btn"
            data-bs-toggle="modal"
            data-bs-target="#orderDetailsModal"
            onClick={() => handleViewDetails(order._id)}
          >
            View
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

      {/* Modal for Order Details */}
      <div
        className="modal fade"
        id="orderDetailsModal"
        tabIndex="-1"
        aria-labelledby="orderDetailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderDetailsModalLabel">
                Order Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {orderDetails ? (
                <>
                  <p>
                    <strong>Order ID:</strong> {orderDetails._id}
                  </p>
                  <p>
                    <strong>User ID:</strong> {orderDetails.userId}
                  </p>
                  <p>
                    <strong>Payment Intent ID:</strong>{" "}
                    {orderDetails.paymentIntentId}
                  </p>
                  <p>
                    <strong>Total:</strong> ${orderDetails.total}
                  </p>
                  <p>
                    <strong>Order Status:</strong> {orderDetails.order_status}
                  </p>
                  <p>
                    <strong>UpdateAt:</strong> {orderDetails.updatedAt}
                  </p>

                  <h5>Products:</h5>
                  <ul className="list-group">
                    {orderDetails.products.map((product) => (
                      <li key={product._id} className="list-group-item">
                        <div className="d-flex align-items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            width="60"
                            height="60"
                            className="me-3 rounded-circle"
                          />
                          <div>
                            <p className="mb-0">
                              <strong>{product.name}</strong>
                            </p>
                            <p className="mb-0 text-muted">Size: {product.size}</p>
                          </div>
                          <div>
                            <p></p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <h5 className="mt-3">Shipping Info:</h5>
                  <p>
                    <strong>Name:</strong> {orderDetails.shipping.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {orderDetails.shipping.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {orderDetails.phone}
                  </p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {orderDetails.shipping.address.line1},{" "}
                    {orderDetails.shipping.address.city},{" "}
                    {orderDetails.shipping.address.country}
                  </p>
                  
                </>
              ) : (
                <p>Loading details...</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;

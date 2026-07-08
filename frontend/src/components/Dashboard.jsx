import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast, ToastContainer, Button, Modal } from "react-bootstrap";
import "./Dashboard.css";
import { getToken } from "../services/TokenService";
const API_BASE = "http://localhost:5700";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = getToken();

  // Toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);

  // Status modal state
  const [statusModal, setStatusModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const showCustomToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/getAllOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 404) {
        setOrders([]);
        return;
      }
      if (!res.ok) throw new Error(`Failed to load orders: ${res.status}`);
      const body = await res.json();
      setOrders(body.data || body || []);
    } catch (err) {
      console.error("fetchOrders:", err);
      setOrders([]);
      showCustomToast("Failed to fetch orders.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (orderid) => {
    if (!window.confirm("Delete this order?")) return;
    setOrders((s) => s.filter((o) => o.orderid !== orderid));

    try {
      const res = await fetch(`${API_BASE}/orders/${orderid}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        await fetchOrders();
        throw new Error("Delete failed.");
      }
      showCustomToast("Order deleted successfully.", "success");
    } catch (err) {
      console.error("deleteOrder error:", err);
      showCustomToast("Delete failed. Data refreshed.", "error");
      await fetchOrders();
    }
  };

  const openStatusModal = (order) => {
    setCurrentOrder(order);
    setStatusModal(true);
  };

  const changeStatus = async (newStatus) => {
    if (!currentOrder) return;

    const previousOrders = [...orders];
    setOrders((s) =>
      s.map((o) =>
        o.orderid === currentOrder.orderid
          ? { ...o, order_status: newStatus }
          : o
      )
    );

    setStatusModal(false);

    try {
      const res = await fetch(`${API_BASE}/updateStatus/${currentOrder.orderid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        setOrders(previousOrders); // revert on error
        throw new Error("Update failed");
      }

      showCustomToast("Order status updated.", "success");
    } catch (err) {
      console.error("changeStatus error:", err);
      setOrders(previousOrders);
      showCustomToast("Update failed. Data refreshed.", "error");
      await fetchOrders();
    }
  };

  const allowedStatuses = ["Pending", "Delivered", "Cancelled"];

  return (
    <div className="container my-4">
      <h4 className="mb-3">Orders</h4>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-sm">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Username</th>
                <th>Product ID</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">
                    No orders
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.orderid}>
                    <td>{o.orderid}</td>
                    <td>{o.userid}</td>
                    <td>{o.username || "-"}</td>
                    <td>{o.product_id ?? "-"}</td>
                    <td>{o.product_name}</td>
                    <td>{o.quantity}</td>
                    <td>₹{Number(o.amount).toFixed(2)}</td>
                    <td>{o.order_date}</td>
                    <td>{o.order_status}</td>
                    <td style={{ minWidth: 180 }}>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteOrder(o.orderid)}
                        >
                          Delete
                        </button>

                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => openStatusModal(o)}
                        >
                          Change status
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          className={`custom-toast ${toastType}`}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Status Change Modal */}
      <Modal show={statusModal} onHide={() => setStatusModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-around">
            {allowedStatuses.map((status) => (
              <Button
                key={status}
                variant={
                  status === "Pending"
                    ? "secondary"
                    : status === "Delivered"
                    ? "success"
                    : "danger"
                }
                onClick={() => changeStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

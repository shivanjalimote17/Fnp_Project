import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { getId } from "../services/IdService";
import { productImages } from "../services/ProductImg.js";
import { getToken } from "../services/TokenService.js";

export function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userid = Number(getId());
  

 

  useEffect(() => {
    console.log("User ID from getId():", userid);

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5700/getUserOrders/${userid}`
        );

        if (response.status === 200) {
          setOrders(response.data.data);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Something went wrong while fetching orders"
        );
      } finally {
        setLoading(false);
      }
    };

    if (userid) {
      fetchOrders();
    }
  }, [userid]);

  const getProductImage  = (productName) => {
  if (!productName) return "/placeholder.png";
  const key = productName.replace(/[^a-zA-Z0-9]/g, ""); // remove spaces & symbols like '&'
  return productImages[key] || "/placeholder.png";
};

  // ...existing code for loading and error states...

  return (
    <div className="container mt-5 mb-5" >
      <h2 className="text-center mb-4 text-success fw-bold"   style={{marginTop:"80px"}} >My Orders</h2>

      <div className="row">
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <div className="col-lg-4 mb-4" key={order.orderid || index}>
              <div className="card shadow-sm border-0 rounded-4"
              style={{height: "400px",
               width:"300px", 
                alignContent: "center",
                 alignItems:"center",
                  justifyContent:"center",
                  marginLeft:"auto",
                  marginTop:"70px",
                  marginBottom:"150px"}}>
                <img
                  src={getProductImage (order.product_name) || "/placeholder.png"}
                  alt={order.product_name}
                  className="card-img-top rounded-top-4"
                  style={{ height: "150px", width:"200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-success mb-3">
                    {order.product_name}
                  </h5>
                  <p className="card-text mb-1">
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Amount:</strong> ₹{order.amount}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.order_date).toLocaleDateString()}
                  </p>
                  <div className="mt-3" style={{justifyContent:"center",alignItems:"center",display:"flex"}}>
                    <span
                      className={`badge px-3 py-2 ${
                        order.order_status === "Delivered"
                          ? "bg-success"
                          : order.order_status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {order.order_status || "Processing"}
                    </span>
                  </div>
                </div>
                <div
                  className="card-footer text-center bg-light"
                  style={{ borderTop: "none" }}
                >
                  <small className="text-muted">
                    Thank you for shopping 🌼
                  </small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-5">
            You haven't placed any orders yet 🌿
          </p>
        )}
      </div>
    </div>
  );
}

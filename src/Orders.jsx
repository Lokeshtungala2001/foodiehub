
import React from "react";
import { useCart } from "./CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

function Orders() {
  const { orders, setOrders } = useCart();

  const removeOrder = (id) => {
    if (window.confirm("❌ Are you sure you want to remove this order?")) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  const backgroundStyle = {
    backgroundImage: "url('public/images/ChatGPT Image Dec 26, 2025, 05_44_36 PM.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    width: "100%",
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    minHeight: "100vh",
    paddingTop: "50px",
    paddingBottom: "50px",
  };

  if (orders.length === 0) {
    return (
      <div style={backgroundStyle}>
        <div style={{ ...overlayStyle, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#fff", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem" }}>🍔 You have no orders yet!</h2>
          <p style={{ fontSize: "1.2rem" }}>Start adding delicious food to your cart 🍕🍟</p>
        </div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}>
        <br />
        <h2 className="text-center text-white mb-5" style={{ textShadow: "2px 2px 6px #000" }}>🧾 Your Orders</h2>
        <div className="container">
          <div className="row">
            {orders.map(order => (
              <div key={order.id} className="col-md-6 mb-4">
                <div className="card shadow-lg p-3" style={{ borderRadius: "15px", backgroundColor: "rgba(255,255,255,0.9)" }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="card-title mb-0">Order #{order.id}</h5>
                      <button className="btn btn-sm btn-danger" onClick={() => removeOrder(order.id)}>Remove</button>
                    </div>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Items:</strong></p>
                    <ul>
                      {order.items.map(item => (
                        <li key={item.id}>
                          {item.name} x {item.quantity} = <strong>₹{item.price * item.quantity}</strong>
                        </li>
                      ))}
                    </ul>
                    <p><strong>Subtotal:</strong> ₹{order.subtotal.toFixed(2)}</p>
                    <p><strong>Tax:</strong> ₹{order.tax.toFixed(2)}</p>
                    <p><strong>Manual Discount:</strong> ₹{order.manualDiscount.toFixed(2)}</p>
                    <p><strong>Coupon Discount:</strong> ₹{order.couponDiscount.toFixed(2)}</p>
                    <h5 className="mt-2"><strong>Grand Total:</strong> ₹{order.grandTotal.toFixed(2)}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;

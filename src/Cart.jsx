
import React, { useState } from "react";
import { useCart } from "./CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { QRCodeCanvas } from "qrcode.react";
import emailjs from "emailjs-com";

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, orders, setOrders, setCart } =
    useCart();
  const [manualDiscount, setManualDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [email, setEmail] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const grandTotal = subtotal + tax - manualDiscount - couponDiscount;

  const applyCoupon = () => {
    if (couponCode === "syam50") {
      setCouponDiscount(50);
      alert("✅ Coupon applied! ₹50 discount");
    } else {
      setCouponDiscount(0);
      alert("❌ Invalid coupon code");
    }
  };

  const handleCheckout = async () => {
    if (!email) {
      alert("⚠️ Please enter your Gmail to proceed.");
      return;
    }
    if (cart.length === 0) {
      alert("⚠️ Your cart is empty!");
      return;
    }

    const orderDetails = cart
      .map((item) => `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`)
      .join("\n");

    const templateParams = {
      to_email: email,
      message: `
Thank you for your order! 🎉

Items:
${orderDetails}

Coupon: ${couponCode || "None"}
Manual Discount: ₹${manualDiscount.toFixed(2)}
Coupon Discount: ₹${couponDiscount.toFixed(2)}
Total Amount: ₹${grandTotal.toFixed(2)}

We’ll deliver your food soon! 🍴
    `,
    };

    try {
      // ✅ Send Gmail
      await emailjs.send(
        "service_ju3327k",
        "template_vqyf7dp",
        templateParams,
        "UV5MM4uA01-OghXYW"
      );
      alert("📧 Order confirmation sent to Gmail!");

      // ✅ Save order
      const newOrder = {
        id: Date.now(),
        items: cart,
        subtotal,
        tax,
        manualDiscount,
        couponDiscount,
        couponCode,
        grandTotal,
        email,
      };
      setOrders([...orders, newOrder]);

      // ✅ Clear cart after success
      setCart([]);
      setManualDiscount(0);
      setCouponDiscount(0);
      setCouponCode("");
      setEmail("");
      setShowQR(false);

      alert("✅ Checkout successful!");
    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("❌ Failed to send email. Please check your EmailJS keys and template.");
    }
  };

  return (
    <div
      className="container-fluid py-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="row">
        {/* LEFT - Cart Items */}
        <div className="col-md-7">
          <h3 className="mb-4 p-5 text-white fw-bold">
            🛒 Your Cart ({cart.length} Items)
          </h3>

          {cart.length === 0 ? (
            <div className="alert alert-info">Your cart is empty.</div>
          ) : (
            cart.map((item) => (
              <div
                className="card mb-3 shadow-sm"
                key={item.id}
                style={{
                  maxWidth: "480%",
                  margin: "0 auto",
                  fontSize: "14px",
                }}
              >
                <div className="row g-0 align-items-center">
                  <div className="col-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="img-fluid rounded-start"
                      style={{ height: "80px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-9">
                    <div className="card-body d-flex justify-content-between align-items-center p-2">
                      <div>
                        <h6 className="card-title mb-1">{item.name}</h6>
                        <p className="text-primary fw-bold mb-1">₹{item.price}</p>
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT - Order Summary */}
        <div className="col-md-5 p-5">
          <div className="card shadow-lg">
            <div className="card-body">
              <h4 className="card-title">Order Summary</h4>
              <hr />
              <p className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </p>
              <p className="d-flex justify-content-between">
                <span>Sales Tax (18%):</span>
                <span>₹{tax.toFixed(2)}</span>
              </p>
              <p className="d-flex justify-content-between text-danger">
                <span>Manual Discount:</span>
                <span>-₹{manualDiscount.toFixed(2)}</span>
              </p>
              <p className="d-flex justify-content-between text-danger">
                <span>Coupon Discount:</span>
                <span>-₹{couponDiscount.toFixed(2)}</span>
              </p>
              <h5 className="d-flex justify-content-between fw-bold">
                <span>Grand Total:</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </h5>
              <hr />

              {/* Manual Discounts */}
              <h6>Manual Discounts</h6>
              <div className="mb-3">
                {[10, 20, 30].map((d) => (
                  <button
                    key={d}
                    className="btn btn-outline-info btn-sm me-2"
                    onClick={() => setManualDiscount((subtotal * d) / 100)}
                  >
                    {d}%
                  </button>
                ))}
              </div>

              {/* Coupon */}
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="btn btn-outline-primary" onClick={applyCoupon}>
                  Apply
                </button>
              </div>

              {/* Email input */}
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your Gmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Payment Options */}
              <h6>Payment Options</h6>
              <div className="d-grid gap-2 mb-3">
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => setShowQR(!showQR)}
                >
                  {showQR ? "Hide QR" : "Show QR Code"}
                </button>
                {showQR && (
                  <div className="text-center p-3 border rounded">
                    <p className="mb-2 fw-bold">Scan & Pay with PhonePe</p>
                    <QRCodeCanvas
                      value={`upi://pay?pa=8367705728@ybl&pn=TastyBites&am=${grandTotal.toFixed(
                        2
                      )}&cu=INR`}
                      size={180}
                      includeMargin={true}
                    />
                    <p className="mt-2">
                      Pay <strong>₹{grandTotal.toFixed(2)}</strong> to{" "}
                      <span className="text-success">Tasty Bites</span>
                    </p>
                  </div>
                )}
                <button className="btn btn-outline-primary btn-sm">Card Payment</button>
                <button className="btn btn-outline-dark btn-sm">Cash on Delivery</button>
              </div>

              {/* Checkout Button */}
              <button className="btn btn-success w-100" onClick={handleCheckout}>
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

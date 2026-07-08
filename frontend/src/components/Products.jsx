import React, { useState, useMemo } from "react";
import "./Products.css";
import Blush from "../assets/HomeCarouselImages/BlushRushBouquet.jpg";
import Chocolate from "../assets/HomeCarouselImages/chocolatebox.jpg";
import Teddy from "../assets/HomeCarouselImages/teddy.jpg";
import Makeup from "../assets/HomeCarouselImages/makeup.jpg";
import sunrise from "../assets/ThreeTabsImages/sunrise.jpg";
import sweetmix from "../assets/ThreeTabsImages/sweetmix.jpg";
import combo from "../assets/ThreeTabsImages/combo.jpg";
import lip from "../assets/ThreeTabsImages/lip.jpg";
import perfume from "../assets/ThreeTabsImages/perfume.jpg";
import { getToken } from "../services/TokenService";
import { Toast, ToastContainer } from "react-bootstrap";

/* small helpers */
const parsePriceValue = (priceStr) =>
  Number((priceStr || "").toString().replace(/[^\d.]/g, "")) || 0;

const formatCurrency = (n) => `₹${(Number(n) || 0).toFixed(2)}`;

export function Products() {
  const tabs = [
    {
      key: "flowers",
      label: "Flowers",
      items: [
        { product_id: 1, img: Blush, title: "Blush Bouquet", price: "₹599" },
        { product_id: 2, img: sunrise, title: "Sunrise Roses", price: "₹499" },
        { product_id: 3, img: sweetmix, title: "Sweet Mix", price: "₹399" },
      ],
    },
    {
      key: "gifts",
      label: "Gifts",
      items: [
        { product_id: 4, img: Chocolate, title: "Chocolate Box", price: "₹399" },
        { product_id: 5, img: Teddy, title: "Cuddly Teddy", price: "₹699" },
        { product_id: 6, img: combo, title: "Gift Wrap Combo", price: "₹299" },
      ],
    },
    {
      key: "makeup",
      label: "Makeup",
      items: [
        { product_id: 7, img: Makeup, title: "Makeup Kit", price: "₹1299" },
        { product_id: 8, img: lip, title: "Lip & Cheek Duo", price: "₹349" },
        { product_id: 9, img: perfume, title: "Perfume Mini", price: "₹799" },
      ],
    },
  ];

  const initialCounts = {};
  tabs.forEach((t) =>
    t.items.forEach((_, i) => (initialCounts[`${t.key}-${i}`] = 0))
  );
  const [counts, setCounts] = useState(initialCounts);
  const [cart, setCart] = useState([]);

  const increment = (id) =>
    setCounts((s) => ({ ...s, [id]: (s[id] || 0) + 1 }));
  const decrement = (id) =>
    setCounts((s) => ({ ...s, [id]: Math.max(0, (s[id] || 0) - 1) }));

  const addToCart = (categoryKey, idx) => {
    const id = `${categoryKey}-${idx}`;
    const qty = counts[id] || 0;
    if (qty <= 0) return;

    const product = tabs.find((t) => t.key === categoryKey).items[idx];
    const priceValue = parsePriceValue(product.price);

    setCart((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === id);
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          qty: copy[existingIndex].qty + qty,
        };
        return copy;
      }
      return [
        ...prev,
        {
          id,
          product_id: product.product_id,
          title: product.title,
          img: product.img,
          priceStr: product.price,
          priceValue,
          qty,
        },
      ];
    });

    setCounts((s) => ({ ...s, [id]: 0 }));
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, it) => sum + Number(it.priceValue || 0) * (it.qty || 0),
        0
      ),
    [cart]
  );

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [orderUserId, setOrderUserId] = useState(storedUser.userid || "");
  const [orderUserName, setOrderUserName] = useState(
    storedUser.username || ""
  );

  const token = getToken();

  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  const placeOrder = async () => {
    if (cart.length === 0) {
      setToastMessage("Cart is empty");
      setToastBg("danger");
      setShowToast(true);
      return;
    }

    if (!orderUserId) {
      setToastMessage("Enter user id before placing order");
      setToastBg("danger");
      setShowToast(true);
      return;
    }

    const items = cart.map((it) => ({
      product_id: Number(it.product_id),
      product_name: it.title,
      quantity: it.qty,
      amount: Number(it.priceValue) * Number(it.qty),
    }));

    const payload = {
      userid: Number(orderUserId),
      username: orderUserName || null,
      items,
    };

    try {
      const res = await fetch("http://localhost:5700/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to place order");
      }

      await res.json();
      setToastMessage("Order placed successfully!");
      setToastBg("success");
      setShowToast(true);
      clearCart();
    } catch (err) {
      console.error("placeOrder error", err);
      setToastMessage("Failed to place order. See console for details.");
      setToastBg("danger");
      setShowToast(true);
    }
  };

  return (
    <div className="products-page">
      {tabs.map((cat) => (
        <section key={cat.key} className="category-section">
          <h2 className="category-title">{cat.label}</h2>

          <div
            role="list"
            aria-label={`${cat.label} products`}
            className="products-list"
          >
            <div className="products-table-header">
              <div className="col-image">Image</div>
              <div className="col-product">Product</div>
              <div className="col-price">Price</div>
              <div className="col-quantity">Quantity</div>
              <div className="col-action" />
            </div>

            {cat.items.map((it, idx) => {
              const id = `${cat.key}-${idx}`;
              const qty = counts[id] || 0;
              return (
                <div key={id} role="listitem" className="product-row">
                  <div className="col-image">
                    <img src={it.img} alt={it.title} className="product-thumb" />
                  </div>

                  <div className="col-product">{it.title}</div>

                  <div className="col-price">{it.price}</div>

                  <div className="col-quantity">
                    <div className="qty-control">
                      <button
                        type="button"
                        onClick={() => decrement(id)}
                        disabled={qty === 0}
                        aria-label={`Decrease ${it.title}`}
                        className="btn btn-qty"
                      >
                        −
                      </button>

                      <div className="qty-number">{qty}</div>

                      <button
                        type="button"
                        onClick={() => increment(id)}
                        aria-label={`Increase ${it.title}`}
                        className="btn btn-qty"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-action">
                    <button
                      type="button"
                      onClick={() => addToCart(cat.key, idx)}
                      disabled={qty === 0}
                      aria-label={`Add ${qty} ${it.title} to cart`}
                      className={`btn btn-add ${qty === 0 ? "disabled" : ""}`}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section className="cart-section">
        <h2 className="category-title">Your Cart</h2>

        <div className="order-inputs">
          <label>
            User ID:
            <input value={orderUserId} readOnly className="order-input" type="number" />
          </label>

          <label>
            Username:
            <input value={orderUserName} readOnly className="order-input" />
          </label>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">No items in cart</div>
        ) : (
          <>
            <div className="cart-list">
              {cart.map((it) => (
                <div key={it.id} className="cart-row">
                  <div className="col-image">
                    <img src={it.img} alt={it.title} className="product-thumb" />
                  </div>

                  <div className="col-product">
                    <div className="cart-title">{it.title}</div>
                    <div className="cart-price">{it.priceStr}</div>
                  </div>

                  <div className="col-qty-display">
                    Qty: <strong>{it.qty}</strong>
                  </div>

                  <div className="col-amount">
                    {formatCurrency(Number(it.priceValue) * Number(it.qty))}
                  </div>

                  <div className="col-action">
                    <button
                      type="button"
                      onClick={() => removeFromCart(it.id)}
                      className="btn btn-remove"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div>
                <div className="subtotal-label">Cart subtotal</div>
                <div className="subtotal-amount">{formatCurrency(subtotal)}</div>
              </div>

              <div className="cart-actions">
                <button type="button" onClick={clearCart} className="btn btn-clear">
                  Clear
                </button>
                <button type="button" onClick={placeOrder} className="btn btn-place">
                  Place order
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toastBg}
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default Products;

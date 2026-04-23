import { useCart } from "../context/CartContext";
import fallbackImage from "../assets/fallback.jpeg";
import emptyCartImage from "../assets/empty-cart.png";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
    totalItems,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      clearCart();
      setLoading(false);
      toast.success("Order placed successfully 🎉");
    }, 1500);
  };

  return (
    <div className="cart-page">
      <div className="cart-left">
        <h2>Your Cart</h2>

        {cart.length === 0 && (
          <div className="empty-cart">
            <img src={emptyCartImage} alt="Empty cart" />

            <h3>Your Cart is Empty</h3>

            <p>Looks like you haven’t added anything yet.</p>

            <Link to="/" className="shop-btn">
              Browse Products
            </Link>
          </div>
        )}

        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <Link to={`/product/${item.id}`}>
              <img
                src={item.images?.[0] || fallbackImage}
                alt={item.title}
              />
            </Link>

            <div className="cart-info">
              <Link to={`/product/${item.id}`}>
                <h4>{item.title}</h4>
              </Link>

              <p>${item.price.toFixed(2)}</p>

              <div className="qty-box">
                <button onClick={() => decreaseQty(item.id)}>-</button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>

        <div>
          <span>Items</span>
          <span>{totalItems}</span>
        </div>

        <div>
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <div>
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <hr />

        <div className="grand-total">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={cart.length === 0 || loading}
        >
          {loading ? "Processing..." : "Checkout"}
        </button>

        {cart.length > 0 && (
          <Link to="/" className="add-more-btn">
            Add More Products
          </Link>
        )}
      </div>
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FiShoppingCart,
  FiGrid,
} from "react-icons/fi";

export default function Header() {
  const { totalItems } = useCart();

  const location = useLocation();

  const isHome =
    location.pathname === "/";

  const isCart =
    location.pathname === "/cart";

  return (
    <header className="header">
      <div className="header-inner">
        <Link
          to="/"
          className="logo"
        >
          ShopKart
        </Link>

        <nav className="nav-links">
          <Link
            to="/"
            className={`nav-item ${
              isHome
                ? "active-nav"
                : ""
            }`}
          >
            <FiGrid />
            <span>
              Products
            </span>
          </Link>

          <Link
            to="/cart"
            className={`cart-btn ${
              isCart
                ? "active-cart"
                : ""
            }`}
          >
            <FiShoppingCart />

            <span className="cart-text">
              Cart
            </span>

            {totalItems >
              0 && (
              <small className="cart-badge">
                {totalItems}
              </small>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
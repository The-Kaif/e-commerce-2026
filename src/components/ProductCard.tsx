import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import fallbackImage from "../assets/fallback.jpeg";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <Link
        to={`/product/${product.id}`}
        className="card-link"
      >
        <img
          src={
            product.images[0] ||
            fallbackImage
          }
          alt={product.title}
        />

        <span className="badge">
          {product.category.name}
        </span>

        <h3>{product.title}</h3>

        <p className="price">
          ${product.price}
        </p>
      </Link>

      <div className="card-actions">
        <button
          className="primary-btn"
          onClick={() =>
            addToCart(product)
          }
        >
          Add
        </button>
      </div>
    </div>
  );
}
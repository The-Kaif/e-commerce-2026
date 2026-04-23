import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { fetchProductById } from "../api/productApi";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/product";

import fallbackImage from "../assets/fallback.jpeg";

export default function ProductDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        const data = await fetchProductById(id);

        setProduct(data);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="detail skeleton-detail">
        <div className="skeleton detail-img-loader"></div>

        <div className="detail-content">
          <div className="skeleton line-lg"></div>
          <div className="skeleton line-md"></div>
          <div className="skeleton line-sm"></div>
          <div className="skeleton line-btn"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="detail-wrapper">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail">
        <div className="detail-image">
          <img
            src={product.images?.[0] || fallbackImage}
            onError={(e) => (e.currentTarget.src = fallbackImage)}
            alt={product.title}
          />
        </div>

        <div className="detail-content">
          <p className="category">{product.category.name}</p>

          <h1>{product.title}</h1>

          <h2>${product.price}</h2>

          <p>{product.description}</p>

          <div className="detail-actions">
            <button className="buy-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>

            <Link to="/" className="continue-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

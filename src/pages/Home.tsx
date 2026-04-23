/* eslint-disable react-hooks/immutability */

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchProducts, fetchCategories } from "../api/productApi";

import type { Product, Category } from "../types/product";

import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import SkeletonCard from "../components/SkeletonCard";

import notFoundImage from "../assets/Product-Not-Found.png";

type SortType = "" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectedCategories =
    searchParams.get("category")?.split(",").filter(Boolean) || [];

  const search = searchParams.get("search") || "";

  const sortBy = (searchParams.get("sort") as SortType) || "";

  const page = Number(searchParams.get("page")) || 1;

  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);

      const [productData, categoryData] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);

      setProducts(productData);
      setCategories(categoryData);
    } finally {
      setLoading(false);
    }
  };

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
      params.set("page", "1");
    }

    setSearchParams(params);
  };

  const toggleCategory = (id: string) => {
    const params = new URLSearchParams(searchParams);

    let values = params.get("category")?.split(",").filter(Boolean) || [];

    if (values.includes(id)) {
      values = values.filter((item) => item !== id);
    } else {
      values.push(id);
    }

    if (values.length) {
      params.set("category", values.join(","));
    } else {
      params.delete("category");
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const finalProducts = useMemo(() => {
    let filtered = [...products];

    // Multi category filter
    if (selectedCategories.length) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(String(item.category.id)),
      );
    }

    // Search
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );

    // Sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return filtered;
  }, [products, selectedCategories, search, sortBy]);

  const totalPages = Math.ceil(finalProducts.length / ITEMS_PER_PAGE) || 1;

  const paginatedProducts = finalProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const hasActiveFilters =
    search || sortBy || selectedCategories.length || page > 1;

  return (
    <div className="container">
      {/* Top Filters */}
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => updateParams("search", e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => updateParams("sort", e.target.value)}
        >
          <option value="">Sort By</option>

          <option value="price-asc">Price: Low to High</option>

          <option value="price-desc">Price: High to Low</option>

          <option value="name-asc">Name: A-Z</option>

          <option value="name-desc">Name: Z-A</option>
        </select>

        {hasActiveFilters && (
          <button className="clear-btn" onClick={resetFilters}>
            Reset Filters
          </button>
        )}
      </div>

      {/* Multi Category */}
      <div className="category-filters">
        {(showAllCategories ? categories : categories.slice(0, 8))
          .filter((cat) => cat.name?.trim())
          .map((cat) => (
            <button
              key={cat.id}
              className={`category-chip ${
                selectedCategories.includes(String(cat.id)) ? "active-chip" : ""
              }`}
              onClick={() => toggleCategory(String(cat.id))}
            >
              {cat.name}
            </button>
          ))}

        {categories.length > 8 && (
          <button
            className="more-chip"
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            {showAllCategories ? "Show Less" : `+${categories.length - 8} More`}
          </button>
        )}
      </div>

      {/* Products */}
      {loading ? (
        <div className="grid">
          {Array.from({
            length: 8,
          }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : paginatedProducts.length === 0 ? (
        <div className="no-products">
          <img src={notFoundImage} alt="No products found" />

          <h3>No Products Found</h3>

          <p>Try changing search, category or sort filters.</p>
        </div>
      ) : (
        <>
          <div className="grid">
            {paginatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(nextPage) => updateParams("page", String(nextPage))}
          />
        </>
      )}
    </div>
  );
}

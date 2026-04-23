import axios from "axios";
import type { Product, Category } from "../types/product";

const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1",
});

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await api.get("/products");
  return res.data;
};

export const fetchProductById = async (
  id: string
): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await api.get("/categories");
  return res.data;
};

export const fetchByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  const res = await api.get(
    `/categories/${categoryId}/products`
  );

  return res.data;
};
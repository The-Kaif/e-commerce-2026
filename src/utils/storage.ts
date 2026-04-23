export const getCartStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

export const setCartStorage = (data: unknown) => {
  localStorage.setItem("cart", JSON.stringify(data));
};
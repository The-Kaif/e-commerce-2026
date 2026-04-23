# 🛒 ShopKart — E-Commerce Assignment

A modern and responsive e-commerce web application built using **React + TypeScript + Vite**.  
Designed with a clean shopping experience, dynamic product filtering, cart management, and responsive UI.

---

## 🌐 Project Overview

ShopKart allows users to browse products, search and filter items, view product details, add products to cart, and manage cart items with persistent storage.

---

## ✨ Features

### 🛍️ Product Listing Page
- Responsive product grid layout  
- Product image, title, category, and price  
- Skeleton loading while fetching data  
- Empty state UI  
- API error fallback with retry option  

### 🔎 Search / Filter / Sort
- Search products by name  
- Multi-category filtering  
- Sort products by:
  - Price Low to High  
  - Price High to Low  
  - Name A-Z  
  - Name Z-A  

- Filters saved in URL query params  
- Refresh-safe filters  
- Back / Forward browser navigation support  
- Reset filters option  

### 📄 Product Detail Page
- Dynamic routing using product ID  
- Product image, title, description, category, price  
- Add to cart button  
- Continue shopping button  

### 🛒 Cart Functionality
- Add items to cart  
- Increase / decrease quantity  
- Remove items  
- Show total number of items  
- Show subtotal & total price  
- Checkout simulation with toast notification  
- Empty cart UI  
- Add more products button  

### 💾 Persistent Storage
- Cart stored in localStorage  
- Cart remains after page refresh  

### 📱 Responsive Design
- Mobile friendly  
- Tablet support  
- Desktop optimized  

### 🧪 Automated Testing
Playwright test cases included:

- Homepage loads  
- Add item to cart  
- Cart page works  

Tests passed on:

- Chromium  
- Firefox  
- WebKit  

---

## 🛠 Tech Stack

- React 19  
- TypeScript  
- Vite  
- React Router DOM  
- Context API  
- Axios  
- React Hot Toast  
- React Icons  
- Playwright  
- CSS3  

---

## 🚀 Getting Started

### Install Dependencies

npm install

### Run Development Server

npm run dev

### Open in Browser

http://localhost:5173

---

## 📜 Available Scripts

### Start Development Server

npm run dev

### Build for Production

npm run build

### Preview Production Build

npm run preview

### Run Lint

npm run lint

---

## 🧪 Run Tests

### Execute Playwright Tests

npx playwright test

### Open HTML Test Report

npx playwright show-report

---

## 📂 Folder Structure

src/  
├── api/  
│   └── productApi.ts  
│  
├── assets/  
│  
├── components/  
│   ├── Footer.tsx  
│   ├── Header.tsx  
│   ├── Pagination.tsx  
│   ├── ProductCard.tsx  
│   └── SkeletonCard.tsx  
│  
├── context/  
│   └── CartContext.tsx  
│  
├── pages/  
│   ├── Home.tsx  
│   ├── ProductDetail.tsx  
│   └── Cart.tsx  
│  
├── types/  
│   └── product.ts  
│  
├── utils/  
│   └── storage.ts  
│  
├── App.tsx  
├── main.tsx  
└── index.css  

---

## 🎯 Key Highlights

- Modern responsive UI  
- Dynamic API based filtering  
- URL query param state management  
- Reusable component structure  
- Cart persistence using localStorage  
- Cross-browser Playwright testing  
- Clean and scalable codebase  

---

## 📦 Build Project

npm run build

---

## 🙌 Author

**Mohd Kaif**  
Frontend Developer (React / TypeScript)

---
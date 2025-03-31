# 🛍️ E-Commerce Backend API

## Overview
This is a backend API for an E-Commerce application built using Node.js, Express.js, and MongoDB with Mongoose. It provides endpoints for managing products, categories, users, authentication, orders, and more.

## ✨ Features
- **User Management** (JWT Authentication)
- **Product Catalog** (Categories, Brands, Reviews)
- **Shopping Cart & Wishlist**
- **Order Processing** (Stripe Payments)
- **File Uploads** (Multer)
- **Coupon/Discount System**

## 🛠 Tech Stack
- **Node.js** - JavaScript runtime for server-side development.
- **Express.js** - Web framework for building the API.
- **MongoDB** - NoSQL database for storing application data.
- **Mongoose** - ODM for interacting with MongoDB.
- **Authentication** - JWT + Bcrypt
- **Multer** - Middleware for handling file uploads.
- **Strapi** - Headless CMS for content management.
- **Stripe** - Payment processing service.

## 📁 Project Structure
```plaintext
ecommerce-api/
├── config/
├── controllers/
├── dataBase/
│   ├── models/
│   └── dB.connection.js
├── middlewares/
├── routes/
├── uploads/
├── utils/
├── .env
├── server.js
└── package.json
```

## 🚀 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/ecommerce-api.git
   cd ecommerce-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```env
   SERVER_PORT=3000
   DB_URL=mongodb://127.0.0.1:27017/eCommerce
   JWT_SECRET_KEY=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
4. Run the server:
   ```sh
   npm start
   ```

## API Documentation

### 🔐 Authentication
```plaintext
POST   /auth/register         - User registration (Public)
POST   /auth/login            - User login (Public)
POST   /auth/changePassword   - Change password (User)
```

### 👥 Users
```plaintext
POST   /user                 - Add user (Admin)
GET    /user                 - Get all users (Admin)
PUT    /user/:id             - Update user (Admin)
DELETE /user/:id             - Delete user (Admin)
```

### 📦 Products
```plaintext
POST   /product              - Add product (Admin)
GET    /product              - Get all products (Public)
PUT    /product/:id          - Update product (Admin)
DELETE /product/:id          - Delete product (Admin)
```

### 🏷️ Categories
```plaintext
POST   /category             - Add category (Admin)
GET    /category             - Get all categories (Public)
PUT    /category/:id         - Update category (Admin)
DELETE /category/:id         - Delete category (Admin)
```

### 🏷️ Subcategories
```plaintext
POST   /subCategory          - Add subcategory (Admin)
GET    /subCategory          - Get all subcategories (Public)
PUT    /subCategory/:id      - Update subcategory (Admin)
DELETE /subCategory/:id      - Delete subcategory (Admin)
```

### 🏢 Brands
```plaintext
POST   /brand                - Add brand (Admin)
GET    /brand                - Get all brands (Public)
PUT    /brand/:id            - Update brand (Admin)
DELETE /brand/:id            - Delete brand (Admin)
```

### 🛒 Cart
```plaintext
POST   /cart                 - Add to cart (User)
PATCH  /cart                 - Update quantity (User)
DELETE /cart                 - Remove from cart (User)
POST   /cart/applyCoupon     - Apply coupon (User)
```

### 💳 Orders
```plaintext
POST   /order                - Create cash order (User)
POST   /order/checkout/:id   - Checkout with Stripe (User)
```

### 🎟️ Coupons
```plaintext
POST   /coupon               - Add coupon (Admin)
GET    /coupon               - Get all coupons (Admin)
PUT    /coupon/:id           - Update coupon (Admin)
DELETE /coupon/:id           - Delete coupon (Admin)
```

### 📝 Reviews
```plaintext
POST   /review               - Add review (User)
GET    /review               - Get all reviews (Public)
PUT    /review/:id           - Update review (User)
DELETE /review/:id           - Delete review (User/Admin)
```

### 📍 Addresses
```plaintext
PATCH  /addresses            - Add address (User)
DELETE /addresses            - Remove address (User)
```

### ❤️ Wishlist
```plaintext
PATCH  /wishList             - Add to wishlist (User)
DELETE /wishList             - Remove from wishlist (User)
```

## 🤝 Contributing

1. Fork the repository.
2. Create your feature branch:
   ```sh
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```sh
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

## License
This project is licensed under the MIT License.



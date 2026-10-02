<p align="center">
  <h1 align="center">Sweet House</h1>
</p>

<p align="center">
  A modern React frontend for a dessert e-commerce application.
</p>

<p align="center">
  <a href="https://github.com/esraaghneem/sweet-house-frontend">
    <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="Frontend">
  </a>
  <a href="https://vitejs.dev/">
    <img src="https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  </a>
  <a href="https://axios-http.com/">
    <img src="https://img.shields.io/badge/API-Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios">
  </a>
  <a href="https://github.com/esraaghneem/sweet-house-backend">
    <img src="https://img.shields.io/badge/Backend-Laravel%2012-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  </a>
</p>

<p align="center">
  <a href="https://github.com/esraaghneem/sweet-house-backend">
    <strong>Backend Repository</strong>
  </a>
  &nbsp; • &nbsp;
  <a href="https://github.com/esraaghneem/sweet-house-frontend">
    <strong>Frontend Repository</strong>
  </a>
</p>

---

## 🍰 About Sweet House

**Sweet House** is a modern dessert e-commerce frontend built with **React and Vite**.

The application provides a complete customer shopping experience where users can browse dessert products, explore categories, create an account, log in, manage their shopping cart, create orders, and complete a simulated payment process.

The frontend communicates with a Laravel REST API backend using Axios.

The project focuses on a clean user interface, reusable React components, organized state management, authentication handling, and a responsive shopping experience.

---

## 🛠️ Technologies

- React
- Vite
- JavaScript
- Axios
- CSS
- React Context API
- Laravel REST API
- Laravel Sanctum Authentication

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- User logout
- Authentication state management
- Authenticated user information
- Protected order operations
- Token-based authentication with Laravel Sanctum

### 🍰 Products & Categories

- Display products from the backend API
- Display product categories
- Filter products by category
- Display product prices
- Display product stock
- Product images
- Active product handling

### 🛒 Shopping Cart

- Add products to cart
- Increase product quantity
- Decrease product quantity
- Remove products from cart
- Display total cart items
- Calculate cart total
- Clear cart
- Cart drawer interface

### 📦 Orders

- Create orders from cart items
- Send cart data to the Laravel API
- Receive the created order
- Track the current order during checkout
- Handle order success and error messages

### 💳 Simulated Payment

Sweet House includes a simulated payment interface for demonstration and portfolio purposes.

The frontend provides a card payment form with:

- Cardholder name
- Card number
- Expiry date
- CVV
- Payment validation
- Payment processing state
- Payment success and error messages

No real payment provider or real money transactions are used.

### 🌙 Dark Mode

- Light theme
- Dark theme
- Theme preference stored in local storage
- Theme applied through the document root

### 📱 Responsive Design

The interface is designed to work across different screen sizes, including desktop and mobile layouts.

---

## 🏗️ Frontend Structure

The project is organized into separate areas for authentication, cart management, API communication, and pages.

~~~text
src/
├── assets/
│   └── images/
│
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
│
├── pages/
│   ├── Login.jsx
│   └── Register.jsx
│
├── services/
│   ├── api.js
│   └── orderService.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
~~~

---

## 🔄 Application Flow

The main customer flow is:

~~~text
Open Sweet House
       ↓
Browse Categories
       ↓
Browse Products
       ↓
Add Product to Cart
       ↓
Manage Cart
       ↓
Create Order
       ↓
Payment
       ↓
Simulated Payment
       ↓
Payment Successful
       ↓
Order Confirmed
~~~

---

## 🔗 API Communication

The frontend communicates with the Laravel backend through Axios.

The API base URL is configured as:

~~~text
http://127.0.0.1:8000/api
~~~

Main API operations include:

~~~text
Authentication
├── Register
├── Login
├── Logout
└── Get User

Categories
└── Get Categories

Products
└── Get Products

Orders
├── Create Order
├── Get Orders
├── Get Order
└── Process Payment
~~~

---

## 📂 State Management

The application uses the **React Context API** for shared application state.

### AuthContext

Responsible for authentication-related state and operations, including:

- Current user
- Authentication status
- Login
- Register
- Logout

### CartContext

Responsible for shopping cart state and operations, including:

- Cart items
- Cart count
- Cart total
- Add to cart
- Remove from cart
- Increase quantity
- Decrease quantity
- Clear cart

---

## 🚀 Installation

Clone the repository:

~~~bash
git clone https://github.com/esraaghneem/sweet-house-frontend.git
~~~

Move into the project directory:

~~~bash
cd sweet-house-frontend
~~~

Install dependencies:

~~~bash
npm install
~~~

Start the development server:

~~~bash
npm run dev
~~~

The frontend will be available at:

~~~text
http://localhost:5173/
~~~

---

## 🔗 Backend Setup

The frontend requires the Sweet House Laravel backend to be running.

Backend repository:

https://github.com/esraaghneem/sweet-house-backend

Start the Laravel backend with:

~~~bash
php artisan serve
~~~

The backend API should be available at:

~~~text
http://127.0.0.1:8000/api
~~~

Make sure the Laravel API is running before using authentication, products, categories, orders, and payment functionality.

---

## 🧪 Development

Run the development server:

~~~bash
npm run dev
~~~

Build the project for production:

~~~bash
npm run build
~~~

Preview the production build:

~~~bash
npm run preview
~~~

Run ESLint:

~~~bash
npm run lint
~~~

---

## 🔗 Project Links

### Frontend

[Sweet House Frontend](https://github.com/esraaghneem/sweet-house-frontend)

### Backend

[Sweet House Backend](https://github.com/esraaghneem/sweet-house-backend)

---

## 👩‍💻 Author

**Esraa Ghneem**

Backend Developer

[GitHub](https://github.com/esraaghneem)

---

## 📄 License

This project is created for educational and portfolio purposes.
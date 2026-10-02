<p align="center">
  <h1 align="center">Sweet House</h1>
</p>

<p align="center">
  A modern full-stack dessert e-commerce application built with React and Laravel.
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

**Sweet House** is a modern full-stack dessert e-commerce application built with **React and Laravel**.

The application provides a complete customer shopping experience where users can browse dessert products, explore categories, create an account, log in, manage their shopping cart, create orders, and complete a simulated payment process.

The React frontend communicates with a Laravel REST API backend using Axios.

The project focuses on clean architecture, reusable components, organized state management, authentication, API communication, order processing, and a responsive shopping experience.

---

## 🛠️ Technologies

### Frontend

- React
- Vite
- JavaScript
- Axios
- CSS
- React Context API

### Backend

- Laravel 12
- PHP
- MySQL
- Laravel Sanctum
- REST API

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
- Product and category management through the Laravel API

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
- Stock validation and management through the backend

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

## 🏗️ Project Structure

The project is divided into a React frontend and Laravel backend.

### Frontend Structure

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

### Backend Structure

~~~text
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   ├── Requests/
│   └── Resources/
│
├── Models/
├── Services/
│
database/
├── migrations/
└── seeders/

routes/
└── api.php
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

The React frontend communicates with the Laravel backend through Axios.

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
├── List Categories
├── Create Category
├── Update Category
└── Delete Category

Products
├── List Products
├── Create Product
├── Update Product
└── Delete Product

Orders
├── Create Order
├── Get Orders
├── Get Order
└── Process Payment
~~~

---

## 📂 State Management

The frontend uses the **React Context API** for shared application state.

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

## 🏗️ Backend Architecture

The Laravel backend follows a structured architecture that separates responsibilities between different layers.

~~~text
Request
   ↓
Route
   ↓
Controller
   ↓
Form Request
   ↓
Service
   ↓
Model
   ↓
Database
~~~

The backend includes:

- RESTful API endpoints
- Form Request validation
- Service layer for business logic
- API Resources
- Eloquent relationships
- Authentication with Laravel Sanctum
- Database transactions
- Stock validation and management
- Order and order-item handling

---

## 🚀 Installation

Clone the frontend repository:

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

Clone the backend repository separately and install its dependencies:

~~~bash
composer install
~~~

Configure the database in the `.env` file, then run:

~~~bash
php artisan migrate
~~~

Start the Laravel backend:

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

Run the frontend development server:

~~~bash
npm run dev
~~~

Build the frontend for production:

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

Full-Stack Developer

Worked on both the frontend and backend of the Sweet House application, including:

- React frontend development
- Laravel REST API development
- MySQL database integration
- Authentication and authorization
- Shopping cart functionality
- Order processing
- Simulated payment integration
- API integration between frontend and backend

[GitHub](https://github.com/esraaghneem)

---

## 📄 License

This project is created for educational and portfolio purposes.

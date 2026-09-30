# DecorNext 🏠

DecorNext is a full-stack home décor e-commerce web application where users can explore home décor products, search and filter products, view product details, manage their wishlist and shopping cart, place orders, and make online payments using Razorpay.

The project also includes a secure admin panel for managing products, orders, customers, and business statistics.

---

## 🚀 Features

### 👤 Customer Features

- User Registration & Login
- JWT-based Authentication
- Role-based Authorization
- Browse Home Décor Products
- Product Search
- Category Filtering
- Product Details
- Wishlist
- Shopping Cart
- Checkout
- Razorpay Payment Integration
- Payment Verification
- Order Management
- User Dashboard
- Contact Form
- Room Inspiration
- Blog & Blog Details
- Responsive UI
- Custom 404 Page

### 🔐 Admin Features

- Admin Dashboard
- Product Management
- Add Products
- Update Products
- Delete Products
- View All Orders
- Update Order Status
- Customer Statistics
- Order Statistics
- Revenue Statistics
- Role-based Admin Access

---

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript
- React Router
- HTML5
- CSS3
- Vite

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- REST APIs
- JWT Authentication
- Bean Validation

### Database

- PostgreSQL

### Payment Integration

- Razorpay

### Development Tools

- Git
- GitHub
- Maven
- Postman
- IntelliJ IDEA
- Visual Studio Code

---

## 🏗️ Architecture

DecorNext follows a client-server architecture.

React.js Frontend
       |
       | REST APIs
       v
Spring Boot Backend
       |
       +-- Spring Security
       +-- JWT Authentication
       +-- REST Controllers
       +-- Service Layer
       +-- JPA / Hibernate
       |
       v
PostgreSQL Database

       |
       v
Razorpay Payment Gateway

📂 Project Structure
decronext/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── App.jsx
│
├── backend/
│   └── src/
│       └── main/
│           └── java/
│               └── com/
│                   └── decronext/
│                       └── backend/
│                           ├── config/
│                           ├── controller/
│                           ├── dto/
│                           ├── entity/
│                           ├── repository/
│                           ├── security/
│                           └── service/
│
└── README.md
🔑 Authentication & Authorization

DecorNext uses JWT-based authentication with Spring Security.

The application supports two user roles:
USER
ADMIN

Authentication Flow

User Login
    ↓
Spring Boot Authentication
    ↓
JWT Token Generated
    ↓
Token Stored on Frontend
    ↓
Token Sent with API Requests
    ↓
JWT Authentication Filter
    ↓
User Authentication & Authorization

Admin-only APIs are protected using role-based authorization.

🛍️ Shopping Flow

Browse Products
      ↓
Search / Filter
      ↓
Product Details
      ↓
Add to Cart
      ↓
Cart
      ↓
Checkout
      ↓
Create Order
      ↓
Razorpay Payment
      ↓
Payment Verification
      ↓
Order Confirmed

💳 Payment Integration

DecorNext uses Razorpay for online payment processing.

The payment flow includes:

Create Razorpay Order
Open Razorpay Checkout
Complete Payment
Receive Payment Response
Verify Payment Signature on Backend
Update Payment Status
Confirm Order

Payment verification is handled by the backend before the order is marked as paid.

📦 Order Management

Users can:

Place orders
View their orders
View order details
Track order status
View payment status

Admins can update order status.

Supported order statuses:

PENDING
CONFIRMED
PROCESSING
SHIPPED
DELIVERED
CANCELLED
🛒 Product Management

Admins can manage products through the admin panel.

Product information includes:

Product Name
Category
Price
Old Price
Discount
Rating
Description
Product Image

Admin operations:

Create Product
      ↓
Read Products
      ↓
Update Product
      ↓
Delete Product
📊 Admin Dashboard

The admin dashboard provides important business statistics such as:

Total Products
Total Orders
Total Customers
Total Revenue

The dashboard gets this information from the Spring Boot REST APIs.

📩 Contact System

Users can send messages through the Contact page.

The contact form is connected to the Spring Boot backend.

Contact Form
     ↓
React.js
     ↓
POST /api/contact
     ↓
Spring Boot Controller
     ↓
Service Layer
     ↓
Repository
     ↓
PostgreSQL

Contact messages contain:

Name
Email
Subject
Message
Created Date

Only authorized administrators can access submitted contact messages.

🔎 Product Search

Users can search products by name.

Example:

Search: Lamp
      ↓
Spring Boot Search API
      ↓
PostgreSQL
      ↓
Matching Products

The backend supports case-insensitive product name searching.

🎨 Application Pages
Customer Pages
Home
Shop
Product Details
Cart
Checkout
Wishlist
Login
Register
User Dashboard
Orders
Rooms
About
Contact
Blog
Blog Details
Search Results
404 Page
Admin Pages
Admin Dashboard
Admin Products
Admin Orders
⚙️ How to Run Locally
1. Clone the Repository
git clone https://github.com/subham2120/decronext.git
cd decronext
2. Backend Setup

Go to the backend directory:

cd backend

Configure your PostgreSQL database and application properties.

Then run:

mvn spring-boot:run

Backend will run on:

http://localhost:8080
3. Frontend Setup

Open another terminal and go to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

Frontend will normally run on:

http://localhost:5173
🔐 Environment & Security

Sensitive configuration should not be committed to GitHub.

The following values should be stored securely using environment variables in production:

Database Password
JWT Secret
Razorpay Key ID
Razorpay Key Secret

Never expose private credentials or API secrets in the source code.

🧪 API Testing

Backend APIs can be tested using Postman.

Authentication APIs
POST /api/auth/register
POST /api/auth/login
Product APIs
GET    /api/products
GET    /api/products/{id}
GET    /api/products/category/{category}
GET    /api/products/search
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}
Order APIs
POST /api/orders
GET  /api/orders
GET  /api/orders/{id}
Payment APIs
POST /api/payment/create-order/{orderId}
POST /api/payment/verify
Contact APIs
POST /api/contact
GET  /api/contact
Admin APIs
GET /api/admin/dashboard/stats
GET /api/admin/orders
PUT /api/admin/orders/{id}/status
📸 Screenshots

Screenshots of the application can be added here.

Home Page

Add screenshot here.

Shop Page

Add screenshot here.

Product Details

Add screenshot here.

Cart & Checkout

Add screenshot here.

User Dashboard

Add screenshot here.

Admin Dashboard

Add screenshot here.

 Future Improvements

Planned improvements include:

Product image upload from admin panel
Advanced product filtering
Pagination
Email notifications
Order cancellation
User profile management
Product reviews and ratings
Product recommendation system
Docker support
CI/CD pipeline
Cloud deployment
 Author

Subham Kumar

MCA | Java Full Stack Developer

Core Technologies
Java
Spring Boot
Spring Security
REST APIs
React.js
PostgreSQL
JWT
Git
GitHub
📄 License

This project is developed for learning, portfolio development, and demonstration of full-stack web development skills.


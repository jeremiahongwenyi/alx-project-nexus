# 🛋️ Homify Furniture

**Tagline:** Custom comfort for modern living

Homify Furniture is a web-based e-commerce platform designed for a single furniture store in Kenya. The platform allows customers to browse ready-made furniture, request custom furniture using reference images, communicate with the seller via WhatsApp, and complete checkout with delivery and MPESA (Daraja API) payment integration.

This project is developed as a **final capstone project for ALX Software Engineering**, with a strong focus on real-world applicability, clean architecture, and scope control.

---

## 📌 Table of Contents

* Overview
* Problem Statement
* Solution Overview
* Key Features
* User Journeys
* Tech Stack
* System Architecture
* Installation & Setup
* Environment Variables
* Usage
* Scope Control
* Future Improvements
* Author

---

## 🔍 Overview

Furniture shopping in Kenya is largely informal, relying on walk-in visits, phone calls, and WhatsApp messages. This makes it difficult for customers to browse products, request custom designs, receive quotations, and place orders in a structured way.

Homify Furniture digitizes these processes by providing a modern, user-friendly web platform that connects customers directly with a furniture store.

---

## ❗ Problem Statement

Many customers struggle to find affordable and customizable furniture online, while furniture stores lack structured systems for showcasing products, managing orders, and handling custom requests. This results in inefficient communication, lost sales opportunities, and poor customer experience.

---

## 💡 Solution Overview

Homify Furniture provides:

* An online furniture catalog
* A structured checkout experience
* Custom furniture requests via image uploads
* Seller communication via WhatsApp
* MPESA payment (Daraja API) demo integration

The platform focuses on a **single furniture store** to ensure realistic scope and full feature delivery.

---

## ✨ Key Features

### Customer Features

* Browse furniture by category
* View detailed product information
* Add items to cart
* User registration and login
* Secure checkout with customer verification
* Delivery fee calculation
* MPESA payment initiation (Daraja sandbox)
* Upload images for custom furniture requests
* Chat with seller via WhatsApp


### Admin (Seller) Features

* Manage furniture listings
* View and respond to custom furniture requests
* Manage customer orders
* Track order status

## 🔄 User Journeys

### 1. Standard Purchase Flow

Home → Browse Furniture → Product Details → Add to Cart → Login / Sign Up → Checkout → Delivery Fee Calculation → MPESA Payment → Order Confirmation

### 2. Custom Furniture Request Flow

Home → Custom Request → Upload Image → Add Description → Submit Request → Seller Review → Quotation via Email / WhatsApp → Customer Confirmation → Production & Delivery

### 3. WhatsApp Chat Flow

Product Page → Chat Seller on WhatsApp → Redirect to WhatsApp with Pre-filled Message

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS

### Backend

Backend

This project does not use a traditional fully fledged backend server.

Instead, it leverages Firebase to handle backend functionality, including authentication, database operations, and file storage.

Firebase Authentication

Firebase Firestore (NoSQL Database)

Firebase Storage (image uploads)


### Database
Firebase Firestore (NoSQL, cloud-hosted)

Firebase is used to simplify development, reduce backend complexity, and focus on delivering a complete, functional solution suitable for the project scope.

### Third-party Services

* MPESA Daraja API (sandbox)


---

## 🧱 System Architecture (High Level)

* Client (Next.js)
* Backend API (Firebase)
* External Services (MPESA, WhatsApp)

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/jeremiahongwenyi/alx-project-nexus.git

# Navigate to project directory
cd homify-furniture

# Install dependencies
npm install

# Run development server
npm run dev
```


## ▶️ Usage

* Browse products without authentication
* Login or sign up to proceed to checkout
* Upload reference images for custom furniture
* Use MPESA sandbox credentials for payment demo


## 🚀 Future Improvements

* Multi-vendor marketplace support
* Real MPESA production integration
* Real-time chat system
* Automated courier API integration
* Delivery fee calculation


## 👤 Author

**Jeremiah Ongwenyi Omare**
ALX Software Engineering Student

---

## 📄 License

This project is for educational purposes as part of the ALX Software Engineering Program.

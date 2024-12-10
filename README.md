# **Proshop2 E-Commerce Application**

Proshop2 is a fully functional e-commerce platform built with the MERN (MongoDB, Express.js, React, Node.js) stack. This application provides PayPal payment integration, Redux Toolkit for state management, and a responsive UI with React-Bootstrap.

---

## **Features**

- **User Authentication & Authorization**
  - Secure user registration and login.
  - Admin-level privileges for managing products and orders.
- **Product Management**
  - Search, filter, and view products.
  - Admin dashboard for managing product inventory.
- **Shopping Cart & Checkout**
  - Add/remove items to/from the cart.
  - PayPal integration for secure payments.
- **Order Tracking**
  - Users can view order status and details.
  - Admins can mark orders as delivered.

---

## **Technologies Used**

- **Frontend:** React, Redux Toolkit, React-Bootstrap
- **Backend:** Node.js, Express.js, MongoDB
- **Payment:** PayPal API

---

## **Installation & Setup**

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/proshop2.git
cd proshop2
```

### 2. Install Dependencies

Run the following commands to install dependencies for both the backend and frontend:

```bash
npm install
npm install --prefix frontend
```

### 3. Add Environment Variables

Create a `.env` file in the `backend` directory and configure the following:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 4. Run the Application

Start both the backend and frontend servers:

```bash
npm run dev
```

The app will run at `http://localhost:3000`.

---

## **Scripts**

Key `npm` scripts available in the project:

- `npm run start`: Start the backend server.
- `npm run dev`: Run the backend and frontend in development mode.
- `npm run data:import`: Import sample data into MongoDB.
- `npm run data:destroy`: Delete all data from MongoDB.
- `npm run build`: Build the production version of the frontend.

---

## **Live Demo**

[Proshop2 Live Demo](https://e-comm-platform.onrender.com)

---

## **Contributing**

Feel free to fork the repository, make improvements, and submit a pull request. Contributions are always welcome!

---

## **License**

This project is licensed under the MIT License.

---

## **Author**

Developed by Kshitiz Sharma.

---

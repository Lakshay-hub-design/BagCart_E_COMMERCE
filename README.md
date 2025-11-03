# 🛍️ BagCart

**BagCart** is a full-stack e-commerce web application built with the MERN stack.  
It allows users to browse products, add items to their cart, and place orders securely.  
Admins can manage products, view analytics, and handle customer orders through a separate dashboard.

---

## 🚀 Features

- User authentication (Signup, Login, Logout)  
- Add, remove, and update items in the cart  
- Place and manage orders  
- Admin dashboard for product and order management  
- Fake UPI/QR payment page for demo transactions  
- Responsive and modern UI built with React and Tailwind CSS  
- Form validation on all pages  

---

## 🛠️ Tech Stack

**Frontend:** React, Tailwind CSS, Axios, React Router  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JWT (JSON Web Token)  
**State Management:** Context API  

---

## 📂 Folder Structure
BagCart/  
│  
├── client/ # Frontend (React)  
│ ├── src/
│ │ ├── components/  
│ │ ├── pages/  
│ │ ├── context/  
│ │ ├── routes/  
│ │ ├── assets/  
│ │ └── App.jsx  
│ └── public/  
│  
├── server/ # Backend (Express)  
│ └── src/  
│   ├── controllers/  
│   ├── models/  
│   ├── routes/  
│   ├── service/  
│   └── server.js  
│  
└── README.md  

---

## ⚙️ Installation and Setup
- Clone the repository: git clone https://github.com/Lakshay-hub-design/BagCart.git
- Navigate into the project: cd BagCart
- Install dependencies for both client and server:
  - cd client && npm install
  - cd ../server && npm install
- Create a .env file in the server folder and add the following:
  - MONGO_URI=your_mongodb_connection_string
  - JWT_SECRET=your_secret_key
- Run both frontend and backend: npm run dev & npm start

## 📧 Contact
Author: Lakshay Sharma   
Email: lakshay0328@gmail.com  
GitHub: Lakshay-hub-design  

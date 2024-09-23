import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import cors from "cors";

// console.log("server is starting");

// dotenv.config();
// const port = process.env.PORT || 5000;

// connectDb(); //Connect MongoDB

// const app = express();

// //Middleware to parse json(Body Parser Middleware)
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// // cookieParser Middleware
// app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("<h1>API Running</h1>");
// });

// app.use("/api/products", productRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/upload", uploadRoutes);

// app.get("/api/config/paypal", (req, res) =>
//   res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
// );

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// app.use(notFound);
// app.use(errorHandler);

// app.listen(port, () => {
//   console.log("app is listening on port:", port);
// });

// import path from "path";
// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";
// import productRoutes from "./routes/productRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Your front-end URL
    credentials: true, // Allow cookies to be sent
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);

import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import usersRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();
const port = process.env.PORT || 5000;

connectDb(); //Connect MongoDB

const app = express();

//Middleware to parse json(Body Parser Middleware)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookieParser Middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>API Running</h1>");
});

app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("app is listening on port:", port);
});

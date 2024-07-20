import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import productRoutes from "./routes/productRouter.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDb(); //Connect MongoDB

const app = express();

//Middleware to parse json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>API Running</h1>");
});

app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("app is listening on port:", port);
});

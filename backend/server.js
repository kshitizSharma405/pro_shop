import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.get("/", (req, res) => {
  res.send("<h1>API Running</h1>");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product._id === id);
  res.json({ product: product });
});

app.listen(port, () => {
  console.log("app is listening on port:", port);
});

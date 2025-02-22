// server.js (Backend)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  stock: Number,
  gender: String,
  type: String,
});

const Product = mongoose.model("Product", ProductSchema, "ProductSchema");


app.get("/api/products/men-zapatos", async (req, res) => {
  try {
    console.log("Obteniendo productos...");
    const products = await Product.find({
      gender: "men",
      type: "zapato",
    });
    res.json(products);
    console.log(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

app.get("/api/products/men-pantalones", async (req, res) => {
    try {
      console.log("Obteniendo productos...");
      const products = await Product.find({
        gender: "men",
        type: "pantalones",
      });
      res.json(products);
      console.log(products);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.get("/api/products/men-franelas", async (req, res) => {
    try {
      console.log("Obteniendo productos...");
      const products = await Product.find({
        gender: "men",
        type: "franelas",
      });
      res.json(products);
      console.log(products);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.get("/api/products/woman-franelas", async (req, res) => {
    try {
      console.log("Obteniendo productos...");
      const products = await Product.find({
        gender: "woman",
        type: "franelas",
      });
      res.json(products);
      console.log(products);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.get("/api/products/woman-zapatos", async (req, res) => {
    try {
      console.log("Obteniendo productos...");
      const products = await Product.find({
        gender: "woman",
        type: "zapatos",
      });
      res.json(products);
      console.log(products);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.get("/api/products/woman-pantalones", async (req, res) => {
    try {
      console.log("Obteniendo productos...");
      const products = await Product.find({
        gender: "woman",
        type: "pantalones",
      });
      res.json(products);
      console.log(products);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener productos" });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

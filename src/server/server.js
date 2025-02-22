// server.js (Backend)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

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

app.post("/api/checkout", async (req, res) => {
  const { cart } = req.body; // Ahora req.body debería estar definido

  if (!cart) {
    return res.status(400).json({ message: "El carrito no fue proporcionado" });
  }

  try {
    // Iterar sobre cada producto en el carrito
    for (const item of cart) {
      const productId = item.id;
      const quantity = item.quantity;

      // Buscar el producto en la base de datos
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: `Producto ${productId} no encontrado` });
      }

      // Verificar si hay suficiente stock
      if (product.stock < quantity) {
        return res.status(400).json({ message: `Stock insuficiente para el producto ${product.name}` });
      }

      // Descontar el stock
      product.stock -= quantity;

      // Guardar el producto actualizado en la base de datos
      await product.save();
    }

    // Respuesta exitosa
    res.status(200).json({ message: "Compra finalizada y stock actualizado" });
  } catch (error) {
    console.error("Error al actualizar el stock:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../services/product.services.js";

export const productController = {
  getAllProducts: async (req, res) => {
    try {
      const result = await getAllProducts(req.query);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
  getProductById: async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await getProductById(pid);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  },
  addProduct: async (req, res) => {
    try {
      const { title, description, price, thumbnail, code, stock, status, category } = req.body;
      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
      };
      const product = await addProduct(newProduct);
      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { pid } = req.params;
      const { title, description, price, thumbnail, code, stock, status, category } = req.body;
      const updatedProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
      };
      const product = await updateProduct(pid, updatedProduct);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await deleteProduct(pid);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  },
};
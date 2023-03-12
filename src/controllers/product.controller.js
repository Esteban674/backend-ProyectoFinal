import { getManagerProducts } from '../dao/daoManager.js';

const data = await getManagerProducts();
const managerProducts = new data.ManagerProductMongoDB;

export const productController = {

  getAllProducts: async (req, res) => {
    try {
      const products = await managerProducts.getElements();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  },
  getProductById: async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await managerProducts.getElementById(pid);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
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
      const product = await managerProducts.addElement(newProduct);
      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
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
      const product = await managerProducts.updateElement(pid, updatedProduct);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await managerProducts.deleteElement(pid);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  },
};


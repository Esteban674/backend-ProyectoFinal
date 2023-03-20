import { getManagerCarts } from "../dao/daoManager.js";

const data = await getManagerCarts();
const managerCarts = new data.ManagerCartMongoDB;

export const cartController = {

  getCarts: async (req, res) => {
    try {
      managerCarts.setConnection();
      const carts = await managerCarts.model.find().populate("products.product");
      console.log(JSON.stringify(carts));
      res.status(200).json(carts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getCartById: async (req, res) => {
    const { cid } = req.params;
    try {
      managerCarts.setConnection();
      const cart = await managerCarts.model.findById(cid).populate("products.product");
      if (!cart) throw new Error("Cart not found");
      res.status(200).json(cart);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  addCart: async (req, res) => {
    try {
      const cart = await managerCarts.addElement(req.body);
      res.status(201).json(cart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  addProductToCart: async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      const cart = await managerCarts.getElementById(cid);
      if (!cart) throw new Error("Cart not found");
      const product = { id: pid, quantity: quantity };
      cart.products.push(product);
      await managerCarts.updateElement(cid, cart);
      res.status(200).json(cart);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deleteProductFromCart: async (req, res) => {
    const { cid, pid } = req.params;
    try {
      const cart = await managerCarts.getElementById(cid);
      if (!cart) throw new Error("Cart not found");
      cart.products = cart.products.filter(product => product.id != pid);
      await managerCarts.updateElement(cid, cart);
      res.status(200).json(cart);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deleteCart: async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await managerCarts.getElementById(cid);
      if (!cart) throw new Error("Cart not found");
      await managerCarts.deleteElement(cid);
      res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updateProductQuantity: async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      const cart = await managerCarts.getElementById(cid);
      if (!cart) throw new Error("Cart not found");
      cart.products = cart.products.map(product => {
        if (product.id == pid) {
          return { ...product, quantity };
        }
        return product;
      });
      await managerCarts.updateElement(cid, cart);
      res.status(200).json(cart);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  updateCart: async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await managerCarts.getElementById(cid);
      if (!cart) throw new Error("Cart not found");
      await managerCarts.updateElement(cid, { products: req.body });
      res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updateCartProducts: async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await managerCarts.getElementById(cid);
      if (!cart) throw new Error("Cart not found");
      const { products } = req.body;
      if (!Array.isArray(products)) throw new Error("Invalid request format");
      products.forEach((product) => {
        const index = cart.products.findIndex(
          (p) => p.id === product.id && p.id instanceof ObjectId
        );
        if (index >= 0) {
          cart.products[index].quantity = product.quantity;
        }
      });
      await managerCarts.updateElement(cid, cart);
      res.status(200).json({ message: "Cart products updated successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
}
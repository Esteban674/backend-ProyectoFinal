import { getManagerCarts } from "../dao/daoManager.js";

const data = await getManagerCarts();
const managerCarts = new data.ManagerCartMongoDB;

export const cartController = {

  getCarts: async (req, res) => {
    try {
      const carts = await managerCarts.getElements();
      res.status(200).json(carts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  
  getCartById: async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await managerCarts.getElementById(cid);
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
  
  updateCart: async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await managerCarts.getElementById(cid);
      if (!cart) throw new Error("Cart not found");
      await managerCarts.updateElement(cid, req.body);
      res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};




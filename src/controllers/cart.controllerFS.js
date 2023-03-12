import { CartManager } from '../dao/FileSystem/CartManager.js';

const cartController = new CartManager('./src/dao/FileSystem/models/carritos.txt');

export const getCarts = async (req, res) => {
  const carts = await cartController.getCarts();
  let { limit } = req.query;

  if( limit !== undefined ){
    res.send(`Lista de carritos con limite: ${limit} <br> <code>${JSON.stringify(carts.slice(0, parseInt(limit)))}</code>`);
  }else{
    res.send(`Lista de productos sin limites:<br> <code>${JSON.stringify(carts)}</code>`)
  }
};

export const getCartById = async (req, res) => {
  const cart = await cartController.getCartById(parseInt(req.params.cid));
  console.log(cart);
  res.send(`Resultado búsqueda por id ${req.params.cid}</br><code>${JSON.stringify(cart)}</code>`)
};

export const addCart = async (req, res) => {
  const mensaje = await cartController.addCart(req.body);
  res.send(mensaje);
};

export const addProductToCart = async (req, res) => {
  const mensaje = await cartController.addProductToCart(req.params.cid, req.params.pid, req.body);
  res.send(mensaje);
};

export const deleteCart = async (req, res) => {
  const mensaje = await cartController.deleteCart(req.params.cid);
  res.send(mensaje);
};

export const updateCart = async (req, res) => {
  const mensaje = await cartController.updateCart(req.params.cid, req.body);
  res.send(mensaje);
};

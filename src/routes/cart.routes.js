import { Router } from 'express';
import { CartManager } from '../dao/FileSystem/CartManager.js';


const cartController = new CartManager('./src/dao/FileSystem/models/carritos.txt');

const routerCart = Router();

routerCart.get('/', async (req, res) => {
  const carts = await cartController.getCarts();
  let { limit } = req.query;

  if( limit !== undefined ){
    res.send(`Lista de carritos con limite: ${limit} <br> <code>${JSON.stringify(carts.slice(0, parseInt(limit)))}</code>`);
  }else{
    res.send(`Lista de productos sin limites:<br> <code>${JSON.stringify(carts)}</code>`)
  }
})

routerCart.get('/:cid', async (req, res) => {
  const cart = await cartController.getCartById(parseInt(req.params.cid));
  console.log(cart);
  res.send(`Resultado búsqueda por id ${req.params.pid}</br><code>${JSON.stringify(cart)}</code>`)
})

routerCart.post('/', async (req, res) => {
  const mensaje = await cartController.addCart(req.body);
  res.send(mensaje);
})

routerCart.post('/:cid/product/:pid', async (req, res) => {
  const mensaje = await cartController.addProductToCart(req.params.cid, req.params.pid, req.body);
  res.send(mensaje);
})

routerCart.delete('/:cid', async (req, res) => {
  const mensaje = await cartController.deleteCart(req.params.cid);
  res.send(mensaje);
})

routerCart.put('/:cid', async (req, res) => {
  const mensaje = await cartController.updateCart(req.params.cid, req.body);
  res.send(mensaje);
})

export default routerCart;
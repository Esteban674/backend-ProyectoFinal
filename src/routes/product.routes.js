import { Router } from 'express';
import {ProductManager} from '../controllers/ProductManager.js';
const productManager = new ProductManager('./src/models/productos.txt');

const routerProduct = Router();

routerProduct.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  let { limit } = req.query;

  if( limit !== undefined ){
    console.log(products.slice(0, parseInt(limit)));
    res.send(`Lista de productos con limite: ${limit} <br> <code>${JSON.stringify(products.slice(0, parseInt(limit)))}</code>`);
  }else{
    console.log(products);
    res.send(`Lista de productos sin limites:<br> <code>${JSON.stringify(products)}</code>`)
  }
})

routerProduct.get('/:pid', async (req, res) => {
  const product = await productManager.getProductById(parseInt(req.params.pid));
  console.log(product);
  res.send(`Resultado búsqueda por id ${req.params.pid}</br><code>${JSON.stringify(product)}</code>`)
})

routerProduct.post('/', async (req, res) => {
  const mensaje = await productManager.addProduct(req.body);
  res.send(mensaje);
})

routerProduct.delete('/:pid', async (req, res) => {
  const mensaje = await productManager.deleteProduct(req.params.pid);
  res.send(mensaje);
})

routerProduct.put('/:pid', async (req, res) => {
  const mensaje = await productManager.updateProduct(req.params.pid, req.body);
  res.send(mensaje);
})

export default routerProduct;
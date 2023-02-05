import express from 'express';
import ProductManager1 from './ProductManager.js';



const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {

  const products = await ProductManager1.getProducts();
  let { limit } = req.query;

  if( limit !== undefined ){
    console.log(products.slice(0, parseInt(limit)));
    res.send(`Lista de productos con limite: ${limit} <br> <code>${JSON.stringify(products.slice(0, parseInt(limit)))}</code>`);
  }else{
    console.log(products);
    res.send(`Lista de productos sin limites:<br> <code>${JSON.stringify(products)}</code>`)
  }
})

app.get('/products/:pid', async (req, res) => {
  const product = await ProductManager1.getProductById(parseInt(req.params.pid));
  console.log(product);
  res.send(`Resultado búsqueda por id ${req.params.pid}</br><code>${JSON.stringify(product)}</code>`)
})

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
})
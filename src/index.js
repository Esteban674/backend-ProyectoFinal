import express from 'express';
import routerProduct from './routes/product.routes.js';

const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/products', routerProduct);


app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
})
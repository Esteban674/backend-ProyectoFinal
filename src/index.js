import express from 'express';
import routerProduct from './routes/product.routes.js';
import routerCart from './routes/cart.routes.js';
import fileDirName from './utils/path.js';


const app = express();
const PORT = 8080;

const { __dirname } = fileDirName(import.meta);


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/static', express.static(__dirname + '/public'));
app.use('/api/products', routerProduct);
app.use('/api/carts', routerCart);


app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
})
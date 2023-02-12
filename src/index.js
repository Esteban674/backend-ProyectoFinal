import express from 'express';
import routerProduct, { productManager } from './routes/product.routes.js';
import routerCart from './routes/cart.routes.js';
import fileDirName from './utils/path.js';
import { engine } from 'express-handlebars';
import * as path from 'path';
import { Server }  from 'socket.io';
// import { create } from './express-handlebars'; para servers mas complejos


const app = express();
const PORT = 8080;

const { __dirname } = fileDirName(import.meta);


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));


//Routes
app.use('/', express.static(__dirname + '/public'));
app.use('/api/products', routerProduct);
app.use('/api/carts', routerCart);

// app.get('/', (req, res) => {

//   const user ={
//     nombre: 'Esteban',
//     email: 'esteban@gmail.com'
//   }

//   res.render('home', {
//     titulo: 'Coder',
//     mensaje: 'Mundo',
//     user: user // o user
//   });
// })

app.get('/', async (req, res) => {
  const products = await productManager.getProducts();

  res.render('index', {
    products
  });
})

app.get('/realtimeproducts', async (req, res) => {

  
  res.render('realTimeProducts', {
    
  });
})

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
})

const io = new Server(server)

io.on("connection", async (socket) => {
  console.log("Cliente conectado");

  socket.on('mensaje', info => {
    console.log(info);
  })

  socket.broadcast.emit('evento-admin', 'Hola desde server sos el Admin')

  socket.emit('evento-general', "Hola a todos los usuarios")

  const products = await productManager.getProducts();
  
  socket.emit('ListProducts', products);

  socket.on('addProduct', async data => {
    socket.emit('ListProducts', await productManager.getProducts());
  })

})
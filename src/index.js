import "dotenv/config"
import express from 'express';
import routerProduct from './routes/product.routes.js';
import { productManager } from "./controllers/product.controllerFS.js";
import routerCart from './routes/cart.routes.js';
import fileDirName from './utils/path.js';
import { engine } from 'express-handlebars';
import * as path from 'path';
import { Server }  from 'socket.io';
import routerUser from './routes/user.routes.js';
import mongoose from 'mongoose';
import { getManagerMessages } from "./dao/daoManager.js";
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
app.use('/users', routerUser);


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

app.get('/chat', async (req, res) => {
  res.render('chat', {
  });
})

app.set("port", process.env.PORT || 5000)

const server = app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`))

const io = new Server(server)

const data = await getManagerMessages()
const managerMessage = new data.ManagerMessageMongoDB;

io.on("connection", async (socket) => {
  console.log("Cliente conectado");
  socket.on("message", async (info) => {
    managerMessage.addElement(info).then(() => {
        managerMessage.getElements().then((mensajes) => {
            socket.emit("allMessages", mensajes)
        })
    })
})

  socket.broadcast.emit('evento-admin', 'Hola desde server sos el Admin')

  socket.emit('evento-general', "Hola a todos los usuarios")

  const products = await productManager.getProducts();
  
  socket.emit('ListProducts', products);

  socket.on('addProduct', async data => {
    socket.emit('ListProducts', await productManager.getProducts());
  })

  socket.on('deleteProduct', async data => {
    socket.emit('ListProducts', await productManager.getProducts());
  })
  
})
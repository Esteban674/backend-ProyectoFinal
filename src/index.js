import config from './config/config.js';
import express from 'express';
import session from 'express-session';
import cookieParser from "cookie-parser";
import MongoStore from 'connect-mongo';
import passport from 'passport'
import { productManager } from "./controllers/product.controllerFS.js";
import fileDirName from './utils/path.js';
import { engine } from 'express-handlebars';
import * as path from 'path';
import { Server }  from 'socket.io';
import mongoose from 'mongoose';
import { getManagerMessages } from "./dao/daoManager.js";
import initializePassport from './config/passport.js'
import router from './routes/routes.js';
// import { create } from './express-handlebars'; para servers mas complejos

const app = express();

const { __dirname } = fileDirName(import.meta);


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, './views'));


//Cookies
app.use(cookieParser(process.env.PRIVATE_KEY_JWT));

//Session
app.use(session({
  store: MongoStore.create({
      mongoUrl: process.env.MONGODBURL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 180,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use('/', router)
app.use('/', express.static(__dirname + '/public'));


//Rutas de cookies
app.get('/setCookie', (req, res) =>{
  res.cookie('CookieEcommerce', 'Esta es una cookie del e-commerce', {maxAge: 10000}).send('Cookie')
})

app.get('/setSignedCookie', (req, res) =>{
  res.cookie('SignedCookie', 'Esta es una cookie del e-commerce firmada', {maxAge: 10000, signed: true}).send('Cookie Firmada')
})

app.get('/getCookie', (req, res) => {
  res.send(req.cookies)
})

app.get('/getSignedCookie', (req, res) => {
  res.send(req.signedCookies)
})

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('CookieEcommerce').send('Cookie removed')
})

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

app.get('/products', async (req, res) => {
  res.render('products', {
  });
})

app.get('/register', async (req, res) => {
  res.render('register', {
  });
})

app.get('/login', async (req, res) => {
  res.render('login', {
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
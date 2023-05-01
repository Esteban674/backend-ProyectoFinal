import { Router } from "express";
import routerProduct from "./product.routes.js";
import routerCart from "./cart.routes.js";
import routerUser from "./user.routes.js";
import routerSession from "./session.routes.js";
import routerGithub from "./github.routes.js";


const router = Router()

router.use('/api/products', routerProduct);
router.use('/api/cart', routerCart);
router.use('/user', routerUser);
router.use('/api/session', routerSession)
router.use('/session', routerGithub)

//descomentar cuando este con el frontend
// router.use('*', (req, res) => {
//   res.status(404).send({ error: '404 Not Found'})
// })


export default router
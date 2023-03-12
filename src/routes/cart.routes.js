import { Router } from 'express';
import { cartController } from '../controllers/cart.controller.js';

const routerCart = Router();

routerCart.get('/', cartController.getCarts);
routerCart.get('/:cid', cartController.getCartById);
routerCart.post('/', cartController.addCart);
routerCart.post('/:cid/product/:pid', cartController.addProductToCart);
routerCart.delete('/:cid', cartController.deleteCart);
routerCart.put('/:cid', cartController.updateCart);

export default routerCart;

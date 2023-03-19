import { Router } from 'express';
import { cartController } from '../controllers/cart.controller.js';

const routerCart = Router();

routerCart.get('/', cartController.getCarts);
routerCart.get('/:cid', cartController.getCartById);
routerCart.post('/', cartController.addCart);
routerCart.post('/:cid/products/:pid', cartController.addProductToCart);
routerCart.delete('/:cid/products/:pid', cartController.deleteProductFromCart);
routerCart.delete('/:cid', cartController.deleteCart);
routerCart.put('/:cid/products/:pid', cartController.updateProductQuantity);
routerCart.put('/:cid', cartController.updateCart);
routerCart.put('/:cid/products', cartController.updateCartProducts);

export default routerCart;

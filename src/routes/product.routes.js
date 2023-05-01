import { Router } from 'express';
import { productController } from '../controllers/product.controller.js';

const routerProduct = Router();

routerProduct.get('/', productController.getAllProducts);
routerProduct.get('/:pid', productController.getProductById);
routerProduct.post('/', productController.addProduct);
routerProduct.delete('/:pid', productController.deleteProduct);
routerProduct.put('/:pid', productController.updateProduct);


export default routerProduct;

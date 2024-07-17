// routes/productRoutes.ts
import { Router } from 'express';
import {
  addProduct, getListProduct, getProductById, updateDescProduct, deleteProduct } from '../controllers/product';
import { adminValidator } from '../middleware/validator';

const routerProduct = Router();

routerProduct.post('/products', adminValidator, addProduct); 
routerProduct.get('/products', getListProduct);
routerProduct.get('/products/:id', getProductById);
routerProduct.put('/products/:id/description', adminValidator, updateDescProduct); 
routerProduct.delete('/products/:id', adminValidator, deleteProduct); 

export default routerProduct;

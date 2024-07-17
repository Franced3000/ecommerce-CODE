// routes/productRoutes.ts
import { Router } from 'express';
import {
  addProduct, getListProduct, getProductById, updateDescProduct, deleteProduct } from '../controllers/product';

const routerProduct = Router();

routerProduct.post('/products', addProduct); 
routerProduct.get('/products', getListProduct);
routerProduct.get('/products/:id', getProductById);
routerProduct.put('/products/:id/description', updateDescProduct); 
routerProduct.delete('/products/:id', deleteProduct); 

export default routerProduct;

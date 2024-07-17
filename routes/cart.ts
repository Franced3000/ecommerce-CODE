import express from 'express';
import { idParamValidator } from '../middleware/validator';
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cart';

const routerCart = express.Router();

routerCart.get('/cart', getCart);
routerCart.post('/cart/add/:id', idParamValidator, addToCart);
routerCart.delete('/cart/remove/:id', idParamValidator, removeFromCart);
routerCart.delete('/cart/clear', clearCart);

export default routerCart;
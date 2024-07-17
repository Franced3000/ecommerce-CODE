import express from 'express';
import { idParamValidator } from '../middleware/validator';
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cart';
import { authenticate } from '../middleware/authUser';

const routerCart = express.Router();

routerCart.get('/cart', authenticate, getCart);
routerCart.post('/cart/add/:id', authenticate, idParamValidator, addToCart);
routerCart.delete('/cart/remove/:id', authenticate, idParamValidator, removeFromCart);
routerCart.delete('/cart/clear', authenticate, clearCart);

export default routerCart;
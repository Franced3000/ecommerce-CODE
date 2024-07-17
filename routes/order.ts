import { Router } from 'express';
import { createOrder, deleteOrder, getHistory, getOrder, updateOrder } from '../controllers/order';

const routerOrder = Router();

routerOrder.get('/orders', getHistory);
routerOrder.post('/orders', createOrder);
routerOrder.get('/orders/:id', getOrder);
routerOrder.put('/orders/:id', updateOrder);
routerOrder.delete('/orders/:id', deleteOrder);

export default routerOrder;

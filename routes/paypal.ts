import express from 'express';
import { initiatePayment, executePayment, cancelPayment } from '../controllers/paypal';
import { authenticate } from '../middleware/authUser'; 

const router = express.Router();

router.post('/checkout', authenticate, initiatePayment);
router.get('/return', authenticate, executePayment);
router.get('/cancel', authenticate, cancelPayment);


export default router;

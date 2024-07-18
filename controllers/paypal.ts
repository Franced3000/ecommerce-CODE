import { Request, Response } from 'express';
import PayPalService from '../models/paypal';
import CartService from '../controllers/cart';

export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // tramite jwt 
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const cart = await CartService.getCartByUserId(userId);
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const items = JSON.parse(cart.products).map((product: any) => ({
      name: product.name,
      sku: product.id.toString(),
      price: (product.price / 100).toFixed(2), // Assuming price is stored in cents
      currency: 'EUR',
      quantity: product.quantity,
    }));

    const totalAmount = (cart.total / 100).toFixed(2); // Assuming total is stored in cents

    const approvalUrl = await PayPalService.createPayment(totalAmount, items);

    req.session.paymentAmount = totalAmount;
    res.json({ url: approvalUrl });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ message: 'Error initiating payment' });
  }
};

export const executePayment = async (req: any, res: any) => {
  try {
    const { paymentId, PayerID } = req.query;
    const amount = req.session.paymentAmount;

    if (!paymentId || !PayerID || !amount) {
      return res.status(400).json({ message: 'Invalid payment information' });
    }

    await PayPalService.executePayment(paymentId as string, PayerID as string, amount);

    // Clear the cart and payment amount from session
    const userId = req.user?.id;
    if (userId) {
      await CartService.clearCart(userId);
    }
    delete req.session.paymentAmount;

    res.redirect('/?status=success');
  } catch (error) {
    console.error('Error executing payment:', error);
    res.redirect('/?status=error');
  }
};

export const cancelPayment = (req: any, res: any) => {
  delete req.session.paymentAmount;
  res.redirect('/?status=cancelled');
};

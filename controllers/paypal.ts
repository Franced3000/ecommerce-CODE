import { Request, Response } from 'express';
import PayPalService from '../models/paypal';
import Cart from '../models/cart';
import {clearCart} from '../controllers/cart';


export const initiatePayment = async (req: any, res: any) => {
  try {
    const userId = req.user?.id; // tramite jwt
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const cart = await Cart.findOne({ where: { userId } });
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

    // Esegui il pagamento
    await PayPalService.executePayment(paymentId as string, PayerID as string, amount);

    // Gestione del pagamento di PayPal andato a buon fine
    const userEmail = req.user?.email;
    if (userEmail) {
      await sendPaymentSuccessEmail(userEmail, paymentId, amount);
    }

    
    // Pulisci il carrello e l'importo del pagamento dalla sessione
    const userId = req.user?.id;
    if (userId) {
      try {
        const userId = req.body.user.id;
        await Cart.update({ products: JSON.stringify([]), total: 0 }, { where: { userId } });
        res.status(200).json({ message: 'Carrello svuotato con successo' });
      } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: errorMessage });
      }
    }
    delete req.session.paymentAmount;
    delete req.session.orderId;

    res.redirect('/?status=success');
  } catch (error) {
    console.error('Error executing payment:', error);
    res.redirect('/?status=error');
  }
};

// Funzione per inviare una email di conferma pagamento
const sendPaymentSuccessEmail = async (email: any , paymentId: any , amount: any ) => {
  // Implementa la logica per inviare una email
  // Esempio:
  await email.send({
    to: email,
    subject: 'Payment Successful',
    body: `Your payment of ${amount} has been successfully processed. Payment ID: ${paymentId}`,
  });
};

export const cancelPayment = (req: any, res: any) => {
  delete req.session.paymentAmount;
  res.redirect('/?status=cancelled');
};

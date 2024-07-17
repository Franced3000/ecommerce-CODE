import { Request, Response, Router } from 'express';
import Order from '../models/order';

const router = Router();

// GET /api/orders: Restituisce lo storico degli ordini dell'utente.
export const getHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const orders = await Order.findAndCountAll({
      where: {
        userId: req.body.user.id // assuming req.user.id contains the ID of the logged-in user
      },
      limit: Number(limit),
      offset: offset,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: orders.count,
      pages: Math.ceil(orders.count / Number(limit)),
      data: orders.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/orders: Crea un nuovo ordine
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, products, total, shippingDetails } = req.body;

    const order = await Order.create({
      userId,
      products,
      total,
      ...shippingDetails
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/orders/:id: Restituisce i dettagli di un singolo ordine
export const getOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT /api/orders/:id: Aggiorna lo stato di un ordine
export const updateOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update(req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /api/orders/:id: Cancella un ordine
export const deleteOrder = async (req: Request, res: Response): Promise<any> => {

  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Instead of deleting, we can update the order status to 'deleted'
    await order.update({ status: 'deleted' });
    res.json({ message: 'Order marked as deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default router;

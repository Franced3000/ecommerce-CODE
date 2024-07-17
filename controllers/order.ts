import { Request, Response, Router } from 'express';
import Order from '../models/order';

const router = Router();

// GET /api/orders: Restituisce lo storico degli ordini dell'utente.
router.get('/', async (req: Request, res: Response) => {
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
});

// POST /api/orders: Crea un nuovo ordine
router.post('/', async (req: Request, res: Response) => {
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
});

// GET /api/orders/:id: Restituisce i dettagli di un singolo ordine
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/orders/:id: Aggiorna lo stato di un ordine
router.put('/:id', async (req: Request, res: Response) => {
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
});

// DELETE /api/orders/:id: Cancella un ordine
router.delete('/:id', async (req: Request, res: Response) => {
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
});

export default router;

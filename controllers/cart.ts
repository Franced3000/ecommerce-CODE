import { Request, Response } from 'express';
import Cart from '../models/cart';
import bcrypt from 'bcrypt';

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id; // Assumo  che l'ID dell'utente sia disponibile qui
    const cart = await CartService.getCartByUserId(userId);
    if (!cart) {
      return res.status(404).json({ message: 'Carrello non trovato' });
    }
    res.status(200).json(cart);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const productId = parseInt(req.params.id, 10);
    const quantity = parseInt(req.body.quantity) || 1;
    const cart = await CartService.addToCart(userId, productId, quantity);
    res.status(200).json(cart);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const productId = parseInt(req.params.id, 10);
    const cart = await CartService.removeFromCart(userId, productId);
    res.status(200).json(cart);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    await CartService.clearCart(userId);
    res.status(200).json({ message: 'Carrello svuotato con successo' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

class CartService {
  static async getCartByUserId(userId: number) {
    return await Cart.findOne({ where: { userId } });
  }

  static async addToCart(userId: number, productId: number, quantity: number) {
    let cart = await this.getCartByUserId(userId);
    if (!cart) {
      cart = await Cart.create({ userId, products: [], total: 0 });
    }

    let products = JSON.parse(cart.products);
    const existingProductIndex = products.findIndex((p: any) => p.id === productId);

    if (existingProductIndex !== -1) {
      products[existingProductIndex].quantity += quantity;
    } else {
      products.push({ id: productId, quantity });
    }

    // Calcolo del nuovo totale (assumendo un prezzo fisso di 10 per ogni prodotto)
    const newTotal = products.reduce((acc: any, product: any) => acc + product.quantity * 10, 0);

    await cart.update({ products: JSON.stringify(products), total: newTotal });
    return cart;
  }

  static async removeFromCart(userId: number, productId: number) {
    const cart = await this.getCartByUserId(userId);
    if (!cart) {
      throw new Error('Carrello non trovato');
    }

    let products = JSON.parse(cart.products);
    products = products.filter((p: any) => p.id !== productId);
    const newTotal = products.reduce((acc: any, product: any) => acc + product.quantity * 10, 0);

    await cart.update({ products: JSON.stringify(products), total: newTotal });
    return cart;
  }

  static async clearCart(userId: number) {
    await Cart.update({ products: '[]', total: 0 }, { where: { userId } });
  }
}

export default CartService;
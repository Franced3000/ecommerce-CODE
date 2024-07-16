import { Request, Response } from 'express';
import User from '../models/user';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

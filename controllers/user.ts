import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

class UserService {
  static async createUser(data: any) {
    data.password = await hashPassword(data.password);
    return await User.create(data);
  }

  static async getAllUsers() {
    return await User.findAll();
  }

  static async getUserById(id: number) {
    return await User.findByPk(id);
  }

  static async updateUser(id: number, data: any) {
    const user = await User.findByPk(id);
    if (user) {
      return await user.update(data);
    }
  }

  static async deleteUser(id: number) {
    const user = await User.findByPk(id);
    if (user) {
      return await user.destroy();
    }
  }
}

export default UserService;
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10); 
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'ID Utente non valido' });
    }
    const user = await UserService.getUserById(userId);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'Utente non trovato' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10); 
    const { name, email, role } = req.body;
    const user = await UserService.getUserById(userId);
    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;
      await user.save();
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'Utente non trovato' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    const user = await UserService.getUserById(userId);
    if (user) {
      await user.destroy();
      return res.status(200).json({ message: 'Utente cancellato' });
    }
    return res.status(404).json({ message: 'Utente non trovato' });
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage })
}
};

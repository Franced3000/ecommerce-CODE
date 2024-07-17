import express from 'express';
import { userValidator, idParamValidator } from '../middleware/validator';
import { createUser, getAllUsers, getUser, updateUser, deleteUser } from '../controllers/user';

const router = express.Router();

router.post('/', userValidator, createUser);
router.get('/', getAllUsers);
router.get('/:id', idParamValidator, getUser);
router.delete('/:id', idParamValidator, deleteUser);

export default router;

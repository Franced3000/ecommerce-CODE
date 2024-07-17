import express from 'express';
import { userValidator, idParamValidator } from '../middleware/validator';
import { createUser, getAllUsers, getUser, updateUser, deleteUser, login, logout } from '../controllers/user';
import { authenticate } from '../middleware/authUser';

const routerUser = express.Router();

routerUser.post('/auth/register', userValidator, createUser);
routerUser.post('/auth/admin/register', userValidator, createUser);
routerUser.post('/auth/login', login);
routerUser.get('/auth/logout', logout);
routerUser.get('/auth/user', authenticate, getUser);

export default routerUser;

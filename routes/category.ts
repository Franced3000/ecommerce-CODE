import { Router } from 'express';
import { createCategory, getCategories, updateCategory } from '../controllers/category';

const router = Router();

router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);

export default router;

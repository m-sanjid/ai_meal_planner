import { Router } from 'express';

import { requireAuth } from '../middlewares/authMiddleware';
import { generateShoppingList } from '../controllers/shoppingListController';


const router = Router();

// Protected routes
router.post('/generate', requireAuth, generateShoppingList);

export default router; 
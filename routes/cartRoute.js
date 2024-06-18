import express from 'express';

const router = express.Router();

import { addToCart,getCart,removeFromCart } from '../controllers/CartController.js';

import { isAuthenticated } from '../middleware/auth/isAuthenticare.js';

router.route('/').get(isAuthenticated,getCart).put(isAuthenticated,addToCart).delete(isAuthenticated,removeFromCart);

export default router;

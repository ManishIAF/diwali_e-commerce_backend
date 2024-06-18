import express from 'express';

const router = express.Router();

import { addToCart } from '../controllers/CartController.js';

router.put('/:id', addToCart)
// router.get('/cart/:id', async (req, res) => {
//     const { id } = req.params;
//     console.log('user id : ',id)
//     try {
//       const user = await User.findById(id);
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       return res.json(user.cart);
//     } catch (err) {
//       console.error('Error fetching cart data:', err);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  
router.put('/cart-delete', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).send({ error: 'User ID and Product ID are required' });
        }

        
        const user = await User.findOne({ userId: userId });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

       
        if (!user.cart) {
            user.cart = [];
        }

      
        user.cart = user.cart.filter(item => item._id.toString() !== productId);

       
        await user.save();

        res.status(200).send({ message: 'cart updated successfully', cart: user.cart });
       } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

export default router;

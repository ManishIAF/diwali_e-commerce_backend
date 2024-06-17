import express from 'express';
import User from '../model/UserInfo.js';

const router = express.Router();

router.put('/watchlist', async (req, res) => {
    try {
        const { id, title, price, quantity, image, userId } = req.body;


        if (!id || !title || !price || !quantity || !image) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

       
        user.wishtList.push({ _id : id, title, price, quantity, image });

       
        await user.save();

        res.status(200).send({ message: 'Watchlist updated successfully', watchlist: user.watchlist });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
router.post('/watchlist', async (req, res) => {
    try {
      const { id } = req.body;
      console.log(id)
      const user = await User.findById(id);
      console.log(user)
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      console.log(user)
      res.send(user.wishtList);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.put('/watchlist-delete', async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).send({ error: 'User ID and Product ID are required' });
        }

        
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

       console.log(user)
             
        user.wishtList = user.wishtList.filter(item => item._id.toString() !== productId);

       
        await user.save();

        res.status(200).send({ message: 'Watchlist updated successfully', watchlist: user.watchlist });
       } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

export default router;

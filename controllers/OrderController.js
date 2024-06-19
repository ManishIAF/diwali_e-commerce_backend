import Order from '../model/Order.js';

const svaeOrderDetails = async () => {
    const { user, products, total, totalItems, recepientDetails } = req.body;

  try {
    const newOrder = new Order({
      user,
      products,
      totaAmount,
      totalItems,
      recepientDetails
    });

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error('Failed to save order:', error);
    res.status(500).json({ message: 'Failed to save order', error });
  }
};


export { svaeOrderDetails };
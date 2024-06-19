import Order from '../model/Order.js';

const svaeOrderDetails = async () => {
    
    try {
    const { user, products, total, totalItems, recepientDetails } = req.body;
    console.log('req.body : ',req.body)
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
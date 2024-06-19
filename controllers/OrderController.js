import Cart from '../model/CartModel.js';
import Order from '../model/Order.js';
import UserInfo from '../model/UserInfo.js';
import Stripe from "stripe";

const svaeOrderDetails = async () => {
    
    try {
    const {userId} = req.user;

    const { user, products, totalAmount, totalItems, recepientDetails } = req.body;
    console.log('req.body : ',req.body)

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        console.log('stripe : ',stripe)

    const userInfo = await UserInfo.findOne({ userId });
    console.log('userInfo : ',userInfo);

    const CartDetails = await Cart.findOne({ userId }).populate('products');
    console.log('CartDetails : ',CartDetails);

    const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: CartDetails?.products,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    });
    
    console.log('session : ',session)

    // const newOrder = new Order({
    //   user,
    //   products,
    //   totaAmount,
    //   totalItems,
    //   recepientDetails
    // });

    // const savedOrder = await newOrder.save();
    res.status(200).json({success:true,Data:{id:session?.id}});

  } catch (error) {
    console.error('Failed to save order:', error);
    res.status(500).json({ message: 'Failed to save order', error });
  }
};



export { svaeOrderDetails };
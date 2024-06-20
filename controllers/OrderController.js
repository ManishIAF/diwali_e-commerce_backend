import Cart from '../model/CartModel.js';
import Order from '../model/Order.js';
import UserInfo from '../model/UserInfo.js';
import Stripe from "stripe";

const svaeOrderDetails = async (req,res) => {
    
    try {
    const {userId} = req.user;

    const {total, recepientDetails } = req.body;
    console.log('req.body : ',req.body)

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        // console.log('stripe : ',stripe)

    const userInfo = await UserInfo.findOne({ userId });
    console.log('userInfo : ',userInfo);

    const CartDetails = await Cart.findOne({ userId }).populate('products.productId');
    // console.log('CartDetails : ',CartDetails);
    console.log('CartDetails : ',CartDetails.products[0]);
    
    const lineItems = CartDetails?.products?.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product?.productId?.name,
        },
        unit_amount: product?.productId?.price*100,
      },
      quantity: 1,
      }));

      console.log('lineItems : ',lineItems[0])
    
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });
    
    console.log('session : ',session?.id)

    const newOrder = new Order({
      products:CartDetails.products.map(product => product.productId),
      purchesedBy: userId,
      totalAmount: total,
      totalItems: CartDetails?.products?.length,
      recepientDetails
    });

    const savedOrder = await newOrder.save();
    res.status(200).json({success:true,Data:{id:session?.id}});

  } catch (error) {
    console.error('Failed to save order:', error);
    res.status(500).json({ message: 'Failed to save order', error });
  }
};

const paymentDetails = (req,res) => {
  const [ success ] = req.body;
  console.log('success : ', success)
}
  
export { svaeOrderDetails, paymentDetails };
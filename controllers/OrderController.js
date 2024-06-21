import Cart from '../model/CartModel.js';
import Order from '../model/Order.js';
import UserInfo from '../model/UserInfo.js';
import Stripe from "stripe";

const svaeOrderDetails = async (req,res) => {
    
    try {
    const {userId} = req.user;

    const {recepientDetails } = req.body;
    console.log('req.body : ',req.body)

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        // console.log('stripe : ',stripe)

    const userInfo = await UserInfo.findOne({ userId });
    console.log('userInfo : ',userInfo);

    const CartDetails = await Cart.findOne({ userId }).populate('products.productId');
    // console.log('CartDetails : ',CartDetails);
    console.log('CartDetails : ',CartDetails.products[0]);
    
    // const Name = `<p>${product?.productId?.name}</p>`

    const lineItems = CartDetails?.products?.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product?.productId?.name,
          // quantity: product?.quantity,
          // total: product?.quantity*product?.productId?.price*100,
        }, 
        // unit_amount:product?.quantity*product?.productId?.price*100,
        unit_amount: product?.productId?.price,
      },
        quantity: product?.quantity,
      }));

      console.log('lineItems : ',lineItems)
    
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });
    
    console.log('session : ',session?.id)
    // console.log('lineItems?.price_data?.unit_amount : ',lineItems.price_data.unit_amount)

    const newOrder = new Order({
      products:CartDetails.products.map(product => product.productId),
      payment_session_id: session.id,
      purchesedBy: userId,
      totalAmount: 10000,
      totalItems: CartDetails.products.length,
      recepientDetails
    });

    const savedOrder = await newOrder.save();
    console.log('savedOrder : ',savedOrder)
    res.status(200).json({success:true,Data:{id:session?.id,lineItems}});

  } catch (error) {
    console.error('Failed to save order:', error);
    res.status(500).json({ message: 'Failed to save order', error });
  }
};

const paymentDetails = async(req,res) => {

  try {
    const {userId} = req.user;
    const {success} = req.body;

    console.log('userId : ',req.user);
    console.log('userId : ',req.body);

    const foundOrder = await Order.findOne({ purchesedBy: userId });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    if(foundOrder?._id){
      const session = await stripe.checkout.sessions.retrieve(foundOrder.payment_session_id);

      console.log('session : ',session)
      
    }

    console.log('success : ', success)

    res.status(200).json({success:true,Data:`payment ${success}`});
  } catch (error) {
    
  }
}
  
export { svaeOrderDetails, paymentDetails };
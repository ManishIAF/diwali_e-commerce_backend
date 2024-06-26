import dotenv from "dotenv";
import Stripe from "stripe";

const CheckoutPayment = async (req, res) => {
  try {
    const { products, totalItems } = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    if (!products || !totalItems) {
      return res.status(400).send("Invalid request");
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  
} catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).send("Internal Server Error");
  }
};

export { CheckoutPayment };
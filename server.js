import cors from "cors";
import express from "express";
import Stripe from "stripe";
import 'dotenv/config'; 

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cart } = req.body;

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name_en },
        unit_amount: Math.round(item.currentPrice * 100), 
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 8080; 
app.listen(PORT, () => console.log(`Stripe Server running on port ${PORT}`));
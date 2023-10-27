import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";
const endpointSecret =
  "whsec_bc036080e48ddf44c60cb6954d0221e0a493bbae185bb9ff0571586eb72f95ee";

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      console.log(data);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};

// geeky-decent-award-whooa
//  account id acct_1NHVBOSIH8NLoa7F

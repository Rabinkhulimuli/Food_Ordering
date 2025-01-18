import { Request, Response } from "express";
import Stripe from "stripe";
import Restaurant from "../model/resturant";
import NUser from '../model/modelSchema';
import { MenuItemType } from "../model/resturant";
import Order from "../model/order";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY || "your_test_key", {
  apiVersion: "2024-06-20",
});
const FRONTEND_URL = process.env.FRONTEND_API_URL ;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;
type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};
const stripeWebhookHandler = async (req: Request, res: Response) => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sig as string,
      STRIPE_ENDPOINT_SECRET
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event?.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("Stripe session object:", event.data.object);
    const order = await Order.findById(session.metadata?.orderId);
    console.log("OrderAmount:",order?.totalAmount)
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.totalAmount = session.amount_total;
    if (!session.amount_total) {
      console.error("Error: Stripe session amount_total is undefined");
      return;
    }
    console.log("OrderAmount:",event.data.object.amount_subtotal)
    order.status = "Paid";
    await order.save();
  }
};
const createCheckOutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;

    if (
      !checkoutSessionRequest.cartItems ||
      checkoutSessionRequest.cartItems.length === 0
    ) {
      throw new Error("Cart items are required");
    }

    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    );
   
    if (!restaurant ) {
      throw new Error("Restaurant not found");
    }
    const newOrder = new Order({
      restaurant: restaurant._id,
      user: req.userId,
      status: "placed",
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      createdAt: new Date(),
    });
    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.menuItems
    );
    const deliveryPrice = restaurant.deliveryPrice ?? 0;

    const session = await createSession(
      lineItems,
      newOrder._id.toString(),
      deliveryPrice,
      restaurant._id.toString()
    );
    

    if (!session.url) {
      return res.status(500).json({ message: "Error creating Stripe session" });
    }
    await newOrder.save();
    return res.json({ url: session.url });
  } catch (err: any) {
    console.error("Error:", err.message);
   return res.status(500).json({
      message: err.raw?.message || err.message || "An error occurred",
    });
  }
};

const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  menuItems: MenuItemType[]
) => {
  if (!menuItems || menuItems.length === 0) {
    throw new Error("No menu items found for the restaurant");
  }

  return checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id?.toString() === cartItem.menuItemId?.toString()
    );
    if (!menuItem) {
      throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
    }

    return {
      price_data: {
        currency: "usd",
        unit_amount: menuItem.price, // Ensure this is in cents
        product_data: { name: menuItem.name },
      },
      quantity: parseInt(cartItem.quantity),
    };
  });
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  return await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: { amount: deliveryPrice, currency: "usd" },
        },
      },
    ],
    mode: "payment",
    metadata: { orderId:orderId, restaurantId:restaurantId },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
  });

};

const getMyOrder = async (req: Request, res: Response) => {
  try {
   
    const orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export { createCheckOutSession, stripeWebhookHandler, getMyOrder };

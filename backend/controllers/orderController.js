import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Stripe from 'stripe';

// ── Place order (COD) ───────────────────────────────────────────────────────
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const order = await Order.create({
      userId, items, amount, address,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now(),
    });
    // Clear user cart
    await User.update({ cartData: {} }, { where: { _id: userId } });
    res.json({ success: true, message: 'Order placed', order });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ── Place order (Stripe) ────────────────────────────────────────────────────
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const order = await Order.create({
      userId, items, amount, address,
      paymentMethod: 'Stripe',
      payment: false,
      date: Date.now(),
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const line_items = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Delivery fee
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Delivery Fee' },
        unit_amount: 10 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${order._id}`,
      cancel_url:  `${origin}/verify?success=false&orderId=${order._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_url: session.url });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ── Verify Stripe payment ──────────────────────────────────────────────────
export const verifyStripe = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body;
    if (success === 'true') {
      await Order.update({ payment: true }, { where: { _id: orderId } });
      await User.update({ cartData: {} }, { where: { _id: userId } });
      res.json({ success: true });
    } else {
      await Order.destroy({ where: { _id: orderId } });
      res.json({ success: false });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ── User orders ─────────────────────────────────────────────────────────────
export const userOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { userId: req.body.userId } });
    res.json({ success: true, orders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ── All orders (admin) ─────────────────────────────────────────────────────
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({});
    res.json({ success: true, orders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ── Update status (admin) ──────────────────────────────────────────────────
export const updateStatus = async (req, res) => {
  try {
    await Order.update({ status: req.body.status }, { where: { _id: req.body.orderId } });
    res.json({ success: true, message: 'Status updated' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

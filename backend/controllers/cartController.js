import User from '../models/userModel.js';

// ── Add to cart ─────────────────────────────────────────────────────────────
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.json({ success: false, message: 'User not found' });
    
    // Sequelize returns JSON fields as objects nicely
    const cartData = { ...(user.cartData || {}) };
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    
    await User.update({ cartData }, { where: { _id: userId } });
    res.json({ success: true, message: 'Added to cart' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ── Update cart item qty ────────────────────────────────────────────────────
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.json({ success: false, message: 'User not found' });
    
    const cartData = { ...(user.cartData || {}) };
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;
    
    await User.update({ cartData }, { where: { _id: userId } });
    res.json({ success: true, message: 'Cart updated' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ── Get user cart ───────────────────────────────────────────────────────────
export const getUserCart = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.userId);
    if (!user) return res.json({ success: false, message: 'User not found' });
    
    res.json({ success: true, cartData: user.cartData || {} });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

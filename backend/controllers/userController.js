import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// ── Register ────────────────────────────────────────────────────────────────
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.json({ success: false, message: 'All fields required' });
    if (await User.findOne({ where: { email } })) return res.json({ success: false, message: 'User already exists' });
    if (!validator.isEmail(email)) return res.json({ success: false, message: 'Invalid email' });
    if (password.length < 6) return res.json({ success: false, message: 'Password must be 6+ chars' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ── Login ───────────────────────────────────────────────────────────────────
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.json({ success: false, message: 'User not found' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, message: 'Invalid credentials' });
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ── Admin Login ─────────────────────────────────────────────────────────────
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid admin credentials' });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

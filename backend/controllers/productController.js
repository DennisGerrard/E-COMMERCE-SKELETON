import Product from '../models/productModel.js';

// ── Add product (admin) ─────────────────────────────────────────────────────
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
    const images = req.files
      ? Object.values(req.files).flat().map(f => f.path)
      : [];

    const product = await Product.create({
      name, description,
      price: Number(price),
      image: images, // JSONB handles array natively in seq
      category, subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === 'true',
      date: Date.now(),
    });

    res.json({ success: true, message: 'Product added', product });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ── Remove product ──────────────────────────────────────────────────────────
export const removeProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { _id: req.body.id } });
    res.json({ success: true, message: 'Product removed' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ── Single product ──────────────────────────────────────────────────────────
export const singleProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.body.productId);
    res.json({ success: true, product });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// ── List all products ───────────────────────────────────────────────────────
export const listProducts = async (req, res) => {
  try {
    const products = await Product.findAll({});
    res.json({ success: true, products });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

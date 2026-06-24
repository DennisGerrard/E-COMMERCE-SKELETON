import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/postgres.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';
import cartRouter from './routes/cartRoute.js';

// ── App config ───────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 4000;

// ── Middlewares ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors());

// ── Connect DB ───────────────────────────────────────────────────────────────
connectDB();

// ── API routes ───────────────────────────────────────────────────────────────
app.use('/api/user',    userRouter);
app.use('/api/product', productRouter);
app.use('/api/order',   orderRouter);
app.use('/api/cart',    cartRouter);

app.get('/', (req, res) => res.send('Glam API is running'));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

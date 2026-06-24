import { DataTypes } from 'sequelize';
import sequelize from '../config/postgres.js';

const Order = sequelize.define('Order', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: { type: DataTypes.STRING, allowNull: false },
  items: { type: DataTypes.JSONB, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  address: { type: DataTypes.JSONB, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Order Placed' },
  paymentMethod: { type: DataTypes.STRING, allowNull: false },
  payment: { type: DataTypes.BOOLEAN, defaultValue: false },
  date: { type: DataTypes.BIGINT, defaultValue: () => Date.now() },
}, { timestamps: false });

export default Order;

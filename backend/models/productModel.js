import { DataTypes } from 'sequelize';
import sequelize from '../config/postgres.js';

const Product = sequelize.define('Product', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  image: { type: DataTypes.JSONB, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  subCategory: { type: DataTypes.STRING, allowNull: false },
  sizes: { type: DataTypes.JSONB, allowNull: false },
  bestseller: { type: DataTypes.BOOLEAN, defaultValue: false },
  date: { type: DataTypes.BIGINT, defaultValue: () => Date.now() },
}, { timestamps: false });

export default Product;

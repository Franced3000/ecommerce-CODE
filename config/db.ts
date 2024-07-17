// sync.ts
import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from '../models/user';
import Cart from '../models/cart';
import Product from '../models/product';
import Order from '../models/order';
import Category from '../models/category';
dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DIALECT as Dialect;
const dbPassword = process.env.DB_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
});



// Associazioni
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Cart.belongsTo(User, { foreignKey: 'userId' });

export default sequelizeConnection;

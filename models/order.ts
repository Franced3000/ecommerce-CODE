import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

interface OrderAttributes {
  id: number;
  userId: number;
  products: any;
  total: number;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public products!: any;
  public total!: number;
}

Order.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'orders'
});

export default Order;

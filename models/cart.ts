import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './user';

interface CartAttributes {
  userId: number;
  products: any;
  total: number; 
}

class Cart extends Model<CartAttributes> implements CartAttributes {
  public userId!: number;
  public products!: any;
  public total!: number;
}

Cart.init({
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    references: {
      model: User, 
      key: 'id'
    }
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
  tableName: 'carts',
  timestamps: false
});
Cart.belongsTo(User, { foreignKey: 'userId' });

export default Cart;

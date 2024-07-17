import { DataTypes, Model} from 'sequelize';
import  sequelize  from '../config/db'; // Assicurati che il percorso sia corretto

// Definizione degli attributi del prodotto
interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
}


// Definizione del modello Product
class Product extends Model<ProductAttributes>  


  implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inizializzazione del modello Product
Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Product',
    timestamps: true, // Abilita i campi `createdAt` e `updatedAt`
  }
);

export default Product;

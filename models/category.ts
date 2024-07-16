import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db'; // Assicurati che il percorso sia corretto

// Definizione degli attributi della categoria
interface CategoryAttributes {
  id: number;
  name: string;
  idAdmin:number;
}

// Definizione del modello Category
class Category extends Model<CategoryAttributes>  
  implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public idAdmin!:number;
  
  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inizializzazione del modello Category
Category.init(
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
   idAdmin: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
  },
  
  {
    sequelize,
    modelName: 'Category',
    timestamps: false, // Abilita i campi `createdAt` e `updatedAt`
  }
);

export default Category;

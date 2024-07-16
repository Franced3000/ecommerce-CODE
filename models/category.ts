import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db'; // Assicurati che il percorso sia corretto

// Definizione degli attributi della categoria
interface CategoryAttributes {
  id: number;
  name: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

// Definizione del modello Category
class Category extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes {
  public id!: number;
  public name!: string;

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
  },
  {
    sequelize,
    modelName: 'Category',
    timestamps: true, // Abilita i campi `createdAt` e `updatedAt`
  }
);

export default Category;

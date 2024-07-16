// sync.ts
import { Dialect, Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DIALECT as Dialect;
const dbPassword = process.env.DB_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
});

const syncDatabase = async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log('Connection has been established successfully.');
    await sequelizeConnection.sync({ force: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

syncDatabase();

// Associazioni
// Tavolo.hasMany(Prenotazione, { foreignKey: 'tavoloId' });
// Prenotazione.belongsTo(Tavolo, { foreignKey: 'tavoloId' });

// Cliente.hasMany(Prenotazione, { foreignKey: 'clienteId' });
// Prenotazione.belongsTo(Cliente, { foreignKey: 'clienteId' });

export default sequelizeConnection;

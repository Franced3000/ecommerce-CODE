// sync.ts
import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';
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
// Tavolo.hasMany(Prenotazione, { foreignKey: 'tavoloId' });
// Prenotazione.belongsTo(Tavolo, { foreignKey: 'tavoloId' });

// Cliente.hasMany(Prenotazione, { foreignKey: 'clienteId' });
// Prenotazione.belongsTo(Cliente, { foreignKey: 'clienteId' });

export default sequelizeConnection;

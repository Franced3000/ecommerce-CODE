const express = require('express');
import sequelizeConnection from './config/db'; // Importa la connessione al database
import routerCategory from './routes/category';
import routerOrder from './routes/order';
import routerUser from './routes/user';


const app = express();
const port = 3000;

// Middleware per parsing JSON
app.use(express.json());

app.use('/api', routerUser, routerCategory, routerOrder);


// Definiscole rotte del tuo server qui
app.get('/', (req: Request, res: any) => {
  res.send('Benvenuto nel nostro server Express!');
});


sequelizeConnection
  .sync({ force: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server in ascolto sulla porta ${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Errore di connessione al database:', error);
  });

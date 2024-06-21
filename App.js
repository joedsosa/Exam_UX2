require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const { firebaseApp, auth } = require('./src/config/firebase');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

const port = process.env.PORT || 3001;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let database; //segun nueva doc

async function connectDB() { //segun nueva doc de mongo
  try {
    await client.connect();
    console.log('Conectado a la base de datos MongoDB');
    database = client.db('examen2'); 
  } catch (error) {
    console.error('Hubo un error al conectarse a la base de datos', error);
    throw error;
  }
}

app.listen(port, () => {
  console.log('Servidor corriendo en el puerto', port);
  connectDB();
});

app.use(async (req, res, next) => {
  try {
    if (!database) {
      await connectDB(); 
    }
    next();
  } catch (error) {
    console.error('Hubo un error al reconectar a la base de datos', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Rutas de usuario
const userRoutes = require('./src/routes/userRoutes');
app.use('/auth', userRoutes);

// Rutas de posts
const postRoutes = require('./src/routes/postRoutes');
app.use('/post', postRoutes);

module.exports = app;

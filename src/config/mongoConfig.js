const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let database;

async function connectDB() {
  if (database) return database;
  try {
    await client.connect();
    console.log('Conectado a la base de datos MongoDB');
    database = client.db('examen2'); 
    return database;
  } catch (error) {
    console.error('Hubo un error al conectarse a la base de datos', error);
    throw error;
  }
}

module.exports = { connectDB };

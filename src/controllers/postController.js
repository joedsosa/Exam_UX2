const { ObjectId } = require('mongodb');
const { connectDB } = require('../config/mongoConfig');

const createPost = async (req, res) => {
  try {
    const database = await connectDB();
    const collection = database.collection('Post');
    const result = await collection.insertOne(req.body);
    res.status(200).send({ message: 'Post creado con éxito', result });
  } catch (error) {
    res.status(500).send({ message: 'Error al crear post', error });
  }
};

const listPosts = async (req, res) => {
  try {
    const database = await connectDB();
    const collection = database.collection('Post');
    const posts = await collection.find({}).toArray();
    res.status(200).send({ message: 'Posts obtenidos con éxito', posts });
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener posts', error });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;
  try {
    const database = await connectDB();
    const collection = database.collection('Post');
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    res.status(200).send({ message: 'Post editado con éxito', result });
  } catch (error) {
    res.status(500).send({ message: 'Error al editar post', error });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const database = await connectDB();
    const collection = database.collection('Post');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).send({ message: 'Post eliminado con éxito' });
    } else {
      res.status(404).send({ message: 'No se encontró el post a eliminar' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar post', error });
  }
};

module.exports = { createPost, listPosts, editPost, deletePost };

const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const { auth } = require('../config/firebase');

const createUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        res.status(200).send({ message: 'Usuario creado con éxito', userCredential });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear usuario', error });
    }
};

const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        res.status(200).send({ message: 'Inicio de sesión exitoso', userCredential });
    } catch (error) {
        res.status(500).send({ message: 'Error al iniciar sesión', error });
    }
};

const logOut = async (req, res) => {
    try {
        await signOut(auth);
        res.status(200).send({ message: 'Cierre de sesión exitoso' });
    } catch (error) {
        res.status(500).send({ message: 'Error al cerrar sesión', error });
    }
};

module.exports = { createUser, logIn, logOut };

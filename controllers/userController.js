const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Verificar si el nombre de usuario o correo electrónico ya existen
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Nombre de usuario o correo electrónico ya registrados' });
      }

      // Hash de la contraseña antes de almacenarla en la base de datos
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar al usuario' });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Verificar si el usuario existe
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      // Crear y firmar el token JWT
      const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  },

  followUser: async (req, res) => {
    try {
      const { userIdToFollow } = req.body;
      const userId = req.user.id;

      // Añadir userIdToFollow a la lista de usuarios seguidos por el usuario actual
      await User.findByIdAndUpdate(userId, { $push: { following: userIdToFollow } });

      // Añadir userId a la lista de seguidores de userIdToFollow
      await User.findByIdAndUpdate(userIdToFollow, { $push: { followers: userId } });

      res.status(200).json({ message: 'Usuario seguido con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al seguir al usuario' });
    }
  },
};

module.exports = userController;

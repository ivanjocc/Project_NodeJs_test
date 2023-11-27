const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const tweetRoutes = require('./tweetRoutes');

// Montar las rutas de usuarios
router.use('/users', userRoutes);

// Montar las rutas de tweets
router.use('/tweets', tweetRoutes);

// Ruta para la página principal
router.get('/', (req, res) => {
  res.render('home');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para registrar un nuevo usuario
router.post('/register', userController.register);

// Ruta para la página de registro
router.get('/register', (req, res) => {
	res.render('register');
});

// Ruta para iniciar sesión
router.post('/login', userController.login);

// Ruta para la página de login
router.get('/login', (req, res) => {
	res.render('login');
});

// Ruta para seguir a un usuario
router.post('/follow', userController.followUser);

// // Ruta para la página de follow
// router.get('/follow', (req, res) => {
// 	res.render('follow');
// });

module.exports = router;

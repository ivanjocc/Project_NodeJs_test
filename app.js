const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/twitter');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
	console.log('Conexión exitosa a MongoDB');
});

// Configuración de Express
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para pasar el usuario actual a todas las vistas
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

// Rutas
app.use('/', routes);

// Arranque del servidor
app.listen(PORT, () => {
	console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

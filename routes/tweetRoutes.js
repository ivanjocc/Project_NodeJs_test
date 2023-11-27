const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');

// Ruta para crear un nuevo tweet
router.post('/tweets', tweetController.createTweet);

// Ruta para obtener todos los tweets
router.get('/tweets', tweetController.getTweets);

// Ruta para agregar un comentario a un tweet
router.post('/tweets/comment', tweetController.addComment);

module.exports = router;

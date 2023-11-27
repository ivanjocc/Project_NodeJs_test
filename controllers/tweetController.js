const Tweet = require('../models/Tweet');
const User = require('../models/User');

const tweetController = {
  createTweet: async (req, res) => {
    try {
      const { content } = req.body;
      const userId = req.user.id; // Suponiendo que has implementado la autenticación y el usuario está disponible en req.user

      const newTweet = await Tweet.create({
        content,
        user: userId,
      });

      // Añadir el nuevo tweet al array de tweets del usuario
      await User.findByIdAndUpdate(userId, { $push: { tweets: newTweet._id } });

      res.status(201).json(newTweet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el tweet' });
    }
  },

  getTweets: async (req, res) => {
    try {
      const tweets = await Tweet.find().populate('user', 'username'); // Populate para obtener detalles del usuario asociado al tweet
      res.status(200).json(tweets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los tweets' });
    }
  },

  addComment: async (req, res) => {
    try {
      const { tweetId, content } = req.body;
      const userId = req.user.id;

      const newComment = {
        content,
        user: userId,
      };

      // Añadir el comentario al array de comentarios del tweet
      await Tweet.findByIdAndUpdate(tweetId, { $push: { comments: newComment } });

      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al añadir el comentario' });
    }
  },
};

module.exports = tweetController;

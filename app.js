const express = require('express');
const mongoose = require('mongoose');

const app = express();
const things = require('./modeles/things');

mongoose.connect('mongodb+srv://artscongolab:jospingda30211@jospinkanane.ymk8ah8.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const article = new things({
    ...req.body,
  });
  article.save()
    .then(() => res.status(200).json({ message : 'objet crée avec succes !'}))
    .catch(err => res.status(400).json({ err }));
});

app.get('/api/stuff', (req, res, next) => {
    things.find()
      .then((articles) => res.status(200).json(articles))
      .catch(err => res.status(400).json({ err }));
  });


module.exports = app;

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const { livroRouter } = require('./routes/livro.router');

const app = express();
const port = process.env.PORT || 3333;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';

const mongoClient = new MongoClient(mongoUri);

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'API da Minha Biblioteca funcionando!' });
});

app.use('/api/livros', livroRouter);

async function iniciar() {
  await mongoClient.connect();
  app.locals.db = mongoClient.db('minha-biblioteca');

  app.listen(port, () => {
    console.log(`API ouvindo em http://localhost:${port}/api`);
    console.log(`MongoDB conectado em ${mongoUri}`);
  });
}

iniciar().catch((error) => {
  console.error('Não foi possível iniciar a API.', error);
  process.exitCode = 1;
});


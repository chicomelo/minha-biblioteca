const { Router } = require('express');

const { getCollection } = require('../util/get-collection');

const livroRouter = Router();

function livroValido(livro) {
  return Boolean(
    livro.titulo &&
    livro.autor &&
    livro.categoria &&
    livro.anoPublicacao &&
    livro.status &&
    typeof livro.favorito === 'boolean'
  );
}

livroRouter.get('/', async (req, res) => {
  try {
    const livros = await getCollection(req.app, 'livros')
      .find()
      .sort({ titulo: 1 })
      .toArray();

    res.json(livros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Não foi possível buscar os livros.' });
  }
});

livroRouter.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ erro: 'O código do livro deve ser numérico.' });
    }

    const livro = await getCollection(req.app, 'livros').findOne({ _id: id });

    if (!livro) {
      return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    res.json(livro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Não foi possível buscar o livro.' });
  }
});

livroRouter.post('/', async (req, res) => {
  try {
    const livro = req.body;

    if (!livroValido(livro)) {
      return res.status(400).json({ erro: 'Preencha os campos obrigatórios.' });
    }

    const ultimoLivro = await getCollection(req.app, 'livros')
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .next();

    const novoLivro = {
      ...livro,
      _id: ultimoLivro ? ultimoLivro._id + 1 : 1,
    };

    await getCollection(req.app, 'livros').insertOne(novoLivro);

    res.status(201).json(novoLivro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Não foi possível cadastrar o livro.' });
  }
});

livroRouter.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ erro: 'O código do livro deve ser numérico.' });
    }

    const livro = req.body;

    if (!livroValido(livro)) {
      return res.status(400).json({ erro: 'Preencha os campos obrigatórios.' });
    }

    const livroAtualizado = {
      ...livro,
      _id: id,
    };

    const resultado = await getCollection(req.app, 'livros').replaceOne(
      { _id: id },
      livroAtualizado
    );

    if (resultado.matchedCount === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    res.json(livroAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Não foi possível atualizar o livro.' });
  }
});

livroRouter.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ erro: 'O código do livro deve ser numérico.' });
    }

    const resultado = await getCollection(req.app, 'livros').deleteOne({ _id: id });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado.' });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Não foi possível excluir o livro.' });
  }
});

module.exports = {
  livroRouter,
};


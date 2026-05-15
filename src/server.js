const express = require('express');
const rateLimit = require("express-rate-limit");

const limiter = require('./config/security');
const connectDatabase = require('./config/database');
const Pessoa = require('./models/Pessoa');

const app = express();
const PORT = 3000;



app.use(limiter);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API REST em Node.js com Express.' });
});

app.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await Pessoa.find();
    res.status(200).json(pessoas);
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao buscar pessoas.',
      erro: error.message,
    });
  }
});


app.post('/pessoas', async (req, res) => {
  try {
    const { nome, RA } = req.body;

    if (!nome || !RA) {
      return res.status(400).json({
        mensagem: 'Os campos nome e curso sao obrigatorios.',
      });
    }

    const novaPessoa = await Pessoa.create({ nome, RA });

    res.status(201).json(novaPessoa);
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao cadastrar pessoa.',
      erro: error.message,
    });
  }
});


app.put('/pessoas', async (req, res) => {
  try {

    const { _id, nome, RA } = req.body;

    if (!_id || !nome || !RA) {
      return res.status(400).json({
        mensagem: 'Os campos _id, nome e RA sao obrigatorios.',
      });
    }

    const pessoa = await Pessoa.findById(_id);

    if (!pessoa) {
      return res.status(404).json({
        mensagem: 'Pessoa nao encontrada.',
      });
    }

    pessoa.nome = nome;
    pessoa.RA = RA;

    await pessoa.save();

    res.status(200).json(pessoa);

  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao atualizar pessoa.',
      erro: error.message,
    });
  }
});



app.delete('/pessoas', async (req, res) => {
  try {

    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        mensagem: 'O campo _id é obrigatorio.',
      });
    }

    const pessoa = await Pessoa.findById(_id);

    if (!pessoa) {
      return res.status(404).json({
        mensagem: 'Pessoa nao encontrada.',
      });
    }

    await pessoa.deleteOne();

    res.status(200).json({
      mensagem: 'Pessoa removida com sucesso.',
    });

  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao remover pessoa.',
      erro: error.message,
    });
  }
});


async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Nao foi possivel iniciar a aplicacao.', error.message);
  }
}

startServer();
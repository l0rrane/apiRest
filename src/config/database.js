const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://gabiespin34_db_user:12341234@gabi.e198a5f.mongodb.net/cadastro?retrywrites=true&w=majority';

async function connectDatabase() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB conectado com sucesso!');
}

module.exports = connectDatabase;
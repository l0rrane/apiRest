
const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://gabiespin34_db_user:12341234@gabi.el98a5f.mongodb.net/cadastro?retryWrites=true&w=majority&appName=gabi';
async function connectDatabase() {
  await mongoose.connect(MONGO_URI);

  console.log('MongoDB conectado com sucesso.');
  console.log('Banco conectado:', mongoose.connection.name);
}

module.exports = connectDatabase;
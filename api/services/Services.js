const database = require('../models');

class Services {
  constructor(nomeDoModelo) {
      this.nomeDoModelo = nomeDoModelo
  }

  async pegaTodosOsRegistros() {
    return database[this.nomeDoModelo].findAll();
  }

  async pegaUmRegistro(id) {
    return database[this.nomeDoModelo].findOne({where: {id: Number(id)}});
  }

  async criaRegistro(dados) {
    return database[this.nomeDoModelo].create(dados);
  }

  async atualizaRegistro(dados, where) {
    return database[this.nomeDoModelo]
      .scope('todos')
      .update(dados, {where: {...where}})
  }

  async atualizaRegistros(dados, where, transaction) {
    return database[this.nomeDoModelo]
      .scope('todos')
      .update(dados, {where: {...where}, transaction})
  }

  async apagaRegistro(id) {
    return database[this.nomeDoModelo].destroy({where: {id: Number(id)}});
  }
}

module.exports = Services;
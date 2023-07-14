const database = require('../models');

class NivelController {
  static async getNiveis(req, res) {
    try {
      const todosOsNiveis = await database.Niveis.findAll();
      return res.status(200).json(todosOsNiveis);

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getNivel(req, res) {
    const { id } = req.params;
    try {
      const umNivel = await database.Niveis.findOne( {where: {id: Number(id)}} );
      return res.status(200).json(umNivel);

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createNivel(req, res) {
    const novoNivel = req.body;
    try {
      const novoNivelCriado = await database.Niveis.create(novoNivel);
      return res.status(200).json(novoNivelCriado);

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateNivel(req, res) {
    const novasInfos = req.body;
    const { id } = req.params;
    try {
      await database.Niveis.update(novasInfos, {where: {id: Number(id)}});
      const nivelAtualizado = await database.Nivel.findOne({where: {id: Number(id)}});
      return res.status(200).json(nivelAtualizado);

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteNivel(req, res) {
    const { id } = req.params;
    try {
      const nivelDeletado = await database.Niveis.destroy({where: {id: Number(id)}});
      if (nivelDeletado)
        return res.status(200).json({mensagem: `Nivel id ${id} deletado`});
      else
        return res.status(404).json({mensagem: `Nivel id ${id} não encontrado`});
      } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restoreNivel(req, res) {
    const { id } = req.params;
    try {
      await database.Niveis.restore({where: {id: Number(id)}});
      return res.status(200).json({mensagem: `id ${id} restaurado`});
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

}

module.exports = NivelController;
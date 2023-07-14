const database = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class TurmaController {
    static async getTurmas(req, res) {
      const { data_inicial, data_final } = req.query
      const where = {}
      data_inicial || data_final ? where.data_inicio = {} : null;
      data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
      data_final ? where.data_inicio[Op.lte] = data_final : null;

      try {
        const todosAsTurmas = await database.Turmas.findAll({where});
        return res.status(200).json(todosAsTurmas);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async getTurma(req, res) {
      const { id } = req.params;
      try {
        const umaTurma = await database.Turmas.findOne({where: {id: Number(id)}});
        return res.status(200).json(umaTurma);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async createTurma(req, res) {
      const novaTurma = req.body;
      try {
        const turmaCriada = await database.Turmas.create(novaTurma);
        return res.status(200).json(turmaCriada);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async updateTurma(req, res) {
      const novasInfos = req.body;
      const { id } = req.params;
      try {
        await database.Turmas.update(novasInfos, {where: {id: Number(id)}});
        const turmaAtualizada = await database.Turmas.findOne({where: {id: Number(id)}});
        return res.status(200).json(turmaAtualizada);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async deleteTurma(req, res) {
      const { id } = req.params;
      try {
        const turmaDeletada = await database.Turmas.destroy({where: {id: Number(id)}});
        if (turmaDeletada)
          return res.status(200).json({mensagem: `Turma ${id} deletada`});
        else
          return res.status(404).json({mensagem: `Turma ${id} não encontrada`});
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async restoreTurma(req, res) {
      const { id } = req.params;
      try {
        await database.Turmas.restore({where: {id: Number(id)}});
        return res.status(200).json({mensagem: `id ${id} restaurado`});
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }
  }

module.exports = TurmaController;
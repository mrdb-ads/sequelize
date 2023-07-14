const Services = require('./Services.js');
const database = require('../models');
const Sequelize = require('sequelize');

class MatriculasServices extends Services {
	constructor() {
			super('Matriculas')
	}

	// Métodos específicos do controlador de Matriculas
	async getMatricula(estudanteId, turmaId) {
		return database[this.nomeDoModelo].findOne({
			where: {
				estudante_id: Number(estudanteId),
				turma_id: Number(turmaId)
			}
		})
	}

	async getMatriculasPorTurma(where) {
		return database[this.nomeDoModelo].findAndCountAll({
			where: {where},
			limit: 20,
			order: [['estudante_id', 'ASC']]
		})
	}

	async getTurmasLotadas(where) {
		const lotacaoTurma = 2;

		return database[this.nomeDoModelo].findAndCountAll({
			where: {where},
			attributes: ['turma_id'],
			group: ['turma_id'],
			having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
		})
	}
}

module.exports = MatriculasServices;
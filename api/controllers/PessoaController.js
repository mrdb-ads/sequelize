// const database = require('../models');
// const Sequelize = require('sequelize');
const { PessoasServices } = require('../services');
const { MatriculasServices } = require('../services');

const pessoasServices = new PessoasServices();
const matriculasServices = new MatriculasServices();

class PessoaController {
  static async getPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
      return res.status(200).json(pessoasAtivas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getPessoas(req, res) {
    try {
      const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
      return res.status(200).json(todasAsPessoas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getPessoa(req, res) {
    const { id } = req.params;
    try {
      const umaPessoa = await pessoasServices.pegaUmRegistro(id);
      return res.status(200).json(umaPessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa);
      return res.status(200).json(novaPessoaCriada);

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updatePessoa(req, res) {
    const novasInfos = req.body;
    const { id } = req.params;
    try {
      // await database.Pessoas.update(novasInfos, {where: {id: Number(id)}});
      await pessoasServices.atualizaRegistro(novasInfos, id);
      const pessoaAtualizada = await pessoasServices.pegaUmRegistro(id);
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restorePessoa(req, res) {
    const { id } = req.params;
    try {
      await pessoasServices.restauraPessoa(id);
      return res.status(200).json({mensagem: `id ${id} restaurado`});
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async getMatricula(req, res) {
    const { estudanteId, turmaId } = req.params;
    try {
      const umaMatricula = await matriculasServices.getMatricula(turmaId, estudanteId);
      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatriculaCriada = await matriculasServices.criaRegistro(novaMatricula);
      return res.status(200).json(novaMatriculaCriada);

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateMatricula(req, res) {
    const novasInfos = req.body;
    const { estudanteId, turmaId } = req.params;

    const where = {
      estudante_id: Number(estudanteId),
      turma_id: Number(turmaId)
    }
    try {
      await matriculasServices.atualizaRegistro(novasInfos, where);
      return res.status(200).json({mensagem: 'matricula atualizada'});

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteMatricula(req, res) {
    const { matriculaId } = req.params;
    try {
      const matriculaDeletada = await matriculasServices.apagaRegistro(matriculaId);

      if (matriculaDeletada)
        return res.status(200).json({mensagem: `Matricula id ${matriculaId} deletada`});
      else
        return res.status(404).json({mensagem: `Matricula id ${matriculaId} não encontrada`});

      } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getMatriculas(req, res) {
    const { estudanteId } = req.params;
    try {
      const pessoa = await pessoasServices.pegaUmRegistro(estudanteId);
      if (pessoa) {
        let matriculas = await pessoa.getAulasMatriculadas();
        return res.status(200).json(matriculas);
      } else {
        return res.status(404).json({mensagem: `Matricula não encontrada`});
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getMatriculasPorTurma(req, res) {
    const { turmaId } = req.params;
    const where = {turma_id: Number(turmaId), status: 'confirmado'};
    try {
      const todasAsMatriculas = await matriculasServices.getMatriculasPorTurma(where);
      return res.status(200).json(todasAsMatriculas);

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getTurmasLotadas(req, res) {
    const where = {status: 'confirmado'};

    try {
      const turmasLotadas = await matriculasServices.getTurmasLotadas(where);
      return res.status(200).json(turmasLotadas.count);

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async cancelaPessoa(req, res) {
    const { estudanteId } = req.params;
    try {
      await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId));
      return res.status(200).json({mensagem: `Estudante ${estudanteId} e suas matrículas cancelados`});

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;
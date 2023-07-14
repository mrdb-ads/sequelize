const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');

const router = Router();

router.get('/pessoas', PessoaController.getPessoas);
router.get('/pessoas/ativas', PessoaController.getPessoasAtivas);
router.get('/pessoas/:id', PessoaController.getPessoa);
router.get('/pessoas/:estudanteId/matriculas', PessoaController.getMatriculas)
router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.getMatricula);
router.get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.getMatriculasPorTurma);
router.get('/pessoas/matriculas/lotada', PessoaController.getTurmasLotadas);
router.post('/pessoas', PessoaController.createPessoa);
router.post('/pessoas/:id/restaura', PessoaController.restorePessoa)
router.post('/pessoas/:estudanteId/matriculas', PessoaController.createMatricula);
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa);
router.put('/pessoas/:id', PessoaController.updatePessoa);
router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.updateMatricula)
router.delete('/pessoas/:id', PessoaController.cancelaPessoa);
router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deleteMatricula)

module.exports = router;
const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController.js');

const router = Router();

router
  .get('/turmas', TurmaController.getTurmas)
  .get('/turmas/:id', TurmaController.getTurma)
  .post('/turmas', TurmaController.createTurma)
  .put('/turmas/:id', TurmaController.updateTurma)
  .delete('/turmas/:id', TurmaController.deleteTurma)
  .post('/turmas/:id/restaura', TurmaController.restoreTurma)

module.exports = router;

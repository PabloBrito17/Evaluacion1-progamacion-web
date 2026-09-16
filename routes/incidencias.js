const express = require('express');
const router = express.Router();
const { registrarIncidencia, listarIncidencias, buscarIncidenciaPorId } = require('../controllers/incidenciasController');

router.post('/', registrarIncidencia);
router.get('/', listarIncidencias);
router.get('/:id', buscarIncidenciaPorId);

module.exports = router;
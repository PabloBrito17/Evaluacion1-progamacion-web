const express = require("express");
const controlador = require("../controllers/incidenciasController");

const router = express.Router();

router.put("/incidencias/:id/estado", controlador.cambiarEstado);
router.delete("/incidencias/:id", controlador.eliminarIncidencia);

module.exports = router;

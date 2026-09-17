const express = require("express");
const {
    registrarIncidencia,
    obtenerEstadisticas
} = require("../controllers/incidenciasController");

const router = express.Router();

router.post("/", registrarIncidencia);
router.get("/estadisticas", obtenerEstadisticas);

module.exports = router;

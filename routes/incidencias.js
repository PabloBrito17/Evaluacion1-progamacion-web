const express = require("express");
const {
    registrarIncidencia,
    obtenerEstadisticas,
    obtenerClasificacion
} = require("../controllers/incidenciasController");

const router = express.Router();

router.post("/", registrarIncidencia);
router.get("/estadisticas", obtenerEstadisticas);
router.get("/:id/clasificacion", obtenerClasificacion);

module.exports = router;

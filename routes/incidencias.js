const express = require("express");

const {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstado,
    eliminarIncidencia,
    obtenerEstadisticas
} = require("../controllers/incidenciasController");

const router = express.Router();

// Punto 2: Registrar incidencia
router.post("/", registrarIncidencia);

// Punto 3: Listar incidencias
router.get("/", listarIncidencias);

// Punto 7: Estadísticas
router.get("/estadisticas", obtenerEstadisticas);

// Punto 4: Buscar incidencia por ID
router.get("/:id", buscarIncidenciaPorId);

// Punto 5: Cambiar estado
router.put("/:id/estado", cambiarEstado);

// Punto 6: Eliminar incidencia
router.delete("/:id", eliminarIncidencia);

module.exports = router;
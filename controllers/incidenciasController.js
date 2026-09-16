const {
  ESTADOS_VALIDOS,
  validarEstado,
  buscarIncidencia,
  buscarIndiceIncidencia,
} = require("../utils/helpers");

// Lista temporal hasta que se integre la fuente de datos del equipo.
const incidencias = [];

function cambiarEstado(req, res) {
  const incidencia = buscarIncidencia(incidencias, req.params.id);

  if (!incidencia) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  const estadoNuevo = validarEstado(req.body.estado);

  if (estadoNuevo === null) {
    return res.status(400).json({
      mensaje: "Estado no válido",
      estadosPermitidos: ESTADOS_VALIDOS,
    });
  }

  incidencia.estado = estadoNuevo;

  return res.status(200).json({
    mensaje: "Estado actualizado correctamente",
    incidencia,
  });
}

function eliminarIncidencia(req, res) {
  const indice = buscarIndiceIncidencia(incidencias, req.params.id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: "Incidencia no encontrada" });
  }

  const eliminada = incidencias.splice(indice, 1)[0];

  return res.status(200).json({
    mensaje: "Incidencia eliminada correctamente",
    incidencia: eliminada,
  });
}

module.exports = {
  cambiarEstado,
  eliminarIncidencia,
};

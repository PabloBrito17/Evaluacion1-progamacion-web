const ESTADOS_VALIDOS = ["Pendiente", "En Proceso", "Resuelta", "Cancelada"];

function validarEstado(estado) {
  if (typeof estado !== "string") return null;

  switch (estado.trim().toLowerCase()) {
    case "pendiente":
      return "Pendiente";
    case "en proceso":
      return "En Proceso";
    case "resuelta":
      return "Resuelta";
    case "cancelada":
      return "Cancelada";
    default:
      return null;
  }
}

function buscarIncidencia(incidencias, id) {
  return incidencias.find((incidencia) => incidencia.id === Number(id));
}

function buscarIndiceIncidencia(incidencias, id) {
  return incidencias.findIndex((incidencia) => incidencia.id === Number(id));
}

module.exports = {
  ESTADOS_VALIDOS,
  validarEstado,
  buscarIncidencia,
  buscarIndiceIncidencia,
};

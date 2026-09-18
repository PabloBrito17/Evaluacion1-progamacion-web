// Funciones auxiliares para cambiar estado y eliminar
const {
    ESTADOS_VALIDOS,
    buscarIncidencia,
    buscarIndiceIncidencia,
} = require("../utils/helpers");

// Arreglo donde se guardan las incidencias
const incidencias = [];
let siguienteId = 1;

// PUNTO 2: Registrar incidencia
const registrarIncidencia = (req, res) => {

    const { empleado, area, descripcion, prioridad } = req.body;

    if (!empleado || !area || !descripcion || !prioridad) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    if (
        empleado.trim() === "" ||
        area.trim() === "" ||
        descripcion.trim() === "" ||
        prioridad.trim() === ""
    ) {
        return res.status(400).json({
            mensaje: "Ningún campo puede estar vacío"
        });
    }

    const prioridadNormalizada = prioridad.trim().toLowerCase();

    const prioridadesValidas = ["alta", "media", "baja"];

    if (!prioridadesValidas.includes(prioridadNormalizada)) {
        return res.status(400).json({
            mensaje: "La prioridad debe ser Alta, Media o Baja"
        });
    }

const nuevaIncidencia = {
    id: siguienteId,
    empleado: empleado.trim(),
    area: area.trim(),
    descripcion: descripcion.trim(),
    prioridad: prioridadNormalizada.charAt(0).toUpperCase()
        + prioridadNormalizada.slice(1),
    estado: "Pendiente"
};

incidencias.push(nuevaIncidencia);
siguienteId++;

return res.status(201).json({
    mensaje: "Incidencia registrada correctamente",
    incidencia: nuevaIncidencia
});

};

// PUNTO 3: Listar incidencias
const listarIncidencias = (req, res) => {
    return res.status(200).json(incidencias);
};

// PUNTO 4: Buscar incidencia por ID
const buscarIncidenciaPorId = (req, res) => {

    const id = parseInt(req.params.id);

    const incidencia = incidencias.find(
        inc => inc.id === id
    );

    if (!incidencia) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    return res.status(200).json(incidencia);
};

// PUNTO 5: Cambiar estado
const cambiarEstado = (req, res) => {

    const incidencia = buscarIncidencia(
        incidencias,
        req.params.id
    );

    if (!incidencia) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    const estado = req.body?.estado;

    if (typeof estado !== "string") {
        return res.status(400).json({
            mensaje: "Estado no válido",
            estadosPermitidos: ESTADOS_VALIDOS
        });
    }

    let estadoNuevo;

    switch (estado.trim().toLowerCase()) {
        case "pendiente":
            estadoNuevo = "Pendiente";
            break;
        case "en proceso":
            estadoNuevo = "En Proceso";
            break;
        case "resuelta":
            estadoNuevo = "Resuelta";
            break;
        case "cancelada":
            estadoNuevo = "Cancelada";
            break;
        default:
            return res.status(400).json({
                mensaje: "Estado no válido",
                estadosPermitidos: ESTADOS_VALIDOS
            });
    }

    incidencia.estado = estadoNuevo;

    return res.status(200).json({
        mensaje: "Estado actualizado correctamente",
        incidencia: incidencia
    });
};

// PUNTO 6: Eliminar incidencia
const eliminarIncidencia = (req, res) => {

    const indice = buscarIndiceIncidencia(
        incidencias,
        req.params.id
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    const eliminada = incidencias.splice(indice, 1)[0];

    return res.status(200).json({
        mensaje: "Incidencia eliminada correctamente",
        incidencia: eliminada
    });
};

// PUNTO 7: Estadísticas
const obtenerEstadisticas = (req, res) => {

    const estadisticas = incidencias.reduce((acumulador, incidencia) => {

        acumulador.totalIncidencias++;

        if (incidencia.estado === "Pendiente") {
            acumulador.pendientes++;
        }
        else if (incidencia.estado === "En Proceso") {
            acumulador.enProceso++;
        }
        else if (incidencia.estado === "Resuelta") {
            acumulador.resueltas++;
        }
        else if (incidencia.estado === "Cancelada") {
            acumulador.canceladas++;
        }

        return acumulador;

    }, {
        totalIncidencias: 0,
        pendientes: 0,
        enProceso: 0,
        resueltas: 0,
        canceladas: 0
    });

    return res.status(200).json(estadisticas);
};

// PUNTO 8: Clasificación automática
const obtenerClasificacion = (req, res) => {

    const id = Number(req.params.id);

    const incidencia = incidencias.find(
        item => item.id === id
    );

    if (!incidencia) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    let clasificacion;

    switch (incidencia.prioridad) {

        case "Alta":
            clasificacion = "Crítica";
            break;

        case "Media":
            clasificacion = "Importante";
            break;

        case "Baja":
            clasificacion = "Normal";
            break;

        default:
            return res.status(400).json({
                mensaje: "La incidencia tiene una prioridad inválida"
            });
    }

    return res.status(200).json({
        id: incidencia.id,
        clasificacion: clasificacion
    });
};

module.exports = {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstado,
    eliminarIncidencia,
    obtenerEstadisticas,
    obtenerClasificacion
};

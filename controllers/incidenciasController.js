// Funciones auxiliares para cambiar estado y eliminar
const {
    ESTADOS_VALIDOS,
    validarEstado,
    buscarIncidencia,
    buscarIndiceIncidencia,
} = require("../utils/helpers");


// Arreglo en memoria donde se guardan TODAS las incidencias
const incidencias = [];


// PUNTO 2: REGISTRAR INCIDENCIA

const registrarIncidencia = (req, res) => {

    const { empleado, area, descripcion, prioridad } = req.body;

    // Verificar que no falte ningún campo
    if (!empleado || !area || !descripcion || !prioridad) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    // Verificar que no haya cadenas vacías
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

    // Verificar que la prioridad sea válida
    if (
        prioridad !== "Alta" &&
        prioridad !== "Media" &&
        prioridad !== "Baja"
    ) {
        return res.status(400).json({
            mensaje: "La prioridad debe ser Alta, Media o Baja"
        });
    }

    // Crear nueva incidencia
    const nuevaIncidencia = {
        id: incidencias.length + 1,
        empleado: empleado,
        area: area,
        descripcion: descripcion,
        prioridad: prioridad,
        estado: "Pendiente"
    };

    // Guardar en el arreglo
    incidencias.push(nuevaIncidencia);

    return res.status(201).json({
        mensaje: "Incidencia registrada correctamente",
        incidencia: nuevaIncidencia
    });
};


// ================================
// PUNTO 3: LISTAR INCIDENCIAS
// ================================

const listarIncidencias = (req, res) => {
    return res.status(200).json(incidencias);
};



// PUNTO 4: BUSCAR POR ID

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


// PUNTO 5: CAMBIAR ESTADO


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

    const estadoNuevo = validarEstado(req.body.estado);

    if (estadoNuevo === null) {
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

// PUNTO 6: ELIMINAR INCIDENCIA

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


// Exportamos todas las funciones del controlador
module.exports = {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstado,
    eliminarIncidencia
};
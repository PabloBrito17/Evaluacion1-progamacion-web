// Arreglo en memoria donde se guardan las incidencias.
const incidencias = [];

const registrarIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad } = req.body;

    if (!empleado || !area || !descripcion || !prioridad) {
        return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    if (empleado.trim() === "" || area.trim() === "" || descripcion.trim() === "" || prioridad.trim() === "") {
        return res.status(400).json({ mensaje: "Ningún campo puede estar vacío" });
    }

    const prioridadNormalizada = prioridad.trim().toLowerCase();
    const prioridadesValidas = ["alta", "media", "baja"];

    if (!prioridadesValidas.includes(prioridadNormalizada)) {
        return res.status(400).json({ mensaje: "La prioridad debe ser Alta, Media o Baja" });
    }

    const nuevaIncidencia = {
        id: incidencias.length + 1,
        empleado: empleado.trim(),
        area: area.trim(),
        descripcion: descripcion.trim(),
        prioridad: prioridadNormalizada.charAt(0).toUpperCase() + prioridadNormalizada.slice(1),
        estado: "Pendiente"
    };

    incidencias.push(nuevaIncidencia);
    return res.status(201).json({ mensaje: "Incidencia registrada correctamente", incidencia: nuevaIncidencia });
};

// Punto 7: los resultados se calculan dinámicamente desde el arreglo.
const obtenerEstadisticas = (req, res) => {
    const estados = ["pendientes", "enProceso", "resueltas", "canceladas"];
    const estadisticasIniciales = estados.reduce(
        (acumulado, estado) => ({ ...acumulado, [estado]: 0 }),
        { totalIncidencias: 0 }
    );

    const estadisticas = incidencias.reduce((acumulado, incidencia) => {
        const estadoNormalizado = incidencia.estado.trim().toLowerCase();
        const claveEstado = {
            pendiente: "pendientes",
            "en proceso": "enProceso",
            resuelta: "resueltas",
            cancelada: "canceladas"
        }[estadoNormalizado];

        return {
            ...acumulado,
            totalIncidencias: acumulado.totalIncidencias + 1,
            ...(claveEstado && { [claveEstado]: acumulado[claveEstado] + 1 })
        };
    }, estadisticasIniciales);

    return res.status(200).json(estadisticas);
};

module.exports = { registrarIncidencia, obtenerEstadisticas };

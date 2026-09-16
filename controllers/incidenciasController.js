//registrar incidencia: controller


// arreglo para guardar las incidencias
const incidencias = [];


/*q hacer:
 Recibir datos
 Falta algún campo
Hay cadenas vacías
Prioridad es Alta, Media o Baja?
Crear incidencia
 Guardar
Responder
*/

const registrarIncidencia = (req, res) => {
    //defino los campos que espero recibir
    const { empleado, area, descripcion, prioridad } = req.body;

    //verifico que no falte ningún campo
    if (!empleado || !area || !descripcion || !prioridad) {
            return res.status(400).json({
            mensaje: "todos los campos son obligatorios"
        });
}

    //ver q no hay cadenas vacías 
        if (empleado.trim() === "" || 
        area.trim() === "" || 
        descripcion.trim() === "" || 
        prioridad.trim() === "") {
        return res.status(400).json({
            mensaje: "ningún campo puede estar vacío"
    });
}

    // Verifico q la prioridad sea válida
    if (
        prioridad !== "Alta" &&
        prioridad !== "Media" &&
        prioridad !== "Baja"
    ) {
        return res.status(400).json({
            mensaje: "La prioridad debe ser Alta, Media o Baja"
        });
    }

    // Crear la nueva incidencia
    const nuevaIncidencia = {
    id: incidencias.length + 1,
    empleado: empleado,
    area: area,
    descripcion: descripcion,
    prioridad: prioridad,
    estado: "Pendiente"
};

//guardar la incidencia en el array con push
incidencias.push(nuevaIncidencia);

//Responder con la incidencia creada
return res.status(201).json({
    mensaje: "Incidencia registrada correctamente",
    incidencia: nuevaIncidencia
});

};
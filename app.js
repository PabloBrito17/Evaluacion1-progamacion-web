const express = require("express");
const incidenciasRoutes = require("./routes/incidencias");

const app = express();
const PORT = process.env.PORT || 3000;

// Permite recibir JSON
app.use(express.json());

// Rutas de incidencias
app.use("/incidencias", incidenciasRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
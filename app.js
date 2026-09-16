const express = require('express');
const incidenciasRoutes = require('./routes/incidencias');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/incidencias', incidenciasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
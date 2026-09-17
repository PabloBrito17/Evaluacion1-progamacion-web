const express = require("express");
const incidenciasRouter = require("./routes/incidencias");

const app = express();
const puerto = process.env.PORT || 3000;

app.use(express.json());
app.use("/incidencias", incidenciasRouter);

app.listen(puerto, () => {
    console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});

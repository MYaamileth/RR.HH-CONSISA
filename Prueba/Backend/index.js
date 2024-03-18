
//si tienen problemas de authentication con la base de datos, usen el codigo de abajo en su linea de comandos
//ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY "1234proyecto_";

import mysql from "mysql2";
import express from "express";
import cors from 'cors';
import apiRoutes from "./apiRoutes.js";

// Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "consisa",
});

// Manejo de eventos de conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err.message);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

// Manejo de errores en la conexión
db.on("error", (err) => {
  console.error("Error en la conexión a la base de datos:", err.message);
});


const app = express();

app.use(express.json());
app.use(cors());

// Usa las rutas definidas en apiRoutes
app.use(apiRoutes);

const port = 3001;

app.listen(port, () => {
  console.log(`Servidor backend conectado en el puerto ${port}`);
});


export default db;

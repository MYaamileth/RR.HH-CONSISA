import express from "express";
import cors from 'cors';
import db from "./index.js";
import apiRoutes from "./apiRoutes.js";


const app = express();

app.use(express.json());
app.use(cors());

// Usa las rutas definidas en apiRoutes
app.use(apiRoutes);

const port = 3001;

app.listen(port, () => {
  console.log(`Servidor backend conectado en el puerto ${port}`);
});


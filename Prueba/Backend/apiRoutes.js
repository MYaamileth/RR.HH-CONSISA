import express from "express";
import db from "./index.js"; 

const router = express.Router();

// Endpoint para crear un nuevo usuario
router.post("/creacionUsuario", async (req, res) => {
 
    // Extraer datos del cuerpo de la solicitud
    const { 
        Id_estado, 
        Id_rol, 
        Id_puesto, 
        Usuario, 
        Nombre_Completo_Usuario, 
        Contraseña, 
        Fecha_Ultima_Conexion, 
        Correo_electronico, 
        Fecha_vencimiento, 
        Creado_por, 
        Modificado_por, 
        Fecha_creacion, 
        Fecha_modificacion,
        Primer_ingreso
   
    } = req.body;
  
    /*Validar que todos los campos requeridos estén presentes
    if (!Id_estado || !Id_rol || !Id_puesto || !Usuario || !Contraseña || !Primer_ingreso || !Correo_electronico) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }*/
  
    // Crear la consulta SQL
    const query = `INSERT INTO tbl_ms_usuario (Id_estado, Id_rol, Id_puesto, Usuario, Nombre_Completo_Usuario, Contraseña, Fecha_Ultima_Conexion, Correo_electronico, Fecha_vencimiento, Creado_por, Modificado_por, Fecha_creacion, Fecha_modificacion, Primer_ingreso) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    // Ejecutar la consulta
    db.query(query, [
        Id_estado, 
        Id_rol, 
        Id_puesto, 
        Usuario, 
        Nombre_Completo_Usuario, 
        Contraseña, 
        Fecha_Ultima_Conexion, 
        Correo_electronico, 
        Fecha_vencimiento, 
        Creado_por, 
        Modificado_por, 
        Fecha_creacion, 
        Fecha_modificacion,
        Primer_ingreso
  
    ], (err, data) => {
        if (err) {
            console.error("Error al insertar usuario:", err);
            return res.status(500).json({ error: "Error al insertar usuario en la base de datos" });
        }
        return res.json({ message: "Usuario insertado correctamente" });
    });
  });


// Endpoint para obtener usuarios
router.get("/traerUsuarios", (req, res) => {
    const query = 'SELECT * FROM tbl_ms_usuario';
    db.query(query, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json(data);
    });
});

// Endpoint para actualizar un usuario
router.put("/actualizarUsuario", (req, res) => {
  // Implementa la lógica para actualizar un usuario usando la conexión a la base de datos
});

// Endpoint para obtener roles
router.get("/obtenerRoles", (req, res) => {
    const query = 'SELECT Rol FROM  tbl_ms_rol';
    db.query(query, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json(data);
    });});

// Endpoint para obtener puestos
router.get("/obtenerPuestos", (req, res) => {
    const query = 'SELECT Nombre_puesto FROM  tbl_puesto';
    db.query(query, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json(data);
    });});

export default router;

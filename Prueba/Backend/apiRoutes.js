import express from "express";
import db from "./index.js"; 

const router = express.Router();

// Endpoint para crear un nuevo usuario
router.post("/creacionUsuario", async (req, res) => {
 
    // Extraer datos del cuerpo de la solicitud
    const { 
        Id_Estado, 
        Id_Rol, 
        Id_Puesto,
        Id_Empleado, 
        Usuario, 
        Nombre_Completo_Usuario, 
        Contraseña, 
        Primer_ingreso,
        Fecha_Ultima_Conexion, 
        Correo_electronico, 
        Fecha_vencimiento, 
        Creado_por, 
        Modificado_por, 
        Fecha_creacion, 
        Fecha_modificacion
       
   
    } = req.body;

  
    // Crear la consulta SQL
    const query = `INSERT INTO tbl_ms_usuario (Id_Estado, Id_Rol, Id_Puesto,Id_Empleado, Usuario, Nombre_Completo_Usuario, Contraseña, Primer_ingreso, Fecha_Ultima_Conexion, Correo_electronico, Fecha_vencimiento, Creado_por, Modificado_por, Fecha_creacion, Fecha_modificacion ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    // Ejecutar la consulta
    db.query(query, [
        Id_Estado, 
        Id_Rol, 
        Id_Puesto, 
        Id_Empleado,
        Usuario, 
        Nombre_Completo_Usuario, 
        Contraseña, 
        Primer_ingreso,
        Fecha_Ultima_Conexion, 
        Correo_electronico, 
        Fecha_vencimiento, 
        Creado_por, 
        Modificado_por, 
        Fecha_creacion, 
        Fecha_modificacion
        
  
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


// Endpoint para obtener un usuario específico por su ID
router.get("/idUsuario/:id_usuario", async (req, res) => {
  try {
    const userId = req.params.id_usuario;

    // Consulta SQL para seleccionar un usuario por su ID
    const query = 'SELECT * FROM tbl_ms_usuario WHERE Id_usuario = ?';

    // Ejecutar la consulta SQL con el ID del usuario como parámetro
    db.query(query, userId, (err, data) => {
      if (err) {
        // Manejar el error si ocurre durante la ejecución de la consulta
        console.error("Error al obtener usuario por ID:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
      if (data.length === 0) {
        // Manejar el caso en que no se encuentre ningún usuario con el ID proporcionado
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      // Devolver el primer usuario encontrado en formato JSON
      return res.json(data[0]);
    });
  } catch (error) {
    // Capturar y manejar cualquier error que ocurra durante el proceso
    console.error("Error al obtener usuario por ID:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Endpoint para actualizar un usuario
router.put("/editarUsuario/:id_usuario", async (req, res) => {
  try {
    const userId = req.params.id_usuario;
    const {
      Id_Estado,
      Id_Rol,
      Id_Puesto,
      Usuario,
      Nombre_Completo_Usuario,
      Contraseña,
      Correo_electronico
    
    } = req.body;

    // Construir la consulta SQL de actualización
    const query = `
      UPDATE tbl_ms_usuario 
      SET 
          Id_Estado=?,
          Id_Rol=?, 
          Id_Puesto=?,
          Usuario = ?, 
          Nombre_Completo_Usuario = ?, 
          Contraseña = ?, 
          Correo_electronico = ? 
        
      WHERE Id_usuario = ?`; // Usar el ID del usuario en la cláusula WHERE

    // Ejecutar la consulta SQL
    db.query(
      query,
      [
        Id_Estado,
        Id_Rol, 
        Id_Puesto, 
        Usuario,
        Nombre_Completo_Usuario,
        Contraseña,
        Correo_electronico,

       
        userId // Pasar el ID del usuario como parámetro en la consulta
      ],
      (err, data) => {
        if (err) {
          console.error("Error al actualizar usuario:", err);
          return res.status(500).json({ error: "Error al actualizar usuario en la base de datos" });
        }
        return res.json({ message: "Usuario actualizado correctamente" });
      }
    );
  } catch (error) {
    console.error("Error al editar usuario:", error);
    return res.status(500).json({ error: "Error al editar usuario en la base de datos" });
  }
});

// Endpoint para deshabilitar un usuario por su ID
router.delete("/deshabilitarUsuario/:id_usuario", async (req, res) => {
  try {
    const userId = req.params.id_usuario;// Obtiene el ID del usuario de los parámetros de la solicitud.

    // Consulta SQL para deshabilitar un usuario por su ID
    const query = `
      UPDATE tbl_ms_usuario 
      SET Id_Estado = 0
      WHERE Id_usuario = ?`; // Usar el ID del usuario en la cláusula WHERE

    // Ejecutar la consulta SQL
    db.query(
      query,
      [userId], // Pasar el ID del usuario como parámetro en la consulta
      (err, result) => {
        if (err) {
          console.error("Error al deshabilitar usuario:", err);
          return res.status(500).json({ error: "Error al deshabilitar usuario en la base de datos" });
        }
        if (result.affectedRows === 0) {
          // Manejar el caso en que no se encuentre ningún usuario con el ID proporcionado
          return res.status(404).json({ error: "Usuario no encontrado para deshabilitar" });
        }
        // Devolver un mensaje de éxito si se deshabilita el usuario correctamente
        return res.json({ message: "Usuario deshabilitado correctamente" });
      }
    );
  } catch (error) {
    console.error("Error al deshabilitar usuario:", error);
    return res.status(500).json({ error: "Error al deshabilitar usuario en la base de datos" });
  }
});





//SELECT A OTROS DATOS DE OTRAS TABLAS NECESARIAS PARA EL CRUD USUARIO

// Endpoint para obtener roles
router.get("/obtenerRoles", (req, res) => {
  const query = 'SELECT Id_Rol, Rol FROM tbl_ms_rol';
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(data);
  });});

// Endpoint para obtener puestos
router.get("/obtenerPuestos", (req, res) => {
const query = 'SELECT Id_Puesto, Nombre_puesto FROM tbl_puesto'; // Modificado para seleccionar Id_puesto junto con Nombre_puesto
db.query(query, (err, data) => {
  if (err) {
    return res.status(500).json({ error: err.message });
  }
  return res.json(data);
});
});
export default router;




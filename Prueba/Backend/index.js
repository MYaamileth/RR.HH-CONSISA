import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();


// Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "consisa",
});

app.use(express.json())
app.use(cors())

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

// Puerto del servidor
app.listen(3001, () => {
  console.log("Servidor backend conectado en el puerto 3001");
});



// Si tienen problemas de autenticación con la base de datos, usen el siguiente código en su línea de comandos:
// ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY "1234proyecto_";

// Rutas
app.get("/", (req, res) => {
  res.json("HOOOLISSS, HABLA EL BACKEND");
});

// Mandar datos del empleado a la tabla tbl_ms_usuario.  
app.post("/creacionUsuario", (req, res) => {
    const Id_estado= req.body.Id_estado;
    const Id_rol = req.body.Id_rol;
    const Id_puesto= req.body.Id_puesto;
    const Usuario= req.body.Usuario;
    const Nombre_Completo_Usuario= req.body.Nombre_Completo_Usuario;
    const Contraseña= req.body.Contraseña;
    const Fecha_Ultima_Conexion= req.body.Fecha_Ultima_Conexion;
    const Primer_ingreso= req.body.Primer_ingreso;
    const Correo_electronico= req.body.Correo_electronico;
    const Fecha_vencimiento= req.body.Fecha_vencimiento;
    //  const token= req.body.Token;
    const Creado_por= req.body.Creado_por;
    const Modificado_por= req.body.Modificado_por;
    const Fecha_creacion= req.body.Fecha_creacion;
    const Fecha_modificacion= req.body.Fecha_modificacion;

    const query = `INSERT INTO tbl_ms_usuario (Id_estado, Id_rol, Id_puesto,Usuario, Nombre_Completo_Usuario, Contraseña,Fecha_Ultima_Conexion,Primer_ingreso,Correo_electronico,
      Fecha_vencimiento,Creado_por,Modificado_por,Fecha_creacion,Fecha_modificacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

      db.query(query, [Id_estado, Id_rol, Id_puesto, Usuario, Nombre_Completo_Usuario, Contraseña, Fecha_Ultima_Conexion, Primer_ingreso,Correo_electronico,Fecha_vencimiento, 
        Creado_por, Modificado_por,Fecha_creacion, Fecha_modificacion], (err, data) => {
      if (err) return res.json(err);
      return res.json("USUARIO INSERTADO CORRECTAMENTE");
    });
  });


// Traer datos de la tabla tbl_ms_usuario
app.get("/traerUsuarios", (req, res) => {
  const query = 'SELECT * FROM tbl_ms_usuario';
  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(data);
  });
});


//modificar que actualice por nombre e vez de id
/*Actualizar usuario,recibe  el nombre del usuario.*/
app.put("/actualizarUsuario", (req, res) => {
  const id = req.params.id; // Obtiene el ID del usuario a modificar de la ruta

  const Usuario= req.body.Usuario;
  const Nombre_Completo_Usuario= req.body.Nombre_Completo_Usuario;
  const Contraseña= req.body.Contraseña;
  const Fecha_Ultima_Conexion= req.body.Fecha_Ultima_Conexion;
  const Primer_ingreso= req.body.Primer_ingreso;
  const Correo_electronico= req.body.Correo_electronico;
  const Fecha_vencimiento= req.body.Fecha_vencimiento;
  //  const token= req.body.Token;
  const Creado_por= req.body.Creado_por;
  const Modificado_por= req.body.Modificado_por;
  const Fecha_creacion= req.body.Fecha_creacion;
  const Fecha_modificacion= req.body.Fecha_modificacion;


  const query = `UPDATE tbl_ms_usuario SET 
    Usuario = ?, 
    Nombre_Completo_Usuario = ?, 
    Contraseña = ?, 
    Fecha_Ultima_Conexion = ?, 
    Primer_ingreso = ?, 
    Correo_electronico = ?, 
    Fecha_vencimiento = ?, 
    Token = ?, 
    Creado_por = ?, 
    Modificado_por = ?, 
    Fecha_creacion = ?, 
    Fecha_modificacion = ? 
    WHERE id = ?`;

  db.query(
    query,
    [
      Usuario,
      Nombre_Completo_Usuario,
      Contraseña,
      Fecha_Ultima_Conexion,
      Primer_ingreso,
      Correo_electronico,
      Fecha_vencimiento,
      Creado_por,
      Modificado_por,
      Fecha_creacion,
      Fecha_modificacion,
      id, // Se incluye el ID del usuario como último parámetro
    ],
    (err, data) => {
      if (err) return res.json(err);
      return res.json("Usuario modificado correctamente");
    }
  );
});


/*Eliminar usuario,recibe de parametro el id del usuario.*/
app.delete("/tbl_ms_usuario/:id", (req, res) => {
  const id = req.params.id; // Obtiene el ID del usuario a eliminar de la ruta

  const query = `DELETE FROM tbl_ms_usuario WHERE id = ?`;

  db.query(query, [id], (err, data) => {
    if (err) return res.json(err);
    if (data.affectedRows === 0) return res.json("Usuario no encontrado");
    return res.json("Usuario eliminado correctamente");
  });
});


// OBTENER USUARIO POR ID
/*
app.get("/usuarios/:id", (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM tbl_empleado WHERE id = ?`;

  db.query(query, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.json(data[0]);
  });
});
 */
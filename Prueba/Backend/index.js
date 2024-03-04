import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();


// Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234proyecto_",
  database: "prueba",
});

app.use(express.json())
app.use(cors())

// Manejo de eventos de conexión a la base de datos, backend y errores al momento de conectar la base de datos.
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

db.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err);
});

app.listen(8800, () => {
  console.log("Conectado al backend en el puerto 8800");
});


// Si tienen problemas de autenticación con la base de datos, usen el siguiente código en su línea de comandos:
// ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY "1234proyecto_";

// Ruta para el home
app.get("/", (req, res) => {
  res.json("HOOOLISSS, HABLA EL BACKEND");
});



// BD DE PRUEBA, LA RUTA DEBE DE PASAR AL SIGUIENTE APP.POST
app.post("/creacionUsuario", (req, res) => {
  //DESPUES DEL IGUAL TIENE QUE IR IGUAL A COMO ESTA ESCRITO EL CAMPO EN LA BASE DE DATOS
    const Nombre_empleado= req.body.Nombre_empleado;
    const Correo = req.body.Correo;
    const query = `INSERT INTO tbl_empleado (Nombre_empleado, Correo) VALUES (?,?)`;

      db.query(query, [Nombre_empleado, Correo], (err, data) => {
      if (err) return res.json(err);
      return res.json("USUARIO INSERTADO CORRECTAMENTE");
    });
  });


// BD DE PRUEBA, LA RUTA DEBE DE PASAR AL SIGUIENTE APP.get
app.get("/traerUsuarios", (req, res) => {
  const query = 'SELECT * FROM tbl_empleado';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});






// Mandar datos del empleado a la tabla tbl_ms_usuario.  AQUI DEBE DE IR LA RUTA DE  creacionUsuario
app.post("/", (req, res) => {
  //DESPUES DEL IGUAL TIENE QUE IR IGUAL A COMO ESTA ESCRITO EL CAMPO EN LA BASE DE DATOS
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
app.get("/Usuario", (req, res) => {
  const query = 'SELECT * FROM tbl_ms_usuario';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

/*Actualizar usuario,recibe de parametro el id del usuario.*/
app.put("/tbl_ms_usuario/:id", (req, res) => {
  const id = req.params.id; // Obtiene el ID del usuario a modificar de la ruta

  const nombreUsuario = req.body.Usuario;
  const nombreCompletoUsuario = req.body.Nombre_Completo_Usuario;
  const contraseña = req.body.Contraseña;
  const fecha_Ultima_Conexion = req.body.Fecha_Ultima_Conexion;
  const primer_Ingreso = req.body.Primer_ingreso;
  const correo_Electronico = req.body.Correo_electronico;
  const fecha_Vencimiento = req.body.Fecha_vencimiento;
  const token = req.body.Token;
  const creado_Por = req.body.Creado_por;
  const modificado_Por = req.body.Modificado_por;
  const fecha_Creacion = req.body.Fecha_creacion;
  const fecha_Modificacion = req.body.Fecha_modificacion;

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
      usuario,
      nombreCompletoUsuario,
      contraseña,
      fecha_Ultima_Conexion,
      primer_Ingreso,
      correo_Electronico,
      fecha_Vencimiento,
      token,
      creado_Por,
      modificado_Por,
      fecha_Creacion,
      fecha_Modificacion,
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




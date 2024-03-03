import express from "express";
import mysql from "mysql";

const app = express();

// Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234proyecto_",
  database: "consisa",
});

// Si tienen problemas de autenticación con la base de datos, usen el siguiente código en su línea de comandos:
// ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY "1234proyecto_";

// Ruta para el home
app.get("/", (req, res) => {
  res.json("HOOOLISSS, HABLA EL BACKEND");
});


app.use(express.json());
// Traer datos de la tabla tbl_ms_usuario
app.get("/TraerUsuarios", (req, res) => {
  const query = 'SELECT * FROM tbl_ms_usuario';
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// Mandar datos del empleado a la tabla tbl_ms_usuario
app.post("/tbl_ms_usuario", (req, res) => {
    //¿VAN LAS LLAVES PRIMARIAS?
    //DESPUES DEL IGUAL TIENE QUE IR IGUAL A COMO ESTA ESCRITO EL CAMPO EN LA BASE DE DATOS
  const usuario= req.body.Usuario;
  const nombreCompletoUsuario= req.body.Nombre_Completo_Usuario;
  const contraseña= req.body.Contraseña;
  const fecha_Ultima_Conexion= req.body.Fecha_Ultima_Conexion;
  const primer_Ingreso= req.body.Primer_ingreso;
  const correo_Electronico= req.body.Correo_electronico;
  const fecha_Vencimiento= req.body.Fecha_vencimiento;
  const token= req.body.Token;
  const creado_Por= req.body.Creado_por;
  const modificado_Por= req.body.Modificado_por;
  const fecha_Creacion= req.body.Fecha_creacion;
  const fecha_Modificacion= req.body.Fecha_modificacion;
 
  const query = `INSERT INTO tbl_ms_usuario (Usuario, Nombre_Completo_Usuario, Contraseña,Fecha_Ultima_Conexion,Primer_ingreso,Correo_electronico,
    Fecha_vencimiento,Token,Creado_por,Modificado_por,Fecha_creacion,Fecha_modificacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

  db.query(query, [usuario, nombreCompletoUsuario,contraseña,fecha_Ultima_Conexion,primer_Ingreso,correo_Electronico,fecha_Vencimiento,
    token,creado_Por, modificado_Por,fecha_Creacion, fecha_Modificacion], (err, data) => {
    if (err) return res.json(err);
    return res.json("SE PUEDE MANDAR CORRECTAMENTE");
  });
});

app.listen(8800, () => {
  console.log("Conectado al backend");
});

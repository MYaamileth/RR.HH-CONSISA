import mysql from "mysql";

//Conexion con la base de datos
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234proyecto_',
    database: 'prueba',

})
//si tienen problemas de authentication con la base de datos, usen el codigo de abajo en su linea de comandos
//ALTER USER "root"@"localhost" IDENTIFIED WITH mysql_native_password BY "1234proyecto_";

app.get("/", (req, res) => {
    res.json("HOOOLISSS, HABLA EL BACKEND")
   
   })
   
   //traemos los atos de la tabla que deseamos
   app.get("/tbl_empleado", (req, res) => {
   const query = "select * from tbl_empleado" 
       db.query(query, (err,data) => {
           if (err) return res.json(err)
           return res.json(data)
       })  
   })
   
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './mantenimientoUsuario.css';

const MantenimientoUsuario = () => {
    const [cargando, setCargando] = useState(false);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchAllUsuarios = async () => {
            try {
                const res = await axios.get('http://localhost:8800/Usuario');
                setUsuarios(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllUsuarios();
    }, []);

    return (
        <div data-maintenance-usuario="true" className="maintenance-container">
            {cargando ? (
                <div className="loading">Cargando...</div>
            ) : (
                <>
                    <main>
                        <section className="formulario">
                            <div className="form-container">
                              <h1>MANTENIMIENTO DE USUARIOS</h1>
                              <p></p>
                                <div className="input-container">
                                    <input type="text" placeholder="ID Usuario" className="textbox" />
                                    <input type="text" placeholder="Usuario" className="textbox" />
                                    <input type="text" placeholder="Nombre Completo" className="textbox" />
                                </div>

                                <div className="input-container">
                                    <div className="flex-row">
                                        <input type="text" placeholder="Contraseña" className="textbox" />
                                        <input type="text" placeholder="Email" className="textbox" />
                                        <div className="checkbox-container">
                                            <div className="estado-container">
                                                <label htmlFor="estado_usuario">Estado: </label>
                                                <input type="checkbox" id="estado_usuario" className="input" />
                                            </div>
                                            <span className="estado-label">Activo</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="input-container">
                                    <div className="flex-row">
                                            <label>Puesto:
                                              <select className="inputPuesto">
                                                  <option value="administrador">Gerente de IT</option>
                                                  <option value="usuario">Administrador de BD</option>
                                                  <option value="agregarRol">Agregar Rol</option>
                                              </select>
                                            </label>

                                            <label>Rol:
                                              <select className="inputRol">
                                                  <option value="administrador">Administrador</option>
                                                  <option value="usuario">Usuario</option>
                                                  <option value="agregarRol">Agregar Rol</option>
                                              </select>
                                            </label>
                                    </div>
                                </div>

                                <div className="form-buttons">
                                    <button className="submit">
                                        Crear
                                    </button>
                                    <button className="submit">
                                        Editar
                                    </button>
                                    <button className="submit">
                                        Eliminar
                                    </button>
                                    <button className="submit">
                                        Revisar
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section className="tabla-usuarios">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                    <th>ID Usuario</th>
                                    <th>Usuario</th>
                                    <th>Nombre Completo de Usuario</th>
                                    <th>Contraseña</th>
                                    <th>Fecha Vencimiento De Contraseña</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((usuario) => (
                                        <tr key={usuario.id_usuario}>
                                            <td>{usuario.usuario}</td>
                                            <td>{usuario.nombreCompletoUsuario}</td>
                                            <td>{usuario.contrasena}</td>
                                            <td>{usuario.fecha_Ultima_Conexion}</td>
                                            <td>{usuario.primer_Ingreso}</td>
                                            <td>{usuario.correo_Electronico}</td>
                                            <td>{usuario.fecha_Vencimiento}</td>
                                            <td>{usuario.creado_Por}</td>
                                            <td>{usuario.fecha_Creacion}</td>
                                            <td>{usuario.modificado_Por}</td>
                                            <td>{usuario.fecha_Modificacion}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </main>
                </>
            )}
        </div>
    );
};

export default MantenimientoUsuario;

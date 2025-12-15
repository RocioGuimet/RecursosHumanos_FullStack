import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AgregarEmpleado() {
    const [errores, setErrores] = useState({})
    const [formularioEnviado, setFormularioEnviado] = useState(false)
    const urlBase = "http://localhost:8080/rh-app/empleados";
    let Navegacion = useNavigate();

    const [empleado, setEmpleado]=useState({
        nombre:"",
        departamento:"",
        sueldo:""
    })

    const {nombre, departamento, sueldo} = empleado

    const onInputChange = (e) => {
        //Spread Operator ... (expandir atributos)
        setEmpleado({...empleado, [e.target.name]: e.target.value})
        if (errores[e.target.name]) {
            setErrores({...errores, [e.target.name]: ""})
    }
    }

    const validarFormulario = () => {
        const errores = {}
        //Validar nombre, departamento y sueldo
        if (!nombre.trim()){
            errores.nombre = "El nombre es requerido"
        }
        if (!departamento.trim()){
            errores.departamento = "El departamento es requerido"
        }
        if (!sueldo || sueldo <= 0) {
            errores.sueldo = "El sueldo debe ser mayor a 0"
        }

        setErrores (errores)
        return Object.keys(errores).length === 0
    }

    //Petición al Backend
    const onSubmit = async (e) => {
        e.preventDefault();
        setFormularioEnviado(true)

        if (!validarFormulario()){
            return
        }

        try{
            await axios.post(urlBase, empleado);
            alert("Empleado creado correctamente");
            //Redirigimos a la página de inicio
            Navegacion('/');
        } catch (error) {
            console.error("Error creando empleado: "+ error);
            alert("Error al crear empleado");
        }
    }

  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Agregar empleado</h3>
        </div>

        {Object.keys(errores).length > 0 && (
            <div className="alert alert-warning">
                Por favor, corrija los campos en rojo
            </div>
        )}

        <form onSubmit={(e)=>onSubmit(e)}>
        <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} id="nombre" name="nombre"
            value={nombre} onChange={(e)=>onInputChange(e)}/>
            {formularioEnviado && errores.nombre && (
                <div className="invalid-feedback">{errores.nombre}</div>
            )}
        </div>
        <div className="mb-3">
            <label htmlFor="departamento" className="form-label">Departamento</label>
            <input type="text" className={`form-control ${errores.departamento ? 'is-invalid' : ''}`} id="departamento" name="departamento"
            value={departamento} onChange={(e)=>onInputChange(e)}/>
            {formularioEnviado && errores.departamento && (
                <div className="invalid-feedback">{errores.departamento}</div>
            )}
        </div>
        <div className="mb-3">
            <label htmlFor="sueldo" className="form-label">Sueldo</label>
            <input type="number" step="any" className={`form-control ${errores.sueldo ? 'is-invalid' : ''}`} id="sueldo" name="sueldo"
            value={sueldo} onChange={(e)=>onInputChange(e)}/>
            {formularioEnviado && errores.sueldo && (
                <div className="invalid-feedback">{errores.sueldo}</div>
            )}
        </div>
        <div className='text-center'>
        <button type="submit" className="btn btn-warning btn-sn me-3">Agregar</button>
        <a href='/'className='btn btn-danger btn-sm'>Regresar</a>
        </div>
        </form>
    </div>
  )
}

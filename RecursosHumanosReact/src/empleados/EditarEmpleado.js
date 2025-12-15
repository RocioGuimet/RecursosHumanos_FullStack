import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditarEmpleado() {
    const [errores, setErrores] = useState({})
    const [formularioEnviado, setFormularioEnviado] = useState(false)
    const urlBase = "http://localhost:8080/rh-app/empleados";
    let Navegacion = useNavigate();
    const {id} = useParams();

    const [empleado, setEmpleado]=useState({
        nombre:"",
        departamento:"",
        sueldo:""
    })

    const {nombre, departamento, sueldo} = empleado

    const validarFormulario = () => {
        const nuevosErrores = {}
        //Validar nombre, departamento y sueldo
        if (!nombre.trim()){
            nuevosErrores.nombre = "El nombre es requerido"
        }
        if (!departamento.trim()){
            nuevosErrores.departamento = "El departamento es requerido"
        }
        if (!sueldo || sueldo <= 0) {
            nuevosErrores.sueldo = "El sueldo debe ser mayor a 0"
        }

        setErrores (nuevosErrores)
        return Object.keys(nuevosErrores).length === 0
    }

    const cargarEmpleado = useCallback(async () => {
        try {
            const resultado = await axios.get(`${urlBase}/${id}`)
            setEmpleado(resultado.data);
        } catch (error) {
            console.error("Error cargando empleado:", error);
            alert("❌ Error al cargar los datos del empleado");
        }
    }, [id, urlBase]); // Dependencias: id y urlBase

    useEffect(()=>{
        cargarEmpleado();
    },[cargarEmpleado])

    const onInputChange = (e) => {
        //Spread Operator ... (expandir atributos)
        setEmpleado({...empleado, [e.target.name]: e.target.value})
        if (errores[e.target.name]) {
            setErrores({...errores, [e.target.name]: ""})
    }
    }
    //Petición al Backend
    const onSubmit = async (e) => {
        e.preventDefault();
        setFormularioEnviado(true)

        if (!validarFormulario()){
            return
        }

        try {
            await axios.put(`${urlBase}/${id}`, empleado);
            alert("Empleado actualizado correctamente");
            //Redirigimos a la página de inicio
            Navegacion('/');
        } catch (error) {
            console.error("Error al actualizar empleado: " + error);
            alert("Error al actualizar empleado");
        }
    }

  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Editar empleado</h3>
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
        <button type="submit" className="btn btn-warning btn-sn me-3">Guardar</button>
        <a href='/'className='btn btn-danger btn-sm'>Regresar</a>
        </div>
        </form>
    </div>
  )
}

import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


const FormTarea = () => {

    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext)    
    const {proyecto} = proyectosContext

    //Obtener función contecxt
    const tareasContext = useContext(tareaContext)
    const {tareaseleccionada, errortarea, 
        agregarTarea, validarTarea, obtenerTareas,actualizarTarea,limpiarTarea} = tareasContext

    //effect que detecta si hay una tarea seleccionada
    useEffect(()=>{
        if(tareaseleccionada!== null){
            guardarTarea(tareaseleccionada)
        }else{
            guardarTarea({
                nombre:''
            })            
        }
    },[tareaseleccionada])


    //State del formulario
    const [ tarea, guardarTarea] = useState({
        nombre: '',
    })

    //Extraet el nombre del proyeto
    const {nombre} = tarea

    //Si no hay proyecto seleccinado
    if(!proyecto) return null;

    //Array destrusturing para extraer el proyecto actual
    const [proyectoActual] = proyecto

    //Leer los valores del formulario
    const handleChange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    //
    const onSubmit = e =>{
        e.preventDefault()

        //validar 
        if(nombre.trim() === ''){
            validarTarea()
            return
        }

        //Revisa si es adición o nueva tarea
        if(tareaseleccionada === null){
                    //agregar nueva tareas
            tarea.proyectoId = proyectoActual.id
            tarea.estado = false
            agregarTarea(tarea)
        }else{
            actualizarTarea(tarea)
            limpiarTarea()
        }


        //pasar la validación



        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id)


        //reiniciar el formulario

        guardarTarea({
            nombre: ''
        })

    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."        
                        name="nombre"
                        value = {nombre}
                        onChange={handleChange}
                    />
                </div>

                
                <div className="contenedor-input">
                    
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">Nombre de la tarea</p> : null }
        </div>
     );
}
 
export default FormTarea;
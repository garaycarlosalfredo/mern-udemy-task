import React, {useContext} from 'react';


import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Tarea = ({tarea}) => {

    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext)    
    const {proyecto} = proyectosContext

    //Obtener función contecxt
    const tareasContext = useContext(tareaContext)
    const {eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual} = tareasContext

    const [proyectoActual] = proyecto

    //Funbcion que se ejecuta cuando apreta boton eliminar tarea
    const tareaEliminar = id =>(
        eliminarTarea(id),
        obtenerTareas(proyectoActual.id)
    )

    //Función que modifica el estado de las tareas
    const cambiarEstado = tarea=>{
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        cambiarEstadoTarea(tarea)
    }

    //Agregar una tarea actual para editar
    const seleccionarTarea = tarea=>{
        guardarTareaActual(tarea)

    }

    return ( 

        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado
                ?
                <button 
                    type="estado"
                    className="completo"
                    onClick={()=>cambiarEstado(tarea)}
                >Completo</button>
                :
                <button 
                type="estado"
                className="incompleto"
                onClick={()=>cambiarEstado(tarea)}
                >Incompleto</button>
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn bn-primario"
                    onClick={()=> seleccionarTarea(tarea)}
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"   
                    onClick={() => tareaEliminar(tarea.id)}             
                >Eliminar</button>
            </div>

        </li>
     );
}
 
export default Tarea;
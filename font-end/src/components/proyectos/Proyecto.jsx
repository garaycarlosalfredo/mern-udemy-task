import React, {useContext} from 'react';
//Contexto
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import { TAREAS_PROYECTO } from '../../types';

const Proyecto = ({proyecto}) => {

    const proyectosContext = useContext(proyectoContext)
    const {proyectoActual} = proyectosContext

    //Obtener función contecxt
    const tareasContext = useContext(tareaContext)
    const {obtenerTareas} = tareasContext


    //Función para agregar el proyecto actual

    const seleccionarProyecto= id=>{
        proyectoActual(id) //Fijar un proyecto actual
        obtenerTareas(id) // Filtrar las tareas cuando da click
    }

    return (
        <li>
            <button
            type="button"
            className="btn btn-blank"
            onClick={()=>seleccionarProyecto(proyecto.id)}
            >{proyecto.nombre}</button>
        </li>
    );
}
 
export default Proyecto;
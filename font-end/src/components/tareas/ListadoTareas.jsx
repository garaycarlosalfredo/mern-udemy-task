import React, { Fragment, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import Tarea from './Tarea'
import {CSSTransition, TransitionGroup} from 'react-transition-group'



const ListadoTareas = () => {

    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext)    
    const {proyecto, eliminarProyecto} = proyectosContext

    
    //Obtener las  tareas del proyecto
    const tareasContext = useContext(tareaContext)
    const {tareasproyecto} = tareasContext

    //Si no hay poroyecto seleccionado 

    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    //Array distructoring para extrar el proyecto actual
    const [proyectoActual] = proyecto
    

    //Eliminar un proyecto
    const OnClickEliminar=()=>{
        eliminarProyecto(proyectoActual.id)
    }

    return ( 

        <Fragment>
            <h2>Proyeto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto ===0
                ?
                (<li className="tarea"><p>no hay tareas</p></li>)
                : <TransitionGroup>                    
                    {tareasproyecto.map(tarea=>(
                        <CSSTransition                        
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea
                                tarea={tarea}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={OnClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;
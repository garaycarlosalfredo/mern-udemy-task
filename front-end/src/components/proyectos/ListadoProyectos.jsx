import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoProyectos = () => {


    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext)    
    const {proyectos, obtenerProyectos} = proyectosContext

    //Use efect nunca se debe llamar después de un return
    useEffect(()=>{
        obtenerProyectos()
        //Elimina advertencia
        //eslint-disable-next-line
    },[])

    //revisamos si proyectos tienen contenido
    if(proyectos.length === 0) return <p>No hay proyectos</p>
    
    return ( 
        <ul className="listado-proyectos">
            <TransitionGroup>

                {proyectos.map(proyecto => (
                    <CSSTransition                    
                        key={proyecto.id}
                        timeout={200}
                        classNames="proyectos"
                    >                        
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>

     );
}
 
export default ListadoProyectos;
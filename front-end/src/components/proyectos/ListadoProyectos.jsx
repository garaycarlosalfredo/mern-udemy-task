import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import AlertaContext from '../../context/alertas/alertaContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoProyectos = () => {


    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext)    
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext

    //Extraer alerta de state inicial
    const alertaContext = useContext(AlertaContext)    
    const { alerta, mostrarAlerta} = alertaContext

    //Use efect nunca se debe llamar después de un return
    useEffect(()=>{

        //si hay error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        obtenerProyectos()
        //Elimina advertencia
        //eslint-disable-next-line
    },[mensaje])

    //revisamos si proyectos tienen contenido
    if(proyectos.length === 0) return <p>No hay proyectos</p>
    
    return ( 
        <ul className="listado-proyectos">
            <TransitionGroup>

                {alerta ? (<div className= {`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }

                {proyectos.map(proyecto => (
                    <CSSTransition                    
                        key={proyecto._id}
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
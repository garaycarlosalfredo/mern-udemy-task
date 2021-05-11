import React, {useReducer} from 'react';
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'

import {TAREAS_PROYECTO,
        AGREAGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        ESTADO_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA
} from '../../types'


const TareaState = props=>{
    const initialState = {
        tareas:[
            {id: 1, nombre: 'Elegir PLataforma1', estado: true, proyectoId: 1},
            {id: 2, nombre: 'Elegir PLataforma2', estado: true, proyectoId: 2},
            {id: 3, nombre: 'Elegir PLataforma3', estado: false, proyectoId: 3},
            {id: 4, nombre: 'Elegir PLataforma4', estado: true, proyectoId: 4},
            {id: 5, nombre: 'Elegir PLataforma5', estado: false, proyectoId: 5}
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null

    }
    //Crear distpach y state
    const [state,dispatch] = useReducer(TareaReducer,initialState)

    //Crear las funciones


    //Obtener tareas de un proyecto
    const obtenerTareas = proyectoId=>{
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }


    //agregar una tarea al proyecto seleccionado
    const agregarTarea= tarea =>{
        dispatch({
            type: AGREAGAR_TAREA,
            payload: tarea
        })
    }

    const validarTarea = ()=>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tareas por id
    const eliminarTarea = id =>{
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    //Cambia el estado de la tarea

    const cambiarEstadoTarea = tarea =>{
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    //Extrae una tarea para edicion

    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Edita o modifica una trarea

    const actualizarTarea = tarea =>{
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    //Elimina la tarea seleccionada
    const limpiarTarea = ()=>{
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider        
            value={{
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >


            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState
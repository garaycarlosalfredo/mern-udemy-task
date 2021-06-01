import React,{useContext, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../../context/autenticacion/authContext'
import AuthState from '../../context/autenticacion/authState'

const RutaPrivada = ({component : Component, ...props})=>{

    const authContext = useContext(AuthContext)
    const {autenticado, cargando, usuarioAutenticado} = authContext

    useEffect(()=>{
        usuarioAutenticado()
    },[])

    return(
        <Route {...props} render = {props=> !autenticado && !cargando? 
            (<Redirect to="/" />) 
            :
            (<Component {...props}/>) }  //antes de renderear verifico si el usuario está autenticado
        
        />
    )
}

export default RutaPrivada
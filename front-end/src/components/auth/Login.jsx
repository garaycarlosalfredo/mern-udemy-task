import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const Login = (props) => {

    //Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    const authContext = useContext(AuthContext)
    const {mensaje, autenticado, iniciarSesion} = authContext

    //En caso d que el usuario o password no exista

    useEffect(()=>{
        
        if(autenticado){
            props.history.push('/proyectos')
        }
        
        if(mensaje){
            mostrarAlerta(mensaje.msg , mensaje.categoria)
        }
        // eslint-disable-next-line
    },[mensaje,autenticado,props.history])

    //State para iniciar sesion
    const [usuario, guardarUsuario] = useState({
        email:'',
        password:''
    })

    const {email, password} = usuario

    const onChange = e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        //validar
        if(email.trim === '' || password.trim ===''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        }
        //Action
        iniciarSesion({email,password})
    }

    return ( 
        <div className="form-usuario">
            
            {alerta ? (<div className= {`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}

            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesion</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label className="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            onChange={onChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label className="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            onChange={onChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar sesion"/>

                    </div>
                </form>

                <Link to={'nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>

            </div>
        </div>
     );
}
 
export default Login;
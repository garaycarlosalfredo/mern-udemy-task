import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {

    //Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    const authContext = useContext(AuthContext)
    const {mensaje, autenticado, registrarUsuario} = authContext

    //En caso deque el usuario se haya autenticado o registrado duplicado

    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos')
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg , mensaje.categoria)
        }
        // eslint-disable-next-line
    },[mensaje,autenticado,props.history])

    //State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    })

    const {nombre, email, password, confirmar} = usuario

    const onChange = e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        //validar

        if(nombre.trim()===''|| email.trim()===''|| password.trim() ==='' || confirmar.trim()===''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        //pasword 6 caracteres

        if(password.length<6){
            mostrarAlerta('El pasword debe ser de al menos 6 caracteres', 'alerta-error')
            return
        }

        //Password iguales
        if(password !== confirmar){
            mostrarAlerta('Los paswords no coinciden', 'alerta-error')
            return
        }

        //Action
        registrarUsuario({
            nombre,
            email,
            password
        })
        
    }

    return ( 
        <div className="form-usuario">

            {alerta ? (<div className= {`alerta ${alerta.categoria}`}>{alerta.msg}</div>): null}

            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
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
                        <label htmlFor="password">Password</label>
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
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirma Tu Password"
                            onChange={onChange}
                            value={confirmar}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrar"/>

                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    iniciar sesion
                </Link>

            </div>
        </div>
     );
}
 
export default NuevaCuenta;
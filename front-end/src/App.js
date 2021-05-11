import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import proyectos from './components/proyectos/Proyectos'
import ProyctoState from './context/proyectos/proyectoState'
import TareaState from './context/tareas/tareaState'

import AlertaState from './context/alertas/alertaState'

import AuthState from './context/autenticacion/authState'


function App() {

  console.log(process.env.REACT_APP_BACKEND_URL)

  return (

    <ProyctoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                  <Route exact path="/proyectos" component={proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyctoState>

    );
}

export default App;

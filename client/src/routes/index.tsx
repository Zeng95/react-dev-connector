import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Login } from 'views/Auth/Login'
import { Logout } from 'views/Auth/Logout'
import { Register } from 'views/Auth/Register'
import { Dashboard } from 'views/Dashboard'
import { Landing } from 'views/Landing'
import { NoMatch } from 'views/NoMatch'
import { PrivateRoute } from './private'
import { PublicRoute } from './public'

const routes = (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" component={Landing} />
      <PublicRoute path="/register" component={Register} />
      <PublicRoute path="/login" component={Login} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/logout" component={Logout} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </BrowserRouter>
)

export { routes }

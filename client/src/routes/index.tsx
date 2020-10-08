import React from 'react'
import { Route } from 'react-router'
import { NoMatch } from 'views/NoMatch'
import { PublicRoute } from './public'
import { PrivateRoute } from './private'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Logout } from 'views/Auth/Logout'
import { Dashboard } from 'views/Dashboard'
import { Login } from 'views/Auth/Login'
import { Register } from 'views/Auth/Register'
import { Landing } from 'views/Landing'

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

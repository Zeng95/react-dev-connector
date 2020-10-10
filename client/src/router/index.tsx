import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Login } from 'views/Auth/Login'
import { Logout } from 'views/Auth/Logout'
import { Register } from 'views/Auth/Register'
import { Dashboard } from 'views/Dashboard'
import { Landing } from 'views/Landing'
import { NoMatch } from 'views/NoMatch'
import { CreateProfile } from 'views/Profile/CreateProfile'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" component={Landing} />
      <PublicRoute path="/register" component={Register} />
      <PublicRoute path="/login" component={Login} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/create-profile" component={CreateProfile} />
      <PrivateRoute path="/logout" component={Logout} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </BrowserRouter>
)

export { Router }

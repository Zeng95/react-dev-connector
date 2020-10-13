import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Login } from 'views/Auth/Login'
import { Logout } from 'views/Auth/Logout'
import { Register } from 'views/Auth/Register'
import { Dashboard } from 'views/Dashboard'
import { Landing } from 'views/Landing'
import { NoMatch } from 'views/NoMatch'
import { AddEducation } from 'views/Profile/AddEducation'
import { AddExperience } from 'views/Profile/AddExperience'
import { CreateProfile } from 'views/Profile/CreateProfile'
import { EditProfile } from 'views/Profile/EditProfile'
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
      <PrivateRoute path="/edit-profile" component={EditProfile} />
      <PrivateRoute path="/add-experience" component={AddExperience} />
      <PrivateRoute path="/add-education" component={AddEducation} />
      <PrivateRoute path="/logout" component={Logout} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </BrowserRouter>
)

export { Router }

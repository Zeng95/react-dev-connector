import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Login } from 'views/Auth/Login'
import { Logout } from 'views/Auth/Logout'
import { Register } from 'views/Auth/Register'
import { Dashboard } from 'views/Dashboard'
import { Landing } from 'views/Landing'
import { NoMatch } from 'views/NoMatch'
import { Profile } from 'views/Profile'
import { AddEducation } from 'views/Profile/AddEducation'
import { AddExperience } from 'views/Profile/AddExperience'
import { CreateProfile } from 'views/Profile/CreateProfile'
import { EditEducation } from 'views/Profile/EditEducation'
import { EditExperience } from 'views/Profile/EditExperience'
import { EditProfile } from 'views/Profile/EditProfile'
import { Profiles } from 'views/Profiles'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" component={Landing} />
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/register" component={Register} />
      <PublicRoute path="/profile" component={Profile} />
      <PublicRoute path="/profiles" component={Profiles} />

      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/create-profile" component={CreateProfile} />
      <PrivateRoute path="/edit-profile" component={EditProfile} />
      <PrivateRoute path="/add-experience" component={AddExperience} />
      <PrivateRoute path="/edit-experience" component={EditExperience} />
      <PrivateRoute path="/add-education" component={AddEducation} />
      <PrivateRoute path="/edit-education" component={EditEducation} />
      <PrivateRoute path="/logout" component={Logout} />

      <Route path="*" component={NoMatch} />
    </Switch>
  </BrowserRouter>
)

export { Router }

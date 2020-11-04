import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter, Switch } from 'react-router-dom'
import { Login } from 'views/Auth/Login'
import { Logout } from 'views/Auth/Logout'
import { Register } from 'views/Auth/Register'
import { Dashboard } from 'views/Dashboard'
import { Landing } from 'views/Landing'
import { NoMatch } from 'views/NoMatch'
import { Posts } from 'views/Posts'
import { Profile } from 'views/Profile'
import { AddEducation } from 'views/ProfileForms/CreateEducation'
import { AddExperience } from 'views/ProfileForms/CreateExperience'
import { CreateProfile } from 'views/ProfileForms/CreateProfile'
import { EditEducation } from 'views/ProfileForms/EditEducation'
import { EditExperience } from 'views/ProfileForms/EditExperience'
import { EditProfile } from 'views/ProfileForms/EditProfile'
import { Profiles } from 'views/Profiles'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute exact path="/" restricted={true} component={Landing} />
      <PublicRoute exact path="/login" restricted={true} component={Login} />
      <PublicRoute
        exact
        path="/register"
        restricted={true}
        component={Register}
      />
      <PublicRoute
        exact
        path="/profiles"
        restricted={false}
        component={Profiles}
      />
      <PublicRoute
        path="/profiles/:userId"
        restricted={false}
        component={Profile}
      />
      <PublicRoute exact path="/posts" restricted={false} component={Posts} />

      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute
        exact
        path="/user/create-profile"
        component={CreateProfile}
      />
      <PrivateRoute exact path="/user/edit-profile" component={EditProfile} />
      <PrivateRoute
        exact
        path="/user/create-experience"
        component={AddExperience}
      />
      <PrivateRoute
        exact
        path="/user/edit-experience"
        component={EditExperience}
      />
      <PrivateRoute
        exact
        path="/user/create-education"
        component={AddEducation}
      />
      <PrivateRoute
        exact
        path="/user/edit-education"
        component={EditEducation}
      />
      <PrivateRoute exact path="/logout" component={Logout} />

      <Route path="*" component={NoMatch} />
    </Switch>
  </BrowserRouter>
)

export { Router }

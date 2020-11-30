import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Forgot } from 'views/Auth/Forgot'
import { Login } from 'views/Auth/Login'
import { Logout } from 'views/Auth/Logout'
import { Register } from 'views/Auth/Register'
import { Reset } from 'views/Auth/Reset'
import { Dashboard } from 'views/Dashboard'
import { Landing } from 'views/Landing'
import { NoMatch } from 'views/NoMatch'
import { Post } from 'views/Post'
import { CreatePost } from 'views/PostForms/CreatePost'
import { Posts } from 'views/Posts'
import { Profile } from 'views/Profile'
import { CreateEducation } from 'views/ProfileForms/CreateEducation'
import { CreateExperience } from 'views/ProfileForms/CreateExperience'
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
      <PublicRoute
        exact
        sensitive
        path="/"
        restricted={true}
        component={Landing}
      />
      <PublicRoute
        exact
        sensitive
        path="/login"
        restricted={true}
        component={Login}
      />
      <PublicRoute
        exact
        sensitive
        path="/register"
        restricted={true}
        component={Register}
      />
      <PublicRoute
        exact
        sensitive
        path="/forgot"
        restricted={false}
        component={Forgot}
      />
      <PublicRoute
        exact
        sensitive
        path="/reset/:token"
        restricted={false}
        component={Reset}
      />
      <PublicRoute
        exact
        sensitive
        path="/profiles"
        restricted={false}
        component={Profiles}
      />
      <PublicRoute
        sensitive
        path="/profiles/:username"
        restricted={false}
        component={Profile}
      />
      <PublicRoute
        exact
        sensitive
        path="/posts"
        restricted={false}
        component={Posts}
      />
      <PublicRoute
        exact
        sensitive
        path="/posts/:username/:postname"
        restricted={false}
        component={Post}
      />

      <PrivateRoute exact sensitive path="/dashboard" component={Dashboard} />
      <PrivateRoute exact sensitive path="/posts/new" component={CreatePost} />
      <PrivateRoute
        exact
        sensitive
        path="/user/create-profile"
        component={CreateProfile}
      />
      <PrivateRoute
        exact
        sensitive
        path="/user/edit-profile"
        component={EditProfile}
      />
      <PrivateRoute
        exact
        sensitive
        path="/user/create-experience"
        component={CreateExperience}
      />
      <PrivateRoute
        exact
        sensitive
        path="/user/edit-experience"
        component={EditExperience}
      />
      <PrivateRoute
        exact
        sensitive
        path="/user/create-education"
        component={CreateEducation}
      />
      <PrivateRoute
        exact
        sensitive
        path="/user/edit-education"
        component={EditEducation}
      />
      <PrivateRoute exact sensitive path="/logout" component={Logout} />

      <Route path="*" component={NoMatch} />
    </Switch>
  </BrowserRouter>
)

export { Router }

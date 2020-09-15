import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppNavbar from './AppNavbar'
import Landing from 'views/Landing'
import Register from 'views/Register'
import Login from 'views/Login'
import NoMatch from 'views/NoMatch'
import styled from 'styled-components'

const AppMainStyled = styled.main``

// Arrow function
const AppMain = () => (
  <AppMainStyled>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </AppMainStyled>
)

// Arrow function
const AppLayout = () => (
  <Router>
    <AppNavbar />
    <AppMain />
  </Router>
)

export default AppLayout

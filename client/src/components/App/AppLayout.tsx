import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Landing } from 'views/Landing'
import { Login } from 'views/Login'
import { NoMatch } from 'views/NoMatch'
import { Register } from 'views/Register'
import { AppNavbar } from './AppNavbar'

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

export { AppLayout }

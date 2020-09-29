import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Landing } from 'views/Landing'
import { Login } from 'views/Auth/Login'
import { NoMatch } from 'views/NoMatch'
import { Register } from 'views/Auth/Register'
import { AppHeader } from './AppHeader'
import { AuthContextProvider } from 'context/AuthContext'

const AppContentStyled = styled.main``

// Arrow function
const AppContent = () => (
  <AppContentStyled>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="*" component={NoMatch} />
    </Switch>
  </AppContentStyled>
)

// Arrow function
const AppLayout = () => (
  <BrowserRouter>
    <AuthContextProvider>
      <AppHeader />
      <AppContent />
    </AuthContextProvider>
  </BrowserRouter>
)

export { AppLayout }

import { getCurrentUser } from 'api/users'
import { AuthContext } from 'context/AuthContext'
import React, { useCallback, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Alert } from 'rsuite'
import styled from 'styled-components'
import { Login } from 'views/Auth/Login'
import { Logout } from 'views/Auth/Logout'
import { Register } from 'views/Auth/Register'
import { Dashboard } from 'views/Dashboard'
import { Landing } from 'views/Landing'
import { NoMatch } from 'views/NoMatch'
import { AppHeader } from './AppHeader'

const AppContentStyled = styled.main.attrs({
  className: 'mt-24'
})``

// Arrow function
const AppContent: React.FC = () => (
  <AppContentStyled>
    <TransitionGroup>
      <CSSTransition classNames="example" timeout={{ enter: 500, exit: 300 }}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  </AppContentStyled>
)

// Arrow function
const AppLayout: React.FC = () => {
  const { state, dispatch } = useContext(AuthContext)

  const loadUser = useCallback(async () => {
    try {
      const response = await getCurrentUser()
      const { user } = response.data

      dispatch({ type: 'USER_LOADED', payload: { user } })
    } catch (err) {
      Alert.error(err.message)

      dispatch({ type: 'AUTH_ERROR' })
    }
  }, [dispatch])

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const { user, token } = state

    if (!user && token) {
      loadUser()
    }
  }, [state, loadUser])

  return (
    <Router>
      <AppHeader />
      <AppContent />
    </Router>
  )
}

export { AppLayout }

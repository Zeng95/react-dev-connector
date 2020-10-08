import { AuthContext } from 'context/AuthContext'
import React, { Fragment, useContext } from 'react'
import {
  Redirect,
  Route,
  RouteProps,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { Login } from 'views/Auth/Login'
import { Logout } from 'views/Auth/Logout'
import { Register } from 'views/Auth/Register'
import { Dashboard } from 'views/Dashboard'
import { Landing } from 'views/Landing'
import { NoMatch } from 'views/NoMatch'
import { AppHeader } from './AppHeader'

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType
}

const AppContainer = styled.div.attrs({
  className: 'relative'
})`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter-active {
    opacity: 1;
    transition: opacity 0.2s ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0.01;
    transition: opacity 0.2s ease-in;
  }
`
const RouteSection = styled.div.attrs({
  className: 'absolute w-full top-0 left-0'
})``
const AppContent = styled.main.attrs({
  className: 'mt-24'
})``

const PublicRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const routeComponent = () => {
    return (
      <Fragment>
        <AppHeader />

        <AppContent>
          <Component />
        </AppContent>
      </Fragment>
    )
  }

  return <Route {...rest} component={routeComponent} />
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { state } = useContext(AuthContext)
  const { isAuthenticated, token } = state
  const routeComponent = () => {
    return isAuthenticated || token ? (
      <Fragment>
        <AppHeader />

        <AppContent>
          <Component />
        </AppContent>
      </Fragment>
    ) : (
      <Redirect to="/login" />
    )
  }

  return <Route {...rest} render={routeComponent} />
}

const AppRouter: React.FC<RouteComponentProps> = ({ location }) => (
  <AppContainer>
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} timeout={200} classNames="fade">
        <RouteSection>
          <Switch location={location}>
            <PublicRoute exact path="/" component={Landing} />
            <PublicRoute path="/register" component={Register} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/logout" component={Logout} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="*" component={NoMatch} />
          </Switch>
        </RouteSection>
      </CSSTransition>
    </TransitionGroup>
  </AppContainer>
)

export default withRouter(AppRouter)

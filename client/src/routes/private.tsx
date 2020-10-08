import { AppHeader } from 'components/App/AppHeader'
import { AppContent } from 'components/Shared/Styles'
import { AuthContext } from 'context/AuthContext'
import React, { Fragment, useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ElementType
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

  return <Route {...rest} component={routeComponent} />
}

export { PrivateRoute }

import { AppHeader } from 'components/App/AppHeader'
import { AppContent } from 'components/Shared/Styles'
import React from 'react'
import styled from 'styled-components'

const AppWrapper = styled.div``

const AppLayout: React.FC = props => (
  <AppWrapper>
    <AppHeader />

    <AppContent>{props.children}</AppContent>
  </AppWrapper>
)

export { AppLayout }

import { AppHeader } from 'components/App/AppHeader'
import { AppContent } from 'components/Shared/Styles'
import React from 'react'
import styled from 'styled-components'

const AppWrapper = styled.div``

const AppLayout: React.FC = ({ children }) => (
  <AppWrapper>
    <AppHeader />

    <AppContent>{children}</AppContent>
  </AppWrapper>
)

export { AppLayout }

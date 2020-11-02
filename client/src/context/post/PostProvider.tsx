import React, { useReducer } from 'react'
import { actions, initialProfile, PostContext, reducer } from './PostContext'

const ProfileProvider: React.FC = props => {
  const [post, dispatch] = useReducer(reducer, initialProfile)

  const reducerState = post.state
  const reducerActions = actions(dispatch)

  const context = { state: { ...reducerState }, actions: { ...reducerActions } }

  return (
    <PostContext.Provider value={context}>
      {props.children}
    </PostContext.Provider>
  )
}

export { ProfileProvider }

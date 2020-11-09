import React, { useReducer } from 'react'
import { actions, initialState, PostContext, reducer } from './PostContext'

const PostProvider: React.FC = props => {
  const [post, dispatch] = useReducer(reducer, initialState)

  const reducerState = post.state
  const reducerActions = actions(dispatch)

  const context = { state: { ...reducerState }, actions: { ...reducerActions } }

  return (
    <PostContext.Provider value={context}>
      {props.children}
    </PostContext.Provider>
  )
}

export { PostProvider }

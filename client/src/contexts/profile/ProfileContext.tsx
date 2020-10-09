import React, { createContext, useReducer } from 'react'

type ProfileType = {
  id: number
  name: string
  price: number
}

type RepositoryType = {
  id: number
  name: string
  price: number
}

type InitialStateType = {
  profile: object | null
  profiles: ProfileType[]
  repos: RepositoryType[]
}

const initialState = {
  profile: null,
  profiles: [],
  repos: []
}

const ProfileContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({ state: initialState, dispatch: () => null })

const profileReducer = (state: InitialStateType, action: any) => {
  const { type, payload } = action

  switch (type) {
    case 'GET_PROFILE':
      return { ...state, profile: payload }
    case 'CREATE_PROFILE':
      return { ...state, ...payload }
    case 'UPDATE_PROFILE':
      return { ...state, ...payload }
    default:
      return state
  }
}

const ProfileProvider: React.FC<{ children: any }> = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState)

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  )
}

export { ProfileContext, ProfileProvider }

import React, { createContext } from 'react'

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
  profile: ProfileType | null
  profiles: ProfileType[]
  repos: RepositoryType[]
}

export const initialState = {
  profile: null,
  profiles: [],
  repos: []
}

export const ProfileContext = createContext<{
  state: InitialStateType
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null
})

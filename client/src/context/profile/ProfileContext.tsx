import React, { createContext } from 'react'

type UserType = {
  id: string
  avatar: string
  email: string
  username: string
}

type ProfileType = {
  status: string
  company: string
  website: string
  location: string
  skills: string[]
  githubusername: string
  bio: string
  user: UserType
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

import React, { createContext } from 'react'

type UserType = {
  id: string
  avatar: string
  email: string
  username: string
}

type ExperienceType = {
  title: string
  company: string
}

type EducationType = {
  school: string
  degree: string
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
  twitter: string
  facebook: string
  linkedin: string
  youtube: string
  instgram: string
  weibo: string
  experience: ExperienceType[]
  education: EducationType[]
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

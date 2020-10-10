import { useState } from 'react'

function ProfilePage() {
  const [profile, setProfile] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instgram: ''
  })

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instgram
  } = profile

  return { profile }
}

export { ProfilePage }

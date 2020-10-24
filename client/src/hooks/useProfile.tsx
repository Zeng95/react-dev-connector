import { ProfileContext } from 'context/profile/ProfileContext'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Alert } from 'rsuite'

function useProfile() {
  const context = useContext(ProfileContext)
  const { profile } = context.state
  const { createUserProfile, updateUserProfile } = context.actions

  const history = useHistory()
  const location = useLocation()

  const formEl = useRef<HTMLFormElement>(null)

  const [showSocialInputs, setShowSocialInputs] = useState(false)
  const [profileForm, setProfileForm] = useState({
    status: '',
    company: '',
    website: '',
    location: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instgram: '',
    weibo: ''
  })

  const fetchProfile = useCallback(() => {
    if (profile !== null) {
      if (location.pathname === '/create-profile') {
        history.push('/edit-profile')
      }

      setProfileForm(profileForm => ({
        ...profileForm,
        ...profile,
        skills: profile.skills.join(',')
      }))
    }
  }, [profile, history, location])

  const onSubmit = (edit: boolean) => {
    if (formEl.current !== null && !formEl.current.check()) return false

    if (edit) {
      updateUserProfile(profileForm)
      Alert.success('Profile Updated', 2000)
    } else {
      createUserProfile(profileForm)
      Alert.success('Profile Created', 2000)

      navigateToDashboard()
    }
  }

  const onKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    edit: boolean
  ) => {
    if (event.key === 'Enter') {
      onSubmit(edit)
    }
  }

  const onChange = (formValue: any) => {
    setProfileForm(formValue)
  }

  const onReset = () => {
    if (formEl.current !== null) formEl.current.cleanErrors()

    setProfileForm({
      status: '',
      company: '',
      website: '',
      location: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instgram: '',
      weibo: ''
    })
  }

  const toggleSocialInputs = () => {
    setShowSocialInputs(!showSocialInputs)
  }

  const navigateToDashboard = () => {
    history.push('/dashboard')
  }

  useEffect(fetchProfile, [fetchProfile])

  return {
    formEl,
    profileForm,
    showSocialInputs,
    fetchProfile,
    onSubmit,
    onKeyUp,
    onChange,
    onReset,
    toggleSocialInputs,
    navigateToDashboard
  }
}

export { useProfile }

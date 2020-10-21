import { createProfile, updateProfile } from 'api/profiles'
import { ProfileContext } from 'context/profile/ProfileContext'
import { GET_PROFILE, UPDATE_PROFILE } from 'context/types'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Alert } from 'rsuite'

function useProfile() {
  const history = useHistory()
  const location = useLocation()

  const { state, dispatch } = useContext(ProfileContext)
  const { profile } = state

  const formEl = useRef<HTMLFormElement>(null)

  const [showSocialInputs, setShowSocialInputs] = useState(false)
  const [submitting, setSubmitting] = useState(false)
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

  const onSubmit = async (edit: boolean) => {
    try {
      if (formEl.current !== null && !formEl.current.check()) return false

      setSubmitting(true)

      if (edit) {
        const res = await updateProfile(profileForm)

        dispatch({ type: UPDATE_PROFILE, payload: res.data.profile })
        Alert.success('Profile Updated', 2000)
      } else {
        const res = await createProfile(profileForm)

        dispatch({ type: GET_PROFILE, payload: res.data.profile })
        Alert.success('Profile Created', 2000)
        navigateToDashboard()
      }
    } catch (err) {
      Alert.error(err.message)
    } finally {
      setSubmitting(false)
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
    submitting,
    onSubmit,
    onKeyUp,
    onChange,
    onReset,
    toggleSocialInputs,
    navigateToDashboard
  }
}

export { useProfile }

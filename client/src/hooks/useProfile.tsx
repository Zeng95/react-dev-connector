import { createProfile, updateProfile } from 'api/profiles'
import { ProfileContext } from 'context/profile/ProfileContext'
import { GET_PROFILE } from 'context/types'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Alert } from 'rsuite'

function ProfilePage() {
  const history = useHistory()
  const location = useLocation()

  const { state, dispatch } = useContext(ProfileContext)
  const { profile } = state

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
    weibo: '',
    isSubmitting: false
  })

  const fetchProfile = useCallback(() => {
    if (profile !== null) {
      if (location.pathname === '/create-profile') {
        history.push('/edit-profile')
      }

      setProfileForm(profileForm => ({
        ...profileForm,
        status: profile.status,
        location: profile.location || '',
        skills: profile.skills.join(',')
      }))
    }
  }, [profile, history, location])

  const onSubmit = async (edit: boolean) => {
    try {
      if (formEl.current !== null && !formEl.current.check()) return false

      setProfileForm({ ...profileForm, isSubmitting: true })

      let res

      if (edit && profile !== null) {
        res = await updateProfile(profileForm)
        Alert.success('Profile Updated', 2000)
      } else {
        res = await createProfile(profileForm)
        Alert.success('Profile Created', 2000, () => navigateToDashboard())
      }

      dispatch({ type: GET_PROFILE, payload: res.data.profile })
    } catch (err) {
      const { response, message } = err

      if (response) {
        const { errors, msg } = response.data

        if (errors) {
          errors.forEach((error: any) => Alert.error(error.msg))
        } else {
          Alert.error(msg)
        }
      } else {
        Alert.error(message)
      }
    } finally {
      setProfileForm({ ...profileForm, isSubmitting: false })
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
      weibo: '',
      isSubmitting: false
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
    onChange,
    onReset,
    toggleSocialInputs,
    navigateToDashboard
  }
}

export { ProfilePage }

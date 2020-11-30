import { ProfileContext } from 'context/profile/ProfileContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { openAlert } from 'utils'

function useProfile() {
  const profile = useContext(ProfileContext)
  const { profile: singleProfile, submitLoading } = profile.state
  const { createUserProfile, updateUserProfile } = profile.actions

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
    instagram: '',
    weibo: ''
  })

  useEffect(() => {
    const { pathname } = location

    if (singleProfile !== null) {
      if (pathname === '/user/edit-profile') {
        setProfileForm({
          status: singleProfile.status,
          company: singleProfile.company ? singleProfile.company : '',
          website: singleProfile.website ? singleProfile.website : '',
          location: singleProfile.location ? singleProfile.location : '',
          skills: singleProfile.skills.join(', '),
          githubusername: singleProfile.githubusername
            ? singleProfile.githubusername
            : '',
          bio: singleProfile.bio ? singleProfile.bio : '',
          twitter:
            singleProfile.social && singleProfile.social.twitter
              ? singleProfile.social.twitter
              : '',
          facebook:
            singleProfile.social && singleProfile.social.facebook
              ? singleProfile.social.facebook
              : '',
          linkedin:
            singleProfile.social && singleProfile.social.linkedin
              ? singleProfile.social.linkedin
              : '',
          youtube:
            singleProfile.social && singleProfile.social.youtube
              ? singleProfile.social.youtube
              : '',
          instagram:
            singleProfile.social && singleProfile.social.instagram
              ? singleProfile.social.instagram
              : '',
          weibo:
            singleProfile.social && singleProfile.social.weibo
              ? singleProfile.social.weibo
              : ''
        })
      } else if (pathname === '/user/create-profile') {
        history.push('/dashboard')
      }
    } else {
      if (pathname === '/user/edit-profile') {
        history.push('/dashboard')
      }
    }
  }, [singleProfile, history, location])

  const handleSubmit = (edit: boolean) => {
    if (formEl.current !== null && !formEl.current.check()) {
      return false
    }

    if (edit) {
      updateUserProfile(profileForm)
        .then(() => {
          navigateToDashboard()
          openAlert('success', 'Profile Successfully Updated')
        })
        .catch(() => {
          openAlert('error', 'Profile Unsuccessfully Updated')
        })
    } else {
      createUserProfile(profileForm)
        .then(() => {
          navigateToDashboard()
          openAlert('success', 'Profile Successfully Created')
        })
        .catch(() => {
          openAlert('error', 'Profile Unsuccessfully Created')
        })
    }
  }

  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    edit: boolean
  ) => {
    if (event.key === 'Enter' && !submitLoading) {
      handleSubmit(edit)
    }
  }

  const handleChange = (formValue: any) => {
    setProfileForm(formValue)
  }

  const handleReset = () => {
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
      instagram: '',
      weibo: ''
    })
  }

  const toggleSocialInputs = () => {
    setShowSocialInputs(!showSocialInputs)
  }

  const navigateToDashboard = () => {
    history.push('/dashboard')
  }

  return {
    formEl,
    profileForm,
    showSocialInputs,
    handleSubmit,
    handleKeyUp,
    handleChange,
    handleReset,
    toggleSocialInputs,
    navigateToDashboard
  }
}

export { useProfile }

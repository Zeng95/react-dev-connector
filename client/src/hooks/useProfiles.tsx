import { createProfile } from 'api/profiles'
import { useState } from 'react'
import { Alert } from 'rsuite'

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
  const [showSocialInputs, setShowSocialInputs] = useState(false)

  const toggleSocialInputs = () => {
    setShowSocialInputs(!showSocialInputs)
  }

  const onSubmit = async () => {
    try {
      const response = await createProfile()
      console.log(response)
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
    }
  }

  const onChange = (formValue: any) => {
    console.log(formValue)
    setProfile(formValue)
  }

  return { profile, showSocialInputs, toggleSocialInputs, onSubmit, onChange }
}

export { ProfilePage }

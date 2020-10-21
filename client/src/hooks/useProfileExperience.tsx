import { deleteProfileExperience, updateProfileExperience } from 'api/profiles'
import { ProfileContext } from 'context/profile/ProfileContext'
import { UPDATE_PROFILE } from 'context/types'
import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert } from 'rsuite'

function useProfileExperience() {
  const history = useHistory()
  const { dispatch } = useContext(ProfileContext)
  const formEl = useRef<HTMLFormElement>(null)

  const [submitting, setSubmitting] = useState(false)
  const [toDateDisabled, toggleDisbaled] = useState(false)
  const [experienceForm, setExperienceForm] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    from: null,
    to: null,
    current: []
  })

  const onDelete = async (experienceId: string) => {
    try {
      setSubmitting(true)

      const res = await deleteProfileExperience(experienceId)

      dispatch({ type: UPDATE_PROFILE, payload: res.data.profile })
      Alert.success('Experience Deleted', 2000)
    } catch (err) {
      Alert.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const onSubmit = async () => {
    try {
      if (formEl.current !== null && !formEl.current.check()) return false

      setSubmitting(true)

      let formData

      formData =
        experienceForm.current.length > 0
          ? { ...experienceForm, current: true }
          : { ...experienceForm, current: false }

      const res = await updateProfileExperience(formData)

      dispatch({ type: UPDATE_PROFILE, payload: res.data.profile })
      Alert.success('Experience Added', 2000)
      navigateToDashboard()
    } catch (err) {
      Alert.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit()
    }
  }

  const onChange = (formValue: any) => {
    setExperienceForm(formValue)
  }

  const onReset = () => {
    if (formEl.current !== null) formEl.current.cleanErrors()

    setExperienceForm({
      title: '',
      company: '',
      location: '',
      from: null,
      to: null,
      description: '',
      current: []
    })
  }

  const navigateToDashboard = () => {
    history.push('/dashboard')
  }

  const navigateToEditExperience = (experienceId: string) => {
    console.log(experienceId)
    history.push('/edit-experience')
  }

  return {
    formEl,
    experienceForm,
    toDateDisabled,
    toggleDisbaled,
    submitting,
    onDelete,
    onSubmit,
    onKeyUp,
    onChange,
    onReset,
    navigateToDashboard,
    navigateToEditExperience
  }
}

export { useProfileExperience }

import { deleteProfileEducation, updateProfileEducation } from 'api/profiles'
import { ProfileContext } from 'context/profile/ProfileContext'
import { UPDATE_PROFILE } from 'context/types'
import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert } from 'rsuite'

function useProfileEducation() {
  const history = useHistory()
  const { dispatch } = useContext(ProfileContext)
  const formEl = useRef<HTMLFormElement>(null)

  const [submitting, setSubmitting] = useState(false)
  const [toDateDisabled, toggleDisbaled] = useState(false)
  const [educationForm, setEducationForm] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: null,
    to: null,
    description: '',
    current: []
  })

  const onDelete = async (educationId: string) => {
    try {
      setSubmitting(true)

      const res = await deleteProfileEducation(educationId)

      Alert.success('Education Deleted', 2000)

      dispatch({ type: UPDATE_PROFILE, payload: res.data.profile })
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
        educationForm.current.length > 0
          ? { ...educationForm, current: true }
          : { ...educationForm, current: false }

      const res = await updateProfileEducation(formData)

      dispatch({ type: UPDATE_PROFILE, payload: res.data.profile })
      Alert.success('Education Added', 2000)
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
    setEducationForm(formValue)
  }

  const onReset = () => {
    if (formEl.current !== null) formEl.current.cleanErrors()

    setEducationForm({
      school: '',
      degree: '',
      fieldofstudy: '',
      from: null,
      to: null,
      description: '',
      current: []
    })
    setSubmitting(false)
  }

  const navigateToDashboard = () => {
    history.push('/dashboard')
  }

  const navigateToEditEducation = (educationId: string) => {
    console.log(educationId)
    history.push('/edit-education')
  }

  return {
    formEl,
    educationForm,
    toDateDisabled,
    toggleDisbaled,
    submitting,
    onDelete,
    onSubmit,
    onKeyUp,
    onChange,
    onReset,
    navigateToDashboard,
    navigateToEditEducation
  }
}

export { useProfileEducation }

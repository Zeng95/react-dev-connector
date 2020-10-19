import { updateProfileEducation } from 'api/profiles'
import { ProfileContext } from 'context/profile/ProfileContext'
import { UPDATE_PROFILE } from 'context/types'
import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert } from 'rsuite'

function AddEducationPage() {
  const history = useHistory()
  const { dispatch } = useContext(ProfileContext)
  const formEl = useRef<HTMLFormElement>(null)

  const [educationForm, setEducationForm] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: null,
    to: null,
    description: '',
    current: []
  })
  const [submitting, setSubmitting] = useState(false)
  const [toDateDisabled, toggleDisbaled] = useState(false)

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

      Alert.success('Education Added', 2000, () => navigateToDashboard())

      dispatch({ type: UPDATE_PROFILE, payload: res.data.profile })
    } catch (err) {
      Alert.error(err.message)
    } finally {
      setSubmitting(false)
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

  return {
    formEl,
    educationForm,
    toDateDisabled,
    toggleDisbaled,
    submitting,
    onSubmit,
    onChange,
    onReset,
    navigateToDashboard
  }
}

export { AddEducationPage }

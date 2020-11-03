import { ProfileContext } from 'context/profile/ProfileContext'
import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert } from 'rsuite'

function useProfileEducation() {
  const context = useContext(ProfileContext)
  const {
    updateUserProfileEducation,
    deleteUserProfileEducation
  } = context.actions

  const history = useHistory()
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

  const onDelete = (educationId: string) => {
    deleteUserProfileEducation(educationId)
    Alert.success('Education Deleted', 2000)
  }

  const onSubmit = () => {
    if (formEl.current !== null && !formEl.current.check()) return false

    setSubmitting(true)

    let formData

    formData =
      educationForm.current.length > 0
        ? { ...educationForm, current: true }
        : { ...educationForm, current: false }

    updateUserProfileEducation(formData)
    Alert.success('Education Added', 2000)

    navigateToDashboard()
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
    history.push('/user/edit-education')
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

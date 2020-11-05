import { ProfileContext } from 'context/profile/ProfileContext'
import { useContext, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Alert } from 'rsuite'

interface LocationState {
  educationId: string
}

function useProfileEducation() {
  const profileContext = useContext(ProfileContext)
  const {
    createUserProfileEducation,
    updateUserProfileEducation,
    deleteUserProfileEducation
  } = profileContext.actions

  const history = useHistory()
  const location = useLocation<LocationState>()
  const { pathname, state } = location
  const hsaLocationState = typeof state === 'object' && state !== null

  const formEl = useRef<HTMLFormElement>(null)

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

  const onSubmit = (edit: boolean) => {
    if (formEl.current !== null && !formEl.current.check()) return false

    const formData =
      educationForm.current.length > 0
        ? { ...educationForm, current: true }
        : { ...educationForm, current: false }

    if (edit && hsaLocationState) {
      updateUserProfileEducation(state.educationId, formData)
      Alert.success('Education Updated', 2000)
    } else {
      createUserProfileEducation(formData)
      Alert.success('Education Created', 2000)

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
  }

  const navigateToDashboard = () => {
    history.push('/dashboard')
  }

  const navigateToEditEducation = (educationId: string) => {
    const location = {
      pathname: '/user/edit-education',
      state: { educationId }
    }

    history.push(location)
  }

  return {
    formEl,
    educationForm,
    toDateDisabled,
    toggleDisbaled,
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

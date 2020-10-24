import { ProfileContext } from 'context/profile/ProfileContext'
import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert } from 'rsuite'

function useProfileExperience() {
  const context = useContext(ProfileContext)
  const {
    updateUserProfileExperience,
    deleteUserProfileExperience
  } = context.actions

  const history = useHistory()
  const formEl = useRef<HTMLFormElement>(null)

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

  const onDelete = (experienceId: string) => {
    deleteUserProfileExperience(experienceId)
  }

  const onSubmit = () => {
    if (formEl.current !== null && !formEl.current.check()) return false

    const formData =
      experienceForm.current.length > 0
        ? { ...experienceForm, current: true }
        : { ...experienceForm, current: false }

    updateUserProfileExperience(formData)

    Alert.success('Experience Added', 2000)
    navigateToDashboard()
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

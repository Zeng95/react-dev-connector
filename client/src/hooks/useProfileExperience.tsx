import { ProfileContext } from 'context/profile/ProfileContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Alert } from 'rsuite'

interface IExperience {
  title: string
  company: string
  location: string
  from: string | null
  to: string | null
  description: string
  current: string[]
}

interface LocationState {
  experienceId: string
}

function useProfileExperience() {
  const context = useContext(ProfileContext)
  const { profile } = context.state
  const {
    updateUserProfileExperience,
    deleteUserProfileExperience
  } = context.actions

  const history = useHistory()
  const location = useLocation<LocationState>()
  const formEl = useRef<HTMLFormElement>(null)

  const [toDateDisabled, toggleDisbaled] = useState(false)
  const [experienceForm, setExperienceForm] = useState<IExperience>({
    title: '',
    company: '',
    location: '',
    description: '',
    from: null,
    to: null,
    current: []
  })

  useEffect(() => {
    const { pathname, state } = location
    const hsaLocationState = typeof state === 'object' && state !== null

    if (profile !== null) {
      if (pathname === '/user/edit-experience') {
        const experienceArr = profile.experience

        if (hsaLocationState) {
          const experienceId = state.experienceId
          const experience = experienceArr.find(item => {
            return item['_id'] === experienceId
          })

          if (experience !== undefined) {
            if (experience.current) {
              toggleDisbaled(true)
            }

            setExperienceForm(experienceForm => ({
              ...experienceForm,
              ...experience,
              current: experience.current ? ['current'] : []
            }))
          }
        } else {
          history.push('/dashboard')
        }
      }
    } else {
      if (pathname === '/user/edit-experience') {
        history.push('/dashboard')
      }
    }
  }, [profile, history, location])

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
    const location = {
      pathname: '/user/edit-experience',
      state: { experienceId }
    }

    history.push(location)
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

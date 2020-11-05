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
  const profileContext = useContext(ProfileContext)
  const { profile } = profileContext.state
  const {
    createUserProfileExperience,
    updateUserProfileExperience,
    deleteUserProfileExperience
  } = profileContext.actions

  const history = useHistory()
  const location = useLocation<LocationState>()
  const { pathname, state } = location
  const hsaLocationState = typeof state === 'object' && state !== null

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
    if (profile !== null) {
      if (pathname === '/user/edit-experience') {
        const experienceArr = profile.experience

        if (hsaLocationState) {
          const experienceId = state.experienceId
          const experience = experienceArr.find(item => {
            return item['_id'] === experienceId
          })

          if (experience !== undefined) {
            if (experience.current || experience.to === null) {
              toggleDisbaled(true)
            }

            setExperienceForm(experienceForm => ({
              ...experienceForm,
              ...experience,
              current:
                experience.current || experience.to === null ? ['current'] : []
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
  }, [history, profile, pathname, state, hsaLocationState])

  const onDelete = (experienceId: string) => {
    deleteUserProfileExperience(experienceId)
      .then(() => {
        Alert.success('Experience Successfully Deleted', 2000)
      })
      .catch(() => {
        Alert.error('Experience Unsuccessfully Deleted', 2000)
      })
  }

  const onSubmit = (edit: boolean) => {
    if (formEl.current !== null && !formEl.current.check()) return false

    const formData =
      experienceForm.current.length > 0
        ? { ...experienceForm, current: true }
        : { ...experienceForm, current: false }

    if (edit && hsaLocationState) {
      updateUserProfileExperience(state.experienceId, formData)
        .then(() => {
          Alert.success('Experience Successfully Updated', 2000)
        })
        .catch(() => {
          Alert.error('Experience Unsuccessfully Updated', 2000)
        })
    } else {
      createUserProfileExperience(formData)
        .then(() => {
          navigateToDashboard()
          Alert.success('Experience Successfully Created', 2000)
        })
        .catch(() => {
          Alert.error('Experience Unsuccessfully Created', 2000)
        })
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

import { ProfileContext } from 'context/profile/ProfileContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { openAlert } from 'utils'

interface IExperience {
  title: string
  company: string
  location: string
  from: Date | null
  to: Date | null
  description: string
  current: string[]
}

interface LocationState {
  experienceId: string
}

function useProfileExperience() {
  const profile = useContext(ProfileContext)
  const { profile: singleProfile, submitLoading } = profile.state
  const {
    createUserProfileExperience,
    updateUserProfileExperience,
    deleteUserProfileExperience
  } = profile.actions

  const history = useHistory()
  const location = useLocation<LocationState>()
  const { pathname, state } = location
  const hasLocationState = typeof state === 'object' && state !== null

  const formEl = useRef<HTMLFormElement>(null)

  const [tableLoading, setTableLoading] = useState(false)
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
    if (singleProfile !== null) {
      if (pathname === '/user/edit-experience') {
        const experienceArr = singleProfile.experience

        if (hasLocationState) {
          const { experienceId: id } = state
          const experience = experienceArr.find(item => item['_id'] === id)

          if (experience !== undefined) {
            if (experience.current || experience.to === null) {
              toggleDisbaled(true)
            }

            setExperienceForm({
              title: experience.title,
              company: experience.company,
              location: experience.location,
              from: new Date(experience.from),
              current:
                experience.current || experience.to === null ? ['current'] : [],
              to: experience.to !== null ? new Date(experience.to) : null,
              description: experience.description
            })
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
  }, [history, singleProfile, pathname, state, hasLocationState])

  const handleDelete = (experienceId: string) => {
    setTableLoading(true)

    deleteUserProfileExperience(experienceId)
      .then(() => {
        openAlert('success', 'Experience Successfully Deleted')
      })
      .catch(() => {
        openAlert('error', 'Experience Unsuccessfully Deleted')
      })
      .finally(() => {
        setTableLoading(false)
      })
  }

  const handleSubmit = (edit: boolean) => {
    if (formEl.current !== null && !formEl.current.check()) {
      return false
    }

    const formData =
      experienceForm.current.length > 0
        ? { ...experienceForm, current: true, to: null }
        : { ...experienceForm, current: false }

    if (edit && hasLocationState) {
      updateUserProfileExperience(state.experienceId, formData)
        .then(() => {
          navigateToDashboard()
          openAlert('success', 'Experience Successfully Updated')
        })
        .catch(() => {
          openAlert('error', 'Experience Unsuccessfully Updated')
        })
    } else {
      createUserProfileExperience(formData)
        .then(() => {
          navigateToDashboard()
          openAlert('success', 'Experience Successfully Created')
        })
        .catch(() => {
          openAlert('error', 'Experience Unsuccessfully Created')
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
    setExperienceForm(formValue)
  }

  const handleReset = () => {
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
    tableLoading,
    experienceForm,
    toDateDisabled,
    toggleDisbaled,
    handleDelete,
    handleSubmit,
    handleKeyUp,
    handleChange,
    handleReset,
    navigateToDashboard,
    navigateToEditExperience
  }
}

export { useProfileExperience }

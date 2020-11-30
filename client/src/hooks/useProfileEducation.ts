import { ProfileContext } from 'context/profile/ProfileContext'
import { useContext, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { openAlert } from 'utils'

interface IEducation {
  school: string
  degree: string
  fieldofstudy: string
  from: Date | null
  to: Date | null
  description: string
  current: string[]
}

interface LocationState {
  educationId: string
}

function useProfileEducation() {
  const profile = useContext(ProfileContext)
  const { profile: singleProfile, submitLoading } = profile.state
  const {
    createUserProfileEducation,
    updateUserProfileEducation,
    deleteUserProfileEducation
  } = profile.actions

  const history = useHistory()
  const location = useLocation<LocationState>()
  const { pathname, state } = location
  const hasLocationState = typeof state === 'object' && state !== null

  const formEl = useRef<HTMLFormElement>(null)

  const [tableLoading, setTableLoading] = useState(false)
  const [toDateDisabled, toggleDisbaled] = useState(false)
  const [educationForm, setEducationForm] = useState<IEducation>({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: null,
    to: null,
    description: '',
    current: []
  })

  useEffect(() => {
    if (singleProfile !== null) {
      if (pathname === '/user/edit-education') {
        const educationArr = singleProfile.education

        if (hasLocationState) {
          const { educationId: id } = state
          const education = educationArr.find(item => item['_id'] === id)

          if (education !== undefined) {
            if (education.current || education.to === null) {
              toggleDisbaled(true)
            }

            setEducationForm({
              school: education.school,
              degree: education.degree,
              fieldofstudy: education.fieldofstudy,
              from: new Date(education.from),
              current:
                education.current || education.to === null ? ['current'] : [],
              to: education.to !== null ? new Date(education.to) : null,
              description: education.description
            })
          }
        } else {
          history.push('/dashboard')
        }
      }
    } else {
      if (pathname === '/user/edit-education') {
        history.push('/dashboard')
      }
    }
  }, [history, singleProfile, pathname, state, hasLocationState])

  const handleDelete = (educationId: string) => {
    setTableLoading(true)

    deleteUserProfileEducation(educationId)
      .then(() => {
        openAlert('success', 'Education Successfully Deleted')
      })
      .catch(() => {
        openAlert('error', 'Education Unsuccessfully Deleted')
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
      educationForm.current.length > 0
        ? { ...educationForm, current: true, to: null }
        : { ...educationForm, current: false }

    if (edit && hasLocationState) {
      updateUserProfileEducation(state.educationId, formData)
        .then(() => {
          navigateToDashboard()
          openAlert('success', 'Education Successfully Updated')
        })
        .catch(() => {
          openAlert('error', 'Education Unsuccessfully Updated')
        })
    } else {
      createUserProfileEducation(formData)
        .then(() => {
          navigateToDashboard()
          openAlert('success', 'Education Successfully Created')
        })
        .catch(() => {
          openAlert('error', 'Education Unsuccessfully Created')
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
    setEducationForm(formValue)
  }

  const handleReset = () => {
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
    tableLoading,
    educationForm,
    toDateDisabled,
    toggleDisbaled,
    handleDelete,
    handleSubmit,
    handleKeyUp,
    handleChange,
    handleReset,
    navigateToDashboard,
    navigateToEditEducation
  }
}

export { useProfileEducation }

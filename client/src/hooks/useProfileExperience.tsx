import { updateProfileExperience } from 'api/profiles'
import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert } from 'rsuite'

function AddExperiencePage() {
  const history = useHistory()

  const formEl = useRef<HTMLFormElement>(null)

  const [experienceForm, setExperienceForm] = useState({
    title: '',
    company: '',
    location: '',
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

      const res = await updateProfileExperience()
      console.log(res)

      Alert.success('Experience Added', 2000, () => navigateToDashboard())
    } catch (err) {
      const { response, message } = err

      if (response) {
        const { errors, msg } = response.data

        if (errors) {
          errors.forEach((error: any) => Alert.error(error.msg))
        } else {
          Alert.error(msg)
        }
      } else {
        Alert.error(message)
      }
    } finally {
      setSubmitting(false)
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
    setSubmitting(false)
  }

  const navigateToDashboard = () => {
    history.push('/dashboard')
  }

  return {
    formEl,
    experienceForm,
    toDateDisabled,
    toggleDisbaled,
    submitting,
    onSubmit,
    onChange,
    onReset,
    navigateToDashboard
  }
}

export { AddExperiencePage }

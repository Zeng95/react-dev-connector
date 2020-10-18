import { useState } from 'react'

function AddEducationPage() {
  const [experience, setExperience] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false
  })

  const onSubmit = async () => {
    try {
    } catch (error) {}
  }

  const onChange = (formValue: any) => {
    setExperience(formValue)
  }

  return { experience, onSubmit, onChange }
}

export { AddEducationPage }

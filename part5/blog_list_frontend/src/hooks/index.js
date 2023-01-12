import { useState } from 'react'

export const useField = (type, name) => {
  const [value, setValue] = useState('')

  const id = `blog-${name}`
  const placeholder = `Enter blog ${name}`

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    name,
    id,
    placeholder,
    value,
    onChange,
    reset
  }
}
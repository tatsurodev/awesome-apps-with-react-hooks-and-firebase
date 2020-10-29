import React from 'react'

function useFormValidation(initialState, validate, authenticate) {
  const [values, setValues] = React.useState(initialState)
  const [errors, setErrors] = React.useState({})
  const [isSubmitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0
      if (noErrors) {
        // errorなしでlogin, registerのtry
        authenticate()
        setSubmitting(false)
      } else {
        setSubmitting(false)
      }
    }
  }, [errors])

  function handleChange(event) {
    // eventはevent callbackが終わるとperformanceのためにnullにされるので非同期的にaccessしようとするとerrorとなるので、非同期でaccessしたい時はevent.persist()を使う
    event.persist()
    setValues((previousValues) => ({
      ...previousValues,
      // ES6 Computed Property Name
      [event.target.name]: event.target.value,
    }))
  }

  function handleBlur() {
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setSubmitting(true)
  }

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting,
  }
}

export default useFormValidation

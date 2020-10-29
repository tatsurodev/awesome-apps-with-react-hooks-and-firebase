import React from 'react'

function useFormValidation(initialState) {
  const [values, setValues] = React.useState(initialState)

  function handleChange(event) {
    // eventはevent callbackが終わるとperformanceのためにnullにされるので非同期的にaccessしようとするとerrorとなるので、非同期でaccessしたい時はevent.persist()を使う
    event.persist()
    setValues((previousValues) => ({
      ...previousValues,
      // ES6 Computed Property Name
      [event.target.name]: event.target.value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log({ values })
  }

  return { handleChange, handleSubmit, values }
}

export default useFormValidation

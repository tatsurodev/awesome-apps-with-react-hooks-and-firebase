export default function validateLogin(values) {
  let errors = {}

  // email errors
  if (!values.email) {
    errors.email = 'Email requried'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  // passowrd errors
  if (!values.password) {
    errors.password = 'Password required'
  } else if (values.password.length < 6) {
    errors.password = 'Passowrd must be at least 6 characters'
  }

  return errors
}

import React from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error_field'
import { validate as emailValidator } from 'email-validator'

function SignUpForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" component={ErrorField} label="E Mail" />
      <Field
        name="password"
        component={ErrorField}
        label="Password"
        type="password"
      />
      <button>Sign up</button>
    </form>
  )
}

const validate = (values, props) => {
  console.log('validate::values::', values)

  const { email, password } = values

  const errors = {}

  if (!email) errors.email = 'eMail is empty'
  else if (!emailValidator(email)) errors.email = 'invalid email'

  if (!password) errors.password = 'password is empty'
  else if (password.length < 3) errors.password = 'password is too short'

  console.log('validate::errors::', errors)

  return errors
}

export default reduxForm({
  form: 'sign-up',
  validate
})(SignUpForm)

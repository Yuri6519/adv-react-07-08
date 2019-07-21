import React from 'react'
import { reduxForm, Field } from 'redux-form'

function SignInForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      eMail: <Field name="email" component="input" />
      password: <Field name="password" component="input" type="password" />
      <button>Sign in</button>
    </form>
  )
}

export default reduxForm({
  form: 'sign-in'
})(SignInForm)

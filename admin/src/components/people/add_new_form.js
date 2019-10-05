import React, { PureComponent } from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import { connect } from 'react-redux'
import { validate as emailValidator } from 'email-validator'
import ErrorField from '../common/error_field'
import PeoplePage from './people-list'
import { savingSelector, errorSelector, addPerson } from '../../ducs/people'

const FORM_NAME = 'people-add-new'

class AddPerson extends PureComponent {
  getError = (error) => (
    <h3 style={{ color: 'red' }}>Error when saving to DB: {error.message}</h3>
  )

  render() {
    const { handleSubmit, saving, exception } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field name="lastName" component={ErrorField} label="Фамилия" />
        <Field name="userName" component={ErrorField} label="Имя" />
        <Field name="surName" component={ErrorField} label="Отчество" />
        <Field name="email" component={ErrorField} label="Почта" />
        <button>Добавить</button>
        {saving ? <h3>Добавляю...</h3> : null}
        {exception ? this.getError(exception) : null}
        <p />
        <PeoplePage />
      </form>
    )
  }
}

const validate = (values, props) => {
  const { lastName, userName, surName, email } = values

  const errors = {}

  if (!lastName) errors.lastName = 'фамилия обязательна!'
  else if (lastName.length < 2) errors.lastName = 'фамилия слишком короткая'

  if (!userName) errors.userName = 'имя обязательно!'
  else if (userName.length < 2) errors.userName = 'имя слишком короткое'

  if (!surName) errors.surName = 'отчество обязательно!'
  else if (surName.length < 2) errors.surName = 'отчество слишком короткое'

  if (!email) errors.email = 'email is empty'
  else if (!emailValidator(email)) errors.email = 'invalid email'

  return errors
}

const mapStateToProps = (state) => ({
  saving: savingSelector(state),
  exception: errorSelector(state)
})

const mapDispatchToProps = {
  onSubmit: (person) => addPerson(person)
}

const onSubmitSuccess = (_, dispatch) => dispatch(reset(FORM_NAME))

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: FORM_NAME,
    validate,
    onSubmitSuccess
  })(AddPerson)
)

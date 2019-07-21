import React from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import { connect } from 'react-redux'
import ErrorField from '../common/error_field'
import { addPeople } from '../../ducs/people'
import { moduleName } from '../../ducs/people'

const FORM_NAME = 'people-add-new'

function AddNewPeopleForm({ handleSubmit, peopleList }) {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="lastName" component={ErrorField} label="Фамилия" />
      <Field name="userName" component={ErrorField} label="Имя" />
      <Field name="surName" component={ErrorField} label="Отчество" />
      <button>Добавить</button>
      <p />
      {doList(peopleList)}
    </form>
  )
}

const doList = (list) => {
  const array = []

  let i = 0

  list.forEach((element) => {
    const person = `${element.get('lastName')} ${element.get(
      'userName'
    )} ${element.get('surName')}`
    array.push(<li key={++i}>{person}</li>)
  })

  return <ul>{array}</ul>
}

const validate = (values, props) => {
  const { lastName, userName, surName } = values

  // console.log("AddNewPeopleForm::validate::values::", values)

  const errors = {}

  if (!lastName) errors.lastName = 'фамилия обязательна!'
  else if (lastName.length < 2) errors.lastName = 'фамилия слишком короткая'

  if (!userName) errors.userName = 'имя обязательно!'
  else if (userName.length < 2) errors.userName = 'имя слишком короткое'

  if (!surName) errors.surName = 'отчество обязательно!'
  else if (surName.length < 2) errors.surName = 'отчество слишком короткое'

  // console.log("AddNewPeopleForm::validate::errors::", errors)

  return errors
}

const mapStateToProps = (state) => ({
  peopleList: state[moduleName]
})

const mapDispatchToProps = {
  onSubmit: ({ lastName, userName, surName }) =>
    addPeople(lastName, userName, surName)
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
  })(AddNewPeopleForm)
)

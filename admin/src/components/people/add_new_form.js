import React, { PureComponent } from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import { connect } from 'react-redux'
import { validate as emailValidator } from 'email-validator'
import ErrorField from '../common/error_field'
import {
  listSelector,
  loadingSelector,
  savingSelector,
  errorSelector,
  getAllPeople,
  addPerson
} from '../../ducs/people'
import Loader from '../loader'

const FORM_NAME = 'people-add-new'

class AddPerson extends PureComponent {
  componentDidMount() {
    const { getList } = this.props
    getList()
  }

  doList = (list) => {
    if (!list || list.length === 0) return null

    return (
      <table id="dynamic" border="1" cellSpacing="0" cellPadding="5">
        <tbody>
          <tr>
            <th>№ п/п</th>
            <th>Ид</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>e-Mail</th>
          </tr>
          {this.getTable(list)}
        </tbody>
      </table>
    )
  }

  getTable = (list) => {
    const res = []

    for (const key in list) {
      const record = list[key]
      const index = parseInt(key) + 1
      res.push(this.getRecord(index, record))
    }

    return res
  }

  getRecord = (index, data) => (
    <tr key={data.id}>
      <td style={{ textAlign: 'right' }}>{index}</td>
      <td>{data.id}</td>
      <td>{data.lastName}</td>
      <td>{data.userName}</td>
      <td>{data.surName}</td>
      <td>{data.email}</td>
    </tr>
  )

  getError = (error) => (
    <h3 style={{ color: 'red' }}>Error when saving to DB: {error.message}</h3>
  )

  render() {
    const { handleSubmit, peopleList, loading, saving, exception } = this.props

    if (loading) return <Loader />
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
        {this.doList(peopleList)}
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
  loading: loadingSelector(state),
  peopleList: listSelector(state),
  saving: savingSelector(state),
  exception: errorSelector(state)
})

const mapDispatchToProps = {
  onSubmit: (person) => addPerson(person),
  getList: getAllPeople
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

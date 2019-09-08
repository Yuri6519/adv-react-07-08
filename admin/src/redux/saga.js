import { all } from 'redux-saga/effects'
import { saga as peopleSaga } from '../ducs/people'
import { saga as authSaga } from '../ducs/auth'

export default function* saga() {
  yield all([authSaga(), peopleSaga()])
}

import { all } from 'redux-saga/effects'
import { saga as peopleSaga } from '../ducs/people'
import { saga as authSaga } from '../ducs/auth'
import { saga as conferenceSaga } from '../ducs/conference-list'

export default function* saga() {
  yield all([authSaga(), peopleSaga(), conferenceSaga()])
}

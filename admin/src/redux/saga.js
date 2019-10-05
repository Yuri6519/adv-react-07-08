import { all } from 'redux-saga/effects'
import { saga as peopleSaga } from '../ducs/people'
import { saga as authSaga } from '../ducs/auth'
import { saga as conferenceSaga } from '../ducs/conference'
import { saga as basketSaga } from '../ducs/basket'

export default function* saga() {
  yield all([authSaga(), peopleSaga(), conferenceSaga(), basketSaga()])
}

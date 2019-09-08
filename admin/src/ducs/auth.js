import { appName } from '../config'
import { Record } from 'immutable'
//import firebase from 'firebase/app'
import { createSelector } from 'reselect'
import { all, takeEvery, put, call, take, delay } from 'redux-saga/effects'

import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_IN_ERROR_LIMIT = `${prefix}/SIGN_IN_ERROR_LIMIT`
export const SIGN_IN_ERROR_RESET = `${prefix}/SIGN_IN_ERROR_RESET`

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

export const STATE_CHANGE_REQUEST = `${prefix}/STATE_CHANGE_REQUEST`
export const STATE_CHANGE_START = `${prefix}/STATE_CHANGE_START`
export const STATE_CHANGE_SUCCESS = `${prefix}/STATE_CHANGE_SUCCESS`
export const STATE_CHANGE_ERROR = `${prefix}/STATE_CHANGE_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null,
  error: null,
  loading: null,
  signIn: null,
  signInInfo: null,
  errorLimit: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    /*SIGN_IN*/
    case SIGN_IN_START:
      return state.set('loading', true)
    case SIGN_IN_SUCCESS:
      return state.set('loading', false).set('user', payload.user)
    case SIGN_IN_ERROR:
      return state.set('loading', false).set('error', error)
    case SIGN_IN_ERROR_LIMIT:
      return state.set('loading', false).set('errorLimit', true)
    case SIGN_IN_ERROR_RESET:
      return state.set('loading', false).set('errorLimit', false)

    /*STATE_CHANGE*/
    case STATE_CHANGE_START:
      console.log('DUCK::reducer::STATE_CHANGE_START')
      return state
        .set('loading', true)
        .set('signIn', null)
        .set('signInInfo', null)

    case STATE_CHANGE_SUCCESS:
      console.log('DUCK::reducer::STATE_CHANGE_SUCCESS')
      return state
        .set('loading', false)
        .set('signIn', true)
        .set('signInInfo', payload.user)

    case STATE_CHANGE_ERROR:
      console.log('DUCK::reducer::STATE_CHANGE_ERROR::error', error)
      return state.set('loading', false).set('error', error)

    default:
      return state
  }
}

/**
 * Selectors
 * */
const authSelector = (state) => state.auth || {}
const authSignInInfo = (state) => authSelector(state).signInInfo || {}
const signedSelector = (state) => authSignInInfo(state).uid || ''
const userAuthSelector = (state) => authSelector(state).user || {}
const errorLimitSelector = (state) => authSelector(state).errorLimit || false
const currentUserSelector = (state) => {
  const { user: { uid: current = '' } = {} } = userAuthSelector(state)
  return current || ''
}
export const isAuthSelector = createSelector(
  signedSelector,
  currentUserSelector,
  (signed, current) => current && signed && current === signed
)

export const currentMail = createSelector(
  userAuthSelector,
  (user) => {
    const { user: { email = 'not defined' } = {} } = user
    return email
  }
)

export const errorLimit = createSelector(
  errorLimitSelector,
  (errorLimit) => errorLimit
)

/**
 * Initialization
 */

export const init = (store) => {
  api.changeState((user) => {
    store.dispatch({
      type: STATE_CHANGE_REQUEST,
      payload: { user }
    })
  })
}

/**
 * Action Creators
 * */

export function signIn(email, password) {
  console.log('DUCK::signIn::email,password', email, password)

  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }

  // Thunk
  // return async (dispatch) => {
  //   dispatch({
  //     type: SIGN_IN_START
  //   })

  //   try {
  //     const user = await api.signIn(email, password);

  //     dispatch({
  //       type: SIGN_IN_SUCCESS,
  //       payload: { user }
  //     })
  //   } catch (error) {
  //     dispatch({
  //       type: SIGN_IN_ERROR,
  //       error
  //     })
  //   }
  // }
}

export function signUp(email, password) {
  console.log('DUCK::signUp::email,password', email, password)

  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  }

  // Thunk
  // return async (dispatch) => {
  //   dispatch({
  //     type: SIGN_UP_START
  //   })

  //   try {
  //     const user = await api.signUp(email, password)

  //     dispatch({
  //       type: SIGN_UP_SUCCESS,
  //       payload: { user }
  //     })
  //   } catch (error) {
  //     dispatch({
  //       type: SIGN_UP_ERROR,
  //       error
  //     })
  //   }
  // }
}

export function stateChange(user) {
  console.log('DUCK::stateChange::user::', user)

  return {
    type: STATE_CHANGE_REQUEST,
    payload: { user }
  }
}

/**
 * Sagas
 * */
export function* signInSaga() {
  let errors = 0

  while (true) {
    if (errors > 3) {
      yield put({
        type: SIGN_IN_ERROR_LIMIT
      })
      yield delay(5000)
      yield put({
        type: SIGN_IN_ERROR_RESET
      })

      errors = 0
    }

    const { payload } = yield take(SIGN_IN_REQUEST)

    yield put({
      type: SIGN_IN_START
    })

    try {
      const { email, password } = payload

      const user = yield call(api.signIn, email, password)

      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      yield put({
        type: SIGN_IN_ERROR,
        error
      })

      errors++
    }
  }
}

export function* signUpSaga({ payload }) {
  yield put({
    type: SIGN_UP_START
  })

  try {
    const { email, password } = payload

    const user = yield call(api.signUp, email, password)

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    })
  } catch (error) {
    yield put({
      type: SIGN_UP_ERROR,
      error
    })
  }
}

export function* stateChangeSaga({ payload }) {
  yield put({
    type: STATE_CHANGE_START
  })

  const { user } = payload

  try {
    yield put({
      type: STATE_CHANGE_SUCCESS,
      payload: { user }
    })
  } catch (error) {
    yield put({
      type: STATE_CHANGE_ERROR,
      error
    })
  }
}

export function* saga() {
  yield all([
    signInSaga(),
    takeEvery(SIGN_UP_REQUEST, signUpSaga),
    takeEvery(STATE_CHANGE_REQUEST, stateChangeSaga)
  ])
}

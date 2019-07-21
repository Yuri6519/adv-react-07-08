import { appName } from '../config'
import { Record } from 'immutable'
import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`

export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

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
  signInInfo: null
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
/* это типа селектор, просто живет здесь*/
export function isAuthSelector(state = {}) {
  const auth = state.auth || {}
  const user = auth.user || {}
  const signInInfo = auth.signInInfo || {}
  const { user: { uid: current = '' } = {} } = user
  const { uid: signed = '' } = signInInfo
  return current && signed && current === signed
}

export function currentMail(state = {}) {
  const auth = state.auth || {}
  const user = auth.user || {}
  const { user: { email = 'not defined' } = {} } = user
  return email
}

/**
 * Action Creators
 * */

export function signIn(email, password) {
  console.log('DUCK::signIn::email,password', email, password)

  return async (dispatch) => {
    dispatch({
      type: SIGN_IN_START
    })

    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      dispatch({
        type: SIGN_IN_ERROR,
        error
      })
    }
  }
}

export function signUp(email, password) {
  console.log('DUCK::signUp::email,password', email, password)

  return async (dispatch) => {
    dispatch({
      type: SIGN_UP_START
    })

    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      dispatch({
        type: SIGN_UP_ERROR,
        error
      })
    }
  }
}

export function stateChange(user) {
  console.log('DUCK::stateChange::user::', user)

  return async (dispatch) => {
    dispatch({
      type: STATE_CHANGE_START
    })

    try {
      dispatch({
        type: STATE_CHANGE_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      dispatch({
        type: STATE_CHANGE_ERROR,
        error
      })
    }
  }
}

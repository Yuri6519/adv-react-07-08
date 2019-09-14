import { appName } from '../config'
import { Record, List } from 'immutable'
import { put, takeEvery, call } from 'redux-saga/effects'
import { generateId } from '../services/utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const PEOPLE_ADD_START = `${prefix}/PEOPLE_ADD_START`
export const PEOPLE_ADD_SUCCESS = `${prefix}/PEOPLE_ADD_SUCCESS`
export const PEOPLE_ADD_ERROR = `${prefix}/PEOPLE_ADD_ERROR`

export const PEOPLE_ADD_REQUEST = `${prefix}/PEOPLE_ADD_REQUEST`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  id: null,
  lastName: null,
  userName: null,
  surName: null
})

export const ReducerList = List

export default function reducer(state = ReducerList(), action = {}) {
  const { type, payload } = action

  switch (type) {
    case PEOPLE_ADD_SUCCESS:
      return state.push(ReducerRecord(payload))
    default:
      return state
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */
// не используется после написания саги
export function addPeople(person) {
  return (dispatch) => {
    dispatch({
      type: PEOPLE_ADD_START
    })

    try {
      dispatch({
        type: PEOPLE_ADD_SUCCESS,
        payload: { id: Date.now(), ...person }
      })
    } catch (error) {
      dispatch({
        type: PEOPLE_ADD_ERROR,
        error
      })
    }
  }
}

// action creator for saga
export function addPerson(person) {
  return {
    type: PEOPLE_ADD_REQUEST,
    payload: { person }
  }
}

/**
 * Sagas
 * */
export function* addPersonSaga(action) {
  const id = yield call(generateId)
  yield put({
    type: PEOPLE_ADD_SUCCESS,
    payload: {
      id,
      ...action.payload.person
    }
  })
}

export function* saga() {
  yield takeEvery(PEOPLE_ADD_REQUEST, addPersonSaga)
}

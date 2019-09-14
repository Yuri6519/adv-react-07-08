import { appName } from '../config'
import { Record, List } from 'immutable'
import { takeEvery, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import api from '../services/api'

/**
 * Constants
 * */
export const stateName = 'conferenceList'
export const moduleName = 'conferences'
const prefix = `${appName}/${moduleName}`

export const CONFERENCES_GET_START = `${prefix}/CONFERENCES_GET_START`
export const CONFERENCES_GET_SUCCESS = `${prefix}/CONFERENCES_GET_SUCCESS`
export const CONFERENCES_GET_ERROR = `${prefix}/CONFERENCES_GET_ERROR`

export const CONFERENCES_GET_REQUEST = `${prefix}/CONFERENCES_GET_REQUEST`

/**
 * Reducer
 * */
// Record() - factory and returns function() than creates real record
// i. e ConferenceRecord is a function
const ConferenceRecord = Record({
  id: null,
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null
})

const ConferenceList = List

export const ReducerRecord = Record({
  list: null,
  error: null,
  loading: null
})

export default function reducer(state = ReducerRecord(), action = {}) {
  const { type, payload, error } = action

  switch (type) {
    case CONFERENCES_GET_START:
      return state.set('loading', true)

    case CONFERENCES_GET_SUCCESS:
      let list = []
      const { docs } = payload
      if (docs) {
        docs.forEach((doc) => {
          const record = ConferenceRecord({ id: doc.id, ...doc.data() })
          list.push(record)
        })
      }
      return state.set('loading', false).set('list', ConferenceList(list))

    case CONFERENCES_GET_ERROR:
      return state.set('loading', false).set('error', error)
    default:
      return state
  }
}

/**
 * Selectors
 * */
const stateSelector = (state) => state[stateName] || {}
const getListSelector = (state) => stateSelector(state).list
export const loadingSelector = (state) => stateSelector(state).loading || false
export const listSelector = createSelector(
  getListSelector,
  (list) => (list ? list.toJS() : [])
)

/**
 * Action Creators
 * */
export function getAll() {
  return {
    type: CONFERENCES_GET_REQUEST
  }
}

/**
 * Sagas
 * */
export function* getAllSaga() {
  yield put({
    type: CONFERENCES_GET_START
  })

  try {
    const docs = yield call(api.getConferenceList)

    yield put({
      type: CONFERENCES_GET_SUCCESS,
      payload: { docs }
    })
  } catch (error) {
    yield put({
      type: CONFERENCES_GET_ERROR,
      error
    })
  }
}

export function* saga() {
  yield takeEvery(CONFERENCES_GET_REQUEST, getAllSaga)
}

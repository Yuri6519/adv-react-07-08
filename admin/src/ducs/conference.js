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

export const CONFERENCES_ADD_TO_BASKET = `${prefix}/CONFERENCES_ADD_TO_BASKET`
export const CONFERENCES_DEL_FROM_BASKET = `${prefix}/CONFERENCES_DEL_FROM_BASKET`

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
  submissionDeadline: null,
  choosen: false
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

    // add to basket
    case CONFERENCES_ADD_TO_BASKET:
      const { id: addId } = payload
      const addLst = state.get('list')
      const addIndex = addLst.findIndex((elm) => elm.id === addId)
      return state.set(
        'list',
        addLst.update(addIndex, (value) => value.set('choosen', true))
      )

    // del from basket
    case CONFERENCES_DEL_FROM_BASKET:
      const { id: delId } = payload
      const delLst = state.get('list')
      const delIndex = delLst.findIndex((elm) => elm.id === delId)
      return state.set(
        'list',
        delLst.update(delIndex, (value) => value.set('choosen', false))
      )

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

export function addToBasket(id) {
  return {
    type: CONFERENCES_ADD_TO_BASKET,
    payload: { id }
  }
}

export function delFromBasket(id) {
  return {
    type: CONFERENCES_DEL_FROM_BASKET,
    payload: { id }
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

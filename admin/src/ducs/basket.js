import { appName } from '../config'
import { Record, List } from 'immutable'
import { createSelector } from 'reselect'
import { put, call, all, takeEvery } from 'redux-saga/effects'
import { generateId } from '../services/utils'

/**
 * Constants
 * */
export const moduleName = 'basket'
const prefix = `${appName}/${moduleName}`

export const BASKET_ADD_START = `${prefix}/BASKET_ADD_START`
export const BASKET_ADD_SUCCESS = `${prefix}/BASKET_ADD_SUCCESS`
export const BASKET_ADD_ERROR = `${prefix}/BASKET_ADD_ERROR`
export const BASKET_ADD_REQUEST = `${prefix}/BASKET_ADD_REQUEST`

export const BASKET_GET_START = `${prefix}/BASKET_GET_START`
export const BASKET_GET_SUCCESS = `${prefix}/BASKET_GET_SUCCESS`
export const BASKET_GET_ERROR = `${prefix}/BASKET_GET_ERROR`
export const BASKET_GET_REQUEST = `${prefix}/BASKET_GET_REQUEST`

export const BASKET_DEL_START = `${prefix}/BASKET_DEL_START`
export const BASKET_DEL_SUCCESS = `${prefix}/BASKET_DEL_SUCCESS`
export const BASKET_DEL_ERROR = `${prefix}/BASKET_DEL_ERROR`
export const BASKET_DEL_REQUEST = `${prefix}/BASKET_DEL_REQUEST`

/**
 * Reducer
 * */
export const BasketRecord = Record({
  id: null,
  entityType: null,
  entityId: null
})

const ReducerList = List

export const ReducerRecord = Record({
  list: null,
  error: null,
  loading: null,
  saving: null,
  deleting: null
})

export default function reducer(state = ReducerRecord(), action = {}) {
  const { type, payload, error } = action

  switch (type) {
    // get
    case BASKET_GET_START:
      return state.set('loading', true)

    case BASKET_GET_SUCCESS:
      const list = []
      return state.set('loading', false).set('list', ReducerList(list))

    case BASKET_GET_ERROR:
      return state.set('loading', false).set('error', error)

    // add
    case BASKET_ADD_START:
      return state.set('saving', true)

    case BASKET_ADD_SUCCESS:
      const { record } = payload
      const ls = state.get('list').push(
        BasketRecord({
          id: record.id,
          entityType: record.entityType,
          entityId: record.entityId
        })
      )
      return state.set('saving', false).set('list', ls)

    case BASKET_ADD_ERROR:
      return state.set('saving', false).set('error', error)

    // del
    case BASKET_DEL_START:
      return state.set('deleting', true)

    case BASKET_DEL_SUCCESS:
      const { id } = payload
      const lst = state.get('list')
      const index = lst.findIndex((elm) => elm.id === id)

      return state.set('deleting', false).set('list', lst.delete(index))

    case BASKET_DEL_ERROR:
      return state.set('deleting', false).set('error', error)

    default:
      return state
  }
}

/**
 * Selectors
 * */
const stateSelector = (state) => state[moduleName] || {}
const getListSelector = (state) => stateSelector(state).list
export const loadingSelector = (state) => stateSelector(state).loading || false
export const savingSelector = (state) => stateSelector(state).saving || false
export const deletingSelector = (state) => stateSelector(state).deleting || null
export const errorSelector = (state) => stateSelector(state).error || null
export const listSelector = createSelector(
  getListSelector,
  (list) => (list ? list.toJS() : [])
)

/**
 * Action Creators
 * */
export function getBasket() {
  return {
    type: BASKET_GET_REQUEST
  }
}

export function addToBasket(record) {
  return {
    type: BASKET_ADD_REQUEST,
    payload: { record }
  }
}

export function delFromBasket(id) {
  return {
    type: BASKET_DEL_REQUEST,
    payload: { id }
  }
}

/**
 * Sagas
 * */
export function* getBasketSaga() {
  yield put({ type: BASKET_GET_START })
  yield put({ type: BASKET_GET_SUCCESS })
}

export function* addBasketSaga(action) {
  yield put({ type: BASKET_ADD_START })

  try {
    const id = yield call(generateId)

    const {
      payload: { record = {} }
    } = action

    yield put({
      type: BASKET_ADD_SUCCESS,
      payload: { record: { id, ...record } }
    })
  } catch (error) {
    put({
      type: BASKET_ADD_ERROR,
      error
    })
  }
}

export function* delBasketSaga(action) {
  yield put({ type: BASKET_DEL_START })

  try {
    const {
      payload: { id }
    } = action

    yield put({
      type: BASKET_DEL_SUCCESS,
      payload: { id }
    })
  } catch (error) {
    put({
      type: BASKET_DEL_ERROR,
      error
    })
  }
}

export function* saga() {
  yield all([
    takeEvery(BASKET_GET_REQUEST, getBasketSaga),
    takeEvery(BASKET_ADD_REQUEST, addBasketSaga),
    takeEvery(BASKET_DEL_REQUEST, delBasketSaga)
  ])
}

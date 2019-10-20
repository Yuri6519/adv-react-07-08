import { appName } from '../config'
import { Record, List } from 'immutable'
import {
  put,
  takeEvery,
  call,
  delay,
  all,
  fork,
  spawn,
  cancel,
  cancelled,
  race,
  take
} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { createSelector } from 'reselect'
import { generateId } from '../services/utils'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const PEOPLE_ADD_START = `${prefix}/PEOPLE_ADD_START`
export const PEOPLE_ADD_SUCCESS = `${prefix}/PEOPLE_ADD_SUCCESS`
export const PEOPLE_ADD_ERROR = `${prefix}/PEOPLE_ADD_ERROR`
export const PEOPLE_ADD_REQUEST = `${prefix}/PEOPLE_ADD_REQUEST`

export const PEOPLE_GET_START = `${prefix}/PEOPLE_GET_START`
export const PEOPLE_GET_SUCCESS = `${prefix}/PEOPLE_GET_SUCCESS`
export const PEOPLE_GET_ERROR = `${prefix}/PEOPLE_GET_ERROR`
export const PEOPLE_GET_REQUEST = `${prefix}/PEOPLE_GET_REQUEST`

export const PEOPLE_ADD_CONF_REQUEST = `${prefix}/PEOPLE_ADD_CONF_REQUEST`

export const PEOPLE_ADD_TO_BASKET = `${prefix}/PEOPLE_ADD_TO_BASKET`
export const PEOPLE_DEL_FROM_BASKET = `${prefix}/PEOPLE_DEL_FROM_BASKET`

export const PEOPLE_ONLINE_SYNC_SUCCESS = `${prefix}/PEOPLE_ONLINE_SYNC_SUCCESS`

export const PEOPLE_DELETE_START = `${prefix}/PEOPLE_DELETE_START`
export const PEOPLE_DELETE_SUCCESS = `${prefix}/PEOPLE_DELETE_SUCCESS`
export const PEOPLE_DELETE_ERROR = `${prefix}/PEOPLE_DELETE_ERROR`
export const PEOPLE_DELETE_REQUEST = `${prefix}/PEOPLE_DELETE_REQUEST`

/**
 * Reducer
 * */
export const PeopleRecord = Record({
  id: null,
  lastName: null,
  userName: null,
  surName: null,
  email: null,
  choosen: false
})

const ReducerList = List

export const ReducerRecord = Record({
  list: null,
  error: null,
  loading: null,
  saving: null
})

export default function reducer(state = ReducerRecord(), action = {}) {
  const { type, payload, error } = action

  switch (type) {
    // get
    case PEOPLE_GET_START:
      return state.set('loading', true)

    case PEOPLE_GET_SUCCESS:
    case PEOPLE_ONLINE_SYNC_SUCCESS:
      const list = []
      const { people = [] } = payload
      people.forEach((person) => {
        list.push(PeopleRecord({ id: person.id, ...person.data() }))
      })
      return state.set('loading', false).set('list', ReducerList(list))

    case PEOPLE_GET_ERROR:
      return state.set('loading', false).set('error', error)

    // set
    case PEOPLE_ADD_START:
      return state.set('saving', true)

    case PEOPLE_ADD_SUCCESS:
      // закоммитил, т.к. перечитываю список с fork / spawn / channel
      // const { person } = payload
      // const ls = state
      //   .get('list')
      //   .push(PeopleRecord({ id: person.id, ...person.data() }))
      // return state.set('saving', false).set('list', ls)
      return state.set('saving', false)

    case PEOPLE_ADD_ERROR:
      return state.set('saving', false).set('error', error)

    // add to basket
    case PEOPLE_ADD_TO_BASKET:
      const { id: addId } = payload
      const addLst = state.get('list')
      const addIndex = addLst.findIndex((elm) => elm.id === addId)
      return state.set(
        'list',
        addLst.update(addIndex, (value) => value.set('choosen', true))
      )

    // del from basket
    case PEOPLE_DEL_FROM_BASKET:
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
const stateSelector = (state) => state[moduleName] || {}
const getListSelector = (state) => stateSelector(state).list
export const loadingSelector = (state) => stateSelector(state).loading || false
export const savingSelector = (state) => stateSelector(state).saving || false
export const errorSelector = (state) => stateSelector(state).error || null
export const listSelector = createSelector(
  getListSelector,
  (list) => (list ? list.toJS() : [])
)

/**
 * Action Creators
 * */
// Thunk
// не используется после написания саги
// export function addPeople(person) {
//   return (dispatch) => {
//     dispatch({
//       type: PEOPLE_ADD_START
//     })

//     try {
//       dispatch({
//         type: PEOPLE_ADD_SUCCESS,
//         payload: { id: Date.now(), ...person }
//       })
//     } catch (error) {
//       dispatch({
//         type: PEOPLE_ADD_ERROR,
//         error
//       })
//     }
//   }
// }

// action creator for saga
export function addPerson(person) {
  return {
    type: PEOPLE_ADD_REQUEST,
    payload: { person }
  }
}

export function getAllPeople() {
  return {
    type: PEOPLE_GET_REQUEST
  }
}

export function addConfToPerson(personId, confId) {
  return {
    type: PEOPLE_ADD_CONF_REQUEST,
    pyload: { personId, confId }
  }
}

export function addToBasket(id) {
  return {
    type: PEOPLE_ADD_TO_BASKET,
    payload: { id }
  }
}

export function delFromBasket(id) {
  return {
    type: PEOPLE_DEL_FROM_BASKET,
    payload: { id }
  }
}

export function delPerson(id) {
  return {
    type: PEOPLE_DELETE_REQUEST,
    payload: { id }
  }
}

/**
 * Sagas
 * */
export function* addPersonSaga(action) {
  yield put({ type: PEOPLE_ADD_START })

  try {
    const id = yield call(generateId)

    const { payload: { person } = {} } = action

    if (!person) throw new Error(`invalid person object`)

    yield call(api.savePerson, id + '', person)

    // removed because chanell is esed
    // const res = yield call(api.getPerson, id + '')

    // if (!res)
    //   throw new Error(`failed receive data after saving to DB: res is null`)

    yield put({
      type: PEOPLE_ADD_SUCCESS
      // payload: { person: res }
    })
  } catch (error) {
    yield put({
      type: PEOPLE_ADD_ERROR,
      error
    })
  }
}

export function* delPersonSaga(action) {
  yield put({ type: PEOPLE_DELETE_START })

  try {
    const { payload: { id } = {} } = action

    yield call(api.delPerson, id + '')

    yield put({
      type: PEOPLE_DELETE_SUCCESS
    })
  } catch (error) {
    yield put({
      type: PEOPLE_DELETE_ERROR,
      error
    })
  }
}

export function* getPeopleListSaga() {
  yield put({ type: PEOPLE_GET_START })

  try {
    const people = yield call(api.getPeopleList)

    yield put({
      type: PEOPLE_GET_SUCCESS,
      payload: { people }
    })
  } catch (error) {
    yield put({
      type: PEOPLE_GET_ERROR,
      error
    })
  }
}

export function* syncPeoplehWithStorageSaga() {
  try {
    let i = 0
    while (true) {
      if (i++ >= 5) throw new Error('some error ocured')

      console.log('saga-----', i)
      yield call(getPeopleListSaga)
      yield delay(1000)
    }
  } finally {
    if (yield cancelled()) {
      console.log('saga-----saga has been canceled')
    }
    console.log('saga-----saga common logic finished')
  }
}

export function* cancelSyncSaga() {
  yield race({
    sync: syncPeoplehWithStorageSaga(),
    timeout: delay(3000)
  })
  // const task = yield fork(syncPeoplehWithStorageSaga)
  // yield delay(3000)
  // yield cancel(task)
}

//api.subscribeForPeople(snapshot => console.log('subscribeForPeople::subscribeForPeople::', snapshot))

const createChanel = () => eventChannel((emit) => api.subscribeForPeople(emit))

export function* onlineSyncSaga() {
  const chan = yield call(createChanel)

  while (true) {
    const data = yield take(chan)

    yield put({
      type: PEOPLE_ONLINE_SYNC_SUCCESS,
      payload: { people: data }
    })
  }
}

export function* saga() {
  yield spawn(onlineSyncSaga)
  yield all([
    yield takeEvery(PEOPLE_ADD_REQUEST, addPersonSaga),
    yield takeEvery(PEOPLE_DELETE_REQUEST, delPersonSaga)
    //yield takeEvery(PEOPLE_GET_REQUEST, getPeopleListSaga)
  ])
}

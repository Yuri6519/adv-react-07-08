import { appName } from '../config'
import { Record, List } from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const PEOPLE_ADD_START = `${prefix}/PEOPLE_ADD_START`
export const PEOPLE_ADD_SUCCESS = `${prefix}/PEOPLE_ADD_SUCCESS`
export const PEOPLE_ADD_ERROR = `${prefix}/PEOPLE_ADD_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  lastName: null,
  userName: null,
  surName: null
})

export const ReducerList = List

export default function reducer(state = new ReducerList(), action) {
  const { type, payload } = action

  switch (type) {
    case PEOPLE_ADD_SUCCESS:
      return state.push(new ReducerRecord(payload))
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

export function addPeople(lastName, userName, surName) {
  return async (dispatch) => {
    dispatch({
      type: PEOPLE_ADD_START
    })

    try {
      dispatch({
        type: PEOPLE_ADD_SUCCESS,
        payload: { lastName, userName, surName }
      })
    } catch (error) {
      dispatch({
        type: PEOPLE_ADD_ERROR,
        error
      })
    }
  }
}

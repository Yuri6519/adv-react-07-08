import { put, call } from 'redux-saga/effects'
import { PEOPLE_ADD_REQUEST, PEOPLE_ADD_SUCCESS, addPersonSaga } from './people'
import { generateId } from '../services/utils'

describe('people duck', () => {
  describe('add people saga', () => {
    it('should add person', () => {
      const person = {
        lastName: 'last_name_test',
        userName: 'user_name_test',
        surName: 'sur_name_test'
      }

      const action = {
        type: PEOPLE_ADD_REQUEST,
        payload: { person }
      }

      const saga = addPersonSaga(action)

      const { value: valCall } = saga.next()

      expect(valCall).toEqual(call(generateId))

      const id = generateId()
      const { value } = saga.next(id)

      expect(value).toEqual(
        put({
          type: PEOPLE_ADD_SUCCESS,
          payload: {
            id,
            ...action.payload.person
          }
        })
      )

      expect(saga.next().done).toBe(true)
    })
  })
})

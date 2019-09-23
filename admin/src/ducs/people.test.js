import { put, call } from 'redux-saga/effects'
import { PEOPLE_ADD_REQUEST, PEOPLE_ADD_SUCCESS, addPersonSaga } from './people'
import { generateId } from '../services/utils'
import api from '../services/api'

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

      const {
        value: { type }
      } = saga.next()
      expect(type.toUpperCase()).toEqual('PUT')

      let { value: valCall } = saga.next()
      expect(valCall).toEqual(call(generateId))

      const id = generateId()
      valCall = saga.next(id).value
      expect(valCall).toEqual(call(api.savePerson, id + '', person))

      valCall = saga.next().value
      expect(valCall).toEqual(call(api.getPerson, id + ''))

      const resPerson = saga.next({ id, ...person }).value
      expect(resPerson).toEqual(
        put({
          type: PEOPLE_ADD_SUCCESS,
          payload: { person: { id, ...person } }
        })
      )

      expect(saga.next().done).toBe(true)
    })
  })
})

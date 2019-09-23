import reducer, { ReducerRecord, SIGN_IN_SUCCESS } from './auth'

describe('auth duck', () => {
  it('should sign-in', () => {
    const state = new ReducerRecord()
    const user = {
      email: 'test@test.ts',
      psw: Math.random().toString()
    }
    const action = {
      type: SIGN_IN_SUCCESS,
      payload: { user }
    }
    const newState = reducer(state, action)

    expect(newState).toEqual(new ReducerRecord({ loading: false, user }))
  })
})

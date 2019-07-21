import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from '../history'
import { reducer as form } from 'redux-form'
import auth from '../ducs/auth'
import people from '../ducs/people'

export default combineReducers({
  router: connectRouter(history),
  form,
  auth,
  people
})

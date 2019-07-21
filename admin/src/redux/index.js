import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducer'
import history from '../history'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = applyMiddleware(thunk, routerMiddleware(history), logger)

export default createStore(
  reducer,
  composeEnhancers(enhancer)
  //enhancer,
)

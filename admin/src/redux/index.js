import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
//import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import reducer from './reducer'
import history from '../history'
import rootSaga from './saga'
import { init as initAuth } from '../ducs/auth'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = applyMiddleware(
  sagaMiddleware,
  /*thunk,*/ routerMiddleware(history),
  logger
)
const store = createStore(reducer, composeEnhancers(enhancer))

sagaMiddleware.run(rootSaga)

initAuth(store)

export default store

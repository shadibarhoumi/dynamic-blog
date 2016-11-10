import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/rootReducer'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)

  const store = finalCreateStore(rootReducer, initialState)

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers/rootReducer', () => {
  //     const nextReducer = require('../reducers/rootReducer')
  //     store.replaceReducer(nextReducer)
  //   })
  // }

  return store
}
import { Map } from 'immutable'

import photosReducer from './photosReducer'

const initialState = Map({
  photos: [],
  photosByDate: {},
  photosByTag: {},
  tags: [],
})

const allReducer = {
  ...photosReducer
}

if (allReducer['undefined'] !== undefined) {
  console.warn(
    'Handler with potentially misspelled type',
    allReducer['undefined'].toString()
  )
}

const rootReducer = (state = initialState, action) => {
  const handler = allReducer[action.type]

  if (handler === undefined && action.type !== '@@INIT') console.warn('No handler for action', action)

  let newState = state
  newState = handler ? handler(newState, action) : newState

  return newState
}

export default rootReducer
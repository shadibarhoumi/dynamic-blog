import { Map, List } from 'immutable'

import PhotoReducer from './PhotoReducer'
import UIPhotoReducer from './UIPhotoReducer'

const initialState = Map({
  photosByDate: {},
  photosByTag: {},
  photos: [],
  tags: [],
  slideshow: Map({
    visible: false,
    photoIndex: 0
  }),
  currentFilter: Map({
    tags: List([]),
    startDate: undefined,
    endDate: undefined
  })
})

const allReducer = {
  ...PhotoReducer,
  ...UIPhotoReducer
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
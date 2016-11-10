import { types } from '../constants/PhotoConstants'

const handlers = {}

handlers[types.SET_PHOTOS] = (state, action) => {
  return state.set('photos', action.photos)
}

handlers[types.SET_TAGS] = (state, action) => {
  return state.set('tags', action.tags)
}

export default handlers
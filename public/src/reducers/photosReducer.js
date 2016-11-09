import * as consts from '../constants/photosConstants'

const initialState = {
  photosList: {
    photos: [],
    loading: false,
  },
  tagsList: {
    tags: [],
    loading: false,
  }
}

export default (state = initialState, action) => {
  switch(action.type) {

  case consts.FETCH_PHOTOS:
    return {
      ...state,
      photosList: {
        photos: [],
        loading: true,
      },
    }
  case consts.SET_PHOTOS:
    return {
      ...state,
      photosList: {
        photos: action.photos,
        loading: false,
      },
    }
  case consts.FETCH_TAGS:
    return {
      ...state,
      tagsList: {
        tags: [],
        loading: true,
      },
    }
  case consts.SET_TAGS:
    return {
      ...state,
      tagsList: {
        tags: action.tags,
        loading: false,
      },
    }
  default:
    return state
  }
}
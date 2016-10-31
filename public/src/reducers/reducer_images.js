import {
	FETCH_IMAGES, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAILURE
} from '../actions/images';

const INITIAL_STATE = {
  imagesList: {
    images: [],
    loading: false,
    error: null
  }
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

  case FETCH_IMAGES: // start fetching images and set loading = true
    return {
      ...state,
      imagesList: {
        images: [],
        loading: true,
        error: null
      },
    };
  case FETCH_IMAGES_SUCCESS: // return images and make loading = false
    return {
      ...state,
      imagesList: {
        images: action.payload.data,
        loading: false,
        error: null
      },
    };
  case FETCH_IMAGES_FAILURE: // set error and loading = false
    error = action.payload.data || { message: action.payload.message };
    return {
      ...state,
      imagesList: {
        images: [],
        loading: false,
        error
      },
    };
  default:
    return state;
  }
}
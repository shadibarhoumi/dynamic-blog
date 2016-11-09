import { combineReducers } from 'redux';
import PostsReducer from './postsReducer';
import PhotosReducer from './photosReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostsReducer,
  photos: PhotosReducer,
  form: formReducer,
});

export default rootReducer;

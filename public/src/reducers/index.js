import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import ImagesReducer from './reducer_images';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostsReducer,
  images: ImagesReducer,
  form: formReducer,
});

export default rootReducer;

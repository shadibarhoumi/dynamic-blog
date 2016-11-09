import { connect } from 'react-redux'
import {
  fetchPhotosForTag, fetchPhotosSuccess, fetchPhotosFailure,
  fetchTags, fetchTagsSuccess, fetchTagsFailure,
} from '../actions/photos';

import TagView from '../components/TagView';


const mapStateToProps = (state) => {
  return {
    photosList: state.photos.photosList,
    tagsList: state.photos.tagsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPhotosForTag: (tagName) => {
      dispatch(fetchPhotosForTag(tagName))
      .then((response) => {
          !response.error ? dispatch(fetchPhotosSuccess(response.payload)) : dispatch(fetchPhotosFailure(response.payload));
        });
    },
    fetchTags: () => {
      dispatch(fetchTags())
      .then((response) => {
          !response.error ? dispatch(fetchTagsSuccess(response.payload)) : dispatch(fetchTagsFailure(response.payload));
        });
    }
  }
}


const TagViewContainer = connect(mapStateToProps, mapDispatchToProps)(TagView)

export default TagViewContainer

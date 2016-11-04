import { connect } from 'react-redux'
import {
  fetchImagesForTag, fetchImagesSuccess, fetchImagesFailure,
  fetchTags, fetchTagsSuccess, fetchTagsFailure,
} from '../actions/images';

import TagView from '../components/TagView';


const mapStateToProps = (state) => {
  return {
    imagesList: state.images.imagesList,
    tagsList: state.images.tagsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImagesForTag: (tagName) => {
      dispatch(fetchImagesForTag(tagName))
      .then((response) => {
          !response.error ? dispatch(fetchImagesSuccess(response.payload)) : dispatch(fetchImagesFailure(response.payload));
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

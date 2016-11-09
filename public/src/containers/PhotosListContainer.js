import { connect } from 'react-redux'
import { fetchPhotos, fetchPhotosSuccess, fetchPhotosFailure } from '../actions/photos';

import PhotosList from '../components/PhotosList';


const mapStateToProps = (state) => {
  return {
    photosList: state.photos.photosList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPhotos: () => {
      dispatch(fetchPhotos())
      .then((response) => {
          !response.error ? dispatch(fetchPhotosSuccess(response.payload)) : dispatch(fetchPhotosFailure(response.payload));
        });
    }
  }
}


const PhotosListContainer = connect(mapStateToProps, mapDispatchToProps)(PhotosList)

export default PhotosListContainer

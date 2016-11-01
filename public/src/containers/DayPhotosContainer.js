import { connect } from 'react-redux'
import { fetchImages, fetchImagesSuccess, fetchImagesFailure } from '../actions/images';

import DayPhotos from '../components/DayPhotos';


const mapStateToProps = (state) => {
  return {
    imagesList: state.images.imagesList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImages: (dateString) => {
      dispatch(fetchImages(dateString))
      .then((response) => {
          !response.error ? dispatch(fetchImagesSuccess(response.payload)) : dispatch(fetchImagesFailure(response.payload));
        });
    }
  }
}


const DayPhotosContainer = connect(mapStateToProps, mapDispatchToProps)(DayPhotos)

export default DayPhotosContainer

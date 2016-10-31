import { connect } from 'react-redux'
import { fetchImages, fetchImagesSuccess, fetchImagesFailure } from '../actions/images';

import ImagesList from '../components/ImagesList';


const mapStateToProps = (state) => {
  return {
    imagesList: state.images.imagesList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImages: () => {
      dispatch(fetchImages())
      .then((response) => {
          !response.error ? dispatch(fetchImagesSuccess(response.payload)) : dispatch(fetchImagesFailure(response.payload));
        });
    }
  }
}


const ImagesListContainer = connect(mapStateToProps, mapDispatchToProps)(ImagesList)

export default ImagesListContainer

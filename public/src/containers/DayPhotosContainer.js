import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as PhotosActions from '../actions/photos'

import DayPhotos from '../components/DayPhotos';


const mapStateToProps = (state) => {
  return {
    photosList: state.photos.photosList,
    tagsList: state.photos.tagsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(PhotosActions, dispatch)
}

const DayPhotosContainer = connect(mapStateToProps, mapDispatchToProps)(DayPhotos)

export default DayPhotosContainer

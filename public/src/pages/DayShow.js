import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import * as PhotoActions from '../actions/PhotoActions'
import PhotoBlock from '../components/PhotoBlock'

class DayShow extends Component {
  componentWillMount() {
    this.props.fetchPhotosWithDate(this.props.params.dateString)
  }

  componentWillUnmount() {
    this.props.resetPhotos()
  }

  render() {
    return <div>
      <h1>Photos taken on {moment(this.props.params.dateString, 'MM-DD-YYYY').format('dddd, MMMM Do YYYY')}</h1>
      <PhotoBlock
        photos={this.props.photos}
      />
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    photos: state.get('photos')
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(PhotoActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DayShow)
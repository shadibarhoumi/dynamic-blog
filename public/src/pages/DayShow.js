import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import * as PhotoActions from '../actions/PhotoActions'
import PhotoBlock from '../components/PhotoBlock'
import { dateFormatter } from '../helpers/PhotoHelpers'

class DayShow extends Component {

  componentWillMount() {
    this.dateString = this.props.params.dateString
    this.formattedDate = dateFormatter.formatDateFromSlug(this.dateString)
    this.props.fetchPhotosForDate(this.dateString)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.dateString !== this.props.params.dateString) {
      const nextDateString = nextProps.params.dateString
      this.formattedDate = dateFormatter.formatDateFromSlug(nextDateString)
      this.props.fetchPhotosForDate(nextDateString)
    }
  }

  componentWillUnmount() {
    this.props.resetPhotos()
  }

  render() {
    return <div>
      <h1>Photos taken on {this.formattedDate}</h1>
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
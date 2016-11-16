import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { dateFormatter } from '../helpers/PhotoHelpers'

import * as PhotoActions from '../actions/PhotoActions'
import PhotoSection from '../components/PhotoSection'

class Feed extends Component {
  componentWillMount() {
    this.props.fetchPhotosByDate()
  }

  componentWillUnmount() {
    this.props.resetPhotos()
  }

  render() {
    return <div>
      <h1>Feed</h1>
      {Object.keys(this.props.photosByDate).map(date => {
        const dateData = this.props.photosByDate[date]
        return <PhotoSection
          key={date}
          header={dateFormatter.formatDate(date)}
          photos={dateData.photos}
        />
      })}
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    photosByDate: state.get('photosByDate')
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(PhotoActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
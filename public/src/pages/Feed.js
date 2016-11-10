import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import * as PhotoActions from '../actions/PhotoActions'
import PhotoBlock from '../components/PhotoBlock'

class Feed extends Component {
  componentWillMount() {
    this.props.fetchMostRecentPhotos()
  }

  componentWillUnmount() {
    console.log('Feed Unmounting, reset data!')
  }

  render() {
    return <div>
      <h1>Feed</h1>
      {this.props.photosByDate.map(date => {
        return <div key={date._id}>
          <h2>{moment(date._id).format('dddd, MMMM Do')}</h2>
          <PhotoBlock
            photos={date.photos}
          />
        </div>
      })}
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    photosByDate: state.get('photos')
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(PhotoActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
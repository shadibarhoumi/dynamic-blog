import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PhotoActions from '../actions/PhotoActions'
import PhotoBlock from '../components/PhotoBlock'

class Feed extends Component {
  componentWillMount() {
    this.props.fetchMostRecentPhotos()
  }

  render() {
    return <div>
      <h1>Feed</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
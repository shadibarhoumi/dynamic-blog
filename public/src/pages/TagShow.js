import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import * as PhotoActions from '../actions/PhotoActions'
import PhotoBlock from '../components/PhotoBlock'

class TagShow extends Component {
  componentWillMount() {
    this.fullTag = '#' + this.props.params.tag
    this.props.fetchPhotosWithTag(this.props.params.tag)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.tag !== this.props.params.tag) {
      this.props.fetchPhotosWithTag(nextProps.params.tag)
      this.fullTag = '#' + nextProps.params.tag
    }
  }

  componentWillUnmount() {
    this.props.resetPhotos()
  }

  render() {
    return <div>
      <h1>{this.fullTag}</h1>
      <PhotoBlock
        photos={this.props.photos}
      />
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    photos: state.getIn('photos')
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(PhotoActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TagShow)
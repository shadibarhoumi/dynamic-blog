import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import Header from '../components/Header'

import * as PhotoActions from '../actions/PhotoActions'
import PhotoBlock from '../components/PhotoBlock'

class TagShow extends Component {
  componentWillMount() {
    this.fullTag = '#' + this.props.params.tag
    this.props.fetchPhotosForTag(this.props.params.tag)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.tag !== this.props.params.tag) {
      this.props.fetchPhotosForTag(nextProps.params.tag)
      this.fullTag = '#' + nextProps.params.tag
    }
  }

  componentWillUnmount() {
    this.props.resetPhotos()
  }

  render() {
    return <div>
      <Header page='tags' />
      <h1>{this.fullTag}</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(TagShow)
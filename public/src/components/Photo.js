import React, { Component } from 'react'
import moment from 'moment'
import classnames from 'classnames'

import Caption from './Caption'

class Photo extends Component {

  render() {
    const { photo } = this.props
    return <img
      style={this.props.style}
      src={photo.sizes.medium.url}
    />
  }
}


export default Photo

import React, { Component } from 'react'
import moment from 'moment'
import classnames from 'classnames'

import Caption from './Caption'

class Photo extends Component {

  render() {
    const { photo } = this.props

    let url;
    if (this.props.size === 'medium') {
      url = photo.sizes.medium.url
    } else if (this.props.size === 'large') {
      url = photo.sizes.large.url
    } else {
      url = photo.sizes.medium.url
    }

    return <img
      style={this.props.style}
      src={url}
    />
  }
}

export default Photo

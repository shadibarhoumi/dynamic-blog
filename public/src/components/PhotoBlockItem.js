import React, { Component } from 'react'
import moment from 'moment'

import Photo from './Photo'
import Video from './Video'
import Caption from './Caption'


class PhotoBlockItem extends Component {

  renderPhotoOrVideo(photo) {
    if (photo.media === 'photo') {
      return <Photo
        style={...this.props.style.width, ...this.props.style.height}
        photo={photo}
      />
    } else if (photo.media === 'video') {
      return <Video
        style={...this.props.style.width, ...this.props.style.height}
        video={photo}
      />
    }
  }

  renderCaption(photo) {
    return <Caption
      dateTaken={photo.dateTaken}
      title={photo.sizes.medium.width + 'x' + photo.sizes.medium.height}
      tags={photo.tags}
    />
  }

  render() {
    const { photo } = this.props

    return <div style={this.props.style}>
      {this.renderPhotoOrVideo(photo)}
    </div>
  }
}


export default PhotoBlockItem

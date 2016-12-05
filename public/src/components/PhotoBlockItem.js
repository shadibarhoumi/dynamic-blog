import React, { Component } from 'react'
import moment from 'moment'

import Photo from './Photo'
import Video from './Video'
import Caption from './Caption'


class PhotoBlockItem extends Component {

  renderPhotoOrVideo(photo) {
    if (photo.media === 'photo') {
      return <Photo photo={photo} />
    } else if (photo.media === 'video') {
      return <Video video={photo} />
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

    return <div>
      {this.renderPhotoOrVideo(photo)}
    </div>
  }
}


export default PhotoBlockItem

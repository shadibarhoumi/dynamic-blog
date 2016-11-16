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

  render() {
    const { photo } = this.props

    return <div>
      {this.renderPhotoOrVideo(photo)}
      <Caption
        dateTaken={photo.dateTaken}
        title={photo.title}
        tags={photo.tags}
      />
    </div>
  }
}


export default PhotoBlockItem

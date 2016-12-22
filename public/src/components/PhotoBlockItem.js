import React, { Component } from 'react'
import moment from 'moment'

import Photo from './Photo'
import Video from './Video'
import Caption from './Caption'

import styles from './PhotoBlockItem.css'


class PhotoBlockItem extends Component {

  renderPhotoOrVideo(photo) {
    if (photo.media === 'photo') {
      return <Photo
        size='medium'
        style={{
          width: this.props.style.width,
          height: this.props.style.height
        }}
        photo={photo}
      />
    } else if (photo.media === 'video') {
      return <Video
        size='medium'
        style={{
          width: this.props.style.width,
          height: this.props.style.height
        }}
        video={photo}
      />
    }
  }

  renderCaption(photo) {
    return <Caption
      dateTaken={photo.dateTaken}
      title={photo.title}
      tags={photo.tags}
    />
  }

  render() {
    const { photo } = this.props

    return <div
      className={styles.mediaWrapper}
      onClick={() => this.props.showSlideshowAtIndex(this.props.photoIndex)}
      style= {{
        ...this.props.style,
        overflow: 'hidden',
      }}
    >
      {this.renderPhotoOrVideo(photo)}
      <div className={styles.hoverWrapper}>
        {this.renderCaption(photo)}
      </div>
    </div>
  }
}


export default PhotoBlockItem

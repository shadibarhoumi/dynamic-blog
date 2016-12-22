import React, { Component } from 'react'

import Photo from './Photo.js'
import Video from './Video.js'

import Measure from 'react-measure'

import styles from './Slideshow.css'

const Slideshow = React.createClass({

  getIntialState() {
    this.SLIDESHOW_PADDING = 60
  },

  handlePreviousPhotoClick(e) {
    e.preventDefault()

    const { photoIndex } = this.props

    if (photoIndex - 1 >= 0) {
      this.props.setSlideshowPhotoIndex(photoIndex - 1)
    }
  },

  handleNextPhotoClick(e) {
    e.preventDefault()

    const { photoIndex } = this.props

    if (photoIndex + 1 < this.props.photos.length) {
      this.props.setSlideshowPhotoIndex(photoIndex + 1)
    }
  },

  renderPhotoOrVideo(photo) {
    if (photo.media === 'photo') {
      return <Photo
        size='large'
        style={{
          height: '100%'
        }}
        photo={photo}
      />
    } else if (photo.media === 'video') {
      return <Video
        size='large'
        video={photo}
      />
    }
  },

  oldRender() {
    if (!this.props.visible) return null

    const photo = this.props.photos[this.props.photoIndex]
    if (!photo) return null

    return <div>
      <div className={styles.slideshowWrapper}>
        <span
          className={styles.close}
          onClick={() => this.props.setSlideshowVisible(false)}
        >
          &times;
        </span>

        <div className={styles.mediaWrapper}>
          <div className={styles.photoWrapper}>
            {this.renderPhotoOrVideo(photo)}
          </div>

          <div className={styles.controls}>
            <a href='#' onClick={this.handlePreviousPhotoClick}>prev</a>
            /
            <a href='#' onClick={this.handleNextPhotoClick}>next</a>
          </div>
        </div>
      </div>
    </div>
  },

  renderPhoto(photo, containerDimensions) {
    return <div>
      <div className={styles.slideshowWrapper}>
        <div className={styles.photoWrapper}>
          {this.renderPhotoOrVideo(photo)}
        </div>
      </div>
    </div>
  },

  render() {
    const photo = this.props.photos[this.props.photoIndex]

    if (!this.props.visible || !photo) return null

    return <Measure>
      {containerDimensions => this.renderPhoto(photo, containerDimensions)}
    </Measure>
  }
})


export default Slideshow

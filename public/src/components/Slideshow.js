import React, { Component } from 'react'

import Photo from './Photo'
import Video from './Video'
import Caption from './Caption'

import Measure from 'react-measure'

import styles from './Slideshow.css'

const PHOTO_PADDING = 100

const Slideshow = React.createClass({

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeydown, false)
  },

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown, false)
  },

  handleKeydown(e) {
    if (this.props.visible) {
      if (e.keyCode === 37) { // left arrow
        e.preventDefault()
        this.previousPhoto()
      } else if (e.keyCode === 39) { // right arrow
        e.preventDefault()
        this.nextPhoto()
      }
    }
  },

  previousPhoto() {
    const { photoIndex } = this.props

    if (photoIndex - 1 >= 0) {
      this.props.setSlideshowPhotoIndex(photoIndex - 1)
    }
  },

  nextPhoto() {
    const { photoIndex } = this.props

    if (photoIndex + 1 < this.props.photos.length) {
      this.props.setSlideshowPhotoIndex(photoIndex + 1)
    }
  },

  handlePreviousPhotoClick(e) {
    e.preventDefault()
    this.previousPhoto()
  },

  handleNextPhotoClick(e) {
    e.preventDefault()
    this.nextPhoto()
  },

  handleSlideshowWrapperClick(e) {
    if (e.target.className === styles.slideshowWrapper) {
      this.props.setSlideshowVisible(false)
    }
  },

  renderPhotoOrVideo(photo, containerDimensions) {
    // fit image vertically with PHOTO_PADDING on top and bottom
    let aspectRatio = photo.sizes.large.width / photo.sizes.large.height
    let height = containerDimensions.height - 2 * PHOTO_PADDING
    let width = height * aspectRatio
    let top = PHOTO_PADDING
    let left = containerDimensions.width / 2 - (width / 2)

    // scale image horizontally if necessary
    if (width > containerDimensions.width - 2 * PHOTO_PADDING) {
      aspectRatio = photo.sizes.large.height / photo.sizes.large.width
      width = containerDimensions.width - 2 * PHOTO_PADDING
      height = width * aspectRatio
      top = containerDimensions.height / 2 - (height / 2)
      left = PHOTO_PADDING
    }

    let style
    if (containerDimensions.width === 0 || containerDimensions.height === 0) {
      style = {
        position: 'absolute',
        width: photo.sizes.large.width,
        height: photo.sizes.large.height,
        top: 0,
        left: 0
      }
    } else {
      style = {
        position: 'absolute',
        width: width,
        height: height,
        top: top,
        left: left
      }
    }

    if (photo.media === 'photo') {
      return <Photo
        size='large'
        photo={photo}
        style={style}
      />
    } else if (photo.media === 'video') {
      return <Video
        size='large'
        type='slideshow'
        video={photo}
        style={style}
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

  renderCaption(photo) {
    return <Caption
      type='slideshow'
      dateTaken={photo.dateTaken}
      title={photo.title}
      tags={photo.tags}
    />
  },

  renderSlideshow(photo, containerDimensions) {
    return <div
      className={styles.slideshowWrapper}
      onClick={this.handleSlideshowWrapperClick}
    >
      <span
        className={styles.close}
        onClick={() => this.props.setSlideshowVisible(false)}
      >
        &times;
      </span>

      <div className={styles.controls}>
        <a
          href='#'
          onClick={this.handlePreviousPhotoClick}
        >
          prev
        </a>
        <span> / </span>
        <a
          href='#'
          onClick={this.handleNextPhotoClick}
        >
          next
        </a>
      </div>

      {this.renderPhotoOrVideo(photo, containerDimensions)}
      {this.renderCaption(photo)}
    </div>
  },

  render() {
    const photo = this.props.photos[this.props.photoIndex]

    if (!this.props.visible || !photo) return null

    return <Measure>
      {containerDimensions => this.renderSlideshow(photo, containerDimensions)}
    </Measure>
  }
})


export default Slideshow

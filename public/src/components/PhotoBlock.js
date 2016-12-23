import React, { Component } from 'react'
import Measure from 'react-measure'
import _ from 'underscore'

import PhotoBlockItem from './PhotoBlockItem'
import styles from './PhotoBlock.css'

class PhotoBlock extends Component {

  constructor(props) {
    super(props)

    this.PHOTO_SPACING = 8
    this.MAX_HEIGHT = 700
    this.photoCount = 0
    this.photoGrid = []
    this.containerDimensions = {
      width: -1,
      height: -1
    }
  }

  createTrueGrid() {
    const photoGrid = []

    let rowWidthCounter = 0
    let rowIndex = 0
    let row = { rowWidth: 0, photos: [] }

    // Step 1: Place photos of this.MAX_HEIGHT into rows
    this.props.photos.forEach((photo, photoIndex) => {
      const widthToHeightAspectRatio = photo.sizes.medium.width / photo.sizes.medium.height

      const height = this.MAX_HEIGHT
      const width = this.MAX_HEIGHT * widthToHeightAspectRatio

      // if current row has exceeded container width
      if ((rowWidthCounter + (row.photos.length * this.PHOTO_SPACING)) > this.containerDimensions.width) {
        // set row width for row and push into grid
        row.rowWidth = rowWidthCounter
        photoGrid.push(row)
        row = { rowWidth: 0, photos: [] }
        rowWidthCounter = 0
        rowIndex += 1
      }

      // add photo to current row
      const left = rowWidthCounter + (row.photos.length * this.PHOTO_SPACING)
      rowWidthCounter += width
      const top = rowIndex * (this.MAX_HEIGHT + this.PHOTO_SPACING)

      row.photos.push({
        width,
        height,
        top,
        left,
        heightToWidthAspectRatio: photo.sizes.medium.height / photo.sizes.medium.width
      })
    })

    // push last row into photoGrid
    row.rowWidth = rowWidthCounter
    photoGrid.push(row)

    // Step 2: Shrink each row down to fit screen width
    photoGrid.forEach((row, rowIndex) => {
      const { rowWidth } = row
      const numPhotos = row.photos.length
      rowWidthCounter = 0
      row.rowTop = rowIndex === 0 ? 0 : photoGrid[rowIndex - 1].rowTop + photoGrid[rowIndex - 1].rowHeight + this.PHOTO_SPACING
      row.photos.forEach((photo, photoIndex) => {
        photo.width = photo.width * ((this.containerDimensions.width - (row.photos.length - 1) * this.PHOTO_SPACING) / rowWidth)
        photo.height = photo.width * photo.heightToWidthAspectRatio
        photo.left = rowWidthCounter + (photoIndex * this.PHOTO_SPACING)
        photo.top = row.rowTop
        rowWidthCounter += photo.width
      })
      row.rowWidth = rowWidthCounter
      row.rowHeight = row.photos[0].height
    })

    return photoGrid
  }

  computePhotoPositions(containerDimensions) {
    if (this.props.photos.length === 0) return
    if (
      !_.isEqual(this.containerDimensions, containerDimensions) ||
      this.props.photos.length !== this.photoCount
    ) {
      this.containerDimensions = containerDimensions
      this.photoCount = this.props.photos.length
    }

    this.photoGrid = this.createTrueGrid()
  }

  renderPhotoGrid(containerDimensions) {
    if (!this.props.photos || this.props.photos.length === 0) return <div></div>

    this.computePhotoPositions(containerDimensions)

    const photoBlockItems = []
    const photoStyles = []
    const wrapperStyle = { position: 'relative' }

    this.photoGrid.forEach(row => {
      row.photos.forEach(photo => {
        photoStyles.push({
          position: 'absolute',
          width: photo.width,
          height: photo.height,
          top: photo.top,
          left: photo.left
        })
      })
    })

    // set wrapper height
    const lastPhotoStyle = photoStyles[photoStyles.length - 1]
    wrapperStyle.height = lastPhotoStyle.top + lastPhotoStyle.height

    this.props.photos.forEach((photo, photoIndex) => {
      photoBlockItems.push(
        <PhotoBlockItem
          style={photoStyles[photoIndex]}
          key={photo._id}
          photo={photo}
          photoIndex={photoIndex}

          showSlideshowAtIndex={this.props.showSlideshowAtIndex}
        />
      )
    })

    return <div
      style={wrapperStyle}
    >
      {photoBlockItems}
    </div>

  }

  render() {
    return <Measure>
      {containerDimensions => this.renderPhotoGrid(containerDimensions)}
    </Measure>
  }
}


export default PhotoBlock

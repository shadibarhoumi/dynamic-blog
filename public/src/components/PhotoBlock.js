import React, { Component } from 'react'
import moment from 'moment'
import Measure from 'react-measure'
import _ from 'underscore'

import PhotoBlockItem from './PhotoBlockItem'
import styles from './PhotoBlock.css'

class PhotoBlock extends Component {

  constructor(props) {
    super(props)

    this.PHOTO_SPACING = 8
    this.photoCount = 0
    this.photoGrid = []
    this.containerDimensions = {
      width: -1,
      height: -1
    }
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

    const photoGrid = []

    const maxHeight = 800

    let rowWidthCounter = 0
    let rowIndex = 0
    let row = { rowWidth: 0, photos: [] }

    // Step 1: Place photos of maxHeight into rows
    this.props.photos.forEach((photo, photoIndex) => {
      const widthToHeightAspectRatio = photo.sizes.medium.width / photo.sizes.medium.height

      const height = maxHeight
      const width = maxHeight * widthToHeightAspectRatio

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
      const top = rowIndex * (maxHeight + this.PHOTO_SPACING)

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

    console.log('photoGrid before shrink', photoGrid)

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

    console.log('photoGrid after shrink', photoGrid)

    this.photoGrid = photoGrid
  }

  renderPhotoGrid(containerDimensions) {
    if (!this.props.photos || this.props.photos.length === 0) return <div></div>

    console.log('containerDimensions', containerDimensions)

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

    this.props.photos.forEach((photo, i) => {
      photoBlockItems.push(
        <PhotoBlockItem
          style={photoStyles[i]}
          key={photo._id}
          photo={photo}
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

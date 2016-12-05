import React, { Component } from 'react'
import moment from 'moment'

import PhotoBlockItem from './PhotoBlockItem'
import styles from './PhotoBlock.css'

class PhotoBlock extends Component {

  render() {
    return <div>
      {this.props.photos.map(photo =>
        <PhotoBlockItem
          key={photo._id}
          photo={photo}
        />
      )}
    </div>
  }
}


export default PhotoBlock

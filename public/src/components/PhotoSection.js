import React, { Component } from 'react'

import PhotoBlock from './PhotoBlock'

class PhotoSection extends Component {

  render() {
    return <div>
      <h2>{this.props.header}</h2>
      <PhotoBlock
        photos={this.props.photos}
      />
    </div>
  }
}


export default PhotoSection

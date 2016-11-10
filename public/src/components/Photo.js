import React, { Component } from 'react'
import moment from 'moment'

import Caption from './Caption'

class Photo extends Component {

  render() {
    const { photo } = this.props
    return <div>
      <div>
        <img src={photo.url_m} />
      </div>
    </div>
  }
}


export default Photo

import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router'

import Video from 'react-html5video'
import 'react-html5video/dist/ReactHtml5Video.css'


class PhotoBlock extends Component {

  renderPhotos(photos) {
    return <ul>
      {photos.map(photo => {
        if (photo.media === 'photo') {
          return <li key={photo._id}>
            <div>
              <img src={photo.url_m} />
            </div>
            <div>
              {moment(photo.dateTaken).format('dddd, MMMM Do YYYY, h:mma')}
            </div>
            <div>
              {photo.title}
            </div>
          </li>
        } else if (photo.media === 'video') {
          return <li key={photo._id}>
            <div>
              <Video
                controls autoPlay loop muted
                width='500'
              >
                <source src={photo.videoUrl} type='video/mp4' />
              </Video>
            </div>
            <div>
              {moment(photo.dateTaken).format('dddd, MMMM Do YYYY, h:mma')}
            </div>
            <div>
              {photo.title}
            </div>
          </li>
        }
      })}
    </ul>
  }

  render() {
    return <div>
      {this.renderPhotos(this.props.photos)}
    </div>
  }
}


export default PhotoBlock

import React, { Component } from 'react'
import moment from 'moment'

import Caption from './Caption'

import HTML5Video from 'react-html5video'
import 'react-html5video/dist/ReactHtml5Video.css'

class Video extends Component {

  render() {
    const { video } = this.props
    return <HTML5Video
        width={this.props.style.width}
        height={this.props.style.height}
        autoPlay loop muted
      >
        <source src={video.videoUrl} type='video/mp4' />
    </HTML5Video>
  }
}


export default Video

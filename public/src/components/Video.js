import React, { Component } from 'react'
import moment from 'moment'

import Caption from './Caption'

import HTML5Video from 'react-html5video'
import 'react-html5video/dist/ReactHtml5Video.css'

class Video extends Component {

  render() {
    const { video } = this.props

    if (this.props.type === 'slideshow') {
      return <HTML5Video
        className={this.props.className}
        style={{
          left: this.props.style.left,
          top: this.props.style.top,
        }}
        width={this.props.style.width}
        height={this.props.style.height}
        controls
      >
        <source src={video.videoUrl} type='video/mp4' />
      </HTML5Video>
    } else if (this.props.type === 'grid') {
      return <HTML5Video
        className={this.props.className}
        width={this.props.style.width}
        height={this.props.style.height}
        autoPlay loop muted
      >
        <source src={video.videoUrl} type='video/mp4' />
      </HTML5Video>
    }
  }
}


export default Video

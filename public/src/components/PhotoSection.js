import React, { Component } from 'react'

import PhotoBlock from './PhotoBlock'
import styles from './PhotoSection.css'

class PhotoSection extends Component {

  renderCount() {
    if (this.props.count) {
      return <span className={styles.count}> {this.props.count}</span>
    } else {
      return null
    }
  }

  render() {
    return <div>
      <h2>
        <span>
          {this.props.header}
        </span>
        {this.renderCount()}
      </h2>
      <PhotoBlock
        photos={this.props.photos}
      />
    </div>
  }
}


export default PhotoSection

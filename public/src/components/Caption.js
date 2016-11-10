import React, { Component } from 'react'
import moment from 'moment'
import classnames from 'classnames'

import styles from './Caption.css'

class Caption extends Component {

  render() {
    return <div>
      <span className={classnames(styles.dateTaken)}>
        {moment(this.props.dateTaken).format('MMMM D')}
      </span>
      <span className={classnames(styles.dateTaken, styles.separator)}>
        &middot;
      </span>
      <span className={classnames(styles.dateTaken)}>
        {moment(this.props.dateTaken).format('h:mm a')}
      </span>
      <span className={styles.title}>
        {this.props.title}
      </span>
    </div>
  }
}

export default Caption

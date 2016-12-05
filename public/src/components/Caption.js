import React, { Component } from 'react'
import moment from 'moment'
import classnames from 'classnames'
import { Link } from 'react-router'
import { trimTitle, extractTags } from '../helpers/PhotoHelpers'

import styles from './Caption.css'

class Caption extends Component {

  render() {
    const dateSlug = moment(this.props.dateTaken).format('M-D-YY')
    return <div>
      <span>
        {this.props.dateTaken}
      </span>
      <Link to={'/day/' + dateSlug}>
        {moment(this.props.dateTaken).format('MMMM D')}
      </Link>
      <span className={classnames(styles.dateTaken, styles.separator)}>
        &middot;
      </span>
      <span className={classnames(styles.dateTaken)}>
        {moment(this.props.dateTaken).format('h:mma')}
      </span>
      <span className={styles.title}>
        {trimTitle(this.props.title)}
      </span>
      <span>
        {extractTags(this.props.title).map(tag => {
          return <span key={tag} className={styles.tag}>
            <Link to={'/tags/' + tag}>
              {'#' + tag}
            </Link>
          </span>
        })}
      </span>
    </div>
  }
}

export default Caption

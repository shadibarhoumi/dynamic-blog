import React, { Component } from 'react'
import moment from 'moment'
import classnames from 'classnames'
import { Link } from 'react-router'
import { trimTitle, extractTags, dateFormatter } from '../helpers/PhotoHelpers'

import styles from './Caption.css'

const Caption = React.createClass({

  renderSlideshowCaption() {
    const dateSlug = moment(this.props.dateTaken).format('M-D-YY')
    return <div className={styles.captionWrapper}>
      <p className={styles.date}>
        <Link to={'/day/' + dateSlug}>
          {dateFormatter.formatPhotoDate(this.props.dateTaken)}
        </Link>
      </p>
      <p className={styles.textContent}>
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
      </p>
    </div>
  },

  renderGridCaption() {
    const dateSlug = moment(this.props.dateTaken).format('M-D-YY')
    return <div className={styles.captionWrapper}>
      <p className={styles.date}>
        <Link to={'/day/' + dateSlug}>
          {dateFormatter.formatPhotoDate(this.props.dateTaken)}
        </Link>
      </p>
      <p className={styles.textContent}>
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
      </p>
    </div>
  },

  render() {
    if (this.props.type === 'grid') {
      return this.renderGridCaption()
    }

    if (this.props.type === 'slideshow') {
      return this.renderSlideshowCaption()
    }
  }
})

export default Caption

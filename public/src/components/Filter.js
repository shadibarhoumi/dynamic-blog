import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PhotoActions from '../actions/PhotoActions'
import * as UIPhotoActions from '../actions/UIPhotoActions'

import moment from 'moment'

import styles from './Filter.css'

const Filter = React.createClass({

  componentWillMount() {
    this.props.fetchTags()
  },

  handleTagLinkClick(e, tag) {
    e.preventDefault()

    this.props.applyTagFilter(tag)
  },

  handleRemoveTagClick(e, tag) {
    e.preventDefault()
    this.props.removeTagFilter(tag)
  },

  handleApplyDateFilterClick(e, tag) {
    e.preventDefault()

    const startDateString = [
      this.refs.startMonth.value,
      this.refs.startDay.value,
      this.refs.startYear.value
    ].join('-')

    const endDateString = [
      this.refs.endMonth.value,
      this.refs.startDay.value,
      this.refs.endYear.value
    ].join('-')

    const startDate = moment(startDateString, 'MM-DD-YY')
    const endDate = moment(endDateString, 'MM-DD-YY')

    console.log(startDate.calendar() + ' to ' + endDate.calendar())

    this.props.applyDateFilter(startDate, endDate)
  },

  render() {
    if (!this.props.visible) return null

    return <div>
      <div>
        <p>Current Filter</p>
        <p>Tags</p>
        <ul className={styles.tagList}>
          {this.props.currentFilter.get('tags').map(tag => {
            return <li key={tag}>
              <span>{'#' + tag}</span>
              <a href='#' onClick={(e) => this.handleRemoveTagClick(e, tag)}>
                &times;
              </a>
            </li>
          })}
        </ul>
      </div>

      <div>
        <p>By Tag</p>
        <ul className={styles.tagList}>
          {this.props.tags.map(tagData => {
            const { tag, count } = tagData
            return <li key={tag}>
              <a
                href='#'
                className={styles.tagLink}
                onClick={(e) => this.handleTagLinkClick(e, tag)}
              >
                {'#' + tag}
              </a>
              <span> {count}</span>
            </li>
          })}
        </ul>
      </div>

      <div>
        <p>By Date</p>
        <p>Start Date</p>
        <input ref='startMonth' placeholder='mm'/>
        <input ref='startDay' placeholder='dd'/>
        <input ref='startYear' placeholder='yy'/>
        <p>End Date</p>
        <input ref='endMonth' placeholder='mm'/>
        <input ref='endDay' placeholder='dd'/>
        <input ref='endYear' placeholder='yy'/>
        <a href='#' onClick={this.handleApplyDateFilterClick}>
          Apply Date Filter
        </a>
      </div>
    </div>
  }
})

const mapStateToProps = (state) => {
  return {
    tags: state.get('tags'),
    currentFilter: state.get('currentFilter')
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    ...PhotoActions,
    ...UIPhotoActions
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
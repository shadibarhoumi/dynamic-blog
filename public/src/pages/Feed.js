import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import Header from '../components/Header'
import Slideshow from '../components/Slideshow'

import { dateFormatter } from '../helpers/PhotoHelpers'

import * as PhotoActions from '../actions/PhotoActions'
import * as UIPhotoActions from '../actions/UIPhotoActions'

import PhotoBlock from '../components/PhotoBlock'
import Filter from '../components/Filter'

import styles from './Feed.css'

const Feed = React.createClass({
  getInitialState() {
    return {
      filterVisible: false
    }
  },

  componentWillMount() {
    this.props.fetchPhotoFeed()
  },

  componentWillUnmount() {
    this.props.resetPhotos()
  },

  handleFilterLinkClick(e) {
    e.preventDefault()
    this.setState({ filterVisible: !this.state.filterVisible })
  },

  render() {
    return <div>
      <Header page='feed'/>
      <div className={styles.headingWrapper}>
        {/*<h1 className={styles.headingTitle}>Photostream</h1>
        <a
          className={styles.filter}
          onClick={this.handleFilterLinkClick}
          href='#'
        >
          filter
        </a>*/}
      </div>
      <Filter
        visible={this.state.filterVisible}
      />
      <PhotoBlock
        photos={this.props.photos}
        showSlideshowAtIndex={this.props.showSlideshowAtIndex}
      />
      <Slideshow
        photos={this.props.photos}
        photoIndex={this.props.slideshowPhotoIndex}
        visible={this.props.slideshowVisible}

        setSlideshowPhotoIndex={this.props.setSlideshowPhotoIndex}
        setSlideshowVisible={this.props.setSlideshowVisible}
      />
    </div>
  }
})

const mapStateToProps = (state) => {
  return {
    photos: state.get('photos'),

    slideshowVisible: state.getIn(['slideshow', 'visible']),
    slideshowPhotoIndex: state.getIn(['slideshow', 'photoIndex']),
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    ...PhotoActions,
    ...UIPhotoActions
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
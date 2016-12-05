import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import Header from '../components/Header'

import PhotoSection from '../components/PhotoSection'
import * as PhotoActions from '../actions/PhotoActions'

class Tags extends Component {
  componentWillMount() {
    this.props.fetchPhotosByTag()
  }

  render() {
    return <div>
      <Header page='tags'/>
      <h1>Tags</h1>
      <ul>
        {this.props.tags.map(tagData => {
          const { tag, count } = tagData
          return <li key={tag}>
            <Link to={'/tags/' + tag}>
              {'#' + tag}
            </Link>
            <span> {count}</span>
          </li>
        })}
      </ul>

      {Object.keys(this.props.photosByTag).map(tag => {
        const tagData = this.props.photosByTag[tag]
        return <PhotoSection
          key={tag}
          header={'#' + tag}
          count={tagData.count}
          photos={tagData.photos}
        />
      })}
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    photosByTag: state.get('photosByTag'),
    tags: state.get('tags')
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(PhotoActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Tags)
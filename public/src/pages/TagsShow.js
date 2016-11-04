import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TagView from '../containers/TagViewContainer'

class TagsShow extends Component {

  render() {
    return (
      <div className='container'>
        <TagView tagName={this.props.params.tagName}/>
      </div>
    )
  }
}

export default TagsShow

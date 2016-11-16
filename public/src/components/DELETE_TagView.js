import React, { Component } from 'react'
import moment from 'moment'
import Video from 'react-html5video'
import { Link } from 'react-router'

import 'react-html5video/dist/ReactHtml5Video.css'
import styles from './DayPhotos.css'

class TagView extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchTags()
    this.props.fetchPhotosForTag(this.props.tag)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tag !== this.props.tag) {
      this.props.fetchPhotosForTag(nextProps.tag)
    }
  }


  renderPhotoList(photos) {
    var photoList = <ol>
      {photos.map(photo => {
        if (photo.media === 'photo') {
          return <li key={photo._id}>
            <div>
              <img src={photo.url_m} />
            </div>
            <div>
              {moment(photo.dateTaken).format('dddd, MMMM Do YYYY, h:mma')}
            </div>
            <div>
              <b>{photo.media}</b>
              {photo.title}
            </div>
          </li>
        } else if (photo.media === 'video') {
          return <li key={photo._id}>
            <div>
              <Video
                controls autoPlay loop muted
                className={styles.video}
                width='500'
              >
                <source src={photo.videoUrl} type='video/mp4' />
              </Video>
            </div>
            <div className={styles.blue}>
              {moment(photo.dateTaken).format('dddd, MMMM Do YYYY, h:mma')}
            </div>
            <div>
              <b>{photo.media}</b>
              {photo.title}
            </div>
          </li>
        }
      })}
    </ol>

    return <div>
      {photoList}
      <h2>Raw Data</h2>
      <div><pre>{JSON.stringify(photos, null, 2)}</pre></div>
    </div>
  }

  renderPhotos() {
    const { photos, photosLoading, photosError } = this.props.photosList

    if (photosLoading) {
      return <div className="container"><h1>Photos</h1><h3>Loading...</h3></div>
    } else if (photosError) {
      return <div className="alert alert-danger">Error: {photosError.message}</div>
    }

    return (
      <div className='container'>
        <h1 className={styles.blue}>Photos for #{this.props.tag}</h1>
        {this.renderPhotoList(photos)}
      </div>
    )
  }

  renderTags() {
    const { tags, tagsLoading, tagsError } = this.props.tagsList
    if (tagsLoading) {
      return <div className="container"><h3>Tags</h3><h3>Loading...</h3></div>
    } else if (tagsError) {
      return <div className="alert alert-danger">Error: {tagsError.message}</div>
    }

    return (
      <div className='container'>
        <ul>
          {tags.map(tag =>
            <li key={tag}>
              <Link to={'/tags/' + tag.substr(1)}>
                <p>{tag}</p>
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }

  render() {
    return <div>
      {this.renderTags()}
      {this.renderPhotos()}
    </div>
  }
}


export default TagView

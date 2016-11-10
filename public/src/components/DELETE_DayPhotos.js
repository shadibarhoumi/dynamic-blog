import React, { Component } from 'react'
import moment from 'moment'
import Video from 'react-html5video'
import { Link } from 'react-router'

import 'react-html5video/dist/ReactHtml5Video.css'
import styles from './DayPhotos.css'

class DayPhotos extends Component {
  constructor(props) {
    super(props)
    this.state = { validUrl: true }
  }

  componentWillMount() {
    const { dateString } = this.props
    const validUrl = moment(dateString, 'MM-DD-YYYY').isValid()

    this.setState({ validUrl })

    if (validUrl) this.props.fetchPhotosWithDate(dateString)
    // this.props.fetchTags()
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
        <h1 className={styles.blue}>Photos for {moment(this.props.dateString, 'MM-DD-YYYY').format('dddd, MMMM Do YYYY')}</h1>
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
    if (!this.state.validUrl) return <div className="alert alert-danger">Invalid Date!</div>
    return <div>
      {this.renderTags()}
      {this.renderPhotos()}
    </div>
  }
}


export default DayPhotos

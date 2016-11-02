import React, { Component } from 'react'
import moment from 'moment'
import Video from 'react-html5video'

class DayPhotos extends Component {
  constructor(props) {
    super(props)
    this.state = { validUrl: true }
  }

  componentWillMount() {
    const { dateString } = this.props
    const validUrl = moment(dateString, 'MM-DD-YYYY').isValid()

    this.setState({ validUrl })

    if (validUrl) this.props.fetchImages(dateString)
  }

  renderImages(images) {
    var imageList = <ol>
      {images.map(image => {
        if (image.media === 'photo') {
          return <li key={image._id}>
            <div>
              <img src={image.url_m} />
            </div>
            <div>
              {moment(image.dateTaken).format('dddd, MMMM Do YYYY, h:mma')}
            </div>
            <div>
              <b>{image.media}</b>
              {image.title}
            </div>
          </li>
        } else if (image.media === 'video') {
          return <li key={image._id}>
            <div>
              <Video controls autoPlay loop>
                <source src={image.videoUrl} type='video/mp4' />
              </Video>
            </div>
            <div>
              {moment(image.dateTaken).format('dddd, MMMM Do YYYY, h:mma')}
            </div>
            <div>
              <b>{image.media}</b>
              {image.title}
            </div>
          </li>
        }
      })}
    </ol>

    return <div>
      {imageList}
      <h2>Raw Data</h2>
      <div><pre>{JSON.stringify(images, null, 2)}</pre></div>
    </div>
  }

  render() {
    if (!this.state.validUrl) return <div className="alert alert-danger">Invalid Date!</div>

    const { images, loading, error } = this.props.imagesList

    if (loading) {
      return <div className="container"><h1>Images</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Images for {moment(this.props.dateString, 'MM-DD-YYYY').format('dddd, MMMM Do YYYY')}</h1>
        <ul className="list-group">
          {this.renderImages(images)}
        </ul>
      </div>
    )
  }
}


export default DayPhotos

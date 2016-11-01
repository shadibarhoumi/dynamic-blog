import React, { Component } from 'react'
import moment from 'moment'

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
      {images.map(image =>
        <li key={image._id}>
          <div>
            <img src={image.url_m} />
          </div>
          <div>
            {image.dateTaken}
            {/*moment(image.dateTaken).format('dddd, MMMM Do YYYY, h:mma')*/}
          </div>
          <div>
            {image.title}
          </div>
        </li>
      )}
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

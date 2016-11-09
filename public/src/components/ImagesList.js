import React, { Component } from 'react';

class PhotosList extends Component {
  componentWillMount() {
    this.props.fetchPhotos();
  }

  renderPhotos(photos) {
    var photoList = <ol>
      {photos.map(photo =>
        <li key={photo._id}>
          <div>
            <img src={photo.url_m} />
          </div>
          <div>
            {photo.title}
          </div>
        </li>
      )}
    </ol>

    return <div>
      {photoList}
      <h2>Raw Data</h2>
      <div><pre>{JSON.stringify(photos, null, 2)}</pre></div>
    </div>
  }

  render() {
    const { photos, loading, error } = this.props.photosList;
    if (loading) {
      return <div className="container"><h1>Photos</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Photos</h1>
        <ul className="list-group">
          {this.renderPhotos(photos)}
        </ul>
      </div>
    );
  }
}


export default PhotosList;

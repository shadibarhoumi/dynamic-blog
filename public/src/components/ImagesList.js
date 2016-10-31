import React, { Component } from 'react';

class ImagesList extends Component {
  componentWillMount() {
    this.props.fetchImages();
  }

  renderImages(images) {
    var imageList = <ol>
      {images.map(image =>
        <li key={image._id}>
          <div>
            <img src={image.url_m} />
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
    const { images, loading, error } = this.props.imagesList;
    if (loading) {
      return <div className="container"><h1>Images</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Images</h1>
        <ul className="list-group">
          {this.renderImages(images)}
        </ul>
      </div>
    );
  }
}


export default ImagesList;

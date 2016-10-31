import React, { Component } from 'react';

class ImagesList extends Component {
  componentWillMount() {
    this.props.fetchImages();
  }

  renderImages(images) {
    // return <div><pre>{JSON.stringify(images, null, 2)}</pre></div>;
    return images.map(image =>
      <div>
        <div>
          <img src={image.url} />
        </div>
        <div>
          {image.title}
        </div>
      </div>
    );
  }

  render() {
    const { images, loading, error } = this.props.imagesList;
    console.log(loading)
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

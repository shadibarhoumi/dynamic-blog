import React, { Component } from 'react';
import DayPhotos from '../containers/DayPhotosContainer';

class DayShow extends Component {
	render() {
		return <DayPhotos
			dateString={this.props.params.dateString}
		/>
	}
}

export default DayShow;

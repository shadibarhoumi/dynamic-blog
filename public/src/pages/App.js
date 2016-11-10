import React from 'react'
import { Component } from 'react'
import AppComponent from '../components/App'

export default class App extends Component {
  render() {
    return (
    	<AppComponent>
    	 {this.props.children}
    	</AppComponent>
    )
  }
}

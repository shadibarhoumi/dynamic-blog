import React from 'react'
import { Component } from 'react'

import 'normalize.css/normalize.css'
import '../globalStyles/global.css'
import styles from './App.css'

export default class App extends Component {
  render() {
    return (
      <div className={styles.pageWrapper}>
        {this.props.children}
      </div>
    )
  }
}
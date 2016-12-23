import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

import styles from './Header.css'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  renderLink(page) {
    return <li className={styles.navItem}>
      <Link
        to={'/' + page}
        className={classnames({
          [styles.currentPage]: page === this.props.page
        })}
      >
        {page}
      </Link>
    </li>
  }

  render() {
    return (
      <header>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <h1 className={styles.logo}>Shadi's Photostream</h1>
            </li>

            {/*this.renderLink('feed')*/}

            {/*this.renderLink('tags')*/}

            {/*this.renderLink('about')*/}

          </ul>
        </nav>
     </header>
    )
  }
}

export default Header
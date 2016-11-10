import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


class Header extends Component {
	render() {
		return (
      <nav className='navbar navbar-default navbar-static-top'>
	      <div id='navbar' className='navbar-collapse collapse'>

          <div className='container'>
            <ul className='nav  nav-pills navbar-left'>
              <li style={{paddingRight: '10px'}} style={{color:'#337ab7',  fontSize: '17px'}}  role='presentation'>
                <Link to='/'>
                  Shadi Travels
                </Link>
              </li>
            </ul>

            <ul className='nav  nav-pills navbar-right'>
              <li style={{paddingRight: '10px'}} role='presentation'>
                <Link style={{color:'#337ab7',  fontSize: '17px'}} to='/feed'>
                  Feed
                </Link>
              </li>
              <li style={{paddingRight: '10px'}} role='presentation'>
                <Link style={{color:'#337ab7',  fontSize: '17px'}} to='/tags'>
                  Tags
                </Link>
              </li>
              <li style={{paddingRight: '10px'}} role='presentation'>
                <Link style={{color:'#337ab7',  fontSize: '17px'}} to='/about'>
                  About
                </Link>
              </li>
            </ul>
           </div>

      		</div>
		 </nav>
		)
	}
}

export default Header
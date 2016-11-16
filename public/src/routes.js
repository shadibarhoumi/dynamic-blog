import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import Feed from './pages/Feed'
import Tags from './pages/Tags'
import About from './pages/About'
import DayShow from './pages/DayShow'
import TagShow from './pages/TagShow'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Feed} />
    <Route path='/feed' component={Feed} />
    <Route path='/tags' component={Tags} />
    <Route path='/tags/:tag' component={TagShow} />
    <Route path='/about' component={About} />
    <Route path='/day/:dateString' component={DayShow} />
  </Route>
)

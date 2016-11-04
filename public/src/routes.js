import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './pages/App'
import PostsIndex from './pages/PostsIndex'
import PostsNew from './pages/PostsNew'
import PostsShow from './pages/PostsShow'
import PhotosIndex from './pages/PhotosIndex'
import DayShow from './pages/DayShow'
import TagsShow from './pages/TagsShow'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="posts/new" component={PostsNew} />
    <Route path="posts/:id" component={PostsShow} />
    <Route path="tags/:tagName" component={TagsShow} />
    <Route path="photos" component={PhotosIndex} />
    <Route path="day/:dateString" component={DayShow} />
  </Route>
)

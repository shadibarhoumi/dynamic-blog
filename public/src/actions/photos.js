import axios from 'axios'
import * as consts from '../constants/photosConstants'

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api'

export const fetchPhotosWithDate = (dateString) => async (dispatch) => {
  dispatch({
    type: consts.FETCH_PHOTOS
  })

  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/photos/${dateString}`,
    headers: []
  })

  dispatch(setPhotos(response.data))
}


export const fetchPhotosWithTag = (tagName) => {
  dispatch({
    type: consts.FETCH_PHOTOS
  })

  const response = axios({
    method: 'get',
    url: `${ROOT_URL}/tags/${tagName}`,
    headers: []
  })

  dispatch(setPhotos(response.data))
}

export const fetchTags = () => {
  dispatch({
    type: consts.FETCH_TAGS
  })

  const response = axios({
    method: 'get',
    url: `${ROOT_URL}/tags/`,
    headers: []
  })

  dispatch(setTags(response.data))
}

const setPhotos = (photos) => {
  return {
    type: consts.SET_PHOTOS,
    photos
  }
}

const setTags = (tags) => {
  return {
    type: consts.SET_TAGS,
    tags
  }
}
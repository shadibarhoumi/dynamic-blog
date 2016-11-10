import axios from 'axios'
import { types } from '../constants/PhotoConstants'

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api'

export const fetchMostRecentPhotos = () => async (dispatch) => {
  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/photos/`,
    headers: []
  })

  dispatch(setPhotos(response.data))
}

export const fetchPhotosWithDate = (dateString) => async (dispatch) => {
  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/photos/${dateString}`,
    headers: []
  })

  dispatch(setPhotos(response.data))
}


export const fetchPhotosWithTag = (tagName) => {
  const response = axios({
    method: 'get',
    url: `${ROOT_URL}/tags/${tagName}`,
    headers: []
  })

  dispatch(setPhotos(response.data))
}

export const fetchTags = () => {
  const response = axios({
    method: 'get',
    url: `${ROOT_URL}/tags/`,
    headers: []
  })

  dispatch(setTags(response.data))
}

const setPhotos = (photos) => {
  return {
    type: types.SET_PHOTOS,
    photos
  }
}

const setTags = (tags) => {
  return {
    type: types.SET_TAGS,
    tags
  }
}
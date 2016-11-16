import axios from 'axios'
import { types } from '../constants/PhotoConstants'

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api'

export const fetchMostRecentPhotos = () => async (dispatch) => {
  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/photos/feed`,
    headers: []
  })

  dispatch(setPhotos(response.data))
}

export const fetchPhotosWithDate = (dateString) => async (dispatch) => {
  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/photos/date/${dateString}`,
    headers: []
  })

  dispatch(setPhotos(response.data))
}


export const fetchPhotosWithTag = (tag) => async (dispatch) => {
  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/photos/tags/${tag}`,
    headers: []
  })
}

export const fetchPhotosByTag = () => async (dispatch) => {
  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/photos/byTag`,
    headers: []
  })

  console.log('photosByTag', response.data)
  dispatch(setPhotosByTag(response.data))
  dispatch(setTags(response.data))
}

export const fetchTags = () => async (dispatch) => {
  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/tags/`,
    headers: []
  })

  console.log('data', response.data)
  dispatch(setTags(response.data))
}

export const resetPhotos = () => {
  return {
    type: types.RESET_PHOTOS
  }
}

const setPhotos = (photos) => {
  return {
    type: types.SET_PHOTOS,
    photos
  }
}

const setPhotosByTag = (photosByTag) => {
  return {
    type: types.SET_PHOTOS_BY_TAG,
    photosByTag
  }
}

const setTags = (photosByTag) => {
  return {
    type: types.SET_TAGS,
    photosByTag
  }
}
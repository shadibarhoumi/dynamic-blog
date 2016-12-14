import axios from 'axios'
import { types } from '../constants/PhotoConstants'

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api'

export const fetchPhotoFeed = () => async (dispatch) => {
  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/photos/feed`,
    headers: []
  })

  dispatch(setPhotos(response.data))
}

export const fetchPhotosByDate = () => async (dispatch) => {
  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/photos/byDate`,
    headers: []
  })

  dispatch(setPhotosByDate(response.data))
}

export const fetchPhotosForDate = (dateString) => async (dispatch) => {
  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/photos/date/${dateString}`,
    headers: []
  })

  dispatch(setPhotos(response.data))
}

export const fetchPhotosByTag = () => async (dispatch) => {
  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/photos/byTag`,
    headers: []
  })

  dispatch(setPhotosByTag(response.data))
  dispatch(setTags(response.data))
}

export const fetchPhotosForTag = (tag) => async (dispatch) => {
  const response = await axios({
    method: 'get',
    url: `${ROOT_URL}/photos/tags/${tag}`,
    headers: []
  })

  dispatch(setPhotos(response.data))
}

export const resetPhotos = () => {
  return {
    type: types.RESET_PHOTOS
  }
}

const setPhotosByTag = (photosByTag) => {
  return {
    type: types.SET_PHOTOS_BY_TAG,
    photosByTag
  }
}

const setPhotosByDate = (photosByDate) => {
  return {
    type: types.SET_PHOTOS_BY_DATE,
    photosByDate
  }
}

const setPhotos = (photos) => {
  return {
    type: types.SET_PHOTOS,
    photos
  }
}

const setTags = (photosByTag) => {
  return {
    type: types.SET_TAGS,
    photosByTag
  }
}

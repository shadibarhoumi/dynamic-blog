import axios from 'axios'

export const FETCH_IMAGES = 'FETCH_IMAGES'
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS'
export const FETCH_IMAGES_FAILURE = 'FETCH_IMAGES_FAILURE'

export const FETCH_TAGS = 'FETCH_TAGS'
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS'
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE'

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api'

export function fetchImages(dateString) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/images/${dateString}`,
    headers: []
  })

  return {
    type: FETCH_IMAGES,
    payload: request
  }
}


export function fetchImagesForTag(tagName) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/tags/${tagName}`,
    headers: []
  })

  return {
    type: FETCH_IMAGES,
    payload: request
  }
}

export function fetchImagesSuccess(images) {
  return {
    type: FETCH_IMAGES_SUCCESS,
    payload: images
  }
}

export function fetchImagesFailure(error) {
  return {
    type: FETCH_IMAGES_FAILURE,
   	payload: error
  }
}

export function fetchTags() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/tags/`,
    headers: []
  })

  return {
    type: FETCH_TAGS,
    payload: request
  }
}

export function fetchTagsSuccess(tags) {
  return {
    type: FETCH_TAGS_SUCCESS,
    payload: tags
  }
}

export function fetchTagsFailure(error) {
  return {
    type: FETCH_TAGS_FAILURE,
    payload: error
  }
}
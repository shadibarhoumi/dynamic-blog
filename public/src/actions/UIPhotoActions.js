import { types } from '../constants/UIPhotoConstants'

export const setSlideshowVisible = (visible) => {
  return {
    type: types.SET_SLIDESHOW_VISIBLE,
    visible
  }
}

export const setSlideshowPhotoIndex = (photoIndex) => {
  return {
    type: types.SET_SLIDESHOW_PHOTO_INDEX,
    photoIndex
  }
}

export const showSlideshowAtIndex = (photoIndex) => (dispatch) => {
  dispatch(setSlideshowVisible(true))
  dispatch(setSlideshowPhotoIndex(photoIndex))
}

export const applyTagFilter = (tag) => {
  return {
    type: types.APPLY_TAG_FILTER,
    tag
  }
}

export const removeTagFilter = (tag) => {
  return {
    type: types.REMOVE_TAG_FILTER,
    tag
  }
}

export const applyDateFilter = (startDate, endDate) => {
  return {
    type: types.APPLY_DATE_FILTER,
    startDate,
    endDate
  }
}
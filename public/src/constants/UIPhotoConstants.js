const types = {}
const defineConst = (name) => types[name] = name

defineConst('SET_SLIDESHOW_VISIBLE')
defineConst('SET_SLIDESHOW_PHOTO_INDEX')
defineConst('APPLY_TAG_FILTER')
defineConst('APPLY_DATE_FILTER')
defineConst('REMOVE_TAG_FILTER')

export { types }
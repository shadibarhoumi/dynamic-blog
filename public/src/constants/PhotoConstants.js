const types = {}
const defineConst = (name) => types[name] = name

defineConst('FETCH_PHOTOS')
defineConst('SET_PHOTOS')
defineConst('SET_PHOTOS_BY_TAG')
defineConst('RESET_PHOTOS')

defineConst('FETCH_TAGS')
defineConst('SET_TAGS')

export { types }
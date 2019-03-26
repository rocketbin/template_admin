export const _active = ({commit}, payload) => {
  // _glob.relation(payload, 'suppliers')
  return commit('active_', payload)
}

export const _colors = ({commit}, payload) => {
  // _glob.relation(payload, 'suppliers')
  return commit('colors_', payload)
}

export const _updateColor = ({commit}, payload) => {
  // _glob.relation(payload, 'suppliers')
  return commit('updateColor_', payload)
}
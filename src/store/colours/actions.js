export const _colours = ({commit}, payload) => {
  // _glob.relation(payload, 'suppliers')

  return commit('colours_', payload)
}
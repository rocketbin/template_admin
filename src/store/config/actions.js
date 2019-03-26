export const _config = ({commit}, payload) => {
  // _glob.relation(payload, 'suppliers')
  return commit('config_', payload)
}
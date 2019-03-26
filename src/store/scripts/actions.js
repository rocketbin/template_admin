export const _scripts = ({commit}, payload) => {
  // _glob.relation(payload, 'suppliers')
  return commit('scripts_', payload)
}
export const modals_ = (state, payload) => {
    for (var k in payload) {
      if((payload[k] instanceof Object)) {
        for (var kk in payload[k]) {
          state.modals[k][kk] = payload[k][kk]
        }
      } else { 
        state.modals[k] = payload[k]
      }
    }
}
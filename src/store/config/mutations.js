export const config_ = (state, payload) => {
    for (var k in payload) {
      state.config[k] = payload[k]
    }
}
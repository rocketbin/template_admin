export const active_ = (state, payload) => {
    for (var k in payload) {
      state.active[k] = payload[k]
    }
}

export const colors_ = (state, payload) => {
	state.active.editor.colors = payload
}

export const updateColor_ = (state, payload) => {
	let ind = payload.index
	state.active.editor.colors[ind] = payload['hex']
}




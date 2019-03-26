export const colours_ = (state, payload) => {
	if (payload instanceof Array) {
		payload.map(c => {
			state.colours.push(c)
		})		
	} else {
		state.colours_.push(payload)
	}
}

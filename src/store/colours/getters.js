export const colours = (state) => {
  state.colours.map(c => {
    c._colors = c.colors.split(",")
  })
  return state.colours;
}

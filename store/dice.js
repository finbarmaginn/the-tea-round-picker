export const state = () => ({
  isSpinning: false
});

export const mutations = {
  activateSpin(state) {
    state.isSpinning = true
  },
  deactivateSpin(state) {
    state.isSpinning = false
  }
}
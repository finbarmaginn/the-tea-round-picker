export const state = () => ({
  list: [],
  nameField: "",
  randomName: {},
});

export const mutations = {
  updateNameField(state, text) {
    state.nameField = text;
  },
  add(state, text) {
    state.list.push({
      text,
      id: Date.now(),
      hasMadeTea: false,
    });
  },
  remove(state, name) {
    state.list = state.list.filter((item) => item.id !== name.id);
  },
  getRandomName(state) {
    const eligibleNames = state.list.filter((item) => item.hasMadeTea !== true)
    const newValue = eligibleNames.length ? eligibleNames[Math.floor(Math.random() * eligibleNames.length)] : {};
 
    state.randomName = newValue

    /**
     * update selected name in list to show that this name has been chosen
     */
    for (var i = 0; i < state.list.length; i++){
      if (state.list[i].id === newValue.id) {
        state.list[i].hasMadeTea = true;
      }
    }
  },
  removeAllNames(state) {
    state.list = [];
  }
};

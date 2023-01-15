export default {
  state: {
    layout: "",
    bgColor: "#E5E5E5",
    searchresponse: "",
  },
  mutations: {
    setLayout(state, layout) {
      state.layout = layout;
    },
    setBgColor(state, layout) {
      state.bgColor = layout;
    }
  },
  getters: {
    layout(state) {
      return state.layout;
    },
    bgColor(state) {
      return state.bgColor;
    }
  },
  actions: {}
};

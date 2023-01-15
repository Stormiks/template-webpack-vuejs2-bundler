export default {
  static: {
    title: ""
  },
  mutations: {
    setTitlePage(state, title) {
      state.title = title;
    }
  },
  getters: {
    readTitle(state) {
      return state.title;
    }
  }
};

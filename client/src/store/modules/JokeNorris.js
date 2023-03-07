export default {
  namespaced: true,
  state: {
    info: "",
  },
  getters: {
    data: (state) => state.info,
  },
  mutations: {
    setData(state, data) {
      state.data = data;
    },
  },
  actions: {
    async getData({ commit }) {
      const data = await fetch("https://api.chucknorris.io/jokes/random");
      commit("setData", await data.json());
    },
  },
};
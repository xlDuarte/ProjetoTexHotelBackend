// modulo ReservasUsuario.js
import axios from "axios";

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
    
    async getData({ commit },payload) {
      // obtem parametro idReserva do payload enviado - se vazio não executa nada...
      let idUsuario = payload.idUsuario;
      // le tabela reservas_has_servicos
      const response = await axios.get(
        `http://localhost:5000/reservaUsuario/${idUsuario}`
      );
      commit("setData", response.data);
      return response.data;

    }

  },
    // myAction(context,payload) {
    //   console.log(payload.myParam) //logs 'hello'
    // }
};

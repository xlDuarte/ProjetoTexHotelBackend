// modulo ServicosReserva.js
import axios from "axios";
import { isEmptyObject } from "jquery";

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
    
    // montar aqui a rotina para ler tanto os serviços da tabela servicos quanto os servicos da tabela de Reservas_has_servicos, para devolver de uma só vez...

    async getData({ commit },payload) {
      // obtem parametro idReserva do payload enviado - se vazio não executa nada...
      let idReserva = payload.idReserva;

      // console.log("idReserva payload",(payload.idReserva === ""))
      // le tabela reservas_has_servicos
      const response = await axios.get(
        `http://localhost:5000/servicoReserva/${idReserva}`
      );
      commit("setData", response.data);
      if (isEmptyObject(response.data)) {
        // le tabela servicos - será a matriz...
        const responseBD = await axios.get("http://localhost:5000/servico");
        commit("setData", responseBD.data);
      }
      console.log("Executei servicosReserva.js ...",idReserva,isEmptyObject(response.data));
      //   arrayServicosReserva,
      //   arrayServicosAux
      // );

      // let arrayServicosReserva = response.data;
      // // le tabela servicos - será a matriz...
      // const responseBD = await axios.get("http://localhost:5000/servico");
      // commit("setData", responseBD.data);
      // let arrayServicosAux = responseBD.data;

      // console.log(
      //   "Executei api servicosReserva...",
      //   idReserva,
      //   arrayServicosReserva,
      //   arrayServicosAux
      // );
      // let servData = "";
      // for (let i = 0; i < arrayServicosAux.length; i++) {
      //   servData = `"idServicos":"${arrayServicosAux[i].idServicos}","nomeServico":"${arrayServicosAux[i].nomeServico}","descricaoServico":"${arrayServicosAux[i].descricaoServico}","vlrDiariaServico":${arrayServicosAux[i].vlrDiariaServico},`;
      //   let idAux = parseInt(arrayServicosAux[i].idServicos);

      //   for (let j=0; j < arrayServicosReserva.length; j++) {
      //     if (idAux === arrayServicosReserva[j].idServicos) {
      //         console.log("idAux,result...:",idAux,arrayServicosReserva[j].idServicos);
      //     }
      //   }
      // console.log("idAux,result...:",idAux,));
      // if (result === idAux) {
      //   servData = servData + '"isSelected":"true"'
      // } else {
      //   servData = servData + '"isSelected":"false"';
      // }
    }

      // let idAux="";
      // let result="";
      // let newArray[];
      // for (let i = 0; i < arrayServicosAux.length; i++) {
      //   console.log("arrayServicosAux", i, arrayServicosAux[i].idServicos);

      //   idAux = arrayServicosAux[i].idServicos;
      //   result = arrayServicosReserva.find((item) => item.servicos_idservicos === idAux);
      //   if (result === idAux) {
      //   }
      // }
      

    //},

    // async getData({ commit }) {
    //   //const data = await fetch("https://api.chucknorris.io/jokes/random");
    //   const data = await fetch("http://localhost:5000/servico");
    //   console.log("Data:",data)
    //   commit("setData", await data.json());
    //   console.log("Executei api getServicos...",data);
    // },
  },
    myAction(context,payload) {
      console.log(payload.myParam) //logs 'hello'
    }
};

/*
Assuming you are using Vuex to manage your Vue.js application state, you can change values in the store dynamically by dispatching actions that mutate the state. 
Here's an example of how you can do this:
store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    value: 0
  },
  mutations: {
    setValue(state, payload) {
      state.value = payload;
    }
  },
  actions: {
    updateValue({ commit }, payload) {
      commit('setValue', payload);
    }
  }
});

export default store;

In this example, the Vuex store has a value property in its state, which can be changed by dispatching the updateValue action, which in turn commits the setValue mutation to change the value.
To change the value dynamically from a component, you can dispatch the updateValue action from a method in the component, like this:

<template>
  <div>
    <p>Value: {{ $store.state.value }}</p>
    <button @click="changeValue">Change Value</button>
  </div>
</template>

<script>
export default {
  methods: {
    changeValue() {
      const newValue = Math.random(); // or any other value you want
      this.$store.dispatch('updateValue', newValue);
    }
  }
};
</script>

*/

/*
const myArray = [
    {
        "Reservas_idReservas": 32,
        "servicos_idservicos": 18,
        "nomeServico": "Serviços Children Care",
        "vlrDiariaServico": "220",
        "descricaoServico": "Babá dedicada para crianças pequenas"
    },
    {
        "Reservas_idReservas": 32,
        "servicos_idservicos": 19,
        "nomeServico": "Serviços Pet Care",
        "vlrDiariaServico": "125",
        "descricaoServico": "Cuidados especiais com seu pet"
    }
];

const searchValue = 19; // the value to search for
const result = myArray.find(item => item.servicos_idservicos === searchValue);
console.log(result); // returns the object with "servicos_idservicos" equal to 19
*/

/*
const myArray = [
    {
        "idServicos": 18,
        "nomeServico": "Serviços Children Care",
        "vlrDiariaServico": 220,
        "descricaoServico": "Babá dedicada para crianças pequenas",
        "labelServico": "childrenCare",
        "isSelected": "false"
    },
    {
        "idServicos": 19,
        "nomeServico": "Serviços Pet Care",
        "vlrDiariaServico": 125,
        "descricaoServico": "Cuidados especiais com seu pet",
        "labelServico": "petCare",
        "isSelected": "false"
    },
];

const searchValue = 19; // the value to search for

const result = myArray.map(item => {
  if (item.idServicos === searchValue) {
    return {...item, isSelected: true}; // create a new object with isSelected set to true
  } else {
    return item; // return the original object
  }
});

console.log(result); // returns a new array with isSelected set to true for the object with idServicos equal to 19
*/
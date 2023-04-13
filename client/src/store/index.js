// artigo sobre imagens na store...
// https://stackoverflow.com/questions/53412106/linking-to-images-referenced-in-vuex-store-in-vue-js
// artigo sobre VUE e localStorage
// https://www.section.io/engineering-education/vue2-crud-app-with-localstorage/#:~:text=Load%20data%20from%20local%20storage&text=We%20will%20use%20a%20lifecycle,use%20to%20retrieve%20the%20data.

import { createStore } from "vuex";
// import Servicos from "../../adm/src/types/reservas/Servicos.js";

import JokeNorris from "./modules/JokeNorris.js";
import Servicos2 from "./modules/Servicos2";
import ServicosReserva from "./modules/ServicosReserva";
import ReservasUsuario from "./modules/ReservasUsuario.js";

// import FormReserva from "@/components/reserva/FormReserva.vue";

export default createStore({
  modules: {
    Servicos2,
    JokeNorris,
    ServicosReserva,
    ReservasUsuario
  },
  state: {
    // dados para servicos - exemplo hardcode...
    // servicos: [
    //   {
    //     id: "servico1",
    //     nome: "servico1",
    //     label: "cafeQuarto",
    //     descricao: "Cafe da Manhã no Quarto",
    //     vlrDiaria: 100,
    //   },
    //   {
    //     id: "servico2",
    //     nome: "servico2",
    //     label: "5G",
    //     descricao: "Internet 5G",
    //     vlrDiaria: 50,
    //   },
    //   {
    //     id: "servico3",
    //     nome: "servico3",
    //     label: "massagem",
    //     descricao: "Massagem Terapéutica",
    //     vlrDiaria: 150,
    //   },
    //   {
    //     id: "servico4",
    //     nome: "servico4",
    //     label: "children",
    //     descricao: "Serviços ChildrenCare",
    //     vlrDiaria: 200,
    //   },
    //   {
    //     id: "servico5",
    //     nome: "servico5",
    //     label: "pet",
    //     descricao: "Serviços PetCare",
    //     vlrDiaria: 100,
    //   },
    // ],

    // dados para acomodações
    acomodacoes: [
      {
        ordem: 1,
        id: "master",
        nome: "Master",
        descricaoLonga: "Descrição longa - Master",
        descricaoBreve:
          "Cama estilo queen-size com 05 funções de massagem, uma TV 4K de 50''com programação livre (NetFlix, Prime e canais abertos). Sala com sofá grande e uma poltrona de leitura, e uma TV de 45'', dispositivo Alexa, video-game (PS4 ou XBox) com jogos instalados. Mesa para notebook e cozinha funcional (mini-fogão elétrico, micro-ondas, cafeteira e utensílios básicos).",
        imgURL: require("/src/assets/images/reservas/room01_master.jpg"),
        qtPessoas: 4,
        vlrDiaria: 600,
      },
      {
        ordem: 2,
        id: "family",
        nome: "Family",
        descricaoLonga: "Descrição longa - Family",
        descricaoBreve:
          "Quarto amplo com duas camas tamanho king-size, para até 4 pessoas. Sala conjugada com TV de 50'' e programação livre (NetFlix, Prime e canais abertos). Sofá cama , frigobar, pia e cafeteira.",
        imgURL: require("/src/assets/images/reservas/room02_family2.jpg"),
        qtPessoas: 6,
        vlrDiaria: 400,
      },
      {
        ordem: 3,
        id: "comfort",
        nome: "Comfort",
        descricaoLonga: "Descrição longa - Comfort",
        descricaoBreve:
          "Cama confortável, TV a cabo e frigobar. Mesa de trabalho, internet e serviços adicionais sob consulta.",
        imgURL: require("/src/assets/images/reservas/room03_comfort2.jpg"),
        qtPessoas: 2,
        vlrDiaria: 200,
      },
    ],
    reservas2: {
      handler() {
        for (var i = 0; i < localStorage.length; i++) {
          // do something with localStorage.getItem(localStorage.key(i));
          if (localStorage.key(i).includes("Reserva_")) {
            console.log(
              "Reservas anteriores",
              localStorage.key(i),
              localStorage.getItem(localStorage.key(i))
            );
          }
        }
        // localStorage.setItem("books", JSON.stringify(this.books));
      },
    },
  },

  getters: {
    // https://serversideup.net/sorting-in-vuejs-components-and-vuex-state/
    // https://www.youtube.com/watch?v=OtLRQdjmFvs
    // https://www.youtube.com/watch?v=OjS6SWS6G5c
    acomodacoes: (state) => {
      //let aptoSelected = localStorage.getItem("tipoApto");
      let aptoSelected = "comfort";
      let quartos_hotel = state.acomodacoes.map((item) => {
        return {
          // define ordem para
          ordem: item.id == aptoSelected ? 0 : item.ordem,
          id: item.id,
          nome: item.nome,
          descricaoLonga: item.descricaoLonga,
          descricaoBreve: item.descricaoBreve,
          imgURL: item.imgURL,
          qtPessoas: item.qtPessoas,
          vlrDiaria: item.vlrDiaria.toFixed(2),
        };
      });

      let objStr = JSON.stringify(quartos_hotel);
      //console.log("getters =>", quartos_hotel.length);
      for (let i = 0; i < quartos_hotel.length; i++) {
        //console.log("getters 2", quartos_hotel[i].id);
        if (quartos_hotel[i].id == "family") {
          //console.log("mudar valor da ordem");
        } else {
          //console.log("manter valor da ordem");
        }
      }

      //console.log("getters =>", objStr);
      let objJson = JSON.parse(objStr);
      return objJson;
    },

    servicos: (state) => {
      console.log("servicos1...", state.servicos);
      let servicos_hotel = state.servicos.map((item) => {
        return {
          id: item.id,
          nome: item.nome,
          label: item.label,
          descricao: item.descricao,
          vlrDiaria: item.vlrDiaria.toFixed(2),
        };
      });
      return servicos_hotel;
    },

    reservas: (state) => {
      let reservasAnteriores = state.reservas.map((item) => {
        return {
          dtReserva: item.dtReserva,
          dtCheckIn: item.dtEntrada,
          dtCheckOut: item.dtSaida,
          qtPessoas: item.qtPessoas,
          vlrTotal: item.vlrTotalcomDesconto,
        };
      });
      console.log("gettters reservasAnteriores", reservasAnteriores);
      return reservasAnteriores;
    },


  },
  mutations: {
    // methods - alteração dos dados - exemplo:
    // aplicaDesconto: (state, tipo) => {
    //   state.produtos[tipo].forEach((item) => {
    //     item.preco = (item.preco * 0.9).toFixed(2);
    //   });
    // },

    confirmaServicos: (state) => {
      console.log("Teste", state);
      // state.servicos.forEach((item) => {
      //   console.log(item.label);
      // });
    },
  },
  actions: {
    // yyy - confirmação das mutações - exemplo:
    // aplicaDesconto: (context, tipo) => {
    //   context.commit("aplicaDesconto", tipo);
    // },
    confirmaServicos: (context) => {
      context.commit("confirmaServicos");
    },
  },
});

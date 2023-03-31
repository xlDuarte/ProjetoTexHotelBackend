<template>
  <!-- Modal Servicos2 -->
  <div class="modal" tabindex="-1" id="modalServicos2">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <p>Mensagem sistema: {{ msg }}</p>
            <p>ID da Reserva: {{ idReservas }}</p>
            <!-- para avaliar os arrays sendo passados para a Modal-->
            <!-- 
            <p>arrayServicosBD: {{ arrayServicosBD }}</p>
            <p>arrayServicosAux: {{ arrayServicosAux }}</p>
            -->
            <hr />
            <!-- Incluido para teste !!!-->
            <!-- <button @click="JokeData">Chuck Norris</button>
            <div v-if="JokeNorris.data">
              <p>{{ JokeNorris.data.value }}</p>
            </div> -->
          </div>
          <!-- Incluido para teste !!!-->
          <!-- <div>
            <button @click="Servicos2Data">Servicos2</button>
            <div v-if="Servicos2.data">
              <p>{{ Servicos2.data.value }}</p>
            </div>
          </div> -->
          <!-- INÍCIO DO CONTEÚDO ajustado para trazer da store...-->
          <h2>Manutenção Serviços - Selecione serviços para a reserva</h2>
          <hr />
          <!-- <div
            class="painelServicos"
            v-for="item in Servicos2.data"
            :key="item"
          >
            <input
              type="checkbox"
              v-model="item.isSelected"
              :id="item.idServicos"
              :name="item.nomeServico"
              :value="item.labelServico"
            />
            <label
              >{{ item.descricaoServico }} - R$ {{ item.vlrDiariaServico }}
            </label>
            <br />
          </div> -->
          <div
            class="painelServicos"
            v-for="item in this.arrayServicosBD.data"
            :key="item"
          >
            <input
              type="checkbox"
              v-model="item.isSelected"
              :id="item.idServicos"
              :name="item.nomeServico"
              :value="item.labelServico"
            />
            <label
              >{{ item.descricaoServico }} - R$ {{ item.vlrDiariaServico }},00
            </label>
            <br />
          </div>
          <hr />
          <p>
            Atenção!!! Valores cobrados por diária - alinhar com o cliente
            antecipadamente
          </p>
        </div>
        <button
          class="btn btn-secondary"
          @click="confirmaServicos"
          :disabled="botaoModalServicos"
        >
          Confirma Serviços
        </button>
        <button
          class="btn btn-secondary"
          @click="limpaServicos"
          :disabled="botaoModalServicos"
        >
          Exclui Serviços
        </button>
        <!-- FINAL DO CONTEÚDO -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Fechar
        </button>
      </div>
    </div>
  </div>
  <!-- Fim Modal Servicos -->
</template>

<script>
var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
const bootstrap = require("bootstrap");

import { Reservas } from "@/../adm/src/types/reservas/Reservas.js";
// import { Servicos } from "@/../adm/src/types/reservas/Servicos.js";
import { mapState } from "vuex";
import * as myFunctions from "@/../adm/src/types/reservas/MainFunctions.js";

// import axios
// import axios from "axios";

export default {
  name: "ModalServicos2",
  props: {
    // properties que vem da view que irá chamar o componente...
    msg: String,
    idReservas: String,
    arrayServicosBD: Object,
    arrayServicosAux: Object,
    botaoModalServicos: Boolean,
  },
  data() {
    return {
      // informações que podem ser utilizadas no template...
      arrayServicos: [],
    };
  },
  ready() {
    console.log("Created modalResumo2 - ready(): ");
  },
  setup() {
    //
    console.log("Created modalResumo2 - setup(): ");
  },
  created() {
    //
    console.log("Created modalResumo2 - created(): ");
  },
  watch() {
    // não utilizado...
    console.log("Created modalResumo2 - watch(): ");
  },
  methods: {
    abreModal() {
      var modal = new bootstrap.Modal(
        document.querySelector("#modalServicos2"),
        {
          keyboard: false,
        }
      );
      return modal;
    },
    alerta() {
      //
    },

    confirmaServicos() {
      alert("Serviços adicionais incluídos! Obrigado!", this.arrayServicosBD);
      console.log(myFunctions.teste());
      // let arrayServicos = this.Servicos2;
      let arrayServicos = this.arrayServicosBD;
      console.log("confirmaServicos...:", arrayServicos);
      let arrayServicosEscolhidos = [];
      for (let i = 0; i < arrayServicos.data.length; i++) {
        // define idServico e demais dados do servico,
        // se reserva veio do frontend usar "servicos_idservicos" (FK)
        // se reserva for criada no backend, usar "idServicos" (PK)
        let servId = arrayServicos.data[i].servicos_idservicos;
        if (typeof servId === "undefined") {
          servId = arrayServicos.data[i].idServicos;
        }
        let servData = `"idServicos":"${servId}","nomeServico":"${arrayServicos.data[i].nomeServico}","descricaoServico":"${arrayServicos.data[i].descricaoServico}","vlrDiariaServico":${arrayServicos.data[i].vlrDiariaServico},"isSelected":${arrayServicos.data[i].isSelected}`;
        console.log("confirmaServicos...:", servId, servData);
        let itemLocal = "{" + servData + "}";
        // só deveria gravar os selecionados, porém para facilitar esta gravando todos
        // if (arrayServicos.data[i].isSelected) {
        arrayServicosEscolhidos.push(itemLocal);
        // }
      }
      localStorage.setItem(
        "servicosEscolhidos",
        "[" + arrayServicosEscolhidos + "]"
      );
      //grava servicos no BD
      // instancia classe para gravar reserva no BD....
      //let reserva = new Reservas();
      // para não ocorrer erro de duplicacão das chaves, os dados dos serviços por reserva serão eliminados...
      // teste(this.idServicos,this.arrayServicosBD);
      deleteAndCreateRecords(this.idReservas, this.arrayServicosBD)
         .then(() => {
           console.log("Exclusão e inclusão com sucesso...");
      })
         .catch((error) => {
           console.error(`Ocorreu um erro: ${error}`);
      });

      // só com isso não funcionou...Misericórdia, só por Jesus - mais de 3 horas pra chegar na solução, e nem sei se está 100%...vou testar...
      // reserva.excluiServicosReservaBD(this.idReservas);
      // reserva.salvarServicos(this.idReservas, this.arrayServicosBD);

      // limpa servicos do array...
      this.limpaServicos();
      window.$("#modalServicos2").modal("hide");
    },

    limpaServicos() {
      let arrayServicos = this.arrayServicosBD;
      for (let i = 0; i < arrayServicos.data.length; i++) {
        console.log(
          "Servicos ",
          arrayServicos.data[i].nomeServico,
          arrayServicos.data[i].isSelected
        );
        arrayServicos.data[i].isSelected = false;
      }
    },

    // somente para teste da store...
    JokeData() {
      this.$store.dispatch("JokeNorris/getData");
    },

    // somente para teste...
    Servicos2Data() {
      console.log("Servicos2Data...click!");
    },
  },
  computed: {
    // ...mapState(["JokeNorris"]),
    ...mapState(["Servicos2"]),
  },

  mounted() {
    // carrega servicos para a store...
    // this.Servicos2Data();
    // this.JokeData();
  },
};


// controla a exclusão e criação...
async function deleteAndCreateRecords(idReserva,arrayServicosBD) {
  console.log("Primeiro apagar");
  await new Promise(resolve => {
    deleteRecords(idReserva);
    resolve();
    console.log("Terminei de apagar");
  }),
  console.log("Agora vou criar...");
  let criaReserva = new Reservas();
  criaReserva.salvarServicos(idReserva, arrayServicosBD);
}

// Function that takes some time to complete
function deleteRecords(idReserva) {
  return new Promise(resolve => {
    let delReserva = new Reservas();
    delReserva.excluiServicosReservaBD(idReserva);
    console.log('deleteRecords finished',resolve);
    resolve();
    // setTimeout(() => {
    //   console.log('myFunction finished');
    //   resolve();
    // }, 2000);
  });
}

</script>

<style scoped>
.modal-body {
  color: black;
}
</style>

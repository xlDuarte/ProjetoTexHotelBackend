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
            <p>Mensagem sistema: {{ msg }} </p>
            <p>ID da Reserva: {{ idReservas }}</p>
            <hr />
          </div>
          <!-- INÍCIO DO CONTEÚDO ajustado para trazer da store...-->
          <h2>Manutenção Serviços - Selecione serviços para a reserva</h2>
          <hr />
          <div
            class="painelServicos"
            v-for="item in this.arrayServicosBD.data"
            :key="item"
          >
            <input
              type="checkbox"
              v-model="item.isSelected"
              @change="changeServico(item.isSelected,item)"
              :id="item.idServicos"
              :name="item.nomeServico"
              :value="item"
              :disabled="servicosSelection"
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

// import { Reservas } from "@/../adm/src/types/reservas/Reservas.js";
import { mapState } from "vuex";

// import axios
import axios from "axios";

export default {
  name: "ModalServicos2",
  props: {
    // properties que vem da view que irá chamar o componente...
    msg: String,
    idReservas: [Number, String],
    arrayServicosBD: Object,
    botaoModalServicos: Boolean,
    servicosSelection: Boolean,
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
      console.log("abreModal modalResumo2 ");
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

    changeServico(isSelected,item) {
      // mudou o status do servico...
      let isSelectedAux="false";
      if (isSelected) {
        isSelectedAux = "true"
        // console.log("Mudou status do servico - selected...",this.idReservas, item.servicos_idservicos);
      } else {
        // console.log("Mudou status do servico - unselected...",this.idReservas, item.servicos_idservicos);
      }

      // update servicos no banco - deleção de todos os regisotrs apresentou problemas, foi necessário atualizar um a um...
      updateServicosById(this.idReservas, item.servicos_idservicos,isSelectedAux);

    },
    confirmaServicos() {
      alert("Serviços adicionais incluídos! Obrigado!", this.arrayServicosBD);
      let arrayServicos = this.arrayServicosBD;
      let arrayServicosEscolhidos = [];
      for (let i = 0; i < arrayServicos.data.length; i++) {
        // define idServico e demais dados do servico,
        // se reserva veio do frontend usar "servicos_idservicos" (FK)
        // se reserva for criada no backend, usar "idServicos" (PK)
        let servId = arrayServicos.data[i].servicos_idservicos;
        if (typeof servId === "undefined") {
          servId = arrayServicos.data[i].idServicos;
        }
        let strIsSelected = "";
        if (arrayServicos.data[i].isSelected === "true") {
            strIsSelected = "true"
        } else {
           strIsSelected = "false"
        }
        let servData = `"idServicos":"${servId}","nomeServico":"${arrayServicos.data[i].nomeServico}","descricaoServico":"${arrayServicos.data[i].descricaoServico}","vlrDiariaServico":${arrayServicos.data[i].vlrDiariaServico},"isSelected":"${strIsSelected}"`;
        // console.log("confirmaServicos...:", servId, servData);
        let itemLocal = "{" + servData + "}";
        // só deveria gravar os selecionados, porém para facilitar esta gravando todos
        // if (arrayServicos.data[i].isSelected) {
        arrayServicosEscolhidos.push(itemLocal);
        // }
      }
      //localStorage.setItem("servicosEscolhidos","[" + arrayServicosEscolhidos + "]");

      window.$("#modalServicos2").modal("hide");
    },

    limpaServicos() {
      let arrayServicos = this.arrayServicosBD;
      for (let i = 0; i < arrayServicos.data.length; i++) {
        console.log(
          "Servicos ",
          arrayServicos.data[i].servicos_idservicos,
          arrayServicos.data[i].nomeServico,
          arrayServicos.data[i].isSelected
        );
        arrayServicos.data[i].isSelected = false;
        updateServicosById(this.idReservas, arrayServicos.data[i].servicos_idservicos,"false");
      }
    },

    // somente para teste da store...
    // JokeData() {
    //   this.$store.dispatch("JokeNorris/getData");
    // },

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

// update do serviço...
async function updateServicosById(idReservas, servicos_idservicos,isSelected) {
  console.log("updateServicosById...",idReservas, servicos_idservicos,isSelected);
  try {
    const response = await axios.put("http://localhost:5000/servicoReservaSelected/", {
      isSelected: isSelected,
      Reservas_idReservas: idReservas,
      servicos_idservicos: servicos_idservicos,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}


</script>

<style scoped>
.modal-dialog {
  margin: 10vh auto 0px auto
}
.modal-body {
  color: black;
}
</style>

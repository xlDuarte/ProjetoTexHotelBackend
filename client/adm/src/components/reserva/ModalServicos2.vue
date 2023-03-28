<template>
  <!-- Modal Servicos2 -->
  <div class="modal" tabindex="-1" id="modalServicos2">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <p> Mensagem: {{ msg }}</p>
            <p> ID da Reserva: {{ idReservas }}</p>
            <button @click="JokeData">Chuck Norris</button>
            <div v-if="JokeNorris.data">
              <p>{{ JokeNorris.data.value }}</p>
            </div>
          </div>
          <div>
            <button @click="Servicos2Data">Servicos2</button>
            <div v-if="Servicos2.data">
              <p>{{ Servicos2.data.value }}</p>
            </div>
          </div>
          <!-- INÍCIO DO CONTEÚDO ajustado para trazer da store...-->
          <h3>Modal Servicos 2 - Selecione mais serviços!</h3>
          <hr />
          <div class="painelServicos" v-for="item in Servicos2.data" :key="item">
            <input type="checkbox" v-model="checked" :id="item.idServicos" :name="item.nomeServico"
              :value="item.labelServico" />
            <label>{{ item.descricaoServico }} - R$ {{ item.vlrDiariaServico }}
            </label>
            <br />
          </div>
          <hr />
          <p>
            Valores cobrados por diária - consulte nosso site para mais
            informações
          </p>
        </div>
        <button class="btn btn-secondary" @click="confirmaServicos">
          Confirma Serviços
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

import { mapState } from "vuex";

export default {
  name: "ModalServicos2",
  props: {
    // properties que vem da view que irá chamar o componente...
    msg: String,
    idReservas: String,
  },
  data() {
    return {
      // informações que podem ser utilizadas no template...
    };
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
      alert("Serviços adicionais incluídos! Obrigado!");
      window.$("#modalServicos").modal("hide");
    },
    JokeData() {
      this.$store.dispatch("JokeNorris/getData");
    },
    Servicos2Data() {
      this.$store.dispatch("Servicos2/getData");
    },
  },
  computed: {
    ...mapState(["JokeNorris"]),
    ...mapState(["Servicos2"]),
  },
  mounted() {
    // carrega servicos para a store...
    this.Servicos2Data();
    this.JokeData();

    window.$("#servico1").click(function () {
      window.$("#servico1").is(":checked")
        ? localStorage.setItem("servico1", true)
        : localStorage.setItem("servico1", false);
    });
    window.$("#servico2").click(function () {
      window.$("#servico2").is(":checked")
        ? localStorage.setItem("servico2", true)
        : localStorage.setItem("servico2", false);
    });
    window.$("#servico3").click(function () {
      window.$("#servico3").is(":checked")
        ? localStorage.setItem("servico3", true)
        : localStorage.setItem("servico3", false);
    });
    window.$("#servico4").click(function () {
      window.$("#servico4").is(":checked")
        ? localStorage.setItem("servico4", true)
        : localStorage.setItem("servico4", false);
    });
    window.$("#servico5").click(function () {
      window.$("#servico5").is(":checked")
        ? localStorage.setItem("servico5", true)
        : localStorage.setItem("servico5", false);
    });
  },
};
</script>

<style scoped>
.modal-body {
  color: black;
}
</style>

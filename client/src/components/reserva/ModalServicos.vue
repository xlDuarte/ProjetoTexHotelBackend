<template>
  <!-- Modal Servicos -->
  <div class="modal" tabindex="-1" id="modalServicos">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- INÍCIO DO CONTEÚDO ajustado para trazer da store...-->
          <h3>Selecione mais serviços!</h3>
          <hr />
          <div class="painelServicos" v-for="item in Servicos2.data" :key="item">
            <input type="checkbox" v-model="item.isSelected" :id="item.labelServico" :name="item.nomeServico"
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
        <button class="btn btn-secondary" @click="limpaServicos">
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
// referencias...
// https://codingbeautydev.com/blog/vue-check-if-checkbox-is-checked/
// https://stackoverflow.com/questions/61116534/vuejs-v-model-on-multiple-checkboxes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
const bootstrap = require("bootstrap");

import { mapState } from "vuex";

var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

export default {
  name: "ModalView",
  props: {
    // properties que vem da view que irá chamar o componente...
    msg: String,
  },
  data() {
    return {
      // informações que podem ser utilizadas no template...
      message: "",
    };
  },
  methods: {
    abreModal() {
      var modal = new bootstrap.Modal(
        document.querySelector("#modalServicos"),
        {
          keyboard: false,
        }
      );
      return modal;
    },
    alerta() {
      //
    },
    Servicos2Data() {
      this.$store.dispatch("Servicos2/getData");
    },
    confirmaServicos() {
      alert("Serviços adicionais incluídos! Obrigado!");
      let arrayServicos = this.Servicos2;
      let arrayServicosEscolhidos = [];
      for (let i = 0; i < arrayServicos.data.length; i++) {
        // persiste status do checkbox (servico) na localStorage...
        // define idServico = "servico"+id e demais dados do servico
        let servId = `idServicos_${arrayServicos.data[i].idServicos}`;
        let servData = `"idServicos":"${arrayServicos.data[i].idServicos}","nomeServico":"${arrayServicos.data[i].nomeServico}","descricaoServico":"${arrayServicos.data[i].descricaoServico}","vlrDiariaServico":${arrayServicos.data[i].vlrDiariaServico},"isSelected":${arrayServicos.data[i].isSelected}`;
        let itemLocal = "{" + servData + "}";
        // localStorage.setItem(nomeServico, arrayServicos.data[i].isSelected);
        localStorage.setItem(servId, itemLocal);
        if (arrayServicos.data[i].isSelected) {
          arrayServicosEscolhidos.push(itemLocal);
        }
      }
      console.log("Servicos escolhidos...", arrayServicosEscolhidos);
      // localStorage.setItem('servicosEscolhidos',JSON.stringify("["+arrayServicosEscolhidos+"]"));
      localStorage.setItem('servicosEscolhidos', "[" + arrayServicosEscolhidos + "]");
      console.log("Servicos escolhidos localStorage...", localStorage.getItem('servicosEscolhidos'));
      window.$("#modalServicos").modal("hide");
    },

    limpaServicos() {
      console.log("Cliquei no limpaServicos...")
      let arrayServicos = this.Servicos2;
      for (let i = 0; i < arrayServicos.data.length; i++) {
          console.log("Servicos ",arrayServicos.data[i].nomeServico, arrayServicos.data[i].isSelected);
          arrayServicos.data[i].isSelected = false;
      }
    }
    // teste para entender store + checkbox...
    //
    // essa parte vai no template...
    //     <div id="tmp">
    //   <input type="checkbox" name="js" ref="theCheckbox" />
    //   <label for="js"> JavaScript </label>
    //   <br />
    //   <button @click="handleClick">Done</button>
    //   <p v-if="message">{{ message }}</p>
    // </div>
    // essa parte é aqui mesmo, no script...
    // handleClick() {
    //   // Access ref with "$refs" property
    //   if (this.$refs.theCheckbox.checked) {
    //     this.message = "You know JS";
    //   } else {
    //     this.message = "You don't know JS";
    //   }
    // },
  },
  computed: {
    ...mapState(["Servicos2"]),

    // chamada store "hardcoded"
    // servicos() {
    //   return this.$store.getters.servicos;
    // },
  },
  mounted() {
    // carrega servicos para a store...
    this.Servicos2Data();
  },
};

</script>

<style scoped>
.modal-body {
  color: black;
}
</style>

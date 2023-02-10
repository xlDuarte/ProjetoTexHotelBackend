<template>
  <!-- Modal Servicos -->
  <div class="modal" tabindex="-1" id="modalServicos">
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
          <!-- INÍCIO DO CONTEÚDO ajustado para trazer da store...-->
          <h3>Selecione mais serviços!</h3>
          <hr />
          <div class="painelServicos" v-for="item in servicos" :key="item">
            <input
              type="checkbox"
              v-model="checked"
              :id="item.id"
              :name="item.name"
              :value="item.label"
            />
            <label>{{ item.descricao }} - R$ {{ item.vlrDiaria }} </label>
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
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
const bootstrap = require("bootstrap");

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
    confirmaServicos() {
      alert("Serviços adicionais incluídos! Obrigado!");
      window.$("#modalServicos").modal("hide");
    },
  },
  computed: {
    servicos() {
      return this.$store.getters.servicos;
    },
  },
  mounted() {
    // deve ter outro jeito melhor de fazer isso...
    // teste para tentar simplificar a seleção de serviços...não funcionou
    // console.log(
    //   "Servicos da store 0...",
    //   this.servicos.length,
    //   this.servicos,
    //   this.servicos[0].id,
    //   this.servicos[1].id,
    // );

    // let tempServ = "";
    // for (let i=0;i<this.servicos.length;i++) {
    //   tempServ="#"+this.servicos[i].id
    //   console.log("Servico:",tempServ)
    //   window.$(tempServ).click(function () {
    //     if (window.$(tempServ).is(":checked")) {
    //       console.log(`${tempServ} checked!`)
    //       localStorage.setItem("servico1", true);
    //   } // checked
    //   else {
    //     localStorage.setItem(tempServ, false);
    //   } // unchecked
    // });
    // }

    window.$("#servico1").click(function () {
      (window.$("#servico1").is(":checked")) ? localStorage.setItem("servico1", true) : localStorage.setItem("servico1", false)
    });
    window.$("#servico2").click(function () {
      (window.$("#servico2").is(":checked")) ? localStorage.setItem("servico2", true) : localStorage.setItem("servico2", false)
    });
    window.$("#servico3").click(function () {
      (window.$("#servico3").is(":checked")) ? localStorage.setItem("servico3", true) : localStorage.setItem("servico3", false)
    });
    window.$("#servico4").click(function () {
      (window.$("#servico4").is(":checked")) ? localStorage.setItem("servico4", true) : localStorage.setItem("servico4", false)
    });
    window.$("#servico5").click(function () {
      (window.$("#servico5").is(":checked")) ? localStorage.setItem("servico5", true) : localStorage.setItem("servico5", false)
    });
  },
};
</script>

<style scoped>
.modal-body {
  color: black;
}
</style>

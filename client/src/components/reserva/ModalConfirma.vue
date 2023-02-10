<template>
  <div>
    <!-- Modal Confirma -->
    <div class="modal" tabindex="-1" id="modalConfirma">
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
            <h3>Confirme sua reserva</h3>
            <hr />
            <!-- <div class="painelServicos" v-for="item in servicos" :key="item">
              <input
                type="checkbox" v-model="checked" :id="item.id" :name="item.name" :value="item.label"
              />
              <label>{{ item.descricao }} - R$ {{ item.vlrDiaria }} </label>
              <br />
            </div> -->
            <hr />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
              explicabo quos in labore enim temporibus saepe, exercitationem ipsa
              incidunt itaque odio veniam laborum aut nihil, ratione ex. Quaerat,
              voluptas blanditiis.
            </p>
            <!-- INÍCIO DO CONTEÚDO -->
            <h3>Veja o resumo de sua solicitação!</h3>
            <hr />
            <h2>Seu cupom de desconto: {{ cupomDesconto }}</h2>
            <h2>Diárias</h2>
            <br />
            <div id="diarias">
              <p>.teste d..</p>
              <p></p>
            </div>
            <hr />
            <h2>Servicos Adicionais</h2>
            <br />
            <p></p>
            <div id="servicos">
              <p>.teste d ..</p>
              <p></p>
            </div>
            <hr />
            <p>Total</p>
            <div id="total">
              <p>..total confirma.</p>
              <p></p>
            </div>
            <hr />
          </div>
  
          <!-- FINAL DO CONTEÚDO -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Fechar
          </button>
        </div>
      </div>
    </div>
    <!-- Fim Modal Confirma -->
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
const bootstrap = require("bootstrap");

// import { preencheModalResumo } from "./FormReserva.vue";
import { createPara } from "./FormReserva.vue";
import { cupomDesconto } from "./FormReserva.vue";
//import { updateBindingForm } from "./FormReserva.vue";

// gera cupom de desconto caso não exista nenhum. Se já houver a mensagem é que não podem ser gerados dois cupons no mesmo dia...
let msgCupomDesconto = "Lamento, um cupom de desconto já foi utilizado hoje...";
if (localStorage.getItem("cupomDesconto") != "false") {
  localStorage.setItem("cupomDesconto", cupomDesconto());
  msgCupomDesconto = localStorage.getItem("cupomDesconto");
} else {
  localStorage.setItem("cupomDesconto", msgCupomDesconto);
}

export default {
  name: "ModalConfirma",
  props: {
    // properties que vem da view que irá chamar o componente...
    msg: String,
  },
  data() {
    return {
      // informações que podem ser utilizadas no template...
      cupomDesconto: localStorage.getItem("cupomDesconto"),
    };
  },
  methods: {
    abreModal() {
      var modal = new bootstrap.Modal(
        document.querySelector("#modalConfirma"),
        {
          keyboard: false,
        }
      );
      return modal;
    },
  },
  mounted() {
    // atualiza dados da modalConfirma
    // console.log("mounted...confirma");
    //preencheModalResumo();
    // processo
    // cria elemento P
    let paraTexto = "";
    // atualiza div Diarias - apto selecionado, quantidade diarias, valor das diarias, nr de pessoas, valor total
    paraTexto =
      "Apto selecionado: " + localStorage.getItem("tipoApto") + "<br />";
    document.getElementById("diarias").appendChild(createPara(paraTexto));
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
p,
a {
  color: #2304ed;
}

.sec {
  position: relative;
  padding: 2vw;
  transition: all 0.3s ease;
  color: black;
}

.sec > div{
  max-width: 90%;
  margin: 2% 5%; 
}
.sec h2 {
  font-size: 3em;
}

.sec h3,
.sec h4 {
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

.sec p {
  font-size: 1.2em;
  font-weight: 300;
}

.sec iframe {
  width: 35vw;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
}

img{
  width: 523px;
  height: 294px;
  display: block;
  border-radius: 20px;
}

.flex{
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 5%;  
}

.flex > div{
  flex: 1 1 420px;
  margin: 10px;
}
</style>

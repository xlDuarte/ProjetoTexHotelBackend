<template>
  <!-- Modal MinhasReservas -->
  <!-- <ModalMeusComentarios /> -->
  <div class="modal" tabindex="-1" id="modalMinhasReservas">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- INÍCIO DO CONTEÚDO ajustado para trazer da store...-->
          <h4>Suas ultimas reservas, {{ userLoged }}</h4>
          <div class="ultimasReservas">
            <table class="tableReserva">
              <thead>
                <tr>
                  <th data-type="text-long">
                    Data Reserva <span class="resize-handle"></span>
                  </th>
                  <th data-type="text-long">
                    CheckIn <span class="resize-handle"></span>
                  </th>
                  <th data-type="text-long">
                    CheckOut <span class="resize-handle"></span>
                  </th>
                  <th data-type="numeric">
                    Qt Pessoas <span class="resize-handle"></span>
                  </th>
                  <th data-type="text-long">
                    Vlr Total <span class="resize-handle"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="ultimasReservas" v-for="item in reservas" :key="item">
                  <td>{{ item.dtReserva }}</td>
                  <td>{{ item.dtCheckIn }}</td>
                  <td>{{ item.dtCheckOut }}</td>
                  <td>{{ item.qtPessoas }}</td>
                  <td>{{ item.vlrTotal }}</td>
                  <td>
                    <!-- <a id="comentario" class="button" href="">Comentário</a> -->
                    <button type="button" @click="abreComentario(item)" class="btn btn-dark" id="btnAbreComentario">
                      Inserir comentário
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="painelComentarios">
          <div id="box03" class="boxPadrao bordaPadrao sombraPadrao">
            <p class="labelPadrao textCenter textBold">
              Deixe aqui seu comentário
            </p>
            <p id="lblReserva">Reserva: {{ reservaId }}</p>
            <form>
              <input class="inputPadrao p-1 mtb-1 border textBold" type="text" placeholder="Nome" id="inputNome"
                v-model="inputNome" name="nome" />
              <textarea class="form-control inputPadrao p-1 mtb-1 border textBold" name="mensagem" id="txtMensagem"
                v-model="txtMensagem" rows="5" placeholder="Comentários"></textarea>
              <a href="javascript:void(0)" @click="Avaliar(1)">
                <img src="@/assets/images/star0.png" id="s1" /></a>

              <a href="javascript:void(0)" @click="Avaliar(2)">
                <img src="@/assets/images/star0.png" id="s2" /></a>

              <a href="javascript:void(0)" @click="Avaliar(3)">
                <img src="@/assets/images/star0.png" id="s3" /></a>

              <a href="javascript:void(0)" @click="Avaliar(4)">
                <img src="@/assets/images/star0.png" id="s4" /></a>

              <a href="javascript:void(0)" @click="Avaliar(5)">
                <img src="@/assets/images/star0.png" id="s5" /></a>
              <p id="rating"></p>

              <button type="button" @click="adComentario" class="btn btn-dark" id="btnComentario">
                Confirmar
              </button>
            </form>
            <div class="my-5">
              <div class="border p-3 my-2" v-for="(coment, n) in comentarios" :key="coment">
                <span class="autor"><strong>Nome: </strong>{{ coment.nome }}</span>
                <p class="my-4" id="mensagem">{{ coment.comentario }}</p>
                <a href="#" @click.prevent="excluir(n)">Excluir</a>
              </div>
            </div>
          </div>
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
  <!-- Fim Modal MinhasReservas -->
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
const bootstrap = require("bootstrap");

// import ModalMeusComentarios from "./ModalMeusComentarios.vue";

var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

var avaliacao = 0;

export default {
  name: "ModalView",
  // components: { ModalMeusComentarios },
  props: {
    // properties que vem da view que irá chamar o componente...
    msg: String,
  },
  data() {
    return {
      // informações que podem ser utilizadas no template...
      dadosReserva: [],
      userLoged: localStorage.getItem("loged"),
      inputNome: "",
      txtMensagem: "",
      comentarios: [],
      labelReserva: document.getElementById("lblReserva"),
      reservaId: "",
      idUsuario: 14,
    };
  },
  created() {
    
    console.log("Created...");


  },
  methods: {
    abreModal() {
      var modal = new bootstrap.Modal(
        document.querySelector("#modalMinhasReservas"),
        {
          keyboard: false,
        }
      );
      return modal;
    },

    abreComentario(item) {
      // console.log("Cliquei no abre comentário...ID da reserva:", item);
      this.dadosReserva = item;
      // verifica se comentário já foi feito para a reserva selecionada, apresenta mensagem de editar se positivo
      console.log(
        `Coment_${this.dadosReserva.reservaId}`,
        localStorage.getItem(`Coment_${this.dadosReserva.reservaId}`)
      );
      if (localStorage.getItem(`Coment_${this.dadosReserva.reservaId}`)) {
        alert(
          `Comentário já realizado para a reserva ${this.dadosReserva.reservaId}`
        );
      }
      this.showHide(".painelComentarios", "remove");
      this.reservaId = this.dadosReserva.reservaId;
      console.log("thisReservaId", this.reservaId);
    },

    alerta() {
      //
    },

    showHide(obj, action) {
      document.querySelector(obj).classList[action]("hide");
    },

    // metodos para painel de comentarios...
    adComentario() {
      //document.getElementById("inputNome").innerHTML = "Reserva_X";
      if (this.txtMensagem.trim() === "") return;
      if (this.inputNome.trim() === "") this.inputNome = "Usuário Anônimo";
      this.comentarios.push({
        dtReserva: this.dadosReserva.dtReserva,
        idReserva: this.dadosReserva.reservaId,
        nome: this.userLoged,
        comentario: this.txtMensagem,
        tipo: this.dadosReserva.tipoApto,
        nota: avaliacao,
      });
      // console.log("DadosReserva:", this.dadosReserva);
      localStorage.setItem(
        `Coment_${this.dadosReserva.reservaId}`,
        JSON.stringify(this.comentarios)
      );
      avaliacao = 0;
      this.inputNome = "";
      this.txtMensagem = "";
      this.showHide(".painelComentarios", "add");
    },
    excluir(n) {
      this.comentarios.splice(n, 1);
    },
    Avaliar(estrela) {
      let urlStar1 = require("/src/assets/images/star1.png")
      let urlStar0 = require("/src/assets/images/star0.png")
      if (estrela == 5) {
        //document.getElementById("s1").src = "./src/assets/images/star1.png";
        document.getElementById("s1").src = urlStar1;
        document.getElementById("s2").src = urlStar1;
        document.getElementById("s3").src = urlStar1;
        document.getElementById("s4").src = urlStar1;
        document.getElementById("s5").src = urlStar1;
        avaliacao = 5;
      }

      //ESTRELA 4
      if (estrela == 4) {
        document.getElementById("s1").src = urlStar1;
        document.getElementById("s2").src = urlStar1;
        document.getElementById("s3").src = urlStar1;
        document.getElementById("s4").src = urlStar1;
        document.getElementById("s5").src = urlStar0;
        avaliacao = 4;
      }

      //ESTRELA 3
      if (estrela == 3) {
        document.getElementById("s1").src = urlStar1;
        document.getElementById("s2").src = urlStar1;
        document.getElementById("s3").src = urlStar1;
        document.getElementById("s4").src = urlStar0;
        document.getElementById("s5").src = urlStar0;
        avaliacao = 3;
      }

      //ESTRELA 2
      if (estrela == 2) {
        document.getElementById("s1").src = urlStar1;
        document.getElementById("s2").src = urlStar1;
        document.getElementById("s3").src = urlStar0;
        document.getElementById("s4").src = urlStar0;
        document.getElementById("s5").src = urlStar0;
        avaliacao = 2;
      }

      //ESTRELA 1
      if (estrela == 1) {
        document.getElementById("s1").src = urlStar1;
        document.getElementById("s2").src = urlStar0;
        document.getElementById("s3").src = urlStar0;
        document.getElementById("s4").src = urlStar0;
        document.getElementById("s5").src = urlStar0;
        avaliacao = 1;
      }

      document.getElementById("rating").innerHTML = avaliacao;
    },
    // força refresh do componente...
    // https://michaelnthiessen.com/force-re-render/
    methodThatForcesUpdate() {
      // ...
      this.$forceUpdate(); // Notice we have to use a $ here
      // ...
    },
  },
  computed: {
    reservas() {

      // verifica campos na localStorage = Reserva_"X"
      let arrayReservas = [];
      let arrayAux = [];
      let el = "";
      let i = 0;
      for (i = 0; i < localStorage.length; i++) {
        // verifica reservas anteriores...
        // if (localStorage.key(i).includes("Reserva_",0)) {
        if (localStorage.key(i).substring(0, 8) === "Reserva_") {
          arrayAux = JSON.parse(localStorage.getItem(localStorage.key(i)));
          (el = {
            reservaId: `${arrayAux[0].reservaId}`,
            dtReserva: `${arrayAux[0].dtReserva}`,
            codCliente: `${arrayAux[0].codCliente}`,
            dtCheckIn: `${arrayAux[0].dtEntrada}`,
            dtCheckOut: `${arrayAux[0].dtSaida}`,
            qtPessoas: `${arrayAux[0].qtPessoas}`,
            tipoApto: `${arrayAux[0].tipoApto}`,
            vlrTotal: `${arrayAux[0].vlrTotalcomDesconto}`,
          }),
            arrayReservas.push(el);
        }
      }
      return arrayReservas;
    },
  },
  mounted() {
    // esconde o painel de comentários...
    this.showHide(".painelComentarios", "add");
  },

};

// confirmação da reserva e display da modal de confirmação
window.$().ready(function () {
  window.$("#comentario").click(function () {
    console.log("Cliquei em comentario");
    //this.showHide(".painelComentarios", "remove");
    console.log("Cliquei em comentario pós remove...");
    //window.$("#modalMeusComentarios").modal("show");
  });
});
</script>

<style scoped>
.modal-body {
  color: black;
}

.tableReserva * {
  box-sizing: border-box;
  font-size: 0.8rem;
}

.tableReserva html,
body {
  padding: 0;
  margin: 0;
}

.tableReserva body {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    "Helvetica", "Arial", sans-serif;
}

.tableReserva table {
  min-width: 100vw;
  width: auto;
  flex: 1;
  display: grid;
  border-collapse: collapse;
  /* These are just initial values which are overriden using JavaScript when a column is resized */
  grid-template-columns:
    minmax(auto, auto) minmax(auto, auto) minmax(auto, auto) minmax(auto, auto) minmax(auto, auto);
}

.tableReserva th,
td {
  padding: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tableReserva th {
  position: sticky;
  top: 0;
  background: #6c7ae0;
  text-align: left;
  font-weight: normal;
  font-size: 0.8rem;
  color: white;
}

.tableReserva th:last-child {
  border: 0;
}

.tableReserva td {
  padding-top: 10px;
  padding-bottom: 10px;
  color: #808080;
}

.tableReserva tr:nth-child(even) td {
  background: #f8f6ff;
}

.tableReserva .links {
  text-decoration: none;
  color: black;
  padding: 0.4em;
}
</style>

<!-- // exemplo de utilização de arrays / json usando localStorage
// https://stackoverflow.com/questions/29123251/how-to-store-and-fetch-data-from-array-using-localstorage-in-javascript/29123824#29123824
var existingArray = [
  { id: 1, country: "Country1", url: "example.com" },
  { id: 2, country: "Country2", url: "example2.com" },
];

localStorage.setItem("myEventsArray", JSON.stringify(existingArray));

/* on pageLoad */
var pageLoadArray = [];
var storedString = localStorage.getItem("myEventsArray");
if (storedString) {
  pageLoadArray = JSON.parse(storedString);
  if (pageLoadArray.length) {
    console.log("pageLoadArray", pageLoadArray, pageLoadArray[0].country);
  }
} -->

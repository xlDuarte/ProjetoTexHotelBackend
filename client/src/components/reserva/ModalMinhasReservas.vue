<template>
  <!-- Modal MinhasReservas -->
  <!-- <ModalMeusComentarios /> -->
  <div class="modal" tabindex="-1" id="modalMinhasReservas">
    <div class="modal-dialog modal-xl">
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
          <h4>
            Suas últimas reservas, {{ userLoged }}. Será sempre bem-vindo!
          </h4>
          <h5>{{ msgUser }}</h5>
          <div class="ultimasReservas">
            <table class="tableReserva">
              <thead>
                <tr>
                  <th data-type="text-short">
                    id Reserva <span class="resize-handle"></span>
                  </th>

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
                  <th data-type="text-short">
                    Status <span class="resize-handle"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="ultimasReservas"
                  v-for="item in reservas"
                  :key="item"
                >
                  <td>{{ item.idReservas }}</td>
                  <td>{{ formatDate(item.dataReserva) }}</td>
                  <td>{{ formatDate(item.dataEntradaReserva) }}</td>
                  <td>{{ formatDate(item.dataSaidaReserva) }}</td>
                  <td>{{ item.qtdHospedesReserva }}</td>
                  <td>{{ item.valorTotalDesconto }}</td>
                  <td>{{ item.statusReserva }}</td>
                  <td>
                    <!-- <a id="comentario" class="button" href="">Comentário</a> -->
                    <button
                      type="button"
                      @click="abreComentario(item)"
                      class="btn btn-dark"
                      id="btnAbreComentario"
                    >
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
              <input
                class="inputPadrao p-1 mtb-1 border textBold"
                type="text"
                placeholder="Nome"
                id="inputNome"
                v-model="inputNome"
                name="nome"
              />
              <textarea
                class="form-control inputPadrao p-1 mtb-1 border textBold"
                name="mensagem"
                id="txtMensagem"
                v-model="txtMensagem"
                rows="5"
                placeholder="Comentários"
              ></textarea>
              <a href="javascript:void(0)" @click="Avaliar(1)">
                <img src="@/assets/images/star0.png" id="s1"
              /></a>

              <a href="javascript:void(0)" @click="Avaliar(2)">
                <img src="@/assets/images/star0.png" id="s2"
              /></a>

              <a href="javascript:void(0)" @click="Avaliar(3)">
                <img src="@/assets/images/star0.png" id="s3"
              /></a>

              <a href="javascript:void(0)" @click="Avaliar(4)">
                <img src="@/assets/images/star0.png" id="s4"
              /></a>

              <a href="javascript:void(0)" @click="Avaliar(5)">
                <img src="@/assets/images/star0.png" id="s5"
              /></a>
              <p id="rating"></p>

              <button
                type="button"
                @click="adComentario"
                class="btn btn-dark"
                id="btnComentario"
              >
                Confirmar
              </button>
            </form>
            <div class="my-5">
              <div
                class="border p-3 my-2"
                v-for="(coment, n) in comentarios"
                :key="coment"
              >
                <span class="autor"
                  ><strong>Nome: </strong>{{ coment.nome }}</span
                >
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

import { mapState } from "vuex";
import moment from 'moment';

// import axios
import axios from "axios";

var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

// var avaliacao = 0;

export default {
  name: "ModalView",
  // components: { ModalMeusComentarios },
  props: {
    // properties que vem da view que irá chamar o componente...
    msg: String,
    msgUser: String,
  },
  data() {
    return {
      // informações que podem ser utilizadas no template...
      dadosReserva: [],
      userLoged: localStorage.getItem("loged"),
      idUsuario: localStorage.getItem("userId"),
      inputNome: "",
      txtMensagem: "",
      comentarios: [],
      labelReserva: document.getElementById("lblReserva"),
      reservaId: "",
      avaliacao: 0,
      dtComentario: "",
    };
  },
  created() {
    // console.log("Created...");
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
      this.dadosReserva = item;
      // verifica se comentário já foi feito para a reserva selecionada, apresenta mensagem de editar se positivo
      if (localStorage.getItem(`Coment_${this.dadosReserva.reservaId}`)) {
        alert(
          `Comentário já realizado para a reserva ${this.dadosReserva.reservaId}`
        );
      }
      this.showHide(".painelComentarios", "remove");
      this.reservaId = this.dadosReserva.idReservas;
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
      this.dtComentario = moment(new Date(),"DD/MM/YYYY").format("DD-MM-YYYY"),
      this.comentarios.push({
        dtReserva: this.dadosReserva.dtReserva,
        dtComentario: this.dtComentario,
        idReserva: this.dadosReserva.reservaId,
        idreserva: this.reservaId,
        idUsuario: this.idUsuario,
        usuarioLogado: this.userLoged,
        nomeComentario: this.inputNome,
        comentario: this.txtMensagem,
        tipo: this.dadosReserva.tipoApto,
        nota: this.avaliacao,
      });
      localStorage.setItem(
        `Coment_${this.dadosReserva.idReservas}`,
        JSON.stringify(this.comentarios)
      );

      // gravar no MongoDB...
      this.criaComentariosMongoBD();

      this.avaliacao = 0;
      this.inputNome = "";
      this.txtMensagem = "";
      this.showHide(".painelComentarios", "add");
    },

      // http://localhost:5000/novoComentario
    async criaComentariosMongoBD() {
      try {
        await axios.post("http://localhost:5000/novoComentario", {
          comentario: this.txtMensagem,
          contatoComentario: this.inputNome,
          idUsuario: this.idUsuario,
          idReserva: this.reservaId,
          nome: this.userLoged,
          nota: this.avaliacao,
          dataComentario: this.dtComentario,
          statusComentario: "pendente",
          publicarDe: "",
          publicarAte:""          
        });
      } catch (err) {
        console.log(err);
      }
      return true;
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
        this.avaliacao = 5;
      }

      //ESTRELA 4
      if (estrela == 4) {
        document.getElementById("s1").src = urlStar1;
        document.getElementById("s2").src = urlStar1;
        document.getElementById("s3").src = urlStar1;
        document.getElementById("s4").src = urlStar1;
        document.getElementById("s5").src = urlStar0;
        this.avaliacao = 4;
      }

      //ESTRELA 3
      if (estrela == 3) {
        document.getElementById("s1").src = urlStar1;
        document.getElementById("s2").src = urlStar1;
        document.getElementById("s3").src = urlStar1;
        document.getElementById("s4").src = urlStar0;
        document.getElementById("s5").src = urlStar0;
        this.avaliacao = 3;
      }

      //ESTRELA 2
      if (estrela == 2) {
        document.getElementById("s1").src = urlStar1;
        document.getElementById("s2").src = urlStar1;
        document.getElementById("s3").src = urlStar0;
        document.getElementById("s4").src = urlStar0;
        document.getElementById("s5").src = urlStar0;
        this.avaliacao = 2;
      }

      //ESTRELA 1
      if (estrela == 1) {
        document.getElementById("s1").src = urlStar1;
        document.getElementById("s2").src = urlStar0;
        document.getElementById("s3").src = urlStar0;
        document.getElementById("s4").src = urlStar0;
        document.getElementById("s5").src = urlStar0;
        this.avaliacao = 1;
      }

      document.getElementById("rating").innerHTML = this.avaliacao;
    },

    ReservasUsuarioData() {
      this.$store.dispatch("ReservasUsuario/getData", { idUsuario: `${this.idUsuario}` });
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
    }

  },
  computed: {
    ...mapState(["ReservasUsuario"]),

    reservas() {
      let arrayReservas = this.ReservasUsuario.data;
      return arrayReservas;
    },
  },
  
  mounted() {
    // esconde o painel de comentários...
    this.showHide(".painelComentarios", "add");
    this.ReservasUsuarioData();
  },

};

// confirmação da reserva e display da modal de confirmação
// window.$().ready(function () {
//   window.$("#comentario").click(function () {
//     console.log("Cliquei em comentario");
//     //this.showHide(".painelComentarios", "remove");
//     console.log("Cliquei em comentario pós remove...");
//     //window.$("#modalMeusComentarios").modal("show");
//   });
// });
</script>

<style scoped>
.modal-body {
  color: black;
}

.tableReserva * {
  box-sizing: border-box;
  font-size: 0.8rem;
  font-weight: bold;
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
  grid-template-columns: minmax(auto, auto) minmax(auto, auto) minmax(
      auto,
      auto
    ) minmax(auto, auto) minmax(auto, auto);
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

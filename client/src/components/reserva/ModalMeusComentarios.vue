<template>
  <!-- Modal Meuscomentarios -->
  <div class="modal" tabindex="-1" id="modalMeusComentarios">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- INÍCIO DO CONTEÚDO ajustado para trazer da store...-->
          <h4>{{ userLoged }}, insira aqui seus comentários e sua avaliação!</h4>
          <div class="comentarios">
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
                <tr class="ultimasReservas" v-for="item in reservas2" :key="item">
                  <td>{{ item.dtReserva }}</td>
                  <td>{{ item.dtCheckIn }}</td>
                  <td>{{ item.dtCheckOut }}</td>
                  <td>{{ item.qtPessoas }}</td>
                  <td>{{ item.vlrTotal }}</td>
                  <td><a class="links" href="">Comentário</a></td>
                </tr>
              </tbody>
            </table>
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
  <!-- Fim Modal MeusComentarios -->
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
      userLoged: localStorage.getItem("loged"),
    };
  },
  methods: {
    abreModal() {
      var modal = new bootstrap.Modal(
        document.querySelector("#modalMeusComentarios"),
        {
          keyboard: false,
        }
      );
      return modal;
    },

    // força refresh do componente...
    // https://michaelnthiessen.com/force-re-render/
    methodThatForcesUpdate() {
      // ...
      this.$forceUpdate(); // Notice we have to use a $ here
      // ...
    },

    alerta() {
      //
    },
  },
  computed: {
    reservas() {
      return this.$store.getters.reservas;
    },
    reservas2() {
      // verifica campos na localStorage = Reserva_"X"
      //let arrayReservaLS = [];
      let arrayReservas2 = [];
      let arrayAux = [];
      let el = "";
      let i = 0;
      for (i = 0; i < localStorage.length; i++) {
        // verifica reservas anteriores...
        if (localStorage.key(i).includes("Reserva_")) {
          console.log(
            "Reservas2 Computed modal - Reservas anteriores",
            localStorage.key(i),
            localStorage.getItem(localStorage.key(i))
          );
          //arrayReservaLS.push(
          //  JSON.parse(localStorage.getItem(localStorage.key(i)))
          //);
          arrayAux = JSON.parse(localStorage.getItem(localStorage.key(i)));
          (el = {
            dtReserva: `${arrayAux[0].dtReserva}`,
            codCliente: `${arrayAux[0].codCliente}`,
            dtCheckIn: `${arrayAux[0].dtEntrada}`,
            dtCheckOut: `${arrayAux[0].dtSaida}`,
            qtPessoas: `${arrayAux[0].qtPessoas}`,
            tipoApto: `${arrayAux[0].tipoApto}`,
            vlrTotal: `${arrayAux[0].vlrTotalcomDesconto}`,
          }),
            arrayReservas2.push(el);
        }
      }
      return arrayReservas2;
    },
  },
  mounted() {
    //
  },
};
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

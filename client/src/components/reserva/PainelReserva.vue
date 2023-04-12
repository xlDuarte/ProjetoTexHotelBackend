<template>
  <div>
    <ModalServicos />
    <ModalResumo />
    <ModalMinhasReservas :msgUser="msgUser" />
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="secResumo">
            <div>
              <h3>Resumo da reserva</h3>
            </div>
            <div class="flex">
              <div class="col-md-6">
                <form action="">
                  <div class="form-group">
                    <h4>Apartamento:</h4>
                    <p id="tipoAcomodacao">tipoApto</p>
                  </div>
                  <div class="form-group">
                    <h4>Checkin:</h4>
                    <p id="dtCheckin">dtCheckin</p>
                  </div>
                  <div class="form-group">
                    <h4>Checkout:</h4>
                    <p id="dtCheckout">dtCheckout</p>
                  </div>
                  <div class="form-group">
                    <h4>Pessoas</h4>
                    <p id="qtHospedes">qtHospedes</p>
                  </div>
                  <button type="button" class="button" id="btnServicos">
                    Adicionar serviços
                  </button>
                  <button
                    type="button"
                    class="button"
                    id="btnMinhasReservas"
                    ref="btnMinhasReservas"
                  >
                    Minhas Reservas
                  </button>
                  <button
                    type="button"
                    class="button"
                    id="btnConfirma"
                    ref="btnConfirma"
                  >
                    Confirmar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var jQuery = require("jquery");
window.jQuery = jQuery;
window.$ = jQuery;

import ModalServicos from "./ModalServicos";
import ModalResumo from "./ModalResumo";
import ModalMinhasReservas from "./ModalMinhasReservas.vue";
import { confirmaReserva } from "./FormReserva.vue";
import { preencheModalResumo } from "./FormReserva.vue";

export default {
  name: "PainelReserva",
  components: { ModalServicos, ModalResumo, ModalMinhasReservas },
  props: {
    msg: String,
  },
  data() {
    // data
    return {
      userLogged: false,
      idUsuario: 14,
      msgUser: "Você ganhou um desconto de 10% em sua próxima reserva!",
    };
  },
  methods: {
    // inserir funções...
  },
  computed: {
    reservas() {
      return this.$store.getters.reservas;
    },
    servicos() {
      return this.$store.getters.servicos;
    },
    //...mapState(["ReservasUsuario"]),
  },
  mounted() {
    // verifica se usuario esta logado para ativar botão "Minhas Reservas"
    // console.log("loginStatus...", localStorage.getItem("loginStatus") === null);
    // if (
    //   localStorage.getItem("loginStatus") === null ||
    //   localStorage.getItem("loginStatus") === ""
    // ) {
    //   //this.$refs.btnMinhasReservas.setAttribute("hidden", "false");
    //   //this.$refs.btnMinhasReservas.style.visibility = "hidden";
    // } else {
    //   //this.$refs.btnMinhasReservas.setAttribute("hidden", "true");
    //   //this.$refs.btnMinhasReservas.style.visibility = "visible";
    // }
  },
};

// chama modal para display das reservas anteriores
window.$().ready(function () {
  window.$("#btnMinhasReservas").click(function () {
    if (localStorage.getItem("loged") === null) {
      alert("Por favor, faça o login em nosso site!");
      window.$("#modalMinhasReservas").modal("hide");
      return true
    }
    window.$("#modalMinhasReservas").modal("show");
  });
});

// chama modal para display dos serviços
window.$().ready(function () {
  window.$("#btnServicos").click(function () {
    window.$("#modalServicos").modal("show");
  });
});

window.$().ready(function () {
  window.$("#btnConfirma").click(function () {
    if (localStorage.getItem("loginStatus") != "cliente") {
      alert("Você precisa estar logado para concluir a reserva!");
      return true;
    }
    let check = false;
    // executa function para checar dados da reserva...
    check = confirmaReserva();
    if (check) {
      window.$("#modalResumo").modal("show");
      preencheModalResumo();
    }
  });
});
</script>

<style scoped>
@charset "UTF-8";
@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.secResumo {
  border-color: black;
  border-style: solid;
  position: relative;
  padding: 2vw;
  transition: all 0.3s ease;
  color: black;
  background-color: #f4f2e7;
}

.secResumo > div {
  max-width: 90%;
  margin: 2% 5%;
}

.secResumo h2 {
  font-size: 3em;
}

.secResumo h3,
.secResumo h4 {
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

.secResumo p {
  font-size: 1.2em;
  font-weight: 300;
}

img {
  width: 523px;
  height: 294px;
  display: block;
  border-radius: 20px;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 5%;
}

.flex > div {
  flex: 1 1 420px;
  margin: 10px;
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
  color: #79382a;
}

.button {
  background: transparent;
  color: black;
  padding: 0.4em;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  font-size: 1.5em;
  margin-top: 10px;
}

.button:hover {
  background: #112434;
  color: #fff;
  border-radius: 50px;
  padding: 0.4em;
}
</style>

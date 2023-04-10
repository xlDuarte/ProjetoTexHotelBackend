<template>
  <div class="container-fluid">
  <div class="text-center mb-2">
    <h2>EDITAR REGISTRO DE CONSUMO</h2>
    <p>Preencha todos os campos</p>
  </div>
  <div class="row justify-content-center mt-5">
    <div class="col-12 col-md-8 col-lg-6">
      <div class="shadow bg-light rounded-3 p-4 my-5">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Quarto</label>
            <input class="form-control" type="text" v-model="quarto" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Local</label>
            <input class="form-control" type="text" v-model="localConsumo" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Produto</label>
            <input class="form-control" type="text" v-model="idProduto" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Quantidade</label>
            <input class="form-control" type="text" v-model="quantidade" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Data</label>
            <input class="form-control" type="datetime-local" v-model="dateConsumo" />
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button class="btn btn-success mt-4 me-3" @click="updateConsumo">UPDATE</button>
          <button class="btn mt-4" @click="returnPage">VOLTAR</button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
// import axios
import axios from "axios";

export default {
  name: "EditConsumo",
  data() {
    return {
      quarto: "",
      localConsumo: "",
      idProduto: "",
      quantidade: "",
      dateConsumo: "",
    };
  },
  created: function () {
    this.getConsumoById();
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem("loginStatus")) {
        if (localStorage.getItem("loginStatus") == "admin")
          return true
        else if (localStorage.getItem("loginStatus") == "cliente")
          this.$router.push("/")
        return true
      } else {
        this.$router.push("/")
        return false
      }
    },
    // lista usuario por id
    async getConsumoById() {
      try {
        const response = await axios.get(
          `http://localhost:5000/Consumo/${this.$route.params.id}`
        );
        this.quarto = response.data.Reservas_idReservas;
        this.localConsumo = response.data.localConsumo_idLocalConsumo;
        this.idProduto = response.data.produtos_idprodutos;
        this.quantidade = response.data.qtdConsumo;
        this.dateConsumo = response.data.dataConsumo;
      } catch (err) {
        console.log(err);
      }
    },

    returnPage() {
      this.$router.push("/Consumos");
    },

    // atualiza o Consumo
    async updateConsumo() {
      try {
        await axios.put(
          `http://localhost:5000/Consumo/${this.$route.params.id}`,
          {
            Reservas_idReservas: this.quarto,
            localConsumo_idLocalConsumo: this.localConsumo,
            produtos_idprodutos: this.idProduto,
            qtdConsumo: this.quantidade,
            dataConsumo: this.dateConsumo,
          }
        );
        this.quarto = "";
        this.localConsumo = "";
        this.idProduto = "";
        this.quantidade = "";
        this.dateConsumo = "";
        this.$router.push("/Consumos");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
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

.sec {
  position: relative;
  padding: 2vw;
  transition: all 0.3s ease;
  color: black;
}

.sec>div {
  max-width: 90%;
  margin: 2% 5%;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 5%;
}

.flex>div {
  flex: 1 1 420px;
  margin: 0 5%;
}

.button {
  background: transparent;
  color: black;
  padding: 5px;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
}

.button:hover {
  background: #112434;
  color: #fff;
  border-radius: 50px;
  padding: 5px;
}
</style>

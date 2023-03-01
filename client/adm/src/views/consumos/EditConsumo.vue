<template>
  <div class="sec">
    <div>
      <h2>EDITAR REGISTRO DE CONSUMO</h2>
      <p>Preencha todos os campos</p>
    </div>
    <div class="flex">
      <div class="field">
        <label class="label">Quarto</label>
        <div class="control">
          <input class="input" type="text" v-model="quarto" />
        </div>
      </div>
      <div class="field">
        <label class="label">Local</label>
        <div class="control">
          <input class="input" type="text" v-model="localConsumo" />
        </div>
      </div>
      <div class="field">
        <label class="label">Produto</label>
        <div class="control">
          <input class="input" type="text" v-model="idProduto" />
        </div>
      </div>
      <div class="field">
        <label class="label">Quantidade</label>
        <div class="control">
          <input class="input" type="text" v-model="quantidade" />
        </div>
      </div>
      <div class="field">
        <label class="label">Data</label>
        <div class="control">
          <input class="input" type="text" v-model="dateConsumo" />
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="control">
        <button class="button is-success" @click="updateConsumo">UPDATE</button>
      </div>
      <div class="control">
        <button class="button" @click="returnPage">VOLTAR</button>
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
  },
  methods: {
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

.sec > div {
  max-width: 90%;
  margin: 2% 5%;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 5%;
}

.flex > div {
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

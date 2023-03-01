<template>
  <div class="sec">
    <div>
      <h2>CADASTRO DE CONSUMOS</h2>
      <p>Preencha todos os campos</p>
    </div>
    <AddConsumo />
    <table class="table">
      <thead>
        <th scope="col">Quarto</th>
        <th scope="col">Local</th>
        <th scope="col">Produto</th>
        <th scope="col">Quantidade</th>
        <th scope="col">Data</th>
      </thead>
      <tbody>
        <tr scope="row" v-for="item in items" :key="item.idConsumo">
          <td>{{ item.Reservas_idReservas }}</td>
          <td>{{ item.localConsumo_idLocalConsumo }}</td>
          <td>{{ item.produtos_idprodutos}}</td>
          <td>{{ item.qtdConsumo }}</td>
          <td>{{ item.dataConsumo }}</td>
          <td>
            <router-link
              :to="{ name: 'editConsumos', params: { id: item.idConsumo } }"
            >
              <button class="button">Editar</button></router-link
            >
          </td>
          <td>
            <button class="button" @click="deleteConsumos(item.idConsumo)">
              Deletar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import AddConsumo from "@/../adm/src/components/consumos/AddConsumos.vue";

export default {
  name: "ConsumosView",
  data() {
    return {
      items: [],
    };
  },
  components: { AddConsumo },

  created() {
    this.getConsumo();
  },

  methods: {
    // Lista todos os Consumos
    async getConsumo() {
      try {
        const response = await axios.get("http://localhost:5000/Consumo");
        this.items = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    // Delete Consumo
    async deleteConsumos(id) {
      try {
        await axios.delete(`http://localhost:5000/Consumo/${id}`);
        this.getConsumo();
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
  margin: 10px;
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

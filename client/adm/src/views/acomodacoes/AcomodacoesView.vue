<template>
  <div class="sec">
    <div>
      <h2>CADASTRO DE ACOMODAÇÕES</h2>
      <p>Preencha todos os campos</p>
    </div>
    <AddAcomodacao @updateList="getAcomodacao()"/>
    <table class="table">
      <thead>
        <th scope="col">ID</th>
        <th scope="col">Nome</th>
        <th scope="col">Descrição</th>
        <th scope="col">Valor</th>
        <th scope="col">Tipo</th>
      </thead>
      <tbody>
        <tr
          scope="row"
          v-for="item in items"
          :key="item.idUsuario"
        >
          <td >{{ item.idAcomodacao }}</td>
          <td >{{ item.nomeAcomodacao }}</td>
          <td >{{ item.descricaoAcomodacao }}</td>
          <td >{{ item.valorAcomodacao }}</td>
          <td >{{ item.tipoAcomodacao }}</td>
          <td >              
            <router-link :to="{ name: 'editAcomodacao', params: { id: item.idAcomodacao } }">
              <button class="button">Editar</button></router-link>
          </td>
          <td >              
              <button class="button" @click="deleteAcomodacao(item.idAcomodacao)">Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios"
import AddAcomodacao from '@/../adm/src/components/acomodacoes/AddAcomodacoes.vue'
  
export default {
  name: "AcomodacoesView",
  data() {
    return {
      items: [],
    };
  },
  components: {AddAcomodacao},
    
  created() {
    this.getAcomodacao();
  },
  beforeMount() {
  this.checkLogin();
  console.log(this.checkLogin())
  }, 
  methods:{    
    checkLogin() {
      if(localStorage.getItem("userId")){
        return true 
      }else{
        this.$router.push("/")
        return false
      }
    },  
    // Lista todos os usuarios
    async getAcomodacao() {
      try {
        const response = await axios.get("http://localhost:5000/acomodacao");
        this.items = response.data;
      } catch (err) {
          console.log(err);
      }
    },
    
    // Delete Usuario
    async deleteAcomodacao(id) {
      try {
        await axios.delete(`http://localhost:5000/acomodacao/${id}`);
          this.getAcomodacao();
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

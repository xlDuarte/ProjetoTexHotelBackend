<template>
  <div class="sec">
    <div>
      <h2>CADASTRO DE USUARIOS</h2>
      <p>Preencha todos os campos</p>
    </div>
    <AddUsuario/>
    <table class="table">
      <thead>
        <th scope="col">ID</th>
        <th scope="col">Nome</th>
        <th scope="col">E-mail</th>
        <th scope="col">CPF</th>
        <th scope="col">Endereço</th>
        <th scope="col">Tipo</th>
        <th scope="col">Telefone</th>
      </thead>
      <tbody>
        <tr
          scope="row"
          v-for="item in items"
          :key="item.idUsuario"
        >
          <td >{{ item.idUsuario }}</td>
          <td >{{ item.nomeUsuario }}</td>
          <td >{{ item.emailUsuario }}</td>
          <td >{{ item.cpfUsuario }}</td>
          <td >{{ item.endUsuario }}</td>
          <td >{{ item.tipoUsuario }}</td>
          <td >{{ item.telefoneUsuario }}</td>
          <td >              
            <router-link :to="{ name: 'editUsuarios', params: { id: item.idUsuario } }">
              <button class="button">Editar</button></router-link>
          </td>
          <td >              
              <button class="button" @click="deleteUsuarios(item.idUsuario)">Deletar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios"
import AddUsuario from '@/../adm/src/components/usuarios/AddUsuario.vue'
  
export default {
  name: "UsuariosView",
  data() {
    return {
      items: [],
    };
  },
  components: {AddUsuario},
    
  created() {
    this.getUsuarios();
  },
    
  methods: {
    // Lista todos os usuarios
    async getUsuarios() {
      try {
        const response = await axios.get("http://localhost:5000/usuario");
        this.items = response.data;
      } catch (err) {
          console.log(err);
      }
    },
    
    // Delete Usuario
    async deleteUsuarios(id) {
      try {
        await axios.delete(`http://localhost:5000/usuario/${id}`);
          this.getUsuarios();
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

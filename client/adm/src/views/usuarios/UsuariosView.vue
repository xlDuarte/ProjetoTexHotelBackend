<template>
  <div class="sec">  
    <div class="row">
      <div class="text-center">
        <h2>CADASTRO DE USUARIOS</h2>
        <p>*Campos de preenchimento obrigatório.</p>
      </div>
      <AddUsuario @updateList="getUsuarios()"/>
      <div class="table-responsive">
      <table class="table table-striped">
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
    </div>
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
  beforeMount(){
    this.checkLogin();
  },
    
  methods: {
    checkLogin() {
      if(localStorage.getItem("loginStatus")){
        if(localStorage.getItem("loginStatus") == "admin")
          return true
        else if(localStorage.getItem("loginStatus") == "cliente")
          this.$router.push("/")
          return true
      }else{
        this.$router.push("/")
        return false
      }
    }, 
    async getUsuarios() {
      const token = sessionStorage.getItem('token')
      console.log('pagina usuarioadm',token)
      try {
        const response = await axios.get("http://localhost:5000/usuario",{
        headers: {
          'Authorization': `Bearer ${token}` 
      }});
        this.items = response.data;
      } catch (err) {
          console.log(err);
      }
    },
    
    // Delete Usuario
    async deleteUsuarios(id) {
      const token = sessionStorage.getItem('token')
      try {
        await axios.delete(`http://localhost:5000/usuario/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}` 
      }});
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

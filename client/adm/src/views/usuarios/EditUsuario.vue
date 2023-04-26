<template>
    <div class="container-fluid my-3">
  <div class="row justify-content-center">
    <div class="col-12 col-md-8 col-lg-6">
      <div class="text-center mb-3">
        <h2>EDITAR REGISTRO DE USUÁRIO</h2>
        <p>Preencha todos os campos</p>
      </div>
      <div class="shadow bg-light rounded-3 p-4">
        <form>
          <div class="row mb-3">
            <div class="col-12 col-sm-6">
              <label class="form-label">Nome</label>
              <input class="form-control" type="text" v-model="nomeUser">
            </div>      
            <div class="col-12 col-sm-6">
              <label class="form-label">E-mail</label>
              <input class="form-control" type="text" v-model="emailUser">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label">CPF</label>
              <input class="form-control" type="text" v-model="cpfUser">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label">Endereço</label>
              <input class="form-control" type="text" v-model="endUser">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label">Tipo</label>
              <input class="form-control" type="text" v-model="tipoUser">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label">Telefone</label>
              <input class="form-control" type="text" v-model="telefoneUser">
            </div>
            <div class="col-12 col-sm-6">
              <label class="form-label">Senha</label>
              <input class="form-control" type="text" v-model="senhaUser">
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-sm-6 mb-2">
              <button class="btn btn-success btn-block" @click="updateUsuario">UPDATE</button>
            </div>
            <div class="col-sm-6 mb-2">
              <button class="btn btn-secondary btn-block" @click="returnPage">VOLTAR</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

</template>
  
<script>
// import axios
import axios from "axios";
  
export default {
    name: "EditUsuario",
    data() {
        return {
            nomeUser: "",
            cpfUser:"",
            emailUser: "",
            endUser: "",
            senhaUser: "",
            tipoUser: "",
            telefoneUser: "",
        };
    },
    created: function () {
        this.getUsuarioById();
    },
    methods: {
        // lista usuario por id
        async getUsuarioById() {
            const token = sessionStorage.getItem('token');
            const authHeader = {headers: {'Authorization': `Bearer ${token}`}}
            try {
                const response = await axios.get(
                  `http://localhost:5000/usuario/${this.$route.params.id}`, authHeader);
                this.nomeUser = response.data.nomeUsuario;
                this.emailUser= response.data.emailUsuario;
                this.cpfUser= response.data.cpfUsuario;
                this.endUser= response.data.endUsuario;
                this.tipoUser= response.data.tipoUsuario;
                this.senhaUser= response.data.senhaUsuario;
                this.telefoneUser= response.data.telefoneUsuario;
            } catch (err) {
                console.log(err);
            }
        },

        returnPage(){
            this.$router.push("/Usuarios");
        },
  
        // atualiza o usuario
        async updateUsuario() {
            const token = sessionStorage.getItem('token')
            const authHeader = {headers: {'Authorization': `Bearer ${token}`}}
            try {
                await axios.put(
                    `http://localhost:5000/usuario/${this.$route.params.id}`,
                    {
                        nomeUsuario: this.nomeUser,
                        cpfUsuario: this.cpfUser,
                        emailUsuario: this.emailUser,
                        endUsuario: this.endUser,
                        senhaUsuario: this.senhaUser,
                        tipoUsuario: this.tipoUser,
                        telefoneUsuario: this.telefoneUser
                    }, authHeader
                );
                this.nomeUser = "";
                this.cpfUser="";
                this.emailUser="";
                this.endUser="";
                this.senhaUser="";
                this.tipoUser="";
                this.telefoneUser="";
                this.$router.push("/Usuarios");                
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
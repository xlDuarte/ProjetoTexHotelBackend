<template>
    <div class="sec">
        <div>
            <h2>EDITAR REGISTRO DE USUARIO</h2>
            <p>Preencha todos os campos</p>
        </div>
        <div class="flex">
            <div class="field">
                <label class="label">Nome</label>
                <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="nomeUser"
                    />
                </div>
            </div>      
            <div class="field">
                <label class="label">E-mail</label>
                <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="emailUser"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">CPF</label>
                <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="cpfUser"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Endereço</label>
                <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="endUser"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Tipo</label>
                <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="tipoUser"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Telefone</label>
                <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="telefoneUser"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Senha</label>
                <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="senhaUser"
                    />
                </div>
            </div>
        </div>
        <div class="flex">
            <div class="control">
                <button class="button is-success" @click="updateUsuario">UPDATE</button>
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
            try {
                const response = await axios.get(
                    `http://localhost:5000/usuario/${this.$route.params.id}`
                );
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
                    }
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
<template>
    <div>
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
                      v-model="cpfUSer"
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
        <div class="control">
            <button class="button is-success" @click="saveUsuario">Cadastrar</button>
        </div>
    </div>
</template>
  
<script>
// import axios
import axios from "axios";
  
export default {
    name: "AddUsuario",
    data() {
        return {
            nomeUser: "",
            senhaUser: "",
            cpfUSer:"",
            emailUser: "",
            endUser: "",
            telefoneUser: "",
            tipoUser: "",
        };
    },
    methods: {
        // cria novo usuario
        async saveUsuario() {
            try {
                await axios.post("http://localhost:5000/usuario", {
                    nomeUsuario: this.nomeUser,
                    emailUsuario: this.emailUser,
                    cpfUSuario: this.cpfUSer,
                    endUsuario: this.endUser,
                    telefoneUsuario: this.telefoneUser,
                    tipoUsuario: this.tipoUser,
                    senhaUsuario: this.senhaUser
                });
                this.nomeUser = "";
                this.emailUser="";
                this.cpfUSer="";
                this.endUser="";
                this.telefoneUser="";
                this.tipoUser="";
                this.senhaUser="";                
                location.reload();//testar outras soluções para recarregar o componente
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
<style scoped>
.sec {
  position: relative;
  padding: 2vw;
  transition: all 0.3s ease;
  color: black;
}

.sec > div{
  max-width: 90%;
  margin: 2% 5%; 
}
.flex{
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 5%;  
}

.flex > div{
  flex: 1 1 420px;
  margin: 10px;
}
    
.cadinput{
  display: inline-block;
  width: 200px;
  margin: 5px;
}

.cadlabel {
  display: inline-block;
  width: 130px;
  margin-right: 15px;
  font-size: 1.2em;
}

.cadtextarea {
  width: 310px;
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
  
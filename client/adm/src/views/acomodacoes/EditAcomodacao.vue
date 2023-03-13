<template>
    <div class="sec">
        <div>
            <h2>EDITAR REGISTRO DE ACOMODAÇÕES</h2>
            <p>Preencha todos os campos</p>
        </div>
        <div class="flex">
            <div class="field">
                <label class="label">Nome da acomodação</label>
                <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="nomeAcomod"
                    />
                </div>
            </div>      
            <div class="field">
                <label class="label">Descrição da acomodação</label>
                <div class="control">
                    <input
                      class="text"
                      type="input"
                      v-model="descAcomod"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Valor</label>
                <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="valorAcomod"
                    />
                </div>
            </div>
            <div class="field">
                <label class="label">Tipo de acomodação</label>
                <div class="control">
                    <input
                      class="input"
                      type="text"
                      v-model="tipoAcomod"
                    />
                </div>
            </div>
        </div>
        <div class="flex">
            <div class="control">
                <button class="button is-success" @click="updateAcomodacao">UPDATE</button>
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
    name: "EditAcomodacao",
    data() {
        return {
            nomeAcomod: "",
            descAcomod:"",
            valorAcomod: "",
            tipoAcomod: "",
        };
    },
    created: function () {
        this.getAcomodacaoById();
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
        // lista usuario por id
        async getAcomodacaoById() {
            try {
                const response = await axios.get(
                    `http://localhost:5000/acomodacao/${this.$route.params.id}`
                );
                this.nomeAcomod = response.data.nomeAcomodacao;
                this.descAcomod= response.data.descricaoAcomodacao;
                this.valorAcomod= response.data.valorAcomodacao;
                this.tipoAcomod= response.data.tipoAcomodacao;
            } catch (err) {
                console.log(err);
            }
        },

        returnPage(){
            this.$router.push("/AcomodacaoAdm");
        },
  
        // atualiza o usuario
        async updateAcomodacao() {
            try {
                await axios.put(
                    `http://localhost:5000/acomodacao/${this.$route.params.id}`,
                    {
                        nomeAcomodacao: this.nomeAcomod,
                        descricaoAcomodacao: this.descAcomod,
                        valorAcomodacao: this.valorAcomod,
                        tipoAcomodacao: this.tipoAcomod,
                    }
                );
                this.nomeAcomod = "";
                this.descAcomod="";
                this.valorAcomod="";
                this.tipoAcomod="";  
                this.$router.push("/AcomodacaoAdm");
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
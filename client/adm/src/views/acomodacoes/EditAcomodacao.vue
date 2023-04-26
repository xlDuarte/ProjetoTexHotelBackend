<template>
        <div class="text-center my-3">
            <h2 class="mb-2">EDITAR REGISTRO DE ACOMODAÇÃO</h2>
            <p class="mb-0">Preencha todos os campos</p>
        </div>


    <div class="container-fluid">
      <div class="row justify-content-center mt-5">
        <div class="col-12 col-md-8 col-lg-6">
          <div class="shadow bg-light rounded-3 p-4 my-5">
            <form>
            <div class="row">
              <div class="col-12 col-sm-6">
                <label class="label">Nome da acomodação</label>
                <input class="form-control" type="text" v-model="nomeAcomod" />
              </div>
              <div class="col-12 col-sm-6">
                <label class="label">Descrição da acomodação</label>
                <input class="form-control" type="input" v-model="descAcomod" />
              </div>
              <div class="col-12 col-sm-6">
                <label class="label">Valor</label>
                <input class="form-control" type="text" v-model="valorAcomod" />
              </div>
              <div class="col-12 col-sm-6">
                <label class="label">Tipo de acomodação</label>
                <input class="form-control" type="text" v-model="tipoAcomod" />
              </div>
              <div class="col-12 col-sm-6">
                <label class="label">Quantidade maxima de pessoas</label>
                <input class="form-control" type="text" v-model="qtMax" />
              </div>
              <div class="d-flex justify-content-center">
                <div class="col-sm-6 mb-2">
                  <button class="button mt-4" @click="updateAcomodacao">UPDATE</button>
                </div>
                <div class="col-sm-6 mb-2">
                  <button class="button mt-4" @click="returnPage">VOLTAR</button>
                </div>
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
    name: "EditAcomodacao",
    data() {
        return {
            nomeAcomod: "",
            descAcomod: "",
            valorAcomod: "",
            tipoAcomod: "",
            qtMax: "",
        };
    },
    created() {
        this.getAcomodacaoById();
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
        async getAcomodacaoById() {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(
                    `http://localhost:5000/acomodacao/${this.$route.params.id}`, {
                headers:{
                  'Authorization': `Bearer ${token}`
                }});
                this.nomeAcomod = response.data.nomeAcomodacao;
                this.descAcomod = response.data.descricaoAcomodacao;
                this.valorAcomod = response.data.valorAcomodacao;
                this.tipoAcomod = response.data.tipoAcomodacao;
                this.qtMax = response.data.qtMaxPessoas;
            } catch (err) {
                console.log(err);
            }
        },

        returnPage() {
            this.$router.push("/AcomodacaoAdm");
        },

        // atualiza o usuario
        async updateAcomodacao() {
            const token = sessionStorage.getItem('token');
            try {
                await axios.put(
                    `http://localhost:5000/acomodacao/${this.$route.params.id}`,
                    {   
                        headers: {
                        'Authorization': `Bearer ${token}`
                        },
                        nomeAcomodacao: this.nomeAcomod,
                        descricaoAcomodacao: this.descAcomod,
                        valorAcomodacao: this.valorAcomod,
                        tipoAcomodacao: this.tipoAcomod,
                        qtMaxPessoas: this.qtMax
                    }
                );
                this.nomeAcomod = "";
                this.descAcomod = "";
                this.valorAcomod = "";
                this.tipoAcomod = "";
                this.qtMax = "";
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
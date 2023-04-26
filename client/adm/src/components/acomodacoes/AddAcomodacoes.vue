<template>
  <div class="container">
  <div class="row justify-content-center">
    <div class="col-12 col-md-8 col-lg-6">
      <div class="shadow bg-light rounded-3 p-4 my-5">
        <form>
          <div class="row">
            <div class="col-12 col-sm-6">
              <label for="nome" class="form-label fw-bold">*Nome:</label>
              <input type="text" v-model="nomeAcomod" placeholder="Nome da Acomodação" class="form-control" maxlength="45">
            </div>
            <div class="col-12 col-sm-6">
              <label for="descrição" class="form-label fw-bold">*Descrição:</label>
              <input type="text" v-model="descAcomod" placeholder="Descrição da acomodação" class="form-control" maxlength="45">
            </div>
            <div class="col-12 col-sm-6">
              <label for="valor" class="form-label fw-bold mt-3">*Valor:</label>
              <input type="text" v-model="valorAcomod" placeholder="ex: 100" class="form-control" maxlength="45">
            </div>
            <div class="col-12 col-sm-6">
              <label for="tipo" class="form-label fw-bold mt-3">*Tipo de acomodação:</label>
              <input type="text" v-model="tipoAcomod" placeholder="Master, Confort ou Family " class="form-control" maxlength="45">
            </div>
            <div class="col-12 col-sm-6">
              <label for="tipo" class="form-label fw-bold mt-3">*Numero maximo de pessoas:</label>
              <input type="text" v-model="qtMax" placeholder="Master, Confort ou Family " class="form-control" maxlength="45">
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button class="button  mt-3" @click="saveAcomodacao">Cadastrar</button>
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
  name: "AddAcomodacao",
  data() {
    return {
      nomeAcomod: "",
      descAcomod: "",
      valorAcomod: "",
      tipoAcomod: "",
      qtMax:"",
    };
  },
  methods: {
    // cria novo usuario
    async saveAcomodacao() {
      /*const token = sessionStorage.getItem('token');*/
      try {
        await axios.post("http://localhost:5000/acomodacao", {
          /*headers: {
            'Authorization': `Bearer ${token}`
          },*/
          nomeAcomodacao: this.nomeAcomod,
          descricaoAcomodacao: this.descAcomod,
          valorAcomodacao: this.valorAcomod,
          tipoAcomodacao: this.tipoAcomod,
          qtMaxPessoas: this.qtMax,
        });
        this.nomeAcomod = "";
        this.descAcomod = "";
        this.valorAcomod = "";
        this.tipoAcomod = "";
        this.qtMax="";
        this.$emit('updateAcomList')
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style scoped>

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
  
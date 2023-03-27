<template>
  <div class="d-flex flex-wrap align-items-start ">
    <div class="shadow mx-auto bg-light rounded-3 p-4 my-5 w-50">
      <form>
        <div class="container">
          <div class="row my-2">            
            <div class="col col-5">
            <label for="nome" class="mb-0 form-label fw-bold ">*Nome:</label>
            <input type="text"  v-model="nomeAcomod" placeholder="Abreviação do serviço" class="form-control  w-100 " maxlength="45" />
        </div>
      
      <div class="mx-auto col col-5">
        <label for="descrição" class="mb-0 form-label fw-bold ">*Descrição:</label>
        <input type="input"  v-model="descAcomod" placeholder="Abreviação do serviço" class="form-control  w-100 " maxlength="45" />      
      </div>
      <div class="col col-5"> 
        <label for="valor" class="mb-0 form-label fw-bold mt-3">*Valor:</label>
        <input type="input"  v-model="valorAcomod" placeholder="Abreviação do serviço" class="form-control  w-100 " maxlength="45" />         
      </div>
      <div class="mx-auto col col-5"> 
        
        <label for="valor" class="mb-0 form-label fw-bold mt-3 ">*Tipo de acomodação:</label>
        <input type="text"  v-model="tipoAcomod" placeholder="Abreviação do serviço" class="form-control  w-100 " maxlength="45" />
      </div>
    </div>
    <div class="control">
      <button class="button is-success" @click="saveAcomodacao">Cadastrar</button>
    </div>
    </div>
    
  
  </form>
  
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
      tipoAcomod: ""
    };
  },
  methods: {
    // cria novo usuario
    async saveAcomodacao() {
      try {
        await axios.post("http://localhost:5000/acomodacao", {
          nomeAcomodacao: this.nomeAcomod,
          descricaoAcomodacao: this.descAcomod,
          valorAcomodacao: this.valorAcomod,
          tipoAcomodacao: this.tipoAcomod
        });
        this.nomeAcomod = "";
        this.descAcomod = "";
        this.valorAcomod = "";
        this.tipoAcomod = "";
        this.$emit('updateList')
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

.cadinput {
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
  
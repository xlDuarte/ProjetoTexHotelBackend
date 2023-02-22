<template>
    <div>
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
        <div class="control">
            <button class="button is-success" @click="saveAcomodacao">Cadastrar</button>
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
            valorAcomod:"",
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
                this.descAcomod="";
                this.valorAcomod="";
                this.tipoAcomod="";  
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
  margin: 0 5%;
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
  
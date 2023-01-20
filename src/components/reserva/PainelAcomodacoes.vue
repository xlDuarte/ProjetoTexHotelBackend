<template>
  <div class="secAcomodacoes">
    <!-- <p>{{ msg }}</p>
    <p>Componente PainelAcomodacoes.vue</p> -->
    <h4>Escolha o quarto e demais opções.</h4>

    <!-- mostra painel a partir da store...-->
    <!-- a ordem é mostrar primeiro a acomodação selecionada IMPLEMENTAR!!! -->
    <div class="flex" v-for="item in acomodacoes" :key="item">
      <div>
        <input class="inputRadio"
          type="radio"
          id="tipoApto"
          name="tipoApto"
          v-bind:value="item.id"
          :checked="item.ordem == 1"
        />
        <label for="suiteMaster"><h2>{{ item.nome }}</h2></label>        
        <p>{{ item.descricaoBreve }}</p>
        <h3>R$ {{ item.vlrDiaria }}</h3>
      </div>
      <div>
        <img :src="item.imgURL" :alt="item.nome" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PainelAcomodacoes",
  props: {
    msg: String,
  },
  computed: {
    acomodacoes() {
      return this.$store.getters.acomodacoes;
    },
    reservasAnteriores() {
      return this.$store.getters.reservas;
    }
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

.secAcomodacoes {
  position: relative;
  padding: 2vw;
  transition: all 0.3s ease;
  color: black;
}

.secAcomodacoes > div{
  max-width: 90%;
  margin: 2% 5%; 
}
.secAcomodacoes h2 {
  font-size: 3em;
}

.secAcomodacoes h3,
.secAcomodacoes h4 {
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

.secAcomodacoes p {
  font-size: 1.2em;
  font-weight: 300;
}

img{
  width: 523px;
  height: 294px;
  display: block;
  border-radius: 20px;
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

.inputRadio{
  width: 30px;
  height: 30px;
  margin-right: 5px;
  
}
</style>

<template>
  <div class="conteudo">
    <AcomodacoesMain/>
  </div>
</template>
  
<script>
// @ is an alias to /src
import AcomodacoesMain from '@/components/acomodacoes/AcomodacoesMain.vue';

export default {
  name: 'AcomodacoesView',
  components: {
        AcomodacoesMain
  }
}
  
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
</style>
<template>
    <div>
        <h2 class="efeito">{{ titulo1 }}</h2>
        <br>
      </div>
      <div class="flex">          
          <div class="mural">
            <h4>FÉRIAS EM FAMÍLIA</h4>
  
            <img src="../../assets/images/home/familia.jpg" alt="familia">
            <q> {{ feedback1 }}</q>
  
            <p>Carmen Lucia, 36 anos.</p>
          </div>
  
          <div class="mural">
            <h4>{{ teste2 }}</h4>
  
            <img src="../../assets/images/home/noivos.jpg" alt="noivos">
            <q>{{ feedback2 }} </q>
            <p>Daniel Fagundes, 29 anos.</p>
          </div>
  
          <div class="mural">
            <h4>{{ teste }}</h4>
  
            <img src="../../assets/images/home/melhor_idade.jpg" alt="melhor_idade">
            <q> {{ feedback3 }} </q>
            <p>Maria Heloisa, 69 anos.</p>
          </div>
      </div>
</template>

<script>
  
export default {
    name:'MainMural',
    data () {   
        return {
            teste:'MELHOR IDADE',
            teste2: 'LUA DE MEL',
            titulo1: 'Mural dos Hospedes',
            feedback1:'Foram as férias de nossas vidas, as crianças amaram, e o meu esposo e eu pudemos ter momentos relaxantes e ver nossos filhos se divertindo e interagindo com outras crianças, o serviço é formidavel, as refeições são excelentes e com um cardapio amplamente variado ',
            feedback2:' Eu quis fazer uma surpresa para minha esposa, contratei o pacote Lua de Mel, para comemorar nosso casamento, ja na chegada minha esposa recebeu um lindo buque de rosas, com certeza voltaremos pra comemorar nossas bodas com vocês',
            feedback3: 'Minha filha disse mãe, vou marcar uma viajem pra senhora sair um pouco, e descobri um lugar com uma total extrutura para terceira idade, com aulas de hidroginastica, rampas de acesso e os monitores tão zelosos e atenciosos, não vejo a hora de voltar, beijos a todos'
        }
    }
}


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

.mural {
  display: inline-block;
  width: 420px;  
  
}

.mural q {
  display: inline-block;
  width: 420px;
}

.mural h4 {
  text-align: center;
}

.mural img {
  border-radius: 15px;
  width: 400px;
  border: solid rgb(23, 11, 131) 3px;
  
}



</style>

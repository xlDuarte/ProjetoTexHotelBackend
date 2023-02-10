<template>
    <div>
        <div>
            <h2>Nossos Serviços</h2>
            <p>O Hotel conta com o melhor da gastronomia, com peixes e diversos frutos  
            do mar. o cardapio do Hotel tambem conta com pratos tradicionais alem de refeições infantis e de baixa caloria.</p>
        </div>
        <div  class="servicos">
          <h3>Gazebos</h3>
          <a href="/root/pages/formulario.html#/Reservas"><img src="../../assets/images/home/gazebo.jpg" alt="gazebos"></a>
          <p>Localizado á 50 mtrs da praia de Ubatuba, o CASA NA PRAIA possui serviços de gazebos a beira mar.
            Além de pedidos que serão preparados direto pela cozinha do Hotel, mantendo a qualidade e
            higiene
            dos alimentos.</p>
        </div>
        <div  class="servicos">
          <h3>Piscinas-Bar</h3>
          <a href="/root/pages/formulario.html#/Reservas"><img src="../../assets/images/home/piscinas-bar.jpg" alt="piscinas-bar"></a>
          <p>Anexo a piscina esta o Point bar do nosso hotel, um bar ao lado da piscina que atende aos
            hospedes de
            forma exclusiva com Drinks, Bebidas, Lanches e Porções.</p>
        </div>
        <div  class="servicos">
          <h3>Piscinas</h3>
          <a href="/root/pages/formulario.html#/Reservas"><img src="../../assets/images/home/piscinas.jpg" alt="piscinas"></a>
          <P>Proporcionando lazer a toda familia nossa piscina é extensa é uma otima opção para quem quer
            aproveitar as ferias dentro das dependencias do Hotel com tranqilidade.</P>
        </div>
        <div  class="servicos">
          <h3>Lazer</h3>
          <a href="/root/pages/formulario.html#/Reservas"> <img src="../../assets/images/home/lazer.jpg" alt="lazer"></a>
          <p>No Hotel Casa na Praia as crianças tambem tem vez. O hotel possui um playground totalmente
            interativo, com monitores proporcionando brincadeiras e atividades para os pequenos.</p>
        </div>
        <div  class="servicos">
          <h3>Brinquedoteca</h3>
          <a href="/root/pages/formulario.html#/Reservas"><img src="../../assets/images/home/brinquedoteca.jpg" alt="brinquedoteca"></a>
          <P>Na brinquedoteca as crianças aprendem brincando durante as férias. O ambiente é voltado
            totalmente
            para o entretenimento infantil, estimulando atividades individuais e em grupo.</P>
        </div>
        <div  class="servicos">
          <h3>Turismo</h3>
          <a href="/root/pages/formulario.html#/Reservas"><img src="../../assets/images/home/cachoeiras.jpg" alt="cachoeiras"></a>
          <p>Para que nossos hospedes possam aproveitar ao maximo todas as atrações de Ubatuba, o Casa na
            Praia
            possui um programa de guia turistico proporcionando passeios únicos e inesquecíveis.</p>
        </div>
      </div>
</template>

<script>
   export default {
    name:'MainServicos',
    data () {
        return {

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


.servicos {
  display: inline-block;
  width: 420px;
}

.servicos p {
  display: inline-flex;
  width: 270px;
  text-align: left;
}

.servicos img {
  border-radius: 15px;
  width: 350px;
  border: solid rgb(23, 11, 131) 3px;;
}
</style>
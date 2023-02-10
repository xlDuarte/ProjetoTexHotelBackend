<template>
    <div >
        <h2>{{ titulo }}</h2>
        <p>{{ p0 }}</p>     
 
        <div>
            <div class="gastronomia">    
              <h3>{{ h3_1 }}</h3>
              <a href="/root/pages/formulario.html#/Reservas"><img src="../../assets/images/home/buffet.jpg" alt="Buffet"></a>
              <p>{{ p1 }}</p>
            </div>
            <div class="gastronomia">
              <h3><b>{{ h3_2 }}</b></h3>
              <a href="/root/pages/formulario.html#/Reservas"><img src="../../assets/images/home/lanches.jpg" alt="lanches"></a>
              <p>{{ p2 }}</p>
            </div>
            <div class="gastronomia">
              <h3><b>{{ h3_3 }}</b></h3>
              <a href="/root/pages/formulario.html#/Reservas"><img src="../../assets/images/home/drinks.jpg" alt="drinks"></a>
              <p>{{ p3 }}</p>
            </div>
        </div>  
    </div>
</template>

<script>

export default {
    name:'MainGastronomia',
    data () {
        return {
            titulo: 'GASTRONOMIA',
            h3_1: 'Saboreie nossa Culinaria',
            h3_2: 'Lanches e Porções',
            h3_3: 'Drinks e Sucos',
            p0: 'O Hotel conta com o melhor da gastronomia, com peixes e diversos frutos do mar. o cardapio conta com pratos tradicionais alem de refeições infantis e de baixa caloria.',
            p1: 'Um Buffet completo, entre massas, carnes, peixes e aves nossas refeições são balanceadas por nutricionistas especializados, para proporcionar toda a satisfação para o hóspede.',
            p2: 'Uma vasta variedade de Lanches e Porções feitos com produtos de excelente qualidade, porções tipicas, e lanches artesanais feitos na brasa, mantendo assim o sabor natural.',
            p3: 'Frutas selecionadas da mais alta qualidade diretamente do produtor, proporcionando alimentos frescos e saudaveis possibilitando um melhor preparo de Drinks e Sucos.',
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

.gastronomia {
  display: inline-block;
  width: 420px;
  align-items: center;
}

.gastronomia img {
  border: solid rgb(23, 11, 131) 3px;
  border-radius: 15px;
  width: 400px;
  display:inline-flex;
}

.gastronomia p {
  padding: 0px 50px 0px 50px;
  text-align: center;
  width: 420px;
}
</style>
<template>
    <div>
        <h2>CONHEÇA NOSSAS SUITES</h2>
        
      </div>
      <div class="quartos">          
            <div>  
             <h3>Quarto Premium Casal</h3>  
                <a href="/root/pages/acomodacoes.html#/Reservas"><img src="../../assets/images/acomodacoes/premium-8.jpg" alt="Quarto03"></a>                
            </div> 
        </div>
        <div class="quartos">
          <div>
            <h3>Quarto Premium Solteiro</h3>  
            <a href="/root/pages/acomodacoes.html#/Reservas"><img src="../../assets/images/acomodacoes/aguia-5.png" alt="Quarto01"></a>         
          </div> 
        </div>
        <div class="quartos"> 
            <div>
              <h3>Quarto Família</h3>  
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="../../assets/images/acomodacoes/tucanos-3.jpg" alt="Quarto02"></a>           
            </div>
        </div>
      
</template>

<script>


export default {
    name:'MainAcomodacoes',
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

.quartos {
  display: inline-flex;
  width: 420px;
}

.quartos h3 {
  text-align: center;
}

.quartos img {
  border-radius: 15px;
  width: 400px;
  border: solid rgb(23, 11, 131) 3px;
  
}

</style>

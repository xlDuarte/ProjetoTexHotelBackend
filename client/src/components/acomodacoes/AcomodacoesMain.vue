<template>
  <main>
    <router-link to="/Reservas"><button class="botaoreserva"> Reserve já ! </button> </router-link>
    <section class="sec">
      <div>
        <h2>ACOMODAÇÕES DO NOSSO HOTEL</h2>
        <p>
          Todas as nossas acomodações possuem serviços inclusos de wi-fi,
          cofre, estacionamento e serviços de quarto.
        </p>
      </div>
      <hr />
      <div v-for="item in items" :key="item.idAcomodacao">
        <div v-if="item.tipoAcomodacao == 'Master'">
          <div>
            <h2>Suite {{ item.tipoAcomodacao }} - {{ item.nomeAcomodacao }}</h2>
          </div>
          <div class="flex">
            <div id="acomodacoes_card_imgMaster1" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/premium-2.jpg"
                  alt="Premium master" /></a>
            </div>
            <div id="acomodacoes_card_imgMaster2" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/premium-8.jpg"
                  alt="Premium master" /></a>
            </div>
            <div id="acomodacoes_card_imgMaster3" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/premium-5.jpg"
                  alt="Premium master" /></a>
            </div>
            <div id="acomodacoes_card_imgMaster4" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/premium-6.jpg"
                  alt="Premium master" /></a>
            </div>
            <div id="acomodacoes_card_imgMaster5" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/premium-2.jpg"
                  alt="Premium master" /></a>
            </div>
            <div id="acomodacoes_card_imgMaster6" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/premium-3.jpg"
                  alt="Premium master" /></a>
            </div>
          </div>
          <div>
            <h3>Bem vindo ao requinte de nossa suite {{ item.nomeAcomodacao }}!</h3>
            <p>{{ item.descricaoAcomodacao }}</p>
            <h4>R${{ item.valorAcomodacao }},00</h4>
          </div>
          <hr />
        </div>
        <div v-else-if="item.tipoAcomodacao == 'Family'">
          <div>
            <h2>Suite {{ item.tipoAcomodacao }} - {{ item.nomeAcomodacao }}</h2>
          </div>
          <div class="flex">
            <div id="acomodacoes_card_imgFamilia1" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/tucanos-1.jpg"
                  alt="Familia Suite" /></a>
            </div>
            <div id="acomodacoes_card_imgFamilia2" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/tucanos-2.jpg"
                  alt="Familia Suite" /></a>
            </div>
            <div id="acomodacoes_card_imgFamilia3" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/tucanos-3.jpg"
                  alt="Familia Suite" /></a>
            </div>
            <div id="acomodacoes_card_imgFamilia4" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/tucanos-5.jpg"
                  alt="Familia Suite" /></a>
            </div>
            <div id="acomodacoes_card_imgFamilia5" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/tucanos-6.jpg"
                  alt="Familia Suite" /></a>
            </div>
            <div id="acomodacoes_card_imgFamilia6" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/tucanos-4.jpg"
                  alt="Familia Suite" /></a>
            </div>
          </div>
          <div>
            <h3>Bem vindo ao requinte de nossa suite {{ item.nomeAcomodacao }}!</h3>
            <p>{{ item.descricaoAcomodacao }}</p>
            <h4>R${{ item.valorAcomodacao }},00</h4>
          </div>
          <hr />
        </div>
        <div v-else-if="item.tipoAcomodacao == 'Confort'">
          <div>
            <h2>Suite {{ item.tipoAcomodacao }} - {{ item.nomeAcomodacao }}</h2>
          </div>
          <div class="flex">
            <div id="acomodacoes_card_imgSingle1" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/aguia-6.jpg"
                  alt="Economic Single" /></a>
            </div>
            <div id="acomodacoes_card_imgSingle2" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/aguia-4.jpg"
                  alt="Economic Single" /></a>
            </div>
            <div id="acomodacoes_card_imgSingle3" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/aguia-5.png"
                  alt="Economic Single" /></a>
            </div>
            <div id="acomodacoes_card_imgSingle4" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/aguia-1.jpg"
                  alt="Economic Single" /></a>
            </div>
            <div id="acomodacoes_card_imgSingle5" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/aguia-3.jpg"
                  alt="Economic Single" /></a>
            </div>
            <div id="acomodacoes_card_imgSingle6" class="acomodacoes_card">
              <h2 class="card__titulo_"></h2>
              <a href="/root/pages/acomodacoes.html#/Reservas"><img src="@/assets/images/acomodacoes/aguia-2.jpg"
                  alt="Economic Single" /></a>
            </div>
          </div>
          <div>
            <h3>Bem vindo ao requinte de nossa suite {{ item.nomeAcomodacao }}!</h3>
            <p>{{ item.descricaoAcomodacao }}</p>
            <h4>R${{ item.valorAcomodacao }},00</h4>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
    
<script>
import axios from "axios"
export default {
  name: 'AcomodacoesMain',
  components: {
  },
  data() {
    return {
      items: [],
      images: [

      ],
    };
  },
  created() {
    this.getAcomodacao();
  },
  methods: {
    async getAcomodacao() {
      try {
        const response = await axios.get("http://localhost:5000/acomodacao");
        this.items = response.data;
        console.log("Array Acomodacoes items...",this.items)
      } catch (err) {
        console.log(err);
      }
    },
  }
}    
</script>
  
<style scoped>
.botaoreserva {
  position: fixed;
  left: 93%;
  top: 40%;
  font-weight: bold;
  font-size: 1em;
  background-color: rgb(89, 0, 255);
  color: rgb(240, 241, 245);
  border-radius: 5em;
  border: none;
  padding: 1em 1em 1em 1em;
  cursor: pointer;
  z-index: 9999;
}

.botaoreserva:hover {
  transform: translate(0px, -2px);
  -webkit-box-shadow: 0px 10px 7px -9px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 10px 7px -9px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 10px 7px -9px rgba(0, 0, 0, 0.75);
  transition: all 0.3s ease-out;
}

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

.sec h2 {
  font-size: 3em;
}

.sec h3,
.sec h4 {
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

.sec p {
  font-size: 1.2em;
  font-weight: 300;
}

img {
  width: 523px;
  height: 294px;
  display: block;
  border-radius: 20px;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 5%;
}

.flex>div {
  flex: 1 1 420px;
  margin: 10px;
}

img:hover {
  -ms-transform: scale(2);
  /* IE 9 */
  -webkit-transform: scale(2);
  /* Safari 3-8 */
  transform: scale(1.5);
}

/* CARDS de Acomodacoes...*/
/* CARDS - MASTER */
.acomodacoes_card_imgMaster1 {
  background-size: cover;
  /*& h2::before {
      background-image: url();
      content: "Premium Master Suite Quarto";
      font-size: 5pix;
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgMaster2 {
  background-size: cover;
  /*& h2::before {
      background-image: url();
      content: "Premium Master Suite Banheiro";
      font-size: 5pix;
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgMaster3 {
  background-size: cover;
  /*& h2::before {
      background-image: url();
      content: "Premium Master Suite Cozinha";
      font-size: 5pix;
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgMaster4 {
  background-size: cover;
  /*& h2::before {
      background-image: url();
      content: "Premium Master Suite Sala";
      font-size: 5pix;
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgMaster5 {
  background-size: cover;
  /*& h2::before {
      background-image: url();
      content: "Premium Master Suite Sala 2";
      font-size: 5pix;
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgMaster6 {
  background-size: cover;
  /*& h2::before {
      background-image: url();
      content: "Premium Master Suite Sacada";
      font-size: 5pix;
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

/* CARDS - Familia */
#acomodacoes_card_imgFamilia1 {
  background-size: cover;
  /* & h2::before {
      background-image: url();
      content: "Família Suite Quarto";
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgFamilia2 {
  background-size: cover;
  /* & h2::before {
      background-image: url();
      content: "Família Suite Banheiro";
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgFamilia3 {
  background-size: cover;
  /* & h2::before {
      background-image: url();
      content: "Família Suite Cozinha";
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgFamilia4 {
  background-size: cover;
  /* & h2::before {
      background-image: url();
      content: "Família Suite Quarto 2";
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgFamilia5 {
  background-size: cover;
  /* & h2::before {
      background-image: url();
      content: "Família Suite Quarto 3";
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgFamilia6 {
  background-size: cover;
  /* & h2::before {
      background-image: url();
      content: "Família Suite Quarto 4";
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

/* CARDS - Single */
#acomodacoes_card_imgSingle1 {
  background-size: cover;
  /*& h2::before {
      background-image: url();
      content: "Economic Single Quarto";
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgSingle2 {
  background-size: cover;
  /*& h2::before {
      background-image: url();
      content: "Economic Single Cozinha";
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgSingle3 {
  background-size: cover;
  /*& h2::before {
      background-image: url();
      content: "Economic Single Banheiro";
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgSingle4 {
  background-size: cover;
  /*& h2::before {
      background-image: url();
      content: "Economic Single Quarto 2";
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgSingle5 {
  background-size: cover;
  /*& h2::before {
      background-image: url();
      content: "Economic Single Quarto 3";
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}

#acomodacoes_card_imgSingle6 {
  background-size: cover;
  /*& h2::before {
      background-image: url();
      content: "Economic Single Sacada";
      display: block;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 1rem 0.5rem;
    } */
}</style>
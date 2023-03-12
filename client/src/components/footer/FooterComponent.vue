<!-- Header -->
<template>
    <div>
      <div class="banner"></div>
      <footer class="footer">
        <div class="redessociaisfooter">
          <a href="https://github.com/And3rsLMM/ProjetoTexHotelVue" target="_blank">
            <img src="./images/github.png" alt="Logo do github"></a>
          <a href="https://chat.whatsapp.com/KthRdCQBgphIxusvtrUFs7" target="_blank">
            <img src="./images/whatsapp.png" alt="Logo do whatsapp"></a>
          <router-link to="/Contato" class="links">
            <h3>Fale conosco</h3>
          </router-link>
        </div>
        <div class="logodireitosreservados">
          <img src="./images/logo_hotel.png" alt="Logo">
          <p>
            Todos os direitos reservados: HOTEL CASA NA PRAIA
          </p>
          <a class="links" href="#inicio">Voltar ao topo</a>
        </div>
        <div class="menufooter">
          <h3>LINKS ÚTEIS</h3>
          <router-link class="links" to="/">Home</router-link>
          <router-link to="/Acomodacoes" class="links">Acomodações</router-link>
          <router-link class="links" to="/Reservas">Reservas</router-link>
        </div>  
      </footer>
    </div>
</template>

<script>
export default {
    name: "FooterComponent",
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

body {
    overflow-x: hidden;
    background: #fff;
    min-height: 100vh;
}

.footer {
  padding: 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}

footer .redessociaisfooter img {
  width: 3em;
  height: 3em;
}

footer .logodireitosreservados img {
  width: 7em;
  height: 7em;
}

.redessociaisfooter {
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.menufooter {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 10px;
}

.logodireitosreservados {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.direitosreservadosfooter {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.links {
  text-decoration: none;
  color: black;
  padding: 0.4em;
}

.banner {
  background-image: url(@/assets/footerborder.png);
  height: 60px;
  display: block;
  object-fit: cover;
  width: 100%;
  object-position: center;  
}

@media screen and (max-width: 720px) {
  footer .redessociaisfooter img{
    width: 2em;
    height: 2em;
  }

  footer .logodireitosreservados img {
  width: 4em;
  height: 4em;
  }

  h3 {
    font-size: 0.9em;
  }

  a,p {
    font-size: 0.6em;
  }

  .botaoreserva{
    left: 60%;
    top: auto;
  }
}
</style>
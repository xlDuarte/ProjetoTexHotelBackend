<!-- Header -->
<template>
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
</style>